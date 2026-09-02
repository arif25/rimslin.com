"use client";

import { useState } from "react";
import {
  Volume2,
  Play,
  Square,
  Sparkles,
  Check,
  Copy,
  Tag,
  Flame,
  Globe2,
} from "lucide-react";

interface Phrase {
  id: string;
  category: string;
  categoryName: string;
  bengaliMeaning: string;
  arabicBengali: string;
  arabicPhonetic: string;
  arabicScript: string;
  englishWorkplace: string;
  tradeTag: string;
  popular?: boolean;
}

export default function AudioPhraseDemo() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "সব ফ্রেজ (All)" },
    { id: "daily", label: "বাজার ও কেনাকাটা" },
    { id: "salary", label: "বেতন ও কাজ" },
    { id: "construction", label: "সাইট ও টেকনিক্যাল" },
    { id: "driver", label: "ড্রাইভিং ও লোকেশন" },
    { id: "emergency", label: "জরুরি ও সিকিউরিটি" },
  ];

  const phrases: Phrase[] = [
    {
      id: "p1",
      category: "daily",
      categoryName: "বাজার ও কেনাকাটা",
      bengaliMeaning: "এটার দাম কত? একটু কম রাখা যায় না?",
      arabicBengali: "কাম হাদা? মা ফি কাচ্ছির খালাস?",
      arabicPhonetic: "Kam Hadha? Ma Fee Kasseer?",
      arabicScript: "كم هذا؟ ما فيه خصم؟",
      englishWorkplace: "How much is this? Any discount?",
      tradeTag: "Shop / Daily Life",
      popular: true,
    },
    {
      id: "p2",
      category: "salary",
      categoryName: "বেতন ও কাজ",
      bengaliMeaning: "মুদির, আমার এই মাসের বেতন কবে দিবেন?",
      arabicBengali: "মুদির, মিতা জিব রাতিব হাগ্গা হাদা শাহর?",
      arabicPhonetic: "Mudeer, mita jeeb ratib hagga hadha shahr?",
      arabicScript: "مدير، متى يجيب الراتب حق هذا الشهر؟",
      englishWorkplace: "Boss, when will I get my salary this month?",
      tradeTag: "Salary & HR",
      popular: true,
    },
    {
      id: "p3",
      category: "construction",
      categoryName: "সাইট ও টেকনিক্যাল",
      bengaliMeaning: "ড্রিল মেশিন আর তারের রোলটা নিয়ে আসো।",
      arabicBengali: "জিব হিলতি ওয়া সিল্ক বাররাহ সুরআ।",
      arabicPhonetic: "Jeeb Hilti wa Silk barra sur'ah.",
      arabicScript: "جيب هلتي وسلك برا بسرعة",
      englishWorkplace: "Bring the drill machine and wire roll quickly.",
      tradeTag: "Construction Site",
      popular: true,
    },
    {
      id: "p4",
      category: "driver",
      categoryName: "ড্রাইভিং ও লোকেশন",
      bengaliMeaning: "সোজা যান, তারপর ডানদিকের ট্রাফিক সিগনালে থামুন।",
      arabicBengali: "রো সিদা, বা'দাইন ওগ্গাফ ইশারা ইয়ামিন।",
      arabicPhonetic: "Ro seeda, ba'dain oggaf ishara yameen.",
      arabicScript: "روح سيده، بعدين وقف إشارة يمين",
      englishWorkplace: "Go straight, then stop at the right traffic light.",
      tradeTag: "Driver / Delivery",
      popular: true,
    },
    {
      id: "p5",
      category: "daily",
      categoryName: "বাজার ও কেনাকাটা",
      bengaliMeaning: "কেমন আছেন? কাজ কেমন চলছে?",
      arabicBengali: "কেফ হাল? কেফ আশ-শোগল তামাম?",
      arabicPhonetic: "Kayf hal? Kayf ash-shughul tamam?",
      arabicScript: "كيف الحال؟ كيف الشغل تمام؟",
      englishWorkplace: "How are you? Is your work going well?",
      tradeTag: "Daily Greeting",
    },
    {
      id: "p6",
      category: "salary",
      categoryName: "বেতন ও কাজ",
      bengaliMeaning: "আমি এই কাজটা খুব ভালো জানি, কোনো সমস্যা হবে না।",
      arabicBengali: "আনা মা'লুম হাদা শোগল মিয়া মিয়া, মা ফি মুশকিলা।",
      arabicPhonetic: "Ana ma'loom hadha shughul miya miya, mafi mushkila.",
      arabicScript: "أنا معلوم هذا الشغل مية مية، ما فيه مشكلة",
      englishWorkplace: "I know this work 100%, no issue at all.",
      tradeTag: "Job Interview",
      popular: true,
    },
    {
      id: "p7",
      category: "emergency",
      categoryName: "জরুরি ও সিকিউরিটি",
      bengaliMeaning: "আমার খুব শরীর খারাপ, আমাকে হাসপাতালে নিয়ে চলুন।",
      arabicBengali: "আনা মারিদ মাররাহ, ওয়াদিনী মুসতাশফা সুরআ।",
      arabicPhonetic: "Ana mareed marrah, waddeeni mustashfa sur'ah.",
      arabicScript: "أنا مريض مرة، وديني مستشفى بسرعة",
      englishWorkplace: "I am feeling very sick, please take me to the clinic.",
      tradeTag: "Hospital / Safety",
    },
    {
      id: "p8",
      category: "construction",
      categoryName: "সাইট ও টেকনিক্যাল",
      bengaliMeaning: "কাজ শেষ হয়ে গেছে, এখন চেক করে দেখুন।",
      arabicBengali: "খালাস শোগল, আলহীন শ্যূফ কুল্লু তারকিব তামাম।",
      arabicPhonetic: "Khalas shughul, alheen shoof kullu tarkib tamam.",
      arabicScript: "خلاص الشغل، الحين شوف كله تركيب تمام",
      englishWorkplace: "Work is completed, please inspect the fittings now.",
      tradeTag: "Supervisor Inspection",
    },
    {
      id: "p9",
      category: "driver",
      categoryName: "ড্রাইভিং ও লোকেশন",
      bengaliMeaning: "আমি আপনার লোকেশনে ৫ মিনিটের মধ্যে আসছি।",
      arabicBengali: "আনা ওয়াসেল ফি মাওকি' হাক খামসা দাগায়িগ।",
      arabicPhonetic: "Ana wasel fee mawqi' hak khamsa dagayig.",
      arabicScript: "أنا واصل في موقعك خمس دقائق",
      englishWorkplace: "I will arrive at your location in 5 minutes.",
      tradeTag: "Delivery Rider",
    },
    {
      id: "p10",
      category: "daily",
      categoryName: "হোটেল ও রেস্টুরেন্ট",
      bengaliMeaning: "আপনাদের চা ও কফি রেডি, গরম গরম পরিবেশন করছি।",
      arabicBengali: "শায় ওয়া গাহওয়া জাহেয, আলহীন জিব হার মাররাহ।",
      arabicPhonetic: "Shay wa gahwah jahez, alheen jeeb haar marrah.",
      arabicScript: "شاي وقهوة جاهز، الحين أجيب حار",
      englishWorkplace: "Tea and coffee are ready, serving hot right now.",
      tradeTag: "Restaurant / Waiter",
      popular: true,
    },
    {
      id: "p11",
      category: "salary",
      categoryName: "বেতন ও কাজ",
      bengaliMeaning: "মুদির, আমি গত ২ বছর ধরে সততার সাথে কাজ করছি, বেতন একটু বাড়ান।",
      arabicBengali: "মুদির, আনা শোগল সানা-তাইন আমীন, লাযিম যিয়াদাহ রাতিব শুয়াইয়া।",
      arabicPhonetic: "Mudeer, ana shughul sana-tayn ameen, lazim ziyadah ratib shuwayya.",
      arabicScript: "مدير، أنا شغل سنتين أمين، لازم زيادة راتب شوية",
      englishWorkplace: "Boss, I worked 2 years honestly, please increase my salary.",
      tradeTag: "Salary Appraisal",
      popular: true,
    },
    {
      id: "p12",
      category: "construction",
      categoryName: "সাইট ও টেকনিক্যাল",
      bengaliMeaning: "সেফটি হেলমেট ও জুতো ছাড়া সাইটে যাওয়া নিষেধ।",
      arabicBengali: "মামনু' দখুল সাইট বিদুন খুদাহ ওয়া জাযমাহ সেফটি।",
      arabicPhonetic: "Mamnoo' dukhool site bidoon khoodah wa jazmah safety.",
      arabicScript: "ممنوع دخول الموقع بدون خوذة وجزمة سيفتي",
      englishWorkplace: "Entry to site forbidden without helmet and safety shoes.",
      tradeTag: "HSE / Site Safety",
    },
  ];

  const [speechRate, setSpeechRate] = useState<number>(0.85);

  const filteredPhrases =
    activeCategory === "all"
      ? phrases
      : phrases.filter((p) => p.category === activeCategory);

  const handlePlayAudio = (phrase: Phrase) => {
    if (playingId === phrase.id) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }

    setPlayingId(phrase.id);

    // Speak using Arabic or fallback synthesizer
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.arabicScript);
      utterance.lang = "ar-SA";
      utterance.rate = speechRate;

      utterance.onend = () => {
        setPlayingId(null);
      };

      utterance.onerror = () => {
        setTimeout(() => {
          setPlayingId(null);
        }, 2200);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setPlayingId(null);
      }, 2200);
    }
  };

  const handleCopy = (phrase: Phrase) => {
    const text = `${phrase.bengaliMeaning}\nগালফ আরবি: ${phrase.arabicBengali}\nEnglish: ${phrase.englishWorkplace}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(phrase.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="audio-demo" className="relative py-20 sm:py-28 bg-[#07110c] border-y border-gulf-500/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-950/40 px-3.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur-md mb-4">
            <Volume2 className="h-3.5 w-3.5 text-gold-400" />
            <span>ইন্টারেক্টিভ অডিও ফ্রেজ ডেমো (Playable Audio Demo)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            প্রবাসীদের দৈনন্দিন কাজের{" "}
            <span className="gradient-gulf-text">প্রয়োজনীয় আরবি ও ইংরেজি বাক্য</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            নিচের যেকোনো কার্ডে <span className="text-gulf-400 font-bold">Play Audio</span> বাটনে ক্লিক করে সঠিক
            উচ্চারণ শুনুন এবং সহজেই রপ্ত করুন।
          </p>
        </div>

        {/* Category Filter Tabs & Speed Toggle */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-gulf-500 text-slate-950 shadow-lg shadow-gulf-500/20 font-bold"
                    : "border border-white/10 bg-surface-100/60 text-slate-300 hover:bg-surface-200 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Speed Toggle */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface-100/60 px-3 py-1 text-xs text-slate-300">
            <span className="text-[11px] text-slate-400">উচ্চারণ গতি:</span>
            <button
              type="button"
              onClick={() => setSpeechRate(0.7)}
              className={`rounded px-2 py-0.5 font-bold transition-colors ${
                speechRate <= 0.75
                  ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                  : "hover:text-white text-slate-400"
              }`}
            >
              ধীরে (0.7x)
            </button>
            <button
              type="button"
              onClick={() => setSpeechRate(0.95)}
              className={`rounded px-2 py-0.5 font-bold transition-colors ${
                speechRate > 0.75
                  ? "bg-gulf-500/20 text-gulf-300 border border-gulf-500/30"
                  : "hover:text-white text-slate-400"
              }`}
            >
              স্বাভাবিক (1.0x)
            </button>
          </div>
        </div>

        {/* Phrases Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPhrases.map((phrase) => {
            const isPlaying = playingId === phrase.id;
            const isCopied = copiedId === phrase.id;

            return (
              <div
                key={phrase.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 ${
                  isPlaying
                    ? "border-gulf-400 bg-gulf-950/40 shadow-xl shadow-gulf-500/20 ring-1 ring-gulf-400/50 scale-[1.01]"
                    : "border-white/[0.08] bg-surface-100/70 hover:border-gulf-500/40 hover:bg-surface-200/80"
                }`}
              >
                {/* Card Top Strip */}
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-4">
                    <span className="inline-flex items-center gap-1 rounded-md bg-gulf-500/10 px-2.5 py-1 text-[11px] font-semibold text-gulf-300 border border-gulf-500/20">
                      <Tag className="h-3 w-3" />
                      {phrase.tradeTag}
                    </span>

                    {phrase.popular && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold text-gold-300 border border-gold-500/30">
                        <Flame className="h-3 w-3 text-gold-400" />
                        বেশি ব্যবহৃত
                      </span>
                    )}
                  </div>

                  {/* Bengali Meaning */}
                  <div className="mb-4">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      বাংলা অর্থ (Meaning)
                    </div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {phrase.bengaliMeaning}
                    </div>
                  </div>

                  {/* Gulf Arabic in Bengali Script & Phonetic */}
                  <div className="mb-4 rounded-xl bg-[#0b1b12] p-3 border border-gulf-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gulf-400 uppercase tracking-wider">
                        গালফ আরবি উচ্চারণ
                      </span>
                      <span className="text-xs font-arabic text-slate-300" dir="rtl">
                        {phrase.arabicScript}
                      </span>
                    </div>
                    <div className="text-sm font-extrabold text-gold-300 mt-1">
                      &quot;{phrase.arabicBengali}&quot;
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 mt-0.5">
                      Phonetic: {phrase.arabicPhonetic}
                    </div>
                  </div>

                  {/* Workplace English */}
                  <div className="mb-6">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      কাজের ইংরেজি (Workplace English)
                    </div>
                    <div className="text-xs font-medium text-slate-200 italic mt-0.5">
                      &ldquo;{phrase.englishWorkplace}&rdquo;
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Play Audio & Copy */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(phrase)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all ${
                      isPlaying
                        ? "bg-gulf-400 text-slate-950 shadow-md shadow-gulf-400/30"
                        : "bg-gradient-to-r from-gulf-600 to-emerald-600 text-white hover:opacity-90 shadow-md shadow-gulf-900/30"
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Square className="h-3.5 w-3.5 fill-current" />
                        <span>থামুন (Playing...)</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Play Audio (আরবি শুনুন)</span>
                      </>
                    )}
                  </button>

                  {/* Sound visualizer wave bars when active */}
                  {isPlaying ? (
                    <div className="sound-wave playing px-2">
                      <span className="sound-wave-bar h-4" />
                      <span className="sound-wave-bar h-5" />
                      <span className="sound-wave-bar h-3" />
                      <span className="sound-wave-bar h-6" />
                      <span className="sound-wave-bar h-4" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCopy(phrase)}
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-surface-200 p-2.5 text-slate-300 transition-colors hover:text-white hover:bg-surface-300"
                      title="বাক্যটি কপি করুন"
                      aria-label="Copy phrase"
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-gulf-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-300">
            💡 পুরো কোর্সে এমন <strong className="text-gold-300">১,০০০+ বাস্তব জীবনের কাজের অডিও ফ্রেজ</strong> রয়েছে যা আপনি অফলাইনেও শুনতে পারবেন।
          </p>
        </div>
      </div>
    </section>
  );
}
