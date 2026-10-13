"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  TriangleAlert,
  Loader2,
  KeyRound,
  ClipboardList,
  BookOpenText,
  FileCode2,
  LayoutTemplate,
} from "lucide-react";
import { SiteLogo } from "@/components/SiteLogo";

const SCOPE = [
  {
    icon: BookOpenText,
    code: "MOD",
    title: "Modul belajar",
    desc: "5 modul · bab, materi & contoh kode",
  },
  {
    icon: ClipboardList,
    code: "SOAL",
    title: "Soal simulasi TKA",
    desc: "50 studi kasus HOTS + pembahasan",
  },
  {
    icon: FileCode2,
    code: "CHTS",
    title: "Cheatsheet",
    desc: "Ringkasan Git, SQL, OOP, game loop",
  },
  {
    icon: LayoutTemplate,
    code: "LP",
    title: "Landing page",
    desc: "Hero, fitur, statistik & footer",
  },
];

const RULES: React.ReactNode[] = [
  <>
    Nonaktifkan konten bila ragu —{" "}
    <strong className="text-slate-800 font-bold">jangan hapus</strong> data
    soal/materi.
  </>,
  <>Periksa pratinjau di HP siswa sebelum memublikasi perubahan besar.</>,
  <>Keluar dari perangkat bersama (lab/Ruang guru) setelah selesai.</>,
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const year =
    process.env.NEXT_PUBLIC_SITE_YEAR ?? new Date().getFullYear().toString();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      router.replace("/tka/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        /invalid|credentials|password|email/i.test(msg)
          ? "Email atau kata sandi tidak cocok. Periksa kembali penulisan."
          : msg || "Gagal masuk. Periksa koneksi lalu coba lagi.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const emailFilled = email.trim().length > 0;
  const passwordFilled = password.length > 0;

  return (
    <div className="min-h-screen bg-[#f5f8fb] text-slate-900 font-sans flex flex-col">
      {/* ── Masthead ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-[#f5f8fb]/92 backdrop-blur border-b border-slate-200">
        <div className="h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-3">
          <Link href="/tka" className="flex items-center gap-3 min-w-0 group">
            <span className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-xs group-hover:shadow-md transition-shadow">
              <SiteLogo width={32} height={32} className="w-7 h-7 object-contain" />
            </span>
            <span className="min-w-0 leading-none text-left">
              <span className="block text-[13px] font-extrabold tracking-tight truncate">
                SMK Telekomunikasi Tunas Harapan
              </span>
              <span className="mt-1 block font-mono text-[10px] font-semibold tracking-[0.14em] text-sky-600 uppercase truncate">
                PPLG · Panel Internal
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-500 border border-slate-200 bg-white rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Sistem aktif
            </span>
            <Link
              href="/tka"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 rounded-full px-3.5 py-2 transition-colors min-h-[36px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Situs siswa</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Isi ──────────────────────────────────────────────── */}
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-14 pb-10">
          {/* Kicker */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-sky-700 font-semibold">
              <KeyRound className="w-3.5 h-3.5" aria-hidden="true" />
              Akses staf — AD/01
            </span>
            <span aria-hidden="true" className="text-slate-300">/</span>
            <span>Tahun ajaran 2025/2026</span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-300">/</span>
            <span className="hidden sm:inline">Khusus guru &amp; operator</span>
          </div>

          <div className="mt-4 lg:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* ── Kolom form ── */}
            <div className="lg:col-span-7 min-w-0">
              <h1 className="text-[32px] sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-balance">
                Masuk untuk mengelola{" "}
                <span className="relative whitespace-nowrap">
                  konten TKA
                  <span
                    className="absolute left-0 -bottom-1 sm:-bottom-1.5 w-full h-2 sm:h-2.5 bg-sky-200/70 rounded-sm -z-10"
                    aria-hidden="true"
                  />
                </span>
                .
              </h1>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-slate-600 max-w-xl">
                Gunakan email dinas yang terdaftar di Supabase Auth. Halaman ini
                tidak untuk siswa — siswa langsung belajar tanpa akun.
              </p>

              <section
                aria-labelledby="login-heading"
                className="mt-6 relative bg-white border border-slate-200 rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.05),0_16px_40px_-24px_rgba(15,23,42,0.25)] overflow-hidden"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-400 to-blue-600" aria-hidden="true" />
                <div className="flex items-center justify-between gap-3 pl-6 pr-5 sm:pr-7 py-4 border-b border-slate-100">
                  <h2
                    id="login-heading"
                    className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500"
                  >
                    Formulir masuk
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200/80 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" aria-hidden="true" />
                    Wajib diisi
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
                  {/* Email */}
                  <div>
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <label
                        htmlFor="admin-email"
                        className="text-[13px] font-extrabold text-slate-800"
                      >
                        <span className="font-mono text-[11px] text-sky-500 font-semibold mr-2">01</span>
                        Email dinas
                      </label>
                      <span className="hidden sm:block text-[11px] text-slate-400 truncate">
                        cth: operator@tunas-harapan.sch.id
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 transition-all focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/20 ${
                        error && !emailFilled ? "border-rose-300" : "border-slate-200"
                      }`}
                    >
                      <Mail className="w-[18px] h-[18px] text-slate-400 shrink-0" aria-hidden="true" />
                      <input
                        id="admin-email"
                        type="email"
                        required
                        autoComplete="username"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        inputMode="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@sekolah.sch.id"
                        className="w-full min-w-0 bg-transparent py-3.5 text-[14px] font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none min-h-[48px]"
                      />
                      {emailFilled && (
                        <span className="shrink-0 font-mono text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5">
                          OK
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <label
                        htmlFor="admin-password"
                        className="text-[13px] font-extrabold text-slate-800"
                      >
                        <span className="font-mono text-[11px] text-sky-500 font-semibold mr-2">02</span>
                        Kata sandi
                      </label>
                      <span className="text-[11px] text-slate-400">Min. sesuai kebijakan Auth</span>
                    </div>
                    <div
                      className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 transition-all focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/20 ${
                        error ? "border-rose-300" : "border-slate-200"
                      }`}
                    >
                      <Lock className="w-[18px] h-[18px] text-slate-400 shrink-0" aria-hidden="true" />
                      <input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyUp={(e) => {
                          try {
                            setCapsOn(
                              typeof e.getModifierState === "function" &&
                                e.getModifierState("CapsLock"),
                            );
                          } catch {
                            /* abaikan */
                          }
                        }}
                        placeholder="••••••••••"
                        className="w-full min-w-0 bg-transparent py-3.5 text-[14px] font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none min-h-[48px]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                        aria-pressed={showPassword}
                        className="shrink-0 p-2 -mr-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-[18px] h-[18px]" aria-hidden="true" />
                        ) : (
                          <Eye className="w-[18px] h-[18px]" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    <div className="mt-2 min-h-[20px]" aria-live="polite">
                      {capsOn && passwordFilled && !showPassword && (
                        <p className="text-[12px] font-semibold text-amber-700">
                          Caps Lock aktif — periksa huruf besar/kecil.
                        </p>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 text-[13px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-3 animate-fade-in"
                    >
                      <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="leading-snug">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-bold text-[14px] rounded-xl py-3.5 px-4 min-h-[52px] shadow-lg shadow-sky-500/25 transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-[18px] h-[18px] animate-spin" aria-hidden="true" />
                        <span>Memeriksa akun…</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk ke dashboard</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-1 text-[12.5px] text-slate-500">
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      Sesi dijaga Supabase Auth
                    </span>
                    <span aria-hidden="true" className="hidden sm:inline text-slate-300">·</span>
                    <span>
                      Lupa sandi?{" "}
                      <span className="font-bold text-slate-700">Hubungi TU / operator</span>{" "}
                      untuk reset.
                    </span>
                  </div>
                </form>
              </section>

              <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-wide text-slate-400">
                SELURUH PERCOBAAN MASUK TERCATAT. JANGAN BAGIKAN AKUN — SATU AKUN UNTUK SATU PETUGAS.
              </p>
            </div>

            {/* ── Kolom ledger ── */}
            <aside className="lg:col-span-5 min-w-0 lg:sticky lg:top-24 space-y-4">
              <section
                aria-label="Ruang lingkup akses admin"
                className="relative bg-slate-900 text-slate-200 rounded-2xl overflow-hidden border border-slate-900"
              >
                <div
                  className="absolute inset-0 bg-blueprint-strong opacity-40 pointer-events-none"
                  aria-hidden="true"
                />
                <div className="relative flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10">
                  <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-400">
                    Ruang lingkup akses
                  </p>
                  <p className="font-mono text-[11px] text-sky-400">4 modul</p>
                </div>
                <ul className="relative divide-y divide-white/[0.07]">
                  {SCOPE.map(({ icon: Icon, code, title, desc }) => (
                    <li key={code} className="flex items-center gap-3.5 px-5 sm:px-6 py-3.5">
                      <span className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-400/20 flex items-center justify-center shrink-0">
                        <Icon className="w-[18px] h-[18px] text-sky-300" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-bold text-white leading-tight truncate">
                          {title}
                        </span>
                        <span className="block text-[12px] text-slate-400 leading-snug truncate">
                          {desc}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-[10.5px] font-semibold tracking-widest text-sky-300 border border-sky-400/25 bg-sky-500/10 rounded px-1.5 py-1">
                        {code}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="relative px-5 sm:px-6 py-4 bg-white/[0.03] border-t border-white/10 flex items-center justify-between gap-3">
                  <p className="text-[12px] text-slate-400 leading-snug">
                    Perubahan tersimpan tampil langsung di situs siswa.
                  </p>
                  <Link
                    href="/tka"
                    className="shrink-0 inline-flex items-center gap-1 text-[12px] font-bold text-sky-300 hover:text-sky-200 transition-colors"
                  >
                    Pratinjau
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </section>

              <section
                aria-label="Tata tertib operator"
                className="bg-white border border-slate-200 rounded-2xl px-5 sm:px-6 py-5 shadow-xs"
              >
                <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500 mb-3">
                  Tata tertib singkat
                </p>
                <ol className="space-y-2.5 text-[13px] leading-relaxed text-slate-600">
                  {RULES.map((rule, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-sky-500 mt-0.5 shrink-0">
                        {String.fromCharCode(97 + i)}.
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </aside>
          </div>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 text-[12px] text-slate-500">
          <p className="font-semibold text-slate-600">
            © {year} SMK Telekomunikasi Tunas Harapan
          </p>
          <span aria-hidden="true" className="hidden sm:inline text-slate-300">·</span>
          <p className="font-mono text-[11px] tracking-wide">
            HALAMAN INTERNAL — BUKAN UNTUK PUBLIK
          </p>
          <Link
            href="/tka"
            className="sm:ml-auto inline-flex items-center gap-1 font-bold text-slate-600 hover:text-slate-900 transition-colors min-h-[32px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Kembali ke situs
          </Link>
        </div>
      </footer>
    </div>
  );
}
