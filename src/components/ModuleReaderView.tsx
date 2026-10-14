"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  ListOrdered,
  Clock,
  Share2,
  Laptop,
} from "lucide-react";
import { ModuleContent } from "../types";
import { useSiteStats } from "../hooks/useSiteStats";

interface ModuleReaderViewProps {
  module: ModuleContent;
  hasNextModule: boolean;
  nextModuleId?: string | null;
  hasPrevModule: boolean;
  prevModuleId?: string | null;
  /** Opsional: override jumlah total soal (default otomatis dari data). */
  totalQuestionsOverride?: number;
  /** Opsional: override jumlah soal modul ini (default otomatis dari data). */
  moduleQuestionCountOverride?: number;
}

export const ModuleReaderView: React.FC<ModuleReaderViewProps> = ({
  module,
  hasNextModule,
  nextModuleId,
  hasPrevModule,
  prevModuleId,
  totalQuestionsOverride,
  moduleQuestionCountOverride,
}) => {
  const { totalQuestions, questionsByModule } = useSiteStats();
  const totalSoal = totalQuestionsOverride ?? totalQuestions;
  const soalModulIni =
    moduleQuestionCountOverride ?? questionsByModule[module.number] ?? 10;
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-800 font-sans relative">
      
      {/* READING PROGRESS BAR AT TOP */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-slate-200 z-40">
        <div
          className="h-full bg-blue-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAIN READER ARTICLE (8 of 12) */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
            
            {/* Breadcrumb and utility bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Link href="/tka" className="hover:text-blue-600 transition-colors">Beranda</Link>
                <span aria-hidden="true">/</span>
                <Link href="/tka/modul" className="hover:text-blue-600 transition-colors">Modul Belajar</Link>
                <span aria-hidden="true">/</span>
                <span className="text-blue-600 font-bold">Modul 0{module.number}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>~20 Menit Belajar</span>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 text-slate-500 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Tersalin!" : "Bagikan"}</span>
                </button>
              </div>
            </div>

            {/* Header Badge */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-blue-600 text-white">
                MODUL 0{module.number}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {module.sections?.length || 5} Bab Pembahasan · Standar Pusmendik
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              {module.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              {module.shortDesc}
            </p>

            {module.heroImage && (
              <div className="rounded-2xl overflow-hidden mb-10 border border-slate-200 bg-slate-900 aspect-video max-h-80 relative shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={module.heroImage}
                  alt={module.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Sections Flow */}
            <div className="space-y-12">
              {module.sections.map((section, sIdx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 pb-10 border-b border-slate-100 last:border-b-0 last:pb-0"
                >
                  {/* Section Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-black flex items-center justify-center shrink-0 border border-blue-100">
                      0{sIdx + 1}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {section.numberPrefix ? `${section.numberPrefix} ` : ""}{section.title}
                    </h2>
                  </div>

                  {/* Paragraphs */}
                  {section.paragraphs?.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base leading-relaxed mb-4 text-slate-700"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Bullet Points with clean styling */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <div className="my-5 bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Poin Kunci & Karakteristik
                      </div>
                      <ul className="space-y-3">
                        {section.bulletPoints.map((bp, bIdx) => (
                          <li
                            key={bIdx}
                            className="text-xs sm:text-sm leading-relaxed flex items-start gap-3"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0 select-none" />
                            <div>
                              <strong className="text-slate-900 font-bold">
                                {bp.label}:{" "}
                              </strong>
                              <span className="text-slate-600">
                                {bp.description}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Code Snippets with IDE look */}
                  {section.codeSnippet && (
                    <div className="relative my-6 rounded-2xl overflow-hidden border border-slate-800 bg-[#090d16] shadow-md">
                      {/* IDE Titlebar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5" aria-hidden="true">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <span className="font-mono text-[11px] text-sky-400 font-bold ml-2">
                            {section.codeSnippet.language.toUpperCase()}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopyCode(section.codeSnippet!.code, section.id)}
                          className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-800"
                        >
                          {copiedIndex === section.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin Kode</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                        <code>{section.codeSnippet.code}</code>
                      </pre>

                      {section.codeSnippet.explanation && (
                        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
                          <strong>Keterangan:</strong> {section.codeSnippet.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Media illustration if any */}
                  {section.media && section.media.length > 0 && (
                    <div className="space-y-4 my-6">
                      {section.media.map((media, mIdx) => (
                        <div
                          key={mIdx}
                          className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"
                        >
                          {media.type === "image" && (
                            <figure className="m-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={media.src}
                                alt={media.alt || section.title}
                                className="mx-auto h-auto max-h-[480px] w-auto max-w-full object-contain"
                              />
                              {media.caption && (
                                <figcaption className="px-4 py-2.5 text-xs text-slate-500 text-center bg-white border-t border-slate-100">
                                  {media.caption}
                                </figcaption>
                              )}
                            </figure>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* End of article navigation */}
            <div className="hidden lg:flex items-center justify-between gap-3 mt-12 pt-8 border-t border-slate-200">
              <Link
                href="/tka/modul"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors border border-slate-200 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Katalog Modul</span>
              </Link>

              <div className="flex items-center gap-3">
                {hasPrevModule && prevModuleId && (
                  <Link
                    href={`/tka/module/${prevModuleId}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Modul {module.number - 1}</span>
                  </Link>
                )}

                {hasNextModule && nextModuleId && (
                  <Link
                    href={`/tka/module/${nextModuleId}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    <span>Lanjut ke Modul {module.number + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {!hasNextModule && (
                  <Link
                    href="/tka/quiz"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    <span>Mulai Simulasi {totalSoal} Soal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>

          </article>

          {/* SIDEBAR (4 of 12) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-5">
            
            {/* Table of contents card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                <ListOrdered className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Daftar Bab Modul {module.number}
                </h3>
              </div>
              <nav className="space-y-1" aria-label="Navigasi bab modul">
                {module.tableOfContents?.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors group"
                  >
                    <span className="w-5 h-5 rounded-md bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-700 text-slate-500 font-mono text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Jump to quiz simulator */}
            <div className="bg-gradient-to-br from-[#0b1328] via-[#0f1b3b] to-[#090d1a] text-white rounded-2xl p-5 border border-slate-800 shadow-md">
              <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <Laptop className="w-3.5 h-3.5" />
                <span>Uji Pemahaman</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">
                Simulasi Ujian Modul {module.number}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Uji penguasaan Anda atas materi modul ini melalui {soalModulIni} butir soal studi kasus HOTS dengan evaluasi instan.
              </p>
              <Link
                href={`/tka/quiz?module=${module.number}`}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Kerjakan Soal Modul Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </aside>

        </div>
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/tka/modul"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer min-h-[40px] border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Katalog</span>
            </Link>

            <div className="flex gap-2">
              {hasPrevModule && prevModuleId && (
                <Link
                  href={`/tka/module/${prevModuleId}`}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs min-h-[40px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modul {module.number - 1}</span>
                </Link>
              )}

              {hasNextModule && nextModuleId && (
                <Link
                  href={`/tka/module/${nextModuleId}`}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm min-h-[40px]"
                >
                  <span>Modul {module.number + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              {!hasNextModule && (
                <Link
                  href="/tka/quiz"
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-sm min-h-[40px]"
                >
                  <span>Simulasi Ujian</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
