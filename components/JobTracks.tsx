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
          <div className="inline-flex items-center gap-2 rounded-full border border-gulf-500/30 bg-gulf-950/60 px-3.5 py-1 text-xs font-semibold text-gulf-300 backdrop-blur-md mb-4">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            <span>{t.jobTracks.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.jobTracks.titlePart1}
            <span className="gradient-gulf-text">{t.jobTracks.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
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
                className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-surface-100/60 p-5 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-gulf-500/40 hover:bg-surface-200/80 hover:shadow-2xl hover:shadow-gulf-500/10 min-w-0 max-w-full overflow-hidden"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.color} border border-white/10`}
                      >
                        <Icon className={`h-6 w-6 ${meta.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gulf-300 transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {track.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-gold-500/15 px-3 py-1 text-[11px] font-bold text-gold-300 border border-gold-500/30 shrink-0">
                      {track.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-sm leading-relaxed text-slate-300">
                    {track.description}
                  </p>

                  {/* Sample Key Phrases Preview */}
                  <div className="mt-6 rounded-2xl bg-[#09150e] p-4 border border-gulf-500/20">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gulf-400 mb-2">
                      {t.jobTracks.dialogueHeader}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {track.keyPhrases.map((phrase, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                          <span className="font-semibold text-gold-200">
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
                        className="flex items-center gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-gulf-400 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">
                    {t.jobTracks.bottomTag}
                  </span>
                  <Link
                    href="#course-plans"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gulf-500/10 px-4 py-2 text-xs font-bold text-gulf-300 border border-gulf-500/30 transition-all group-hover:bg-gulf-500 group-hover:text-slate-950"
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
