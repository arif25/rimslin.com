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
    <section id="reviews" className="relative overflow-hidden w-full max-w-full py-24 sm:py-32 bg-[#050c07] border-t border-gulf-500/20">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center w-full min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-950/60 px-3.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur-md mb-4">
            <Quote className="h-3.5 w-3.5 text-gold-400" />
            <span>{t.testimonials.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.testimonials.titlePart1}
            <span className="gradient-gulf-text">{t.testimonials.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            {t.testimonials.description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-full min-w-0">
          {t.testimonials.items.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-surface-100/60 p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-gulf-500/40 hover:bg-surface-200/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-gulf-500/10 min-w-0 max-w-full overflow-hidden"
            >
              <div>
                {/* Top Strip: Star Rating & Track */}
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-4">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="rounded-md bg-gulf-500/10 px-2 py-0.5 text-[10px] font-bold text-gulf-300 border border-gulf-500/20">
                    {item.trackTag}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Salary Gain Highlight */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{item.salaryGain}</span>
                </div>
              </div>

              {/* Worker Profile Bottom */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-200 text-2xl border border-white/10 shrink-0">
                  {item.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-sm">{item.flag}</span>
                  </div>
                  <p className="text-[11px] text-gulf-400 font-medium">
                    {item.role} • {item.company}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-gold-400" />
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
