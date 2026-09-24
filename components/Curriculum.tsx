"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
  BookOpen,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import EnrollButton from "./EnrollButton";

export default function Curriculum() {
  const { t, language } = useLanguage();

  const enrollPlanData: Record<string, { price: number; name: string }> = {
    "3m": {
      price: 1950,
      name: "৩ মাস মেয়াদী - 3 Months Starter",
    },
    "6m": {
      price: 3450,
      name: "৬ মাস মেয়াদী - 6 Months Workplace Pro",
    },
    "12m": {
      price: 5950,
      name: "১২ মাস মেয়াদী - 12 Months Master Career Pack",
    },
  };

  const planSectionIds: Record<string, string> = {
    "3m": "starter",
    "6m": "workplace-pro",
    "12m": "master",
  };

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
    <section id="courses-pricing" className="relative scroll-mt-20 overflow-hidden w-full max-w-full pt-6 sm:pt-10 md:pt-14 pb-4 sm:pb-6 md:pb-8 bg-slate-100/70 border-t border-slate-200/80 dark:bg-[#050e08] dark:border-gulf-500/20 transition-colors duration-200">
      <span id="course-plans" className="sr-only" aria-hidden="true" />
      <span id="courses" className="sr-only" aria-hidden="true" />
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

          <div className="mt-4 flex items-center justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-surface-100 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-600/40 shadow-xs transition-all group"
            >
              <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>সব কোর্স বিস্তারিত ও সিলেবাস ব্রেকডাউন দেখুন</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="mt-6 sm:mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full max-w-full min-w-0">
          {t.curriculum.plans.map((plan, idx) => {
            const style = planStyles[idx % planStyles.length];
            const enrollPlan = enrollPlanData[plan.id] || {
              price: idx === 0 ? 1950 : idx === 1 ? 3450 : 5950,
              name: `${plan.duration} - ${plan.durationEn}`,
            };
            const sectionId = planSectionIds[plan.id] || (idx === 0 ? "starter" : idx === 1 ? "workplace-pro" : "master");
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/95 shadow-md hover:shadow-xl dark:border-white/10 dark:bg-gradient-to-b ${style.gradient} p-4 sm:p-5 md:p-6 backdrop-blur-xl transition-all duration-300 w-full min-w-0 max-w-full overflow-hidden ${style.accentBorder} ${plan.popular ? "scale-[1.02] ring-2 ring-emerald-500/40 dark:ring-gulf-400/40 shadow-xl z-10" : "hover:-translate-y-1"
                  }`}
              >
                <div>
                  {/* Duration & Header */}
                  <div className="w-full bg-amber-50/60 border border-amber-200/70 rounded-xl p-2 sm:p-3.5 flex flex-col gap-1 dark:bg-gold-950/20 dark:border-gold-500/20">
                    <div className="flex items-center gap-2 text-amber-800 dark:text-gold-300 font-bold text-sm sm:text-base">
                      <Clock className="w-4 h-4 shrink-0 text-amber-600 dark:text-gold-400" />
                      <span className="whitespace-nowrap">{plan.duration}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium pl-6 leading-tight">
                      {plan.durationEn}
                    </p>
                  </div>

                  {/* Course Title */}
                  <h3 className="mt-5 text-sm font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2 overflow-hidden text-ellipsis break-words min-h-[2.5rem]">
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
                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                      {t.curriculum.featuresHeader}
                    </div>
                    <ul className="space-y-2.5 my-4 text-sm text-slate-700 dark:text-slate-200">
                      {plan.features.slice(0, 4).map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-center gap-2.5"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="mt-4 pt-6 border-t border-slate-100 dark:border-white/[0.08]">
                  {plan.popular && (
                    <div className="w-full flex justify-center mb-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300/80 shadow-2xs dark:bg-amber-950/60 dark:text-gold-300 dark:border-amber-700/50">
                        ★ {language === "en" ? "Most Popular Choice" : t.curriculum.popularStarBadge}
                      </span>
                    </div>
                  )}

                  {/* View Details Link */}
                  <Link
                    href={`/courses#${sectionId}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 mb-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200/90 dark:text-slate-200 dark:hover:text-emerald-300 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:border-white/10 transition-all duration-200 group shadow-2xs active:scale-[0.99]"
                  >
                    <span>
                      {language === "en" ? "View Course Details" : "বিস্তারিত দেখুন"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <EnrollButton
                    coursePrice={enrollPlan.price}
                    courseName={enrollPlan.name}
                    className={
                      plan.popular
                        ? "w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:via-teal-500 hover:to-amber-400 text-white font-bold rounded-xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        : undefined
                    }
                  />

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
        <div className="mt-5 sm:mt-8 md:mt-10 mb-4 sm:mb-6 md:mb-8 rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm dark:border-gulf-500/20 dark:bg-surface-100/60 p-4 sm:p-5 md:p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-full min-w-0 overflow-hidden">
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

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/80 px-4 py-2.5 text-xs font-bold transition-all shadow-xs shrink-0"
            >
              <BookOpen className="h-4 w-4" />
              <span>পূর্ণাঙ্গ কোর্স সিলেবাস দেখুন</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="https://wa.me/916290051284?text=Hello%20Rimslin%20Support,%20I%20want%20free%20consultation%20on%20Rimslin%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/60 px-5 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/80 transition-colors shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t.curriculum.freeConsultCta}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
