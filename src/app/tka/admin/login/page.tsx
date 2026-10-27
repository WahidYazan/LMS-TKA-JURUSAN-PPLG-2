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
import { useSiteStats } from "@/hooks/useSiteStats";

const SCOPE_BASE = [
  {
    icon: BookOpenText,
    code: "MOD",
    title: "Modul belajar",
    getDesc: (totalModules: number) =>
      `${totalModules} modul · bab, materi & contoh kode`,
  },
  {
    icon: ClipboardList,
    code: "SOAL",
    title: "Soal simulasi TKA",
    getDesc: (_m: number, totalQuestions: number) =>
      `${totalQuestions} studi kasus HOTS + pembahasan`,
  },
  {
    icon: FileCode2,
    code: "CHTS",
    title: "Cheatsheet",
    getDesc: () => "Ringkasan Git, SQL, OOP, game loop",
  },
  {
    icon: LayoutTemplate,
    code: "LP",
    title: "Landing page",
    getDesc: () => "Hero, fitur, statistik & footer",
  },
];

const RULES: React.ReactNode[] = [
  <>
    Nonaktifkan konten bila ragu —{" "}
    <strong className="text-white font-bold">jangan hapus</strong> data
    soal/materi.
  </>,
  <>Periksa pratinjau di HP siswa sebelum memublikasi perubahan besar.</>,
  <>Keluar dari perangkat bersama (lab/Ruang guru) setelah selesai.</>,
];

export default function AdminLoginPage() {
  const router = useRouter();
  const { totalModules, totalQuestions } = useSiteStats();
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
    <div className="relative min-h-screen bg-[#f5f6f1] text-slate-900 font-sans">
      {/* ── Masthead ─────────────────────────────────────────── */}
      <header className="absolute right-0 top-0 z-20 w-full bg-transparent lg:w-1/2">
        <div className="w-full px-4 sm:px-8 lg:px-12 h-20 flex items-center gap-3">
          <Link
            href="/tka"
            className="ml-auto flex min-w-0 items-center gap-3 group lg:ml-0"
          >
            <span className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-xs group-hover:shadow-md transition-shadow">
              <SiteLogo
                width={32}
                height={32}
                className="w-7 h-7 object-contain"
              />
            </span>
            <span className="min-w-0 leading-none text-left">
              <span className="block text-[13px] font-extrabold tracking-tight text-slate-900 truncate">
                SMK Telekomunikasi Tunas Harapan
              </span>
              <span className="mt-1 block font-mono text-[10px] font-semibold tracking-[0.14em] text-teal-700 uppercase truncate">
                PPLG · Panel Internal
              </span>
            </span>
          </Link>

        </div>
      </header>

      {/* ── Isi ──────────────────────────────────────────────── */}
      <main className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
          <div className="relative flex min-h-screen min-w-0 flex-col justify-center bg-[#f5f6f1] px-4 pb-20 pt-24 sm:px-8 lg:px-12">
            <Link
              href="/tka"
              className="absolute left-4 top-5 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-white hover:text-slate-900 sm:left-8 lg:left-12"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Kembali ke situs
            </Link>
            {/* ── Kolom form ── */}
            <div className="mx-auto w-full max-w-md min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-8">
              <section
                aria-labelledby="login-heading"
                className="relative overflow-visible rounded-2xl bg-transparent"
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <h2
                    id="login-heading"
                    className="text-xl font-extrabold tracking-tight text-slate-900"
                  >
                    Formulir masuk
                  </h2>
                  {/* <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200/80 rounded-full px-2.5 py-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-sky-500"
                      aria-hidden="true"
                    />
                    Wajib diisi
                  </span> */}
                </div>

                <form onSubmit={handleSubmit} className="pt-5 space-y-5 sm:pt-6">
                  {/* Email */}
                  <div>
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <label
                        htmlFor="admin-email"
                        className="text-[13px] font-extrabold text-slate-800"
                      >
                        <span className="font-mono text-[11px] text-teal-700 font-semibold mr-2">
                          01
                        </span>
                        Email
                      </label>
                      {/* <span className="hidden sm:block text-[11px] text-slate-400 truncate">
                        cth: operator@tunas-harapan.sch.id
                      </span> */}
                    </div>
                    <div
                      className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 transition-all focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 ${
                        error && !emailFilled
                          ? "border-rose-300"
                          : "border-slate-300"
                      }`}
                    >
                      <Mail
                        className="w-[18px] h-[18px] text-slate-400 shrink-0"
                        aria-hidden="true"
                      />
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
                        className="w-full min-w-0 bg-transparent py-3.5 text-[14px] font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none min-h-[48px]"
                      />
                      {emailFilled && (
                        <span className="shrink-0 font-mono text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 rounded px-1.5 py-0.5">
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
                        <span className="font-mono text-[11px] text-teal-700 font-semibold mr-2">
                          02
                        </span>
                        Kata sandi
                      </label>
                      {/* <span className="text-[11px] text-slate-400">
                        Min. sesuai kebijakan Auth
                      </span> */}
                    </div>
                    <div
                      className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 transition-all focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 ${
                        error ? "border-rose-300" : "border-slate-300"
                      }`}
                    >
                      <Lock
                        className="w-[18px] h-[18px] text-slate-400 shrink-0"
                        aria-hidden="true"
                      />
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
                        className="w-full min-w-0 bg-transparent py-3.5 text-[14px] font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none min-h-[48px]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword
                            ? "Sembunyikan kata sandi"
                            : "Tampilkan kata sandi"
                        }
                        aria-pressed={showPassword}
                        className="shrink-0 p-2 -mr-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                      >
                        {showPassword ? (
                          <EyeOff
                            className="w-[18px] h-[18px]"
                            aria-hidden="true"
                          />
                        ) : (
                          <Eye
                            className="w-[18px] h-[18px]"
                            aria-hidden="true"
                          />
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
                      className="flex items-start mt-5 gap-2.5 text-[13px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-3 animate-fade-in"
                    >
                      <TriangleAlert
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="leading-snug">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0f9688] hover:bg-[#0d8277] active:bg-[#0b6c64] text-white font-bold text-[14px] rounded-xl py-3.5 px-4 min-h-[52px] shadow-lg shadow-teal-700/20 transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          className="w-[18px] h-[18px] animate-spin"
                          aria-hidden="true"
                        />
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
                      <ShieldCheck
                        className="w-4 h-4 text-emerald-600"
                        aria-hidden="true"
                      />
                      Sesi dijaga Supabase Auth
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline text-slate-300"
                    >
                      ·
                    </span>
                    <span>
                      Lupa sandi?{" "}
                      <span className="font-bold text-slate-700">
                        Hubungi TU / operator
                      </span>{" "}
                      untuk reset.
                    </span>
                  </div>
                </form>
              </section>

              <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-wide text-slate-400">
                SELURUH PERCOBAAN MASUK TERCATAT. JANGAN BAGIKAN AKUN — SATU
                AKUN UNTUK SATU PETUGAS.
              </p>
            </div>
          </div>

            {/* ── Kolom ledger ── */}
            <aside className="relative flex min-h-screen min-w-0 flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#effcf8_0%,#22a899_44%,#103b3a_100%)] px-6 pb-12 pt-28 sm:px-10 lg:px-14">
              <div
                className="absolute inset-0 opacity-[0.12]"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative z-10 mx-auto w-full max-w-2xl">
                <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase text-teal-50/80">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                    <KeyRound className="w-3.5 h-3.5" aria-hidden="true" />
                    Akses staf — AD/01
                  </span>
                  <span aria-hidden="true" className="text-teal-50/50">
                    /
                  </span>
                  <span>Tahun ajaran 2025/2026</span>
                  <span
                    aria-hidden="true"
                    className="hidden sm:inline text-teal-50/50"
                  >
                    /
                  </span>
                  <span className="hidden sm:inline">
                    Khusus guru &amp; operator
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
                  Masuk untuk mengelola{" "}
                  <span className="whitespace-nowrap">konten TKA</span>.
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-teal-50/90 sm:text-base">
                  Gunakan email dinas yang terdaftar di Supabase Auth. Halaman
                  ini tidak untuk siswa — siswa langsung belajar tanpa akun.
                </p>
              </div>

              {/* <section
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
                  {SCOPE_BASE.map(({ icon: Icon, code, title, getDesc }) => (
                    <li
                      key={code}
                      className="flex items-center gap-3.5 px-5 sm:px-6 py-3.5"
                    >
                      <span className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-400/20 flex items-center justify-center shrink-0">
                        <Icon
                          className="w-[18px] h-[18px] text-sky-300"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-bold text-white leading-tight truncate">
                          {title}
                        </span>
                        <span className="block text-[12px] text-slate-400 leading-snug truncate">
                          {getDesc(totalModules, totalQuestions)}
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
              </section> */}

              <section
                aria-label="Tata tertib operator"
                className="relative z-10 mx-auto mt-10 w-full max-w-2xl border-t border-teal-50/25 pt-6"
              >
                <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-teal-50/80 mb-3">
                  Tata tertib singkat
                </p>
                <ol className="space-y-2.5 text-[13px] leading-relaxed text-teal-50/95">
                  {RULES.map((rule, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="font-mono text-[11px] font-bold text-teal-50 mt-0.5 shrink-0">
                        {String.fromCharCode(97 + i)}.
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </aside>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-[#f5f6f1] lg:absolute lg:bottom-0 lg:left-0 lg:w-1/2 lg:border-0 lg:bg-transparent">
        <div className="mx-auto w-full max-w-md px-4 py-4 text-[12px] text-slate-500 sm:px-8 lg:px-0 lg:pb-6 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3">
          <p className="font-semibold text-slate-400">
            © {year} SMK Telekomunikasi Tunas Harapan
          </p>
          <span aria-hidden="true" className="hidden sm:inline text-slate-300">
            ·
          </span>
          <p className="font-mono text-[11px] tracking-wide">
            HALAMAN INTERNAL — BUKAN UNTUK PUBLIK
          </p>
        </div>
      </footer>
    </div>
  );
}
