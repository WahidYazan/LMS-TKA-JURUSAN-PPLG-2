import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Cpu,
  Gamepad2,
  Laptop,
  ShieldCheck,
  Users,
} from "lucide-react";
import { loadModules } from "../../lib/content";
import { useContent } from "../../hooks/useContent";

const icons = [Users, ShieldCheck, Code2, Cpu, Gamepad2];
const tones = [
  { badge: "text-sky-600", icon: "bg-sky-50 text-sky-600" },
  { badge: "text-emerald-600", icon: "bg-emerald-50 text-emerald-600" },
  { badge: "text-amber-600", icon: "bg-amber-50 text-amber-600" },
  { badge: "text-rose-600", icon: "bg-rose-50 text-rose-600" },
  { badge: "text-purple-600", icon: "bg-purple-50 text-purple-600" },
];

export const LandingCurriculum: React.FC = () => {
  const { data: modules } = useContent(loadModules);
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-3 mb-3">
          Materi Pembelajaran
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {(modules ?? []).map((mod, index) => {
          const Icon = icons[index] ?? Code2;
          const tone = tones[index] ?? tones[0];
          return (
            <Link
              key={mod.id}
              href={`/tka/module/${mod.id}`}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 min-h-[200px] flex flex-col"
              aria-label={`Buka Modul ${mod.number}: ${mod.cardTitle || mod.title}`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${tone.icon} flex items-center justify-center mb-4 flex-shrink-0`}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <span
                className={`text-xs font-bold ${tone.badge} uppercase tracking-wider`}
              >
                {mod.moduleBadge}
              </span>
              <h3 className="text-xl font-bold text-slate-800 mt-1 mb-2">
                {mod.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">
                {mod.shortDesc}
              </p>
            </Link>
          );
        })}

        <Link
          href="/tka/quiz"
          className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-5 sm:p-6 shadow-md shadow-sky-500/20 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white min-h-[200px]"
          aria-label="Buka Simulasi TKA PPLG"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-white/20 text-white border border-white/30 flex items-center justify-center mb-4 flex-shrink-0">
              <Laptop className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Simulasi TKA PPLG
            </h3>
            <p className="text-sm text-sky-100 leading-relaxed mb-4 flex-1">
              Uji pemahaman akhir dengan studi kasus HOTS standar industri.
            </p>
          </div>
          <span className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
            <span>Mulai Latihan Sekarang</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
};