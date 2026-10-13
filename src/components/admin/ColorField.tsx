"use client";

import React, { useState } from "react";

const PRESETS: { label: string; hex: string }[] = [
  { label: "Sky", hex: "#0ea5e9" },
  { label: "Sky Gelap", hex: "#0284c7" },
  { label: "Blue", hex: "#2563eb" },
  { label: "Indigo", hex: "#4f46e5" },
  { label: "Violet", hex: "#7c3aed" },
  { label: "Emerald", hex: "#059669" },
  { label: "Amber", hex: "#f59e0b" },
  { label: "Rose", hex: "#e11d48" },
  { label: "Slate", hex: "#334155" },
];

const CLASS_TO_HEX: Record<string, string> = {
  "text-sky-500": "#0ea5e9",
  "text-sky-600": "#0284c7",
  "text-blue-600": "#2563eb",
  "text-indigo-600": "#4f46e5",
  "text-violet-600": "#7c3aed",
  "text-emerald-600": "#059669",
  "text-amber-500": "#f59e0b",
  "text-rose-600": "#e11d48",
  "text-slate-700": "#334155",
  blue: "#2563eb",
  indigo: "#4f46e5",
  sky: "#0ea5e9",
  emerald: "#059669",
  amber: "#f59e0b",
  rose: "#e11d48",
  violet: "#7c3aed",
};

export function toHex(value: string, fallback = "#0ea5e9"): string {
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value;
  return CLASS_TO_HEX[value] ?? fallback;
}

const ColorField: React.FC<{
  label: string;
  value: string;
  onChange: (hex: string) => void;
}> = ({ label, value, onChange }) => {
  const [draft, setDraft] = useState<string | null>(null);
  const hex = draft ?? toHex(value);

  const pick = (next: string) => {
    setDraft(next);
    onChange(next);
  };

  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative w-11 h-11 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-xs">
          <input
            type="color"
            value={hex}
            onChange={(e) => pick(e.target.value)}
            className="absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] cursor-pointer border-0 p-0"
            aria-label={`${label} — buka color picker`}
          />
        </div>
        <code className="text-xs font-mono text-slate-500 uppercase w-20">
          {hex}
        </code>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESETS.map((p) => (
            <button
              key={p.hex}
              type="button"
              onClick={() => pick(p.hex)}
              title={p.label}
              aria-label={`Preset warna ${p.label}`}
              className={`w-7 h-7 rounded-lg cursor-pointer transition-transform hover:scale-110 ${
                hex.toLowerCase() === p.hex
                  ? "ring-2 ring-slate-900 ring-offset-2"
                  : "border border-slate-200"
              }`}
              style={{ backgroundColor: p.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorField;
