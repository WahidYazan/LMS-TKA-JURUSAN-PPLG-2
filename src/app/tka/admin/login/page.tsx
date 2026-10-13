"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth";
import {
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { SiteLogo } from "@/components/SiteLogo";

const features = [
  "Sembunyikan atau tampilkan modul & soal tanpa menghapus data",
  "Atur urutan, duplikat, dan edit seluruh konten pembelajaran",
  "Ganti logo situs langsung dari dashboard",
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen lg:grid lg:grid-cols-2 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* LEFT — panel brand (desktop saja) */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 text-white bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur shrink-0">
            <SiteLogo
              width={40}
              height={40}
              className="w-9 h-9 object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="text-base font-extrabold tracking-tight leading-tight truncate">
              Simulasi TKA PPLG
            </p>
            <p className="text-xs text-blue-200/90 font-medium truncate">
              SMK Telekomunikasi Tunas Harapan
            </p>
          </div>
        </div>

        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-wider mb-5">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            Portal Khusus Admin
            <span className="text-xs text-blue-200/90 font-medium">
              SMK Telekomunikasi Tunas Harapan
            </span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-extrabold leading-tight tracking-tight">
            Kelola semua konten pembelajaran dalam satu tempat.
          </h1>
          <p className="text-sm text-blue-100/90 mt-4 leading-relaxed">
            Masuk untuk mengatur soal, modul, cheatsheet, dan tampilan landing
            page portal Simulasi TKA PPLG.
          </p>
          <ul className="mt-7 space-y-3">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-sm text-blue-50/95"
              >
                <CheckCircle2
                  className="w-5 h-5 text-sky-300 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-blue-200/70">
          &copy; {year} SMK Telekomunikasi Tunas Harapan. Semua hak dilindungi.
        </p>
      </div>

      {/* RIGHT — form login */}
      <div className="relative flex items-center justify-center px-4 py-10 sm:py-14 bg-gradient-to-b from-blue-50/60 to-[#f8fafc]">
        <div className="w-full max-w-sm">
          {/* Header brand — mobile saja */}
          <div className="flex flex-col items-center text-center mb-6 lg:hidden">
            <div className="w-14 h-14 mb-3">
              <SiteLogo
                width={56}
                height={56}
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Simulasi TKA PPLG
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Portal Admin — SMK Telekomunikasi Tunas Harapan
            </p>
          </div>

          {/* Header — desktop */}
          <div className="hidden lg:block mb-6">
            <h2 className="text-xl font-extrabold text-slate-900">
              Masuk ke akun admin
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Gunakan email &amp; password admin yang terdaftar.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4"
          >
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold text-slate-600 mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="w-4 h-4 text-slate-400 absolute left-3 top-3.5"
                  aria-hidden="true"
                />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
                  placeholder="admin@sekolah.sch.id"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold text-slate-600 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="w-4 h-4 text-slate-400 absolute left-3 top-3.5"
                  aria-hidden="true"
                />
                <input
                  id="admin-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400"
                  placeholder="••••••••"
                />
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
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all cursor-pointer min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link
              href="/tka"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Kembali ke situs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
