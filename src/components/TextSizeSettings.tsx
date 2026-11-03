"use client";

import {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { Minus, Plus, Type, X } from "lucide-react";

type TextSizeSettingsContextValue = {
  size: number;
  setSize: (size: number) => void;
};

const DEFAULT_SIZE = 100;
const MIN_SIZE = 85;
const MAX_SIZE = 130;
const STORAGE_KEY = "tka-text-size-admin";
const STORAGE_CHANGE_EVENT = "tka-text-size-change";

let cachedSize = DEFAULT_SIZE;
let hasReadStoredSize = false;

function normalizeTextSize(value: string | null) {
  const size = value === null ? Number.NaN : Number(value);
  return Number.isFinite(size)
    ? Math.min(MAX_SIZE, Math.max(MIN_SIZE, size))
    : DEFAULT_SIZE;
}

function readStoredSize() {
  try {
    return normalizeTextSize(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // Keep the default size when localStorage is unavailable.
    return DEFAULT_SIZE;
  }
}

function getTextSizeSnapshot() {
  if (!hasReadStoredSize) {
    cachedSize = readStoredSize();
    hasReadStoredSize = true;
  }

  return cachedSize;
}

function subscribeToTextSize(onStoreChange: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;

    cachedSize = normalizeTextSize(event.newValue);
    hasReadStoredSize = true;
    onStoreChange();
  };
  const handleLocalChange = () => onStoreChange();

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(STORAGE_CHANGE_EVENT, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(STORAGE_CHANGE_EVENT, handleLocalChange);
  };
}

function getServerTextSizeSnapshot() {
  return DEFAULT_SIZE;
}

function updateTextSize(size: number) {
  cachedSize = Math.min(MAX_SIZE, Math.max(MIN_SIZE, size));
  hasReadStoredSize = true;

  try {
    window.localStorage.setItem(STORAGE_KEY, String(cachedSize));
  } catch {
    // The current page still updates if localStorage is unavailable.
  }

  window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
}

const TextSizeSettingsContext =
  createContext<TextSizeSettingsContextValue | null>(null);

export function TextSizeSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const size = useSyncExternalStore(
    subscribeToTextSize,
    getTextSizeSnapshot,
    getServerTextSizeSnapshot,
  );

  const value = useMemo(
    () => ({
      size,
      setSize: updateTextSize,
    }),
    [size],
  );

  return (
    <TextSizeSettingsContext.Provider value={value}>
      <Suspense fallback={null}>
        <ActiveTextSizeScope />
      </Suspense>
      {children}
    </TextSizeSettingsContext.Provider>
  );
}

function ActiveTextSizeScope() {
  const pathname = usePathname();
  const settings = useContext(TextSizeSettingsContext);
  const isAdmin =
    pathname === "/tka/admin" || pathname.startsWith("/tka/admin/");
  const size = settings?.size;

  useEffect(() => {
    if (size === undefined) return;

    const root = document.documentElement;
    root.dataset.textSizeScope = isAdmin ? "admin" : "tka";
    root.style.setProperty(
      "--site-text-scale",
      String(isAdmin ? size / 100 : 1),
    );
  }, [isAdmin, size]);

  return null;
}

export function TextSizeSettingsButton({
  className = "",
}: {
  className?: string;
}) {
  const settings = useContext(TextSizeSettingsContext);
  const panelId = `text-size-settings-${useId().replace(/:/g, "")}`;
  const [open, setOpen] = useState(false);

  if (!settings) {
    throw new Error(
      "TextSizeSettingsButton must be used inside TextSizeSettingsProvider",
    );
  }

  const size = settings.size;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Pengaturan ukuran teks admin"
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-xs transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
      >
        <Type className="h-4 w-4" aria-hidden="true" />
        <span>Ukuran teks</span>
      </button>

      {open && (
        <section
          id={panelId}
          aria-label="Pengaturan ukuran teks admin"
          className="fixed right-4 top-20 z-[70] w-72 rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 shadow-xl md:absolute md:right-0 md:top-full md:mt-2"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Ukuran teks</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Pengaturan ini hanya berlaku untuk panel admin.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup pengaturan ukuran teks"
              title="Tutup"
              className="-mr-2 -mt-2 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => settings.setSize(size - 5)}
              disabled={size <= MIN_SIZE}
              aria-label="Perkecil teks"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <input
              type="range"
              min={MIN_SIZE}
              max={MAX_SIZE}
              step={5}
              value={size}
              onChange={(event) =>
                settings.setSize(Number(event.currentTarget.value))
              }
              aria-label="Ukuran teks admin"
              className="min-w-0 flex-1 accent-sky-600"
            />
            <button
              type="button"
              onClick={() => settings.setSize(size + 5)}
              disabled={size >= MAX_SIZE}
              aria-label="Perbesar teks"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500">Kecil</span>
            <span aria-live="polite" className="font-bold text-slate-800">
              {size}%
            </span>
            <span className="text-slate-500">Besar</span>
          </div>

          <button
            type="button"
            onClick={() => settings.setSize(DEFAULT_SIZE)}
            disabled={size === DEFAULT_SIZE}
            className="mt-4 w-full rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-default disabled:opacity-50"
          >
            Atur ulang ke normal
          </button>
        </section>
      )}
    </div>
  );
}
