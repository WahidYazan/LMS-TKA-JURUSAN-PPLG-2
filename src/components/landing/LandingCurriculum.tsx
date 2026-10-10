import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Code2,
  Cpu,
  Gamepad2,
  Laptop,
  ShieldCheck,
  Users,
} from "lucide-react";
import { modulesList } from "../../data/modules";

const icons = [Users, ShieldCheck, Code2, Cpu, Gamepad2];
const tones = [
  { badge: "text-blue-600", icon: "bg-blue-50 text-blue-600" },
  { badge: "text-emerald-600", icon: "bg-emerald-50 text-emerald-600" },
  { badge: "text-amber-600", icon: "bg-amber-50 text-amber-600" },
  { badge: "text-rose-600", icon: "bg-rose-50 text-rose-600" },
  { badge: "text-purple-600", icon: "bg-purple-50 text-purple-600" },
];

export const LandingCurriculum: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mt-3 mb-3">
          Materi Pembelajaran
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {modulesList.map((mod, index) => {
          const Icon = icons[index] ?? Code2;
          const tone = tones[index] ?? tones[0];
          return (
            <Link
              key={mod.id}
              href={`/module/${mod.id}`}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[200px] flex flex-col"
              aria-label={`Buka Modul ${mod.number}: ${mod.cardTitle || mod.title}`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${tone.icon} flex items-center justify-center mb-4 flex-shrink-0`}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <span
                className={`text-[11px] font-bold ${tone.badge} uppercase tracking-wider`}
              >
                {mod.moduleBadge}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                {mod.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                {mod.shortDesc}
              </p>
            </Link>
          );
        })}

        <Link
          href="/quiz"
          className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 min-h-[200px]"
          aria-label="Buka simulasi ujian TKA"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center mb-4 flex-shrink-0">
              <Laptop className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Simulasi Ujian TKA
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 flex-1">
              Uji pemahaman akhir dengan studi kasus HOTS standar industri.
            </p>
          </div>
          <span className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
            <span>Mulai Latihan Sekarang</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
};