"use client";

import Link from "next/link";
import {
  Car,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HardHat,
  Brush,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function JobTracks() {
  const { t } = useLanguage();

  const trackMeta = [
    {
      id: "construction",
      icon: HardHat,
      color: "from-amber-500/20 to-orange-500/10",
      iconColor: "text-amber-400",
    },
    {
      id: "drivers",
      icon: Car,
      color: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-400",
    },
    {
      id: "hospitality",
      icon: UtensilsCrossed,
      color: "from-blue-500/20 to-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      id: "helpers",
      icon: Brush,
      color: "from-purple-500/20 to-indigo-500/10",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <section id="job-tracks" className="relative scroll-mt-28 sm:scroll-mt-32 overflow-hidden w-full max-w-full py-24 sm:py-32">
      <span id="airport-guide" className="sr-only" aria-hidden="true" />
      <span id="worker-rights" className="sr-only" aria-hidden="true" />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center w-full min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 text-emerald-800 dark:border-gulf-500/30 dark:bg-gulf-950/60 dark:text-gulf-300 px-3.5 py-1 text-xs font-semibold backdrop-blur-md mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400" />
            <span>{t.jobTracks.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.jobTracks.titlePart1}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent"> {t.jobTracks.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.jobTracks.description}
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 w-full max-w-full min-w-0">
          {t.jobTracks.tracks.map((track, idx) => {
            const meta = trackMeta[idx % trackMeta.length];
            const Icon = meta.icon;

            return (
              <div
                key={track.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/95 shadow-md hover:shadow-xl hover:border-emerald-500/40 dark:border-white/[0.08] dark:bg-surface-100/60 p-5 sm:p-8 backdrop-blur-xl transition-all duration-300 dark:hover:border-gulf-500/40 dark:hover:bg-surface-200/80 min-w-0 max-w-full overflow-hidden"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.color} border border-slate-200 dark:border-white/10`}
                      >
                        <Icon className={`h-6 w-6 ${meta.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-gulf-300 transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
                          {track.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-amber-500/15 text-amber-700 dark:bg-gold-500/15 dark:text-gold-300 px-3 py-1 text-[11px] font-bold border border-amber-500/30 dark:border-gold-500/30 shrink-0">
                      {track.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {track.description}
                  </p>

                  {/* Sample Key Phrases Preview */}
                  <div className="mt-6 rounded-2xl bg-slate-50 dark:bg-[#09150e] p-4 border border-slate-200 dark:border-gulf-500/20">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-gulf-400 mb-2">
                      {t.jobTracks.dialogueHeader}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                      {track.keyPhrases.map((phrase, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-gold-400" />
                          <span className="font-semibold text-slate-900 dark:text-gold-200">
                            {phrase}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Syllabus Modules */}
                  <div className="mt-5 space-y-2">
                    {track.topics.map((topic, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-gulf-400 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-8 pt-5 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-300">
                    {t.jobTracks.bottomTag}
                  </span>
                  <Link
                    href="#course-plans"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-gulf-400 hover:text-emerald-800 dark:hover:text-gold-300 transition-colors"
                  >
                    <span>{t.jobTracks.viewModule}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
