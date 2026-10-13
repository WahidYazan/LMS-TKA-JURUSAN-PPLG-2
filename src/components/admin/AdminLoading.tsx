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
    className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-5 font-['Plus_Jakarta_Sans',sans-serif]"
  >
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 rounded-full border-[3px] border-slate-200" />
      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-sky-500 animate-spin" />
      <div className="absolute inset-[20px] rounded-full bg-sky-500/10 animate-pulse" />
    </div>
    <p className="text-sm font-semibold text-slate-400">{label}</p>
  </div>
);
