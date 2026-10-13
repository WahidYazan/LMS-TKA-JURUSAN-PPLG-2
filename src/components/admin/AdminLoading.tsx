"use client";

import React from "react";

/** Satu baris skeleton yang meniru bentuk AdminListRow. */
export const SkeletonRow: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-slate-200/80 bg-white ${className}`}
  >
    <div className="flex-1 min-w-0 space-y-2.5">
      <div className="skeleton h-3.5 w-2/3 rounded-full" />
      <div className="skeleton h-2.5 w-1/3 rounded-full" />
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <div className="skeleton w-8 h-8 rounded-lg" />
      <div className="skeleton w-8 h-8 rounded-lg" />
    </div>
  </div>
);

/** Kumpulan baris skeleton untuk daftar admin. */
export const AdminListSkeleton: React.FC<{
  rows?: number;
  className?: string;
}> = ({ rows = 3, className = "" }) => (
  <div
    role="status"
    aria-live="polite"
    className={`space-y-3 ${className}`}
  >
    <span className="sr-only">Memuat data...</span>
    <div aria-hidden="true" className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  </div>
);

/** Loader layar penuh dengan spinner cincin untuk gerbang auth admin. */
export const FullscreenLoader: React.FC<{ label?: string }> = ({
  label = "Memuat...",
}) => (
  <div
    role="status"
    aria-live="polite"
    className="relative min-h-screen bg-[#f5f8fb] flex flex-col items-center justify-center gap-5 font-sans overflow-hidden"
  >
    {/* pola blueprint samar sebagai latar */}
    <div
      className="absolute inset-0 bg-blueprint opacity-50 pointer-events-none"
      aria-hidden="true"
    />
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className="absolute inset-0 rounded-2xl bg-white border border-slate-200 shadow-xs" />
      <div className="absolute inset-0 rounded-2xl border-[3px] border-transparent border-t-sky-500 border-r-blue-500 animate-spin" />
      <span className="relative w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
    </div>
    <p className="relative font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400">
      {label}
    </p>
  </div>
);
