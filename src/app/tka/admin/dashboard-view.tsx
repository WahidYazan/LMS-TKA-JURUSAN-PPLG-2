"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, BookOpen, ListChecks, Home, DatabaseZap } from "lucide-react";
import { ImportSeedButton } from "@/components/admin/ImportSeedButton";
import { AdminCard } from "@/components/admin/AdminPrimitives";

const sections = [
  {
    href: "/tka/admin/quiz",
    label: "Soal Quiz",
    desc: "50 soal HOTS per modul",
    icon: HelpCircle,
    table: "quiz_questions" as const,
  },
  {
    href: "/tka/admin/modules",
    label: "Modul",
    desc: "Materi pembelajaran & section",
    icon: BookOpen,
    table: "modules" as const,
  },
  {
    href: "/tka/admin/cheatsheet",
    label: "Cheatsheet",
    desc: "Rangkuman git/http/sql/oop",
    icon: ListChecks,
    table: "cheatsheet_items" as const,
  },
  {
    href: "/tka/admin/landing",
    label: "Landing",
    desc: "Statistik & fitur landing page",
    icon: Home,
    table: "landing_stats" as const,
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola seluruh konten Simulasi TKA PPLG.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[11px] font-bold uppercase tracking-wider text-sky-600 w-fit">
          <DatabaseZap className="w-3.5 h-3.5" aria-hidden="true" />
          Halaman Admin
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href} className="block">
              <AdminCard className="h-full hover:border-sky-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{s.label}</p>
                    <p className="text-xs text-slate-500 truncate">{s.desc}</p>
                  </div>
                </div>
              </AdminCard>
            </Link>
          );
        })}
      </div>

      <ImportSeedButton />
    </div>
  );
}
