"use client";

import React from "react";
import {
  Star,
  Quote,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Testimonials() {
  const { t, language } = useLanguage();

  const items = t.testimonials.items || [];
  // Duplicate array to achieve an uninterrupted infinite marquee
  const duplicatedItems = [...items, ...items];

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-28 sm:scroll-mt-32 overflow-hidden w-full max-w-full py-10 sm:py-14 bg-slate-100/70 border-t border-slate-200/80 dark:bg-[#050c07] dark:border-gulf-500/20 transition-colors duration-200"
    >
      <span id="reviews" className="sr-only" aria-hidden="true" />

      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center w-full px-4 mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 dark:border-gold-500/30 dark:bg-gold-950/60 px-3.5 py-1 text-xs font-semibold text-amber-800 dark:text-gold-300 backdrop-blur-md mb-3 shadow-xs">
          <Quote className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400" />
          <span>
            {language === "en"
              ? "Expat Success Stories"
              : t.testimonials.badge || "প্রবাসী ভাইদের সাফল্যের গল্প"}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {language === "en" ? (
            <>
              Migrant workers who unlocked{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                career success
              </span>
            </>
          ) : (
            <>
              রিমসলিন শিখে মধ্যপ্রাচ্যে যারা{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                সফল হয়েছেন
              </span>
            </>
          )}
        </h2>

        <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.testimonials.description}
        </p>
      </div>

      {/* Single-Row Continuous Infinite Marquee with Soft Edge Masking */}
      <div
        className="w-full overflow-hidden relative py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex gap-6 w-max animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
          {duplicatedItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="w-[320px] sm:w-[360px] shrink-0 bg-white dark:bg-surface-100 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Expat Profile: Avatar, name, destination country badge */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-2xl border border-emerald-100 dark:border-emerald-800/40 shrink-0">
                    {item.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-surface-200 px-2 py-0.5 rounded-full border border-slate-200/80 dark:border-white/10">
                        <span>{item.country}</span>
                        <span>{item.flag}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.company}
                    </p>
                  </div>
                </div>

                {/* Role & Salary/Career Increment Tag */}
                <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-white/10">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                    {item.role}
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50 px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 inline-flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{item.salaryGain}</span>
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic mt-3 line-clamp-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Audio/Verification Trust Badge & Stars */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    {language === "en" ? "Verified Learner" : "ভেরিফায়েড শিক্ষার্থী"}
                  </span>
                </span>

                <div className="flex items-center gap-0.5 text-amber-500 dark:text-gold-400">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
