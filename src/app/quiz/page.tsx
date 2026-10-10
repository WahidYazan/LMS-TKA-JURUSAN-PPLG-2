"use client";

import { QuizSimulatorView } from "@/components/QuizSimulatorView";
import { Navbar } from "@/components/Navbar";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function QuizContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeModuleTab = parseInt(searchParams.get("module") || "1", 10);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar currentPath={pathname} onOpenCheatsheet={() => {}} />
      <QuizSimulatorView />
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
