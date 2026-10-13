import { SiteLogo } from "@/components/SiteLogo";

export default function AdminLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative min-h-screen flex flex-col items-center justify-center gap-5 bg-[#f5f8fb] overflow-hidden"
    >
      <span className="sr-only">Memuat halaman admin...</span>
      <div
        className="absolute inset-0 bg-blueprint opacity-50 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden">
        <SiteLogo width={48} height={48} className="animate-pulse" />
      </div>
      <p className="relative font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400">
        Memuat...
      </p>
    </div>
  );
}
