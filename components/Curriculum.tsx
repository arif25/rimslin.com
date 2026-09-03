"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Curriculum() {
  const { t } = useLanguage();

  const planStyles = [
    {
      gradient: "from-slate-800 to-surface-200",
      accentBorder: "border-white/10",
    },
    {
      gradient: "from-gulf-950 via-surface-200 to-emerald-950",
      accentBorder: "border-gulf-400/80 shadow-2xl shadow-gulf-500/20",
    },
    {
      gradient: "from-amber-950/40 via-surface-200 to-surface-100",
      accentBorder: "border-gold-500/40 hover:border-gold-400",
    },
  ];

  return (
    <section id="course-plans" className="relative scroll-mt-28 sm:scroll-mt-32 overflow-hidden w-full max-w-full py-24 sm:py-32 bg-slate-100/70 border-t border-slate-200/80 dark:bg-[#050e08] dark:border-gulf-500/20 transition-colors duration-200">
      <span id="curriculum" className="sr-only" aria-hidden="true" />
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[500px] w-full max-w-[700px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center w-full min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 dark:border-gold-500/30 dark:bg-gold-950/50 px-3.5 py-1 text-xs font-semibold text-amber-800 dark:text-gold-300 backdrop-blur-md mb-4 shadow-sm">
            <BookOpen className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400" />
            <span>{t.curriculum.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.curriculum.titlePart1}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent"> {t.curriculum.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.curriculum.description}
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch w-full max-w-full min-w-0">
          {t.curriculum.plans.map((plan, idx) => {
            const style = planStyles[idx % planStyles.length];
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/95 shadow-md hover:shadow-xl dark:border-white/10 dark:bg-gradient-to-b ${style.gradient} p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 min-w-0 max-w-full overflow-hidden ${style.accentBorder} ${
                  plan.popular ? "scale-[1.02] ring-2 ring-emerald-500/40 dark:ring-gulf-400/40 shadow-xl" : "hover:-translate-y-1"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-600 to-amber-500 dark:from-gulf-500 dark:to-gold-500 px-4 py-1 text-[11px] font-black uppercase tracking-wider text-white dark:text-slate-950 shadow-lg shadow-emerald-500/30">
                    ★ {t.curriculum.popularStarBadge}
                  </div>
                )}

                <div>
                  {/* Duration & Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-gold-300">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-bold">{plan.duration}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {plan.durationEn}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="mt-5 text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                    {plan.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {plan.subtitle}
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-[#09150e]/80 dark:border-white/[0.06] p-4 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                        {t.curriculum.offerFeeLabel}
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {plan.price}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 line-through">
                        {plan.regularPrice}
                      </div>
                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {t.curriculum.discountBadge}
                      </div>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                      {t.curriculum.featuresHeader}
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-gulf-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.08]">
                  <Link
                    href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                      `${t.curriculum.whatsappCtaPrefix}${plan.title}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white dark:from-gulf-500 dark:via-emerald-500 dark:to-gold-400 dark:text-slate-950 shadow-xl shadow-emerald-500/20 hover:scale-[1.02]"
                        : "border border-emerald-600/40 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white dark:border-gulf-500/40 dark:bg-surface-100/90 dark:text-white dark:hover:bg-gulf-600 dark:hover:border-gulf-400"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>

                  <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      {t.curriculum.paymentNote}
                    </span>
                    <span>•</span>
                    <span>{t.curriculum.accessNote}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curriculum Guarantee Note */}
        <div className="mt-12 rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm dark:border-gulf-500/20 dark:bg-surface-100/60 p-5 sm:p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-full min-w-0 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-gold-400 border border-amber-500/20 dark:border-gold-500/20 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {t.curriculum.helpBoxTitle}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {t.curriculum.helpBoxDesc}
              </p>
            </div>
          </div>

          <Link
            href="https://wa.me/8801700000000?text=I%20want%20free%20consultation%20on%20Rimslin%20courses"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/60 px-5 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/80 transition-colors shrink-0"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{t.curriculum.freeConsultCta}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
