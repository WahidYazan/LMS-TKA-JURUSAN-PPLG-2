"use client";

import { ModuleReaderView } from "@/components/ModuleReaderView";
import { SiteFooter } from "@/components/SiteFooter";
import { Navbar } from "@/components/Navbar";
import { loadModules } from "@/lib/content";
import { useContent } from "@/hooks/useContent";
import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

function ModuleContent({ params }: ModulePageProps) {
  const pathname = usePathname();
  const [id, setId] = useState<string>("");
  const { data: modules, loading } = useContent(loadModules);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  if (!id) return null;

  if (loading || !modules) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <p className="text-sm text-slate-400 animate-pulse">Memuat modul...</p>
      </div>
    );
  }

  const moduleContent = modules.find((m) => m.id === id);

  if (!moduleContent) {
    notFound();
  }

  const currentIndex = modules.findIndex((m) => m.id === moduleContent.id);
  const hasNextModule = currentIndex < modules.length - 1;
  const nextModule = hasNextModule ? modules[currentIndex + 1] : null;
  const hasPrevModule = currentIndex > 0;
  const prevModule = hasPrevModule ? modules[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar currentPath={pathname} selectedModule={moduleContent} />
      <ModuleReaderView
        module={moduleContent}
        hasNextModule={hasNextModule}
        nextModuleId={nextModule?.id || null}
        hasPrevModule={hasPrevModule}
        prevModuleId={prevModule?.id || null}
      />
      <SiteFooter />
    </div>
  );
}

export default function ModulePage({ params }: ModulePageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
          <p>Memuat...</p>
        </div>
      }
    >
      <ModuleContent params={params} />
    </Suspense>
  );
}
