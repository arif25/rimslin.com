"use client";

import { Users, Globe2, Headphones, Award } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Stats() {
  const { t } = useLanguage();

  const statIcons = [Users, Globe2, Headphones, Award];

  return (
    <section id="stats" className="relative overflow-hidden w-full max-w-full py-14 border-y border-slate-200/80 bg-slate-100/70 dark:border-gulf-500/20 dark:bg-[#07120b] transition-colors duration-200">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-full min-w-0">
          {t.stats.items.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm dark:border-white/[0.08] dark:bg-surface-100/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 dark:hover:border-gulf-500/40 dark:hover:bg-surface-200/80 min-w-0 max-w-full"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-amber-500/10 text-emerald-700 dark:from-gulf-500/20 dark:to-gold-500/10 dark:text-gulf-300 border border-emerald-500/30 dark:border-gulf-500/30">
                    <Icon className="h-6 w-6 text-amber-500 dark:text-gold-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {stat.englishValue}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                  <div className="text-sm font-bold text-emerald-700 dark:text-gulf-300">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
