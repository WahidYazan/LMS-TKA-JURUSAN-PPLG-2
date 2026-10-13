"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";
import { Lock, Mail, Settings2 } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 mb-3">
            <Settings2 className="w-6 h-6" aria-hidden="true" />
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Simulasi KA PPLG
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Masuk dengan akun admin untuk mengelola konten.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4"
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
      </div>
    </div>
  );
}
