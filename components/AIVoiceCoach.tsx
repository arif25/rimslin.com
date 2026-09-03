"use client";

import { useState } from "react";
import {
  Mic,
  Sparkles,
  Volume2,
  RotateCcw,
  CheckCircle2,
  Bot,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function AIVoiceCoach() {
  const { t } = useLanguage();
  const [activeScenarioId, setActiveScenarioId] = useState<string>("late-arrival");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [playingSpeaker, setPlayingSpeaker] = useState<string | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState<string>("");
  const [waitlistSuccess, setWaitlistSuccess] = useState<boolean>(false);

  const scenarios = t.aiVoice.scenarios;

  const activeScenario =
    scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const playVoice = (text: string, speaker: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setPlayingSpeaker(speaker);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.rate = 0.85;

      utterance.onend = () => {
        setPlayingSpeaker(null);
      };

      utterance.onerror = () => {
        setTimeout(() => {
          setPlayingSpeaker(null);
        }, 2000);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setPlayingSpeaker(speaker);
      setTimeout(() => {
        setPlayingSpeaker(null);
      }, 2000);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setHasRecorded(false);
    setAccuracyScore(null);

    // Simulate real AI voice recording & analysis
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      const score = Math.floor(Math.random() * 5) + 94;
      setAccuracyScore(score);
    }, 2800);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      setWaitlistSuccess(true);
      setTimeout(() => setWaitlistSuccess(false), 4000);
      setWaitlistEmail("");
    }
  };

  return (
    <section id="ai-coach" className="relative scroll-mt-28 sm:scroll-mt-32 overflow-hidden w-full max-w-full py-24 sm:py-32 bg-slate-50 border-t border-slate-200/80 dark:bg-[#060e09] dark:border-gulf-500/20 transition-colors duration-200">
      <span id="ai-voice" className="sr-only" aria-hidden="true" />
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[450px] w-full max-w-[450px] rounded-full bg-hero-emerald-glow blur-[130px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center w-full min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800 dark:border-gulf-400/30 dark:bg-gulf-950/60 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-gold-400 animate-pulse" />
            <span>{t.aiVoice.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.aiVoice.titlePart1}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-gulf-400 dark:via-emerald-300 dark:to-gold-400 bg-clip-text text-transparent">
              {" "}{t.aiVoice.titleHighlight}{" "}
            </span>
            {t.aiVoice.titlePart2}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.aiVoice.description}
          </p>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {scenarios.map((scen) => (
            <button
              key={scen.id}
              onClick={() => {
                setActiveScenarioId(scen.id);
                setHasRecorded(false);
                setAccuracyScore(null);
                setIsRecording(false);
              }}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeScenarioId === scen.id
                  ? "bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/20 dark:bg-gradient-to-r dark:from-gulf-500 dark:to-emerald-600 dark:text-slate-950"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-surface-100/70 dark:text-slate-300 dark:hover:bg-surface-200 dark:hover:text-white shadow-sm"
              }`}
            >
              <span>{scen.title}</span>
              <span className="rounded-md bg-black/10 dark:bg-black/20 px-1.5 py-0.5 text-[10px] font-bold">
                {scen.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Main AI Simulator Interactive Card */}
        <div className="mt-10 max-w-4xl mx-auto w-full rounded-3xl border border-slate-200/90 bg-white/95 shadow-xl dark:border-gulf-500/30 dark:bg-[#0a1610]/90 p-5 sm:p-10 backdrop-blur-2xl dark:shadow-2xl dark:shadow-gulf-950/60 min-w-0 max-w-full overflow-hidden">
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-white/[0.08] pb-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-gulf-500/20 dark:text-gulf-400 dark:border-gulf-500/30">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{t.aiVoice.simTitle}</span>
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activeScenario.subtitle}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setHasRecorded(false);
                  setAccuracyScore(null);
                  setIsRecording(false);
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:border-white/10 dark:bg-surface-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-surface-200 transition-colors shadow-sm"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{t.aiVoice.reset}</span>
              </button>
            </div>
          </div>

          {/* Dialogue Progression Box */}
          <div className="space-y-6">
            {/* Step 1: Arbab Line */}
            {activeScenario.dialogue[0] && (
              <div className="rounded-2xl border border-amber-300/60 bg-amber-50/60 dark:border-gold-500/40 dark:bg-[#141b12] p-5 shadow-md dark:shadow-gold-500/5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activeScenario.dialogue[0].avatarIcon}</span>
                    <div>
                      <div className="text-xs font-bold text-amber-800 dark:text-gold-400">
                        {activeScenario.dialogue[0].speakerName}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {activeScenario.dialogue[0].speakerRole}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      playVoice(
                        activeScenario.dialogue[0].arabicScript,
                        "arbab"
                      )
                    }
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      playingSpeaker === "arbab"
                        ? "bg-amber-500 text-white animate-pulse"
                        : "border border-amber-400/40 bg-amber-100 text-amber-900 hover:bg-amber-200 dark:border-gold-500/30 dark:bg-gold-950/50 dark:text-gold-300 dark:hover:bg-gold-900/60"
                    }`}
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>
                      {playingSpeaker === "arbab" ? t.aiVoice.listenArbabPlaying : t.aiVoice.listenArbab}
                    </span>
                  </button>
                </div>

                {/* Arabic Script & Phonetic & Meaning */}
                <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-white/[0.06]">
                  <div className="text-right text-lg font-arabic font-bold text-slate-900 dark:text-white leading-relaxed" dir="rtl">
                    {activeScenario.dialogue[0].arabicScript}
                  </div>
                  <div className="mt-2 text-sm font-bold text-amber-800 dark:text-gold-300">
                    {t.aiVoice.pronunciationLabel}: &ldquo;{activeScenario.dialogue[0].phoneticScript}&rdquo;
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {t.aiVoice.meaningLabel}: {activeScenario.dialogue[0].meaning}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Worker Response Section */}
            {activeScenario.dialogue[1] && (
              <div className="rounded-2xl border border-emerald-300/60 bg-emerald-50/60 dark:border-gulf-500/40 dark:bg-[#091a10] p-5 sm:p-6 shadow-md dark:shadow-xl dark:shadow-gulf-950/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activeScenario.dialogue[1].avatarIcon}</span>
                    <div>
                      <div className="text-xs font-bold text-emerald-800 dark:text-gulf-300">
                        {activeScenario.dialogue[1].speakerName}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {activeScenario.dialogue[1].speakerRole}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      playVoice(
                        activeScenario.dialogue[1].arabicScript,
                        "worker"
                      )
                    }
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      playingSpeaker === "worker"
                        ? "bg-emerald-600 text-white animate-pulse"
                        : "border border-emerald-400/40 bg-emerald-100 text-emerald-900 hover:bg-emerald-200 dark:border-gulf-500/30 dark:bg-gulf-950/50 dark:text-gulf-300 dark:hover:bg-gulf-900/60"
                    }`}
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>
                      {playingSpeaker === "worker" ? t.aiVoice.listenWorkerPlaying : t.aiVoice.listenWorker}
                    </span>
                  </button>
                </div>

                {/* Target Response Script */}
                <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-white/[0.06]">
                  <div className="text-xs font-semibold text-emerald-700 dark:text-gulf-400 uppercase tracking-wider mb-1">
                    {t.aiVoice.targetScriptLabel}
                  </div>
                  <div className="text-right text-lg font-arabic font-bold text-slate-900 dark:text-white leading-relaxed" dir="rtl">
                    {activeScenario.dialogue[1].arabicScript}
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                    &ldquo;{activeScenario.dialogue[1].phoneticScript}&rdquo;
                  </div>
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {t.aiVoice.meaningLabel}: {activeScenario.dialogue[1].meaning}
                  </div>
                </div>

                {/* Interactive Microphone Box */}
                <div className="mt-6 flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-[#06110a] p-6 border border-slate-200 dark:border-gulf-500/20 text-center shadow-inner">
                  {/* Glowing Mic Button */}
                  <div className="relative mb-3">
                    {isRecording && (
                      <div className="absolute inset-0 -m-3 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
                    )}
                    <button
                      type="button"
                      onClick={handleMicClick}
                      className={`relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full transition-all duration-300 ${
                        isRecording
                          ? "bg-rose-600 text-white shadow-xl shadow-rose-600/50 scale-105 ring-4 ring-rose-400"
                          : "bg-gradient-to-tr from-gulf-600 via-emerald-500 to-gold-400 text-slate-950 shadow-xl shadow-gulf-500/30 hover:scale-105"
                      }`}
                      aria-label="Toggle Microphone"
                    >
                      {isRecording ? (
                        <Mic className="h-8 w-8 animate-pulse text-white" />
                      ) : (
                        <Mic className="h-8 w-8" />
                      )}
                    </button>
                  </div>

                  <div className="text-sm font-bold text-white">
                    {isRecording
                      ? t.aiVoice.micPromptRecording
                      : t.aiVoice.micPromptIdle}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    {isRecording
                      ? t.aiVoice.micSubRecording
                      : t.aiVoice.micSubIdle}
                  </p>

                  {/* Score & Analysis Feedback */}
                  {hasRecorded && accuracyScore && (
                    <div className="mt-5 w-full max-w-md rounded-xl bg-gulf-950/80 p-4 border border-gulf-400/50 animate-fade-in text-left">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          <span className="text-xs font-bold text-white">
                            {t.aiVoice.resultTitle}
                          </span>
                        </div>
                        <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-black text-emerald-300 border border-emerald-500/30">
                          {accuracyScore}% {t.aiVoice.resultAccuracy}
                        </span>
                      </div>

                      <div className="h-2 w-full rounded-full bg-surface-200 overflow-hidden mb-3">
                        <div
                          className="h-full bg-gradient-to-r from-gulf-500 to-gold-400 transition-all duration-1000"
                          style={{ width: `${accuracyScore}%` }}
                        />
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {t.aiVoice.resultSuccessPraise}
                      </p>
                    </div>
                  )}

                  {/* Pro AI Tip */}
                  {activeScenario.dialogue[1].aiTip && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-gold-300/90 bg-gold-950/40 px-4 py-2 rounded-xl border border-gold-500/20">
                      <span>💡</span>
                      <span>{activeScenario.dialogue[1].aiTip}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Waitlist Callout */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/90 dark:border-white/[0.08] dark:bg-[#07130b] p-6 text-center">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {t.aiVoice.waitlistTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-lg mx-auto">
              {t.aiVoice.waitlistDesc}
            </p>

            <form
              onSubmit={handleWaitlistSubmit}
              className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto"
            >
              <input
                type="text"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder={t.aiVoice.waitlistPlaceholder}
                required
                className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 dark:border-white/15 dark:bg-surface-100 dark:text-white dark:placeholder-slate-500 dark:focus:border-gulf-400 px-4 py-2.5 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-500 text-white dark:from-gulf-500 dark:to-gold-500 dark:text-slate-950 px-5 py-2.5 text-xs font-bold shadow-md hover:opacity-90 shrink-0"
              >
                <span>{t.aiVoice.waitlistButton}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>
            </form>

            {waitlistSuccess && (
              <div className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {t.aiVoice.waitlistSuccess}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
