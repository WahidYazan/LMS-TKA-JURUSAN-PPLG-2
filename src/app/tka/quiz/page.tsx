"use client";

import { QuizSimulatorView } from "@/components/QuizSimulatorView";
import { SiteFooter } from "@/components/SiteFooter";
import { Navbar } from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function QuizContent() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar currentPath={pathname} onOpenCheatsheet={() => {}} />
      <QuizSimulatorView />
      <SiteFooter />
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
          <p>Memuat...</p>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
