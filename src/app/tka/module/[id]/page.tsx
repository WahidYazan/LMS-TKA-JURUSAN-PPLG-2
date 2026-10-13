"use client";

import { ModuleReaderView } from "@/components/ModuleReaderView";
import { SiteFooter } from "@/components/SiteFooter";
import { Navbar } from "@/components/Navbar";
import { loadModules } from "@/lib/content";
import { modulesList } from "@/data/modules";
import { useContent } from "@/hooks/useContent";
import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";
import { use, Suspense } from "react";

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

function ModuleContent({ params }: ModulePageProps) {
  const pathname = usePathname();
  const resolvedParams = use(params);
  const id = resolvedParams?.id || "";
  const { data: modules } = useContent(loadModules, modulesList);

  const allModules = modules && modules.length > 0 ? modules : modulesList;

  // Flexible match: "modul1", "1", "modul-1", "MODUL 1", case-insensitive
  const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, "");
  const moduleContent = allModules.find((m) => {
    const mNorm = m.id.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      m.id === id ||
      m.id.toLowerCase() === id.toLowerCase() ||
      String(m.number) === id ||
      mNorm === normalizedId ||
      mNorm === `modul${normalizedId}` ||
      `modul${m.number}` === normalizedId
    );
  });

  if (!moduleContent) {
    notFound();
  }

  const currentIndex = allModules.findIndex((m) => m.id === moduleContent.id);
  const hasNextModule = currentIndex < allModules.length - 1;
  const nextModule = hasNextModule ? allModules[currentIndex + 1] : null;
  const hasPrevModule = currentIndex > 0;
  const prevModule = hasPrevModule ? allModules[currentIndex - 1] : null;

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
