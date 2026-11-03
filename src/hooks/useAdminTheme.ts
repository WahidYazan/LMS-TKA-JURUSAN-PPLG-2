"use client";

import { useSyncExternalStore } from "react";

export type AdminTheme = "light" | "dark";

const STORAGE_KEY = "tka-admin-theme";
const THEME_CHANGE_EVENT = "tka-admin-theme-change";

let cachedTheme: AdminTheme = "light";
let hasReadStoredTheme = false;

function normalizeTheme(value: string | null): AdminTheme {
  return value === "dark" ? "dark" : "light";
}

function getThemeSnapshot(): AdminTheme {
  if (!hasReadStoredTheme) {
    try {
      cachedTheme = normalizeTheme(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      cachedTheme = "light";
    }
    hasReadStoredTheme = true;
  }

  return cachedTheme;
}

function subscribeToTheme(onStoreChange: () => void) {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    cachedTheme = normalizeTheme(event.newValue);
    hasReadStoredTheme = true;
    onStoreChange();
  };
  const handleLocalChange = () => onStoreChange();

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(THEME_CHANGE_EVENT, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(THEME_CHANGE_EVENT, handleLocalChange);
  };
}

function getServerThemeSnapshot(): AdminTheme {
  return "light";
}

function setAdminTheme(theme: AdminTheme) {
  cachedTheme = theme;
  hasReadStoredTheme = true;

  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Theme still changes for this session if localStorage is unavailable.
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function useAdminTheme() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  return [theme, setAdminTheme] as const;
}
