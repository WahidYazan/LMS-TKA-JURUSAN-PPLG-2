"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  ListOrdered,
} from "lucide-react";
import { ModuleContent } from "../types";

interface ModuleReaderViewProps {
  module: ModuleContent;
  hasNextModule: boolean;
  nextModuleId?: string | null;
  hasPrevModule: boolean;
  prevModuleId?: string | null;
}

export const ModuleReaderView: React.FC<ModuleReaderViewProps> = ({
  module,
  hasNextModule,
  nextModuleId,
  hasPrevModule,
  prevModuleId,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAIN READER COLUMN (8 of 12) */}
          <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-8 shadow-xs">
            {/* Breadcrumb metadata */}
            <div className="flex items-center gap-2 mb-3 text-xs text-slate-400 font-medium">
              <Link href="/tka" className="hover:text-blue-600 transition-colors">Beranda</Link>
              <span aria-hidden="true">/</span>
              <Link href="/tka/modul" className="hover:text-blue-600 transition-colors">Modul Belajar</Link>
              <span aria-hidden="true">/</span>
              <span className="text-blue-600 font-bold">Modul {module.number}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold font-mono">
                MODUL 0{module.number}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {module.sections?.length || 5} Bab Pembahasan
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
              {module.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              {module.shortDesc}
            </p>

            {module.heroImage && (
              <div className="rounded-xl overflow-hidden mb-8 border border-slate-200 bg-slate-100 aspect-video max-h-80 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={module.heroImage}
                  alt={module.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Sections Content */}
            <div className="space-y-10 text-slate-700">
              {module.sections.map((section, sIdx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 pb-8 border-b border-slate-100 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-blue-100">
                      0{sIdx + 1}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {section.numberPrefix ? `${section.numberPrefix} ` : ""}{section.title}
                    </h2>
                  </div>

                  {section.paragraphs?.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm sm:text-base leading-relaxed mb-3.5 text-slate-700"
                    >
                      {p}
                    </p>
                  ))}

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2.5 my-4 bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80">
                      {section.bulletPoints.map((bp, bIdx) => (
                        <li
                          key={bIdx}
                          className="text-xs sm:text-sm leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 select-none" />
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
                  )}

                  {section.codeSnippet && (
                    <div className="relative my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
                        <span className="font-mono text-[11px] uppercase text-sky-400 font-semibold">
                          {section.codeSnippet.language}
                        </span>
                        <button
                          onClick={() => handleCopyCode(section.codeSnippet!.code, section.id)}
                          className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800"
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
                      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                        <code>{section.codeSnippet.code}</code>
                      </pre>
                      {section.codeSnippet.explanation && (
                        <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 text-xs text-slate-400 italic">
                          {section.codeSnippet.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {section.media && section.media.length > 0 && (
                    <div className="space-y-4 mt-4">
                      {section.media.map((media, mIdx) => (
                        <div
                          key={mIdx}
                          className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                        >
                          {media.type === "image" && (
                            <figure className="m-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={media.src}
                                alt={media.alt || section.title}
                                className="mx-auto h-auto max-h-[500px] w-auto max-w-full object-contain"
                                style={{
                                  maxWidth: media.width
                                    ? `${media.width}px`
                                    : undefined,
                                }}
                              />
                              {media.caption && (
                                <figcaption className="px-4 py-2 text-xs text-slate-500 text-center bg-white border-t border-slate-100">
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

            {/* Desktop Navigation Footer inside article container */}
            <div className="hidden lg:flex items-center justify-between gap-3 mt-10 pt-6 border-t border-slate-200">
              <Link
                href="/tka/modul"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Katalog Modul</span>
              </Link>

              <div className="flex items-center gap-3">
                {hasPrevModule && prevModuleId && (
                  <Link
                    href={`/tka/module/${prevModuleId}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Modul {module.number - 1}</span>
                  </Link>
                )}

                {hasNextModule && nextModuleId && (
                  <Link
                    href={`/tka/module/${nextModuleId}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    <span>Lanjut ke Modul {module.number + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                )}

                {!hasNextModule && (
                  <Link
                    href="/tka/quiz"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    <span>Mulai Simulasi Ujian (50 Soal)</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </article>

          {/* SIDEBAR COLUMN (4 of 12) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-5">
            {/* Table of Contents card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                <ListOrdered className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <h3 className="text-sm font-bold text-slate-900">Daftar Isi Modul {module.number}</h3>
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

            {/* Quick Practice Card */}
            <div className="bg-gradient-to-br from-[#0c1328] via-[#0f1b3b] to-[#090d1a] text-white rounded-2xl p-5 border border-slate-800 shadow-md">
              <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1 font-mono">
                Uji Pemahaman
              </p>
              <h4 className="text-sm font-bold text-white mb-2">
                Simulasi Ujian TKA PPLG
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Selesaikan soal studi kasus untuk menguji seberapa jauh Anda menguasai materi modul ini.
              </p>
              <Link
                href={`/tka/quiz?module=${module.number}`}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Kerjakan Soal Modul Ini</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Katalog</span>
            </Link>

            <div className="flex gap-2">
              {hasPrevModule && prevModuleId && (
                <Link
                  href={`/tka/module/${prevModuleId}`}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-xs min-h-[40px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Modul {module.number - 1}</span>
                </Link>
              )}

              {hasNextModule && nextModuleId && (
                <Link
                  href={`/tka/module/${nextModuleId}`}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm min-h-[40px]"
                >
                  <span>Modul {module.number + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}

              {!hasNextModule && (
                <Link
                  href="/tka/quiz"
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-sm min-h-[40px]"
                >
                  <span>Simulasi Ujian</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
