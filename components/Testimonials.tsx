"use client";

import {
  Star,
  Quote,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="relative scroll-mt-28 sm:scroll-mt-32 overflow-hidden w-full max-w-full py-24 sm:py-32 bg-slate-100/70 border-t border-slate-200/80 dark:bg-[#050c07] dark:border-gulf-500/20 transition-colors duration-200">
      <span id="reviews" className="sr-only" aria-hidden="true" />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center w-full min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 dark:border-gold-500/30 dark:bg-gold-950/60 px-3.5 py-1 text-xs font-semibold text-amber-800 dark:text-gold-300 backdrop-blur-md mb-4 shadow-sm">
            <Quote className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400" />
            <span>{t.testimonials.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.testimonials.titlePart1}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent"> {t.testimonials.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.testimonials.description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-full min-w-0">
          {t.testimonials.items.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/95 shadow-md hover:shadow-xl hover:border-emerald-500/40 dark:border-white/[0.08] dark:bg-surface-100/60 p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 dark:hover:border-gulf-500/40 dark:hover:bg-surface-200/80 hover:-translate-y-1 min-w-0 max-w-full overflow-hidden"
            >
              <div>
                {/* Top Strip: Star Rating & Track */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/[0.06] pb-3 mb-4">
                  <div className="flex items-center gap-1 text-amber-500 dark:text-gold-400">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-gulf-500/10 dark:text-gulf-300 dark:border-gulf-500/20 px-2 py-0.5 text-[10px] font-bold">
                    {item.trackTag}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Salary Gain Highlight */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/30 px-3 py-1 text-xs font-bold shadow-sm">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{item.salaryGain}</span>
                </div>
              </div>

              {/* Worker Profile Bottom */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200 dark:bg-surface-200 text-2xl dark:border-white/10 shrink-0">
                  {item.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-sm">{item.flag}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-gulf-400 font-medium">
                    {item.role} • {item.company}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-amber-500 dark:text-gold-400" />
                    <span>{item.country}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
