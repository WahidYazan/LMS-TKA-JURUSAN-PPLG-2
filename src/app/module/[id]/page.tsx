"use client";

import { ModuleReaderView } from "@/components/ModuleReaderView";
import { Navbar } from "@/components/Navbar";
import { modulesList } from "@/data/modules";
import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface ModulePageProps {
  params: Promise<{ id: string }>;
}

function ModuleContent({ params }: ModulePageProps) {
  const pathname = usePathname();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  if (!id) return null;

  const module = modulesList.find((m) => m.id === id);

  if (!module) {
    notFound();
  }

  const currentIndex = modulesList.findIndex((m) => m.id === module.id);
  const hasNextModule = currentIndex < modulesList.length - 1;
  const nextModule = hasNextModule ? modulesList[currentIndex + 1] : null;
  const hasPrevModule = currentIndex > 0;
  const prevModule = hasPrevModule ? modulesList[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar currentPath={pathname} selectedModule={module} />
      <ModuleReaderView
        module={module}
        hasNextModule={hasNextModule}
        nextModuleId={nextModule?.id || null}
        hasPrevModule={hasPrevModule}
        prevModuleId={prevModule?.id || null}
      />
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
