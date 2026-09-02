"use client";

import { useState } from "react";
import {
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  Play,
  RotateCcw,
  CheckCircle2,
  Bot,
  User,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

interface DialogueStep {
  speaker: "arbab" | "worker";
  speakerName: string;
  speakerRole: string;
  avatarIcon: string;
  arabicScript: string;
  arabicBengali: string;
  bengaliMeaning: string;
  englishMeaning: string;
  audioLang?: string;
  expectedResponse?: string;
  aiTip?: string;
}

interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  dialogue: DialogueStep[];
}

export default function AIVoiceCoach() {
  const scenarios: Scenario[] = [
    {
      id: "late-arrival",
      title: "কাজে দেরিতে পৌঁছানোর কারণ ব্যাখ্যা",
      subtitle: "মুদিরের রাগ কমানোর জন্য সঠিক ভদ্র আরবি ডায়ালগ",
      badge: "সাইট পরিস্থিতি",
      dialogue: [
        {
          speaker: "arbab",
          speakerName: "মুদির (Arbab / Boss)",
          speakerRole: "সৌদি সাইট ইন-চার্জ",
          avatarIcon: "👳‍♂️",
          arabicScript: "يا محمد، ليش تأخرت اليوم عن الشغل؟ نص ساعة تأخير!",
          arabicBengali: "ইয়া মোহাম্মদ, লেইশ তা'আক্খারত আল-ইয়উম আন আশ-শোগল? নুফ সা'আ তা'খির!",
          bengaliMeaning: "হে মোহাম্মদ, আজকে কাজে আসতে দেরি হলো কেন? আধা ঘণ্টা দেরি!",
          englishMeaning: "Mohammed, why are you late today? Half an hour late!",
          audioLang: "ar-SA",
          aiTip: "মুদিরকে সরাসরি 'আনা মা'লুম' না বলে আগে বিনয়ের সাথে দুঃখ প্রকাশ করুন।",
        },
        {
          speaker: "worker",
          speakerName: "আপনি (Bengali Worker)",
          speakerRole: "প্রবাসী টেকনিশিয়ান",
          avatarIcon: "👷‍♂️",
          arabicScript: "آسف يا مدير، الطريق كان فيه زحمة شديدة وباص الشركة تأخر، ما بتكرر إن شاء الله.",
          arabicBengali:
            "আসেফ ইয়া মুদির, আত-তারেক কান ফীহ যাহমা শাদীদাহ ওয়া বাস আশ-শারিকাহ তা'আক্খার, মা বিতা'কাররার ইনশাআল্লাহ।",
          bengaliMeaning:
            "দুঃখিত স্যার, রাস্তায় প্রচণ্ড জ্যাম ছিল এবং কোম্পানির বাস আসতে দেরি হয়েছিল, পরবর্তীতে এমন হবে না ইনশাআল্লাহ।",
          englishMeaning:
            "Sorry boss, there was heavy traffic and company bus got delayed, won't happen again inshaAllah.",
          audioLang: "ar-SA",
          aiTip: "চমৎকার উত্তর! 'মা বিতা'কাররার' বললে মুদির শান্ত হয়ে যায়।",
        },
      ],
    },
    {
      id: "salary-request",
      title: "মুদিরের কাছে অগ্রিম বেতনের আবেদন",
      subtitle: "সম্মানের সাথে প্রয়োজনের কথা বুঝিয়ে বলা",
      badge: "বেতন ও অর্থ",
      dialogue: [
        {
          speaker: "arbab",
          speakerName: "মুদির (Arbab / Boss)",
          speakerRole: "কোম্পানি স্পন্সর",
          avatarIcon: "👳‍♂️",
          arabicScript: "خير يا طيب، إيش تبغى تقول لي بخصوص الفلوس؟",
          arabicBengali: "খায়ের ইয়া তাইয়িব, এশ তিবা তিগূল লী বি খুসুস আল-ফুলুস?",
          bengaliMeaning: "সব ঠিক আছে তো ভাই? টাকার বিষয়ে আমাকে কী বলতে চাচ্ছ?",
          englishMeaning: "All good brother? What did you want to tell me regarding money?",
          audioLang: "ar-SA",
        },
        {
          speaker: "worker",
          speakerName: "আপনি (Bengali Worker)",
          speakerRole: "প্রবাসী কর্মী",
          avatarIcon: "👷‍♂️",
          arabicScript: "لو سمحت يا مدير، عندي ظرف طارئ في البلاد، محتاج سلفة من الراتب إذا ممكن.",
          arabicBengali:
            "লাও সামাহ্ত ইয়া মুদির, ইন্দি যারফ তারি' ফিল বিলাদ, মুহ্তাজ সুলফাহ মিন আর-রাতিব ইজা মুমকিন।",
          bengaliMeaning:
            "দয়া করে যদি অনুমতি দেন স্যার, দেশে একটা জরুরি সমস্যা হয়েছে, সম্ভব হলে বেতন থেকে কিছু অ্যাডভান্স প্রয়োজন ছিল।",
          englishMeaning:
            "Excuse me boss, I have an emergency back home, need some advance salary if possible.",
          audioLang: "ar-SA",
          aiTip: "'লাও সামাহ্ত' (দয়া করে) এবং 'সুলফাহ' (অ্যাডভান্স) শব্দ দুটি অত্যন্ত কার্যকর।",
        },
      ],
    },
    {
      id: "delivery-address",
      title: "ডেলিভারি কাস্টমারের সাথে ঠিকানা নিশ্চিতকরণ",
      subtitle: "লোকেশন ও ফ্ল্যাট নম্বর সহজে বোঝা",
      badge: "রাইডার ও ড্রাইভার",
      dialogue: [
        {
          speaker: "arbab",
          speakerName: "কাস্টমার (Customer / UAE)",
          speakerRole: "দুবাই অ্যাপার্টমেন্ট রেসিডেন্ট",
          avatarIcon: "🧔‍♂️",
          arabicScript: "أنا الحين في البرج، الدور الخامس شقة 502، وينك الحين؟",
          arabicBengali: "আনা আলহীন ফিল বুরজ, আদ-দৌড় আল-খামিস শাক্কাহ ৫০২, ওয়েনাক আলহীন?",
          bengaliMeaning: "আমি এখন টাওয়ারের ৫তলার ৫০২ নম্বর ফ্ল্যাটে আছি, আপনি এখন কোথায়?",
          englishMeaning: "I am in the building, 5th floor flat 502, where are you now?",
          audioLang: "ar-SA",
        },
        {
          speaker: "worker",
          speakerName: "আপনি (Delivery Rider)",
          speakerRole: "তালাবাত / নুন রাইডার",
          avatarIcon: "🛵",
          arabicScript: "أنا عند المصعد طالع لك الحين دقيقة واحدة يا فندم.",
          arabicBengali: "আনা ইন্দাল মিস'য়াদ তালে' লাক আলহীন দাগীগাহ ওয়াহিদাহ ইয়া ফান্দিম।",
          bengaliMeaning: "আমি লিফটের সামনে আছি, এখনই ১ মিনিটের মধ্যে আসছি স্যার।",
          englishMeaning: "I am near the elevator, coming up right now in 1 minute sir.",
          audioLang: "ar-SA",
          aiTip: "'মিস'য়াদ' (লিফট) এবং 'দাগীগাহ ওয়াহিদাহ' (১ মিনিট) রাইডারদের সেরা ফ্রেজ।",
        },
      ],
    },
  ];

  const [activeScenarioId, setActiveScenarioId] = useState<string>("late-arrival");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [playingSpeaker, setPlayingSpeaker] = useState<string | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState<string>("");
  const [waitlistSuccess, setWaitlistSuccess] = useState<boolean>(false);

  const activeScenario =
    scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const currentStep = activeScenario.dialogue[currentStepIndex] || activeScenario.dialogue[0];

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
      // Random realistic score between 94% and 98%
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
    <section id="ai-voice" className="relative py-24 sm:py-32 bg-[#060e09] border-t border-gulf-500/20">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 right-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-hero-emerald-glow blur-[130px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gulf-400/30 bg-gulf-950/60 px-4 py-1.5 text-xs font-semibold text-gulf-300 backdrop-blur-md mb-4 shadow-lg shadow-gulf-950/40">
            <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
            <span>আসন্ন ফিচার প্রিভিউ (Upcoming AI Feature)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            রিমসলিন{" "}
            <span className="bg-gradient-to-r from-gulf-400 via-emerald-300 to-gold-400 bg-clip-text text-transparent">
              এআই ভয়েস কোচ
            </span>{" "}
            সিমুলেটর
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            সৌদি ও দুবাইয়ের মালিক (Arbab) এবং কাস্টমারের সাথে ভয়েস প্র্যাকটিস করুন। ভুল উচ্চারণ ধরিয়ে দেবে আমাদের ইন্টেলিজেন্ট এআই।
          </p>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {scenarios.map((scen) => (
            <button
              key={scen.id}
              onClick={() => {
                setActiveScenarioId(scen.id);
                setCurrentStepIndex(0);
                setHasRecorded(false);
                setAccuracyScore(null);
                setIsRecording(false);
              }}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeScenarioId === scen.id
                  ? "bg-gradient-to-r from-gulf-500 to-emerald-600 text-slate-950 font-bold shadow-lg shadow-gulf-500/20"
                  : "border border-white/10 bg-surface-100/70 text-slate-300 hover:bg-surface-200 hover:text-white"
              }`}
            >
              <span>{scen.title}</span>
              <span className="rounded-md bg-black/20 px-1.5 py-0.5 text-[10px] font-bold">
                {scen.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Main AI Simulator Interactive Card */}
        <div className="mt-10 max-w-4xl mx-auto rounded-3xl border border-gulf-500/30 bg-[#0a1610]/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-gulf-950/60">
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gulf-500/20 text-gulf-400 border border-gulf-500/30">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Rimslin AI Arbab Simulator</span>
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[11px] text-slate-400">
                  {activeScenario.subtitle}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentStepIndex(0);
                  setHasRecorded(false);
                  setAccuracyScore(null);
                  setIsRecording(false);
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-surface-100 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-surface-200"
              >
                <RotateCcw className="h-3 w-3" />
                <span>রিসেট</span>
              </button>
            </div>
          </div>

          {/* Dialogue Progression Box */}
          <div className="space-y-6">
            {/* Step 1: Arbab Line */}
            <div
              className={`rounded-2xl border p-5 transition-all ${
                currentStep.speaker === "arbab"
                  ? "border-gold-500/40 bg-[#141b12] shadow-lg shadow-gold-500/5"
                  : "border-white/[0.06] bg-surface-100/40 opacity-90"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeScenario.dialogue[0].avatarIcon}</span>
                  <div>
                    <div className="text-xs font-bold text-gold-400">
                      {activeScenario.dialogue[0].speakerName}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
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
                      ? "bg-gold-400 text-slate-950 animate-pulse"
                      : "border border-gold-500/30 bg-gold-950/50 text-gold-300 hover:bg-gold-900/60"
                  }`}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>
                    {playingSpeaker === "arbab" ? "শুনছেন..." : "আরবিকের ভয়েস শুনুন"}
                  </span>
                </button>
              </div>

              {/* Arabic Script & Bengali */}
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <div className="text-right text-lg font-arabic font-bold text-white leading-relaxed" dir="rtl">
                  {activeScenario.dialogue[0].arabicScript}
                </div>
                <div className="mt-2 text-sm font-bold text-gold-300">
                  উচ্চারণ: &ldquo;{activeScenario.dialogue[0].arabicBengali}&rdquo;
                </div>
                <div className="mt-1 text-xs text-slate-300 font-medium">
                  অর্থ: {activeScenario.dialogue[0].bengaliMeaning}
                </div>
              </div>
            </div>

            {/* Step 2: Worker Response Section */}
            <div className="rounded-2xl border border-gulf-500/40 bg-[#091a10] p-5 sm:p-6 shadow-xl shadow-gulf-950/50">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeScenario.dialogue[1].avatarIcon}</span>
                  <div>
                    <div className="text-xs font-bold text-gulf-300">
                      {activeScenario.dialogue[1].speakerName}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
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
                      ? "bg-gulf-400 text-slate-950 animate-pulse"
                      : "border border-gulf-500/30 bg-gulf-950/50 text-gulf-300 hover:bg-gulf-900/60"
                  }`}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>
                    {playingSpeaker === "worker" ? "শুনছেন..." : "আদর্শ উত্তর শুনুন"}
                  </span>
                </button>
              </div>

              {/* Target Response Script */}
              <div className="mt-4 pt-3 border-t border-white/[0.06]">
                <div className="text-xs font-semibold text-gulf-400 uppercase tracking-wider mb-1">
                  🗣️ আপনার যা বলা উচিত (Target Arabic):
                </div>
                <div className="text-right text-lg font-arabic font-bold text-white leading-relaxed" dir="rtl">
                  {activeScenario.dialogue[1].arabicScript}
                </div>
                <div className="mt-2 text-sm font-extrabold text-emerald-300">
                  &ldquo;{activeScenario.dialogue[1].arabicBengali}&rdquo;
                </div>
                <div className="mt-1 text-xs text-slate-300">
                  অর্থ: {activeScenario.dialogue[1].bengaliMeaning}
                </div>
              </div>

              {/* Interactive Microphone Box */}
              <div className="mt-6 flex flex-col items-center justify-center rounded-2xl bg-[#06110a] p-6 border border-gulf-500/20 text-center">
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
                    ? "রেকর্ডিং হচ্ছে... বাংলা উচ্চারণ দেখে কথা বলুন"
                    : "মাইক্রোফোনে চাপ দিয়ে আরবিতে উত্তর বলুন"}
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  {isRecording
                    ? "কথা শেষ হলে স্বয়ংক্রিয়ভাবে নির্ভুলতা বিশ্লেষণ করা হবে।"
                    : "আপনার ভয়েসের টোন ও সঠিক তাল চেক করবে রিমসলিন এআই।"}
                </p>

                {/* Score & Analysis Feedback */}
                {hasRecorded && accuracyScore && (
                  <div className="mt-5 w-full max-w-md rounded-xl bg-gulf-950/80 p-4 border border-gulf-400/50 animate-fade-in text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <span className="text-xs font-bold text-white">
                          এআই উচ্চারণ বিশ্লেষণ ফলাফল
                        </span>
                      </div>
                      <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-black text-emerald-300 border border-emerald-500/30">
                        {accuracyScore}% নির্ভুল
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-surface-200 overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-gulf-500 to-gold-400 transition-all duration-1000"
                        style={{ width: `${accuracyScore}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      🎉 <strong>অসাধারণ!</strong> মুদিরের সাথে এরকম বিনয়ী ও স্পষ্ট আরবিতে কথা বললে কোনো সমস্যা হবে না।
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
          </div>

          {/* Waitlist Callout */}
          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#07130b] p-6 text-center">
            <h4 className="text-base font-bold text-white">
              📱 রিমসলিন মোবাইল অ্যাপ ও ফুল এআই কোচ খুব শীঘ্রই আসছে!
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
              সবার আগে মোবাইল অ্যাপ এক্সেস পেতে আপনার মোবাইল বা ইমেইল দিয়ে ওয়েটলিস্টে যুক্ত থাকুন।
            </p>

            <form
              onSubmit={handleWaitlistSubmit}
              className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto"
            >
              <input
                type="text"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="আপনার ফোন নম্বর বা ইমেইল দিন"
                required
                className="w-full rounded-xl border border-white/15 bg-surface-100 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-gulf-400 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-gulf-500 to-gold-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:opacity-90 shrink-0"
              >
                <span>ওয়েটলিস্টে যুক্ত হোন</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            {waitlistSuccess && (
              <div className="mt-3 text-xs font-bold text-emerald-400">
                ✓ ধন্যবাদ! এআই অ্যাপ উন্মুক্ত হওয়ার সাথে সাথে আপনাকে মেসেজ পাঠানো হবে।
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
