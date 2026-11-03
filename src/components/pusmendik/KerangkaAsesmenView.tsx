"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Server,
  Database,
  HardDrive,
  Copy,
  Check,
  ShieldCheck,
  Award,
} from "lucide-react";
import { kerangkaAsesmenPusmendik } from "@/data/pusmendik/kerangkaAsesmen";

export const KerangkaAsesmenView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "definisi" | "muatan" | "kompetensi" | "matriks" | "soal"
  >("muatan");

  // Soal state
  const [selectedSoalId, setSelectedSoalId] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [userKategori, setUserKategori] = useState<
    Record<string, boolean | null>
  >({});
  const [userMcma, setUserMcma] = useState<Record<string, boolean>>({});
  const [showKeyMap, setShowKeyMap] = useState<Record<number, boolean>>({});
  const [copiedCode, setCopiedCode] = useState(false);

  const activeSoal =
    kerangkaAsesmenPusmendik.contohSoal.find((s) => s.id === selectedSoalId) ||
    kerangkaAsesmenPusmendik.contohSoal[0];

  const toggleShowKey = (id: number) => {
    setShowKeyMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden font-sans">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 text-white p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-sky-100 text-xs font-bold mb-3 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-200" />
              <span>{kerangkaAsesmenPusmendik.meta.instansi}</span>
              <span className="text-white/40">·</span>
              <span>{kerangkaAsesmenPusmendik.meta.dasarHukum}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
              Kerangka Asesmen TKA PPLG
            </h2>
            <p className="text-sm sm:text-base text-sky-100/90 max-w-2xl leading-relaxed">
              Panduan kurikulum resmi Tes Kemampuan Akademik untuk Program
              Keahlian Pengembangan Perangkat Lunak dan Gim (Fase E & Fase F).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={kerangkaAsesmenPusmendik.meta.sumberResmiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all backdrop-blur-xs cursor-pointer min-h-[44px]"
            >
              <span>Portal Resmi Pusmendik</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/tka/quiz"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer min-h-[44px]"
            >
              <span>Uji Kemampuan (Quiz)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-1 scrollbar-none border-b border-white/20">
          {[
            { id: "definisi", label: "Definisi" },
            { id: "muatan", label: "Muatan (5 Modul)" },
            { id: "kompetensi", label: "Kompetensi & Level" },
            { id: "matriks", label: "Matriks Asesmen" },
            {
              id: "soal",
              label: `Contoh Soal (${kerangkaAsesmenPusmendik.contohSoal.length})`,
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 sm:px-5 py-3 rounded-t-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                  isActive
                    ? "bg-white text-sky-900 shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="p-6 sm:p-8 lg:p-10">
        {/* TAB 1: DEFINISI */}
        {activeTab === "definisi" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-sky-50/60 rounded-2xl p-6 sm:p-8 border border-sky-100">
              <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
                Dasar Rujukan Resmi
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                {kerangkaAsesmenPusmendik.definisi.judul}
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
                {kerangkaAsesmenPusmendik.definisi.teksUtama}
              </p>
              <div className="p-4 rounded-xl bg-white border border-sky-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-4">
                <strong className="text-sky-900 font-bold block mb-1">
                  Ruang Lingkup Asesmen:
                </strong>
                {kerangkaAsesmenPusmendik.definisi.ruangLingkup}
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-sky-200/60 pt-3">
                {kerangkaAsesmenPusmendik.definisi.penjelasanMendalam}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {kerangkaAsesmenPusmendik.definisi.karakteristik.map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
                      0{idx + 1}
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mb-2">
                      {item.poin}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.penjelasan}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MUATAN */}
        {activeTab === "muatan" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  5 Elemen Muatan Kurikulum TKA PPLG
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Merujuk pada Salinan Keputusan Kepala BSKAP Nomor
                  046/H/KR/2025.
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200">
                5 Modul Pembelajaran Aktif
              </span>
            </div>

            <div className="space-y-6">
              {kerangkaAsesmenPusmendik.muatan.map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 hover:border-sky-300 transition-all shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3.5">
                      <span className="w-9 h-9 rounded-xl bg-sky-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                        0{m.nomor}
                      </span>
                      <div>
                        <div className="text-[11px] font-bold text-sky-700 uppercase tracking-wider mb-0.5">
                          Elemen #{m.nomor}
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-slate-900">
                          {m.judul}
                        </h4>
                      </div>
                    </div>

                    <Link
                      href={`/tka/module/modul${m.nomor}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-colors shrink-0 self-start cursor-pointer min-h-[38px]"
                    >
                      <span>Buka Modul 0{m.nomor}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-3 pl-0 sm:pl-12">
                    {m.deskripsi}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 ml-0 sm:ml-12">
                    <strong className="text-slate-800 font-bold block mb-1">
                      Penjelasan Komprehensif:
                    </strong>
                    {m.penjelasanLengkap}
                  </div>

                  <div className="pl-0 sm:pl-12">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Rincian Sub-Topik & Penjelasan Materi:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {m.subTopik.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-sky-300 transition-colors shadow-3xs"
                        >
                          <div className="flex items-center gap-2 mb-1.5 font-bold text-xs sm:text-sm text-sky-900">
                            <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                            <span>{sub.judul}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pl-4">
                            {sub.keterangan}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: KOMPETENSI */}
        {activeTab === "kompetensi" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Kemampuan yang diukur */}
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
                Kemampuan PPLG yang Diukur
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-5">
                4 pilar kompetensi siswa dalam Tes Kemampuan Akademik PPLG:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {kerangkaAsesmenPusmendik.kompetensi.kemampuanUmum.map(
                  (k, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70"
                    >
                      <div className="flex items-center gap-2 text-sky-800 font-extrabold text-sm mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>{k.kategori}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {k.deskripsi}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Tabel Level Kognitif */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Tabel Level Kognitif & Proses Berpikir
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Mencerminkan 3 level proses berpikir kompleksitas soal:
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 w-48">Level Kognitif</th>
                      <th className="py-3 px-4 w-44">Proses Berpikir</th>
                      <th className="py-3 px-4">Deskripsi Proses Berpikir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {kerangkaAsesmenPusmendik.kompetensi.levelKognitif.map(
                      (row, rIdx) => {
                        const isLevel1 = row.levelBadge === "Level 1";
                        const isLevel2 = row.levelBadge === "Level 2";
                        const badgeColor = isLevel1
                          ? "bg-sky-50 text-sky-800 border-sky-200"
                          : isLevel2
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-purple-50 text-purple-800 border-purple-200";

                        return (
                          <tr
                            key={rIdx}
                            className="hover:bg-slate-50/80 transition-colors"
                          >
                            <td className="py-3.5 px-4 align-top">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-extrabold border ${badgeColor} mb-1`}
                              >
                                {row.levelBadge}
                              </span>
                              <div className="font-bold text-slate-900">
                                {row.level}
                              </div>
                              <div className="text-[11px] italic text-slate-400">
                                ({row.levelEn})
                              </div>
                            </td>
                            <td className="py-3.5 px-4 align-top font-bold text-sky-900">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 font-mono text-xs">
                                {row.prosesBerfikir}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 align-top text-slate-600 leading-relaxed">
                              <p className="mb-2 text-slate-700">{row.deskripsi}</p>
                              {row.contohPenerapan && (
                                <div className="p-2.5 rounded-lg bg-sky-50/70 border border-sky-100 text-[11px] text-sky-900 font-medium leading-relaxed">
                                  <strong className="text-sky-800 font-bold block mb-0.5">Studi Kasus Asesmen:</strong>
                                  {row.contohPenerapan}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MATRIKS ASESMEN */}
        {activeTab === "matriks" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                Matriks Pemetaan Asesmen TKA PPLG
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Hubungan antara elemen kurikulum, level kognitif, indikator, dan
                bentuk soal asesmen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kerangkaAsesmenPusmendik.matriksAsesmen.map((mat, mIdx) => (
                <div
                  key={mIdx}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                        Elemen {mIdx + 1}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {mat.bentukSoal}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base mb-2">
                      {mat.elemen}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {mat.indikator}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      Level Kognitif:
                    </span>
                    <span className="font-extrabold text-blue-700">
                      {mat.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CONTOH SOAL (INTERAKTIF) */}
        {activeTab === "soal" && (
          <div className="space-y-8 animate-fadeIn">
            {/* SOAL SELECTOR BUTTONS */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Bank Contoh Soal Resmi Pusmendik
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Simulasi 6 butir soal resmi lengkap dengan stimulus, pilihan,
                  dan kunci jawaban.
                </p>
              </div>

              {/* Selector Numbers */}
              <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-xl">
                {kerangkaAsesmenPusmendik.contohSoal.map((s) => {
                  const isCurrent = s.id === selectedSoalId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSoalId(s.id)}
                      className={`w-9 h-9 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? "bg-sky-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white"
                      }`}
                    >
                      0{s.noSoal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE SOAL CARD */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              {/* Question Metadata Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs mb-6">
                <div>
                  <span className="text-slate-400 font-medium block">
                    No. Soal:
                  </span>
                  <span className="font-mono font-black text-slate-900 text-sm">
                    Soal {activeSoal.noSoal}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">
                    Sub-Kompetensi:
                  </span>
                  <span className="font-bold text-slate-900">
                    {activeSoal.subKompetensi}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">
                    Bentuk Soal:
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[11px] mt-0.5">
                    {activeSoal.bentukSoal}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">
                    Kunci Resmi:
                  </span>
                  <span className="font-mono font-bold text-emerald-700">
                    {showKeyMap[activeSoal.id] ? activeSoal.kunci : "••••••"}
                  </span>
                </div>
              </div>

              {/* Kompetensi Deskripsi */}
              <div className="text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
                <strong className="text-slate-700 font-bold">
                  Kompetensi:{" "}
                </strong>
                {activeSoal.kompetensi}
              </div>

              {/* STIMULUS DISPLAY */}
              {/* Stimulus: TOPOLOGI (Soal 4) */}
              {activeSoal.stimulus?.tipe === "topology" && (
                <div className="my-6 p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-inner">
                  <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    <span>Diagram Topologi Infrastruktur Aplikasi Web</span>
                  </div>

                  <div className="max-w-xl mx-auto py-4">
                    {/* SVG Topologi diagram */}
                    <div className="grid grid-cols-3 gap-4 items-center text-center">
                      {/* File Storage */}
                      <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center">
                        <HardDrive className="w-8 h-8 text-sky-400 mb-1" />
                        <span className="text-xs font-bold">File Storage</span>
                        <span className="text-[11px] font-mono text-sky-300">
                          192.168.10.2/24
                        </span>
                      </div>

                      {/* Server App */}
                      <div className="p-4 rounded-xl bg-blue-950 border-2 border-blue-500 flex flex-col items-center shadow-lg">
                        <Server className="w-10 h-10 text-blue-400 mb-1" />
                        <span className="text-xs font-extrabold text-white">
                          Server App
                        </span>
                        <div className="text-[10px] font-mono text-slate-300 mt-1 space-y-0.5">
                          <div>eth0: 192.168.10.1/24</div>
                          <div>eth1: 192.168.100.1/24</div>
                        </div>
                      </div>

                      {/* Database Server 1 (A) */}
                      <div className="p-3.5 rounded-xl bg-amber-950/40 border-2 border-dashed border-amber-400 flex flex-col items-center">
                        <Database className="w-8 h-8 text-amber-400 mb-1" />
                        <span className="text-xs font-bold text-white">
                          DB Server 1
                        </span>
                        <span className="text-xs font-mono font-black text-amber-300 px-2 py-0.5 rounded bg-amber-400/20 mt-1">
                          [ Titik A ]
                        </span>
                      </div>
                    </div>

                    <div className="text-center text-[11px] text-slate-400 mt-4">
                      Server App terhubung ke File Storage (LAN 1) dan ke DB
                      Server (LAN 2).
                    </div>
                  </div>
                </div>
              )}

              {/* Stimulus: CODE BLOCK (Soal 2, 3, 5, 6) */}
              {activeSoal.stimulus?.tipe === "code" && (
                <div className="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-[#0b101b] shadow-md">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
                    <span className="font-mono text-sky-400 font-bold">
                      {activeSoal.stimulus.bahasa?.toUpperCase()}
                    </span>
                    <button
                      onClick={() =>
                        handleCopyCode(activeSoal.stimulus?.content || "")
                      }
                      className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedCode ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedCode ? "Tersalin!" : "Salin"}</span>
                    </button>
                  </div>
                  <pre className="p-5 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
                    <code>{activeSoal.stimulus.content}</code>
                  </pre>
                </div>
              )}

              {/* PERTANYAAN */}
              <div className="text-sm sm:text-base font-bold text-slate-900 mb-6 leading-relaxed">
                {activeSoal.pertanyaan}
              </div>

              {/* OPSI JAWABAN */}
              {/* 1. Tipe PG Standar */}
              {activeSoal.tipeSoal === "PG" && activeSoal.pilihan && (
                <div className="space-y-3 mb-6">
                  {activeSoal.pilihan.map((opt) => {
                    const isSelected =
                      userAnswers[activeSoal.id] === opt.label;
                    const isRevealed = showKeyMap[activeSoal.id];
                    const isCorrectOpt = opt.isCorrect;

                    let optionBorder = "border-slate-200 hover:border-slate-300";
                    let optionBg = "bg-white hover:bg-slate-50";

                    if (isSelected) {
                      optionBorder = "border-sky-500";
                      optionBg = "bg-sky-50/70";
                    }

                    if (isRevealed && isCorrectOpt) {
                      optionBorder = "border-emerald-500 ring-2 ring-emerald-500/20";
                      optionBg = "bg-emerald-50/80";
                    } else if (isRevealed && isSelected && !isCorrectOpt) {
                      optionBorder = "border-rose-400";
                      optionBg = "bg-rose-50/70";
                    }

                    return (
                      <button
                        key={opt.label}
                        onClick={() =>
                          setUserAnswers((prev) => ({
                            ...prev,
                            [activeSoal.id]: opt.label,
                          }))
                        }
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${optionBorder} ${optionBg}`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg font-mono text-xs font-black flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? "bg-sky-600 text-white border-sky-600"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-800 leading-relaxed pt-0.5">
                          {opt.teks}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. Tipe PGK Kategori (Benar / Salah) */}
              {activeSoal.tipeSoal === "PGK_KATEGORI" &&
                activeSoal.pernyataanKategori && (
                  <div className="mb-6 overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-xs sm:text-sm">
                      <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[11px]">
                        <tr>
                          <th className="py-3 px-4 w-12 text-center">#</th>
                          <th className="py-3 px-4">Pernyataan</th>
                          <th className="py-3 px-4 w-28 text-center">Benar</th>
                          <th className="py-3 px-4 w-28 text-center">Salah</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {activeSoal.pernyataanKategori.map((row) => {
                          const stateKey = `${activeSoal.id}-${row.label}`;
                          const currentVal = userKategori[stateKey];
                          const isRevealed = showKeyMap[activeSoal.id];

                          return (
                            <tr
                              key={row.label}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">
                                {row.label}
                              </td>
                              <td className="py-3 px-4 text-slate-800 leading-relaxed font-medium">
                                {row.teks}
                                {isRevealed && (
                                  <span className="ml-2 font-bold text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    Kunci: {row.kunciBenar ? "Benar" : "Salah"}
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  onClick={() =>
                                    setUserKategori((prev) => ({
                                      ...prev,
                                      [stateKey]: true,
                                    }))
                                  }
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                                    currentVal === true
                                      ? "bg-sky-600 text-white border-sky-600"
                                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                                  }`}
                                >
                                  Benar
                                </button>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  onClick={() =>
                                    setUserKategori((prev) => ({
                                      ...prev,
                                      [stateKey]: false,
                                    }))
                                  }
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                                    currentVal === false
                                      ? "bg-sky-600 text-white border-sky-600"
                                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                                  }`}
                                >
                                  Salah
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

              {/* 3. Tipe PGK MCMA (Checklist Lebih dari Satu) */}
              {activeSoal.tipeSoal === "PGK_MCMA" &&
                activeSoal.pilihanMcma && (
                  <div className="space-y-3 mb-6">
                    {activeSoal.pilihanMcma.map((opt) => {
                      const mcmaKey = `${activeSoal.id}-${opt.label}`;
                      const isChecked = !!userMcma[mcmaKey];
                      const isRevealed = showKeyMap[activeSoal.id];
                      const isOfficial = opt.isCorrect;

                      return (
                        <button
                          key={opt.label}
                          onClick={() =>
                            setUserMcma((prev) => ({
                              ...prev,
                              [mcmaKey]: !prev[mcmaKey],
                            }))
                          }
                          className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                            isChecked
                              ? "bg-sky-50 border-sky-400"
                              : "bg-white border-slate-200 hover:bg-slate-50"
                          } ${
                            isRevealed && isOfficial
                              ? "ring-2 ring-emerald-500/30 border-emerald-500 bg-emerald-50/60"
                              : ""
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                              isChecked
                                ? "bg-sky-600 border-sky-600 text-white"
                                : "bg-white border-slate-300"
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs sm:text-sm text-slate-800 leading-relaxed block">
                              {opt.teks}
                            </span>
                            {isRevealed && isOfficial && (
                              <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700">
                                ✓ Kunci Resmi Pusmendik
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

              {/* ACTION: TOGGLE KUNCI & PEMBAHASAN */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => toggleShowKey(activeSoal.id)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer min-h-[42px]"
                >
                  <Award className="w-4 h-4 text-sky-700" />
                  <span>
                    {showKeyMap[activeSoal.id]
                      ? "Sembunyikan Pembahasan"
                      : "Lihat Kunci & Pembahasan Resmi"}
                  </span>
                </button>

                {/* Navigasi Soal Berikutnya */}
                <div className="flex items-center gap-2">
                  <button
                    disabled={activeSoal.noSoal <= 1}
                    onClick={() => setSelectedSoalId((prev) => prev - 1)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Sebelumnya
                  </button>
                  <button
                    disabled={
                      activeSoal.noSoal >=
                      kerangkaAsesmenPusmendik.contohSoal.length
                    }
                    onClick={() => setSelectedSoalId((prev) => prev + 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>

              {/* PEMBAHASAN BOX */}
              {showKeyMap[activeSoal.id] && (
                <div className="mt-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white border-2 border-emerald-300 text-slate-800 text-xs sm:text-sm leading-relaxed animate-fadeIn shadow-sm">
                  <div className="flex items-center gap-2.5 font-black text-emerald-900 text-sm sm:text-base mb-4 pb-3 border-b border-emerald-200/80">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Pembahasan Komprehensif & Analisis Jawaban Resmi</span>
                  </div>
                  <div className="whitespace-pre-line text-slate-800 font-normal leading-relaxed space-y-3 font-sans">
                    {activeSoal.pembahasan}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
