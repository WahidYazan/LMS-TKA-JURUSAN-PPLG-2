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
  ClipboardList,
  BookOpen,
  Layers,
} from "lucide-react";
import { SiteLogo } from "@/components/SiteLogo";

const features = [
  { icon: ClipboardList, text: "Manajemen Soal & Evaluasi Real-Time" },
  { icon: BookOpen, text: "Repositori Materi & Cheatsheet" },
  { icon: Layers, text: "Hide/Show Konten Tanpa Hapus Data" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.replace("/tka/admin");
    } catch (err: unknown) {
      setError(
        err instanceof Error && err.message.includes("Invalid")
          ? "Email atau password salah."
          : err instanceof Error
            ? err.message
            : "Gagal masuk. Coba lagi.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const year = process.env.NEXT_PUBLIC_SITE_YEAR;

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-zinc-50 text-zinc-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* PANEL BRAND — kanan di desktop */}
      <div className="relative hidden lg:flex flex-col justify-between p-16 text-white bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 overflow-hidden select-none lg:order-last">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-400/25 blur-[90px]"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-blue-400/25 blur-[110px]"
          aria-hidden="true"
        />

        <Link
          href="/tka"
          className="relative flex items-center gap-3 cursor-pointer group w-fit"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur shrink-0">
            <SiteLogo width={40} height={40} className="w-9 h-9 object-contain" />
          </div>
          <p className="text-base font-extrabold tracking-tight truncate">
            Simulasi TKA PPLG
          </p>
        </Link>

        <div className="relative my-auto space-y-7 max-w-md">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200/90 mb-4">
              SMK Telekomunikasi Tunas Harapan
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
              Portal Admin <br /> Simulasi TKA PPLG
            </h1>
            <p className="text-sm text-blue-100/90 mt-5 leading-relaxed">
              Masuk untuk mengelola soal, modul, cheatsheet, dan tampilan
              landing page portal pembelajaran.
            </p>
          </div>

          <ul className="space-y-4 border-t border-white/10 pt-7">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3.5">
                <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-blue-300" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-blue-50">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-blue-200/70">
          &copy; {year} SMK Telekomunikasi Tunas Harapan. Semua hak dilindungi.
        </p>
      </div>

      {/* PANEL FORM — kiri */}
      <div className="relative flex flex-col justify-center items-center p-6 sm:p-12 lg:p-20 bg-white">
        <div className="w-full max-w-md p-8 sm:p-10 bg-white border border-zinc-200 rounded-2xl shadow-xl shadow-zinc-100/50">
          {/* Header brand — mobile saja */}
          <div className="flex flex-col items-center text-center mb-8 lg:hidden">
            <div className="w-14 h-14 mb-3">
              <SiteLogo
                width={56}
                height={56}
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">
              SMK Telekomunikasi Tunas Harapan
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              Selamat Datang
            </h2>
            <p className="text-sm text-zinc-500 mt-1.5">
              Masuk dengan akun admin untuk mengelola konten.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold text-zinc-600 mb-1.5"
              >
                Alamat Email
              </label>
              <div className="relative">
                <Mail
                  className="w-4.5 h-4.5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-colors"
                  placeholder="admin@sekolah.sch.id"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold text-zinc-600 mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <Lock
                  className="w-4.5 h-4.5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-colors"
                  placeholder="Masukkan kata sandi"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" aria-hidden="true" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2.5 animate-fade-in">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer min-h-[48px] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{submitting ? "Memproses..." : "Masuk"}</span>
              {!submitting && (
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              )}
            </button>
          </form>
        </div>

        <Link
          href="/tka"
          className="inline-flex items-center gap-1.5 mt-6 text-xs font-bold text-zinc-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Kembali ke situs
        </Link>
      </div>
    </div>
  );
}
