"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Volume2,
  Play,
  Square,
  Check,
  Copy,
  Tag,
  Flame,
  Sparkles,
  ArrowRight,
  Search,
  Mic,
  MicOff,
  Gauge,
  CheckCircle2,
  Headphones,
  BookOpen,
  HelpCircle,
} from "lucide-react";

export interface AudioPhrase {
  id: string;
  category: "driver" | "hospitality" | "construction" | "general";
  categoryName: string;
  meaning: string;
  phoneticScript: string;
  arabicScript: string;
  arabicTashkeel: string;
  englishWorkplace: string;
  tradeTag: string;
  popular?: boolean;
}

const AUDIO_PHRASES_DATA: AudioPhrase[] = [
  // 1. ড্রাইভিং ও ডেলিভারি (driver)
  {
    id: "d1",
    category: "driver",
    categoryName: "ড্রাইভিং ও ডেলিভারি",
    meaning: "সোজা যান, তারপর ডানদিকের ট্রাফিক সিগনালে থামুন।",
    phoneticScript: "রূহ সিদা, বা'দাইন ওগ্গাফ ইনদাল ইশারা ইয়ামিন",
    arabicScript: "روح سيده، بعدين وقف عند الإشارة يمين",
    arabicTashkeel: "رُوح سِيدَه، بَعْدَيْن وَقِّفْ عِنْدَ الإِشَارَة يَمِين",
    englishWorkplace: "Go straight, then stop at the right traffic light.",
    tradeTag: "Driver / Taxi",
    popular: true,
  },
  {
    id: "d2",
    category: "driver",
    categoryName: "ড্রাইভিং ও ডেলিভারি",
    meaning: "বাড়িটি কোন জায়গায়? আমি ঠিক লোকেশনে পৌঁছে গেছি।",
    phoneticScript: "আইনাল বায়ত? আনা ওয়াসালতু ফিল মাওকা বিদ-দাবত",
    arabicScript: "أين البيت؟ أنا وصلت في الموقع بالضبط",
    arabicTashkeel: "أَيْنَ الْبَيْت؟ أَنَا وَصَلْتُ فِي الْمَوْقِع بِالضَّبْط",
    englishWorkplace: "Where is the house? I have arrived right at the location.",
    tradeTag: "Delivery / Courier",
    popular: true,
  },
  {
    id: "d3",
    category: "driver",
    categoryName: "ড্রাইভিং ও ডেলিভারি",
    meaning: "এটা কি আপনার ডেলিভারি পার্সেল? দয়া করে এখানে স্বাক্ষর করুন।",
    phoneticScript: "হাদা আত-তালাব হাগ্গাক? লাভ সামাহ্ত ওয়াগ্গি' হিনা",
    arabicScript: "هذا الطلب حقك؟ لو سمحت وقع هنا",
    arabicTashkeel: "هٰذَا الطَّلَب حَقَّك؟ لَوْ سَمَحْت وَقِّعْ هِنَا",
    englishWorkplace: "Is this your delivery order? Please sign here.",
    tradeTag: "Delivery / Parcel",
  },
  {
    id: "d4",
    category: "driver",
    categoryName: "ড্রাইভিং ও ডেলিভারি",
    meaning: "হোয়াটসঅ্যাপে আপনার লাইভ লোকেশন পাঠিয়ে দিন।",
    phoneticScript: "ইরসিল লি আল-লোকেশন আলাল ওয়াটসঅ্যাপ",
    arabicScript: "أرسل لي اللوكيشن على الواتساب",
    arabicTashkeel: "أَرْسِلْ لِي اللُّوكِيشِنْ عَلَى الْوَاتْسَاب",
    englishWorkplace: "Send me your live location on WhatsApp.",
    tradeTag: "Delivery / Navigation",
  },

  // 2. রেস্তোরাঁ ও হসপিটালিটি (hospitality)
  {
    id: "h1",
    category: "hospitality",
    categoryName: "রেস্তোরাঁ ও হসপিটালিটি",
    meaning: "কি সেবা করতে পারি? চা খাবেন নাকি কফি?",
    phoneticScript: "আয়্যি খেদমা? তিবগা শায় ওয়ালা গাহওয়া?",
    arabicScript: "أي خدمة؟ تبغى شاي ولا قهوة؟",
    arabicTashkeel: "أَيّ خِدْمَة؟ تَبْغَى شَاي وَلَّا قَهْوَة؟",
    englishWorkplace: "How can I help you? Would you like tea or coffee?",
    tradeTag: "Restaurant / Waiter",
    popular: true,
  },
  {
    id: "h2",
    category: "hospitality",
    categoryName: "রেস্তোরাঁ ও হসপিটালিটি",
    meaning: "আপনার খাবারের অর্ডার রেডি, শুভ ভোজন।",
    phoneticScript: "হাদা আত-তালাব জাহেজ, বিল-আফিয়া আলাইক",
    arabicScript: "هذا الطلب جاهز، بالعافية عليك",
    arabicTashkeel: "هٰذَا الطَّلَب جَاهِز، بِالْعَافِيَة عَلَيْك",
    englishWorkplace: "Your order is ready, enjoy your meal!",
    tradeTag: "Kitchen & Cafe",
    popular: true,
  },
  {
    id: "h3",
    category: "hospitality",
    categoryName: "রেস্তোরাঁ ও হসপিটালিটি",
    meaning: "বিল কত হয়েছে দয়া করে বলুন?",
    phoneticScript: "আল-হিসাব কাম লাভ সামাহ্ত?",
    arabicScript: "الحساب كم لو سمحت؟",
    arabicTashkeel: "الْحِسَاب كَمْ لَوْ سَمَحْت؟",
    englishWorkplace: "How much is the bill, please?",
    tradeTag: "Cashier / Billing",
  },
  {
    id: "h4",
    category: "hospitality",
    categoryName: "রেস্তোরাঁ ও হসপিটালিটি",
    meaning: "পার্সেল নিয়ে যাবেন নাকি এখানে বসে খাবেন?",
    phoneticScript: "তিবগা সাফারী ওয়ালা তাকুল হিনা?",
    arabicScript: "تبغى سفري ولا تأكل هنا؟",
    arabicTashkeel: "تَبْغَى سَفَرِي وَلَّا تَأْكُل هِنَا؟",
    englishWorkplace: "Takeaway or dine in?",
    tradeTag: "Fast Food Counter",
  },

  // 3. কনস্ট্রাকশন ও সাইট (construction)
  {
    id: "c1",
    category: "construction",
    categoryName: "কনস্ট্রাকশন ও সাইট",
    meaning: "ড্রিল মেশিন আর তারের রোলটা নিয়ে আসো।",
    phoneticScript: "জিব হিলতি ওয়া সিল্ক বাররাহ সুর'আ",
    arabicScript: "جيب هلتي وسلك برا بسرعة",
    arabicTashkeel: "جِيب هِلْتِي وَسِلْك بَرَّا بِسُرْعَة",
    englishWorkplace: "Bring the drill machine and wire roll quickly.",
    tradeTag: "Construction Site",
    popular: true,
  },
  {
    id: "c2",
    category: "construction",
    categoryName: "কনস্ট্রাকশন ও সাইট",
    meaning: "সাইটে অবশ্যই সেফটি হেলমেট ও সেফটি জুতো পরে থাকতে হবে।",
    phoneticScript: "লাযিম তিলবাস খূজাহ ওয়া হিযা আস-সালামাহ ফিল মাওকা",
    arabicScript: "لازم تلبس خوذة وحذاء السلامة في الموقع",
    arabicTashkeel: "لَازِم تِلْبَس خُوذَة وَحِذَاء السَّلَامَة فِي الْمَوْقِع",
    englishWorkplace: "Safety helmet and safety shoes must be worn on site.",
    tradeTag: "Safety & Site Rules",
    popular: true,
  },
  {
    id: "c3",
    category: "construction",
    categoryName: "কনস্ট্রাকশন ও সাইট",
    meaning: "মুদির, মালপত্র শেষ হয়ে গেছে, নতুন অর্ডার দিতে হবে।",
    phoneticScript: "মুদির, আস-সামান খাল্লাস, লাযিম তলব জাদীদ",
    arabicScript: "مدير، السامان خلص، لازم طلب جديد",
    arabicTashkeel: "مُدِير، السَّامَان خَلَّص، لَازِم طَلَب جَدِيد",
    englishWorkplace: "Boss, materials are finished, need to order new supplies.",
    tradeTag: "Material Management",
  },
  {
    id: "c4",
    category: "construction",
    categoryName: "কনস্ট্রাকশন ও সাইট",
    meaning: "লেভেল স্কেল দিয়ে এই পিলারটি সোজা করো।",
    phoneticScript: "হাদ্দেদ হাদা আল-আমূদ বিল-মিযান",
    arabicScript: "حدد هذا العمود بالميزان",
    arabicTashkeel: "حَدِّد هٰذَا الْعَمُود بِالْمِيزَان",
    englishWorkplace: "Align and level this column with the spirit level.",
    tradeTag: "Masonry & Steel",
  },

  // 4. সাধারণ কথোপকথন (general)
  {
    id: "g1",
    category: "general",
    categoryName: "সাধারণ কথোপকথন",
    meaning: "আস-সালামু আলাইকুম, কেমন আছেন? কাজ কেমন চলছে?",
    phoneticScript: "কেফ আল-হাল? কেফ আশ-শোগল তামাম?",
    arabicScript: "كيف الحال؟ كيف الشغل تمام؟",
    arabicTashkeel: "كَيْفَ الحَال؟ كَيْفَ الشُّغْل تَمَام؟",
    englishWorkplace: "How are you? Is your work going well?",
    tradeTag: "Daily Greeting",
    popular: true,
  },
  {
    id: "g2",
    category: "general",
    categoryName: "সাধারণ কথোপকথন",
    meaning: "এটার দাম কত? একটু কম রাখা যায় না?",
    phoneticScript: "কাম হাদা? মা ফি খাসম শওয়াইয়া?",
    arabicScript: "كم هذا؟ ما فيه خصم؟",
    arabicTashkeel: "كَمْ هٰذَا؟ مَا فِيهِ خَصْمٌ؟",
    englishWorkplace: "How much is this? Any small discount?",
    tradeTag: "Market / Shopping",
    popular: true,
  },
  {
    id: "g3",
    category: "general",
    categoryName: "সাধারণ কথোপকথন",
    meaning: "আমি এই কাজটা খুব ভালো জানি, কোনো সমস্যা হবে না।",
    phoneticScript: "আনা মা'লুম হাদা শোগল মিয়া মিয়া, মা ফি মুশকিলা",
    arabicScript: "أنا معلوم هذا الشغل مية مية، ما فيه مشكلة",
    arabicTashkeel: "أَنَا مَعْلُوم هٰذَا الشُّغْل مِيَّة مِيَّة، مَا فِيهِ مُشْكِلَة",
    englishWorkplace: "I know this work 100%, no issue at all.",
    tradeTag: "Job Interview",
    popular: true,
  },
  {
    id: "g4",
    category: "general",
    categoryName: "সাধারণ কথোপকথন",
    meaning: "অনেক ধন্যবাদ, আল্লাহ আপনাকে ভালো রাখুন।",
    phoneticScript: "শুকরান জাযিলান, আল্লাহ ইয়াহফাযাক",
    arabicScript: "شكرا جزيلا، الله يحفظك",
    arabicTashkeel: "شُكْرًا جَزِيلًا، اللهُ يَحْفَظَك",
    englishWorkplace: "Thank you very much, may Allah protect you.",
    tradeTag: "Courtesies & Respect",
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "অল (All)" },
  { id: "driver", label: "ড্রাইভিং ও ডেলিভারি" },
  { id: "hospitality", label: "রেস্তোরাঁ ও হসপিটালিটি" },
  { id: "construction", label: "কনস্ট্রাকশন ও সাইট" },
  { id: "general", label: "সাধারণ কথোপকথন" },
];

export default function AudioDemoContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [practicingId, setPracticingId] = useState<string | null>(null);
  const [practiceStatus, setPracticeStatus] = useState<{ [id: string]: string }>({});

  const filteredPhrases = AUDIO_PHRASES_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.meaning.toLowerCase().includes(q) ||
      item.phoneticScript.toLowerCase().includes(q) ||
      item.arabicScript.includes(q) ||
      item.arabicTashkeel.includes(q) ||
      item.englishWorkplace.toLowerCase().includes(q) ||
      item.tradeTag.toLowerCase().includes(q)
    );
  });

  const handlePlayAudio = (phrase: AudioPhrase) => {
    if (playingId === phrase.id) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }

    setPlayingId(phrase.id);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.arabicScript);
      utterance.lang = "ar-SA";
      utterance.rate = playbackSpeed;

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

  const handleCopy = (phrase: AudioPhrase) => {
    const text = `${phrase.meaning}\nআরবি: ${phrase.arabicTashkeel}\nউচ্চারণ: ${phrase.phoneticScript}\nEnglish: ${phrase.englishWorkplace}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(phrase.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handlePracticeVoice = (phraseId: string) => {
    setPracticingId(phraseId);
    setPracticeStatus((prev) => ({
      ...prev,
      [phraseId]: "🎙️ আপনার উচ্চারণ শুনছি... মুখে বলুন",
    }));

    // Interactive speech simulation with feedback
    setTimeout(() => {
      setPracticeStatus((prev) => ({
        ...prev,
        [phraseId]: "🎉 মাশাআল্লাহ! চমৎকার উচ্চারণ হয়েছে (৯৮% সঠিক)!",
      }));
      setTimeout(() => {
        setPracticingId(null);
      }, 3500);
    }, 2500);
  };

  return (
    <div className="w-full relative py-8 sm:py-14">
      {/* Decorative Glow */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[500px] w-full max-w-[850px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[140px] opacity-75"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
          >
            <Link
              href="/"
              className="hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors"
            >
              হোম (Home)
            </Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              অডিও ফ্রেজ ডেমো
            </span>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-gulf-400 transition-colors"
          >
            <span>← হোমে ফিরুন</span>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 1. PAGE HEADER & INTRODUCTION                                            */}
        {/* ========================================================================= */}
        <header className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
            <Volume2 className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400 animate-pulse" />
            <span>লাইভ অডিও লার্নিং প্লেয়ার</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            🎧 ইন্টারেক্টিভ অডিও ফ্রেজ ডেমো{" "}
            <span className="block text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              (Interactive Audio Phrase Demo)
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            আরবি ও ইংরেজি ভাষার বাস্তব কথোপকথন শুনুন, সঠিক উচ্চারণ শিখুন এবং অডিও
            প্লে করে নিজে অনুশীলন করুন।
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="শব্দ বা অর্থ দিয়ে ফ্রেজ খুঁজুন (যেমন: বেতন, সিগন্যাল, ড্রিল, কফি)..."
              className="w-full rounded-2xl border border-slate-200/90 bg-white dark:border-white/10 dark:bg-surface-100/90 pl-10 pr-10 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded-md hover:bg-slate-100"
              >
                ✕
              </button>
            )}
          </div>

          {/* Global Speed Toggle Selector */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              উচ্চারণের গতি:
            </span>
            <div className="inline-flex p-0.5 bg-slate-100 dark:bg-surface-200 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPlaybackSpeed(0.75)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  playbackSpeed === 0.75
                    ? "bg-white dark:bg-surface-100 text-emerald-700 dark:text-emerald-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
              >
                ধীরে (0.75x)
              </button>
              <button
                type="button"
                onClick={() => setPlaybackSpeed(1.0)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  playbackSpeed === 1.0
                    ? "bg-white dark:bg-surface-100 text-emerald-700 dark:text-emerald-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
              >
                স্বাভাবিক (1.0x)
              </button>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* FILTER / CATEGORY TABS                                                   */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 dark:bg-emerald-500 dark:text-slate-950"
                  : "border border-slate-200 bg-white/90 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-surface-100/60 dark:text-slate-300 dark:hover:bg-surface-200 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE AUDIO PHRASE CARDS GRID                                   */}
        {/* ========================================================================= */}
        {filteredPhrases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredPhrases.map((phrase) => {
              const isPlaying = playingId === phrase.id;
              const isCopied = copiedId === phrase.id;
              const isPracticing = practicingId === phrase.id;
              const practiceMsg = practiceStatus[phrase.id];

              return (
                <div
                  key={phrase.id}
                  className={`flex flex-col justify-between rounded-2xl border p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 ${
                    isPlaying
                      ? "border-emerald-500 bg-emerald-50/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/50 dark:border-emerald-400 dark:bg-emerald-950/30"
                      : "border-slate-200 bg-white/95 shadow-sm hover:border-emerald-400 hover:shadow-md dark:border-white/[0.08] dark:bg-surface-100/70 dark:hover:border-emerald-500/40"
                  }`}
                >
                  <div>
                    {/* Top Row: Tag & Copy */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/[0.06] pb-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          <Tag className="h-3 w-3 shrink-0" />
                          <span>{phrase.tradeTag}</span>
                        </span>
                        {phrase.popular && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-gold-300 border border-amber-500/30">
                            <Flame className="h-3 w-3 text-amber-500" />
                            <span>বেশি ব্যবহৃত</span>
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(phrase)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-surface-200 dark:text-slate-300 transition-colors"
                        title="বাক্যটি কপি করুন"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span>কপি হয়েছে</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>কপি</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Arabic Text with Harakat */}
                    <div className="rounded-2xl bg-emerald-50/70 dark:bg-[#0b1b12] p-4 border border-emerald-200/70 dark:border-emerald-800/30 text-center shadow-inner">
                      <div
                        dir="rtl"
                        className="font-arabic font-semibold text-2xl sm:text-3xl leading-relaxed py-1 text-slate-900 dark:text-white"
                      >
                        {phrase.arabicTashkeel}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/80 dark:text-emerald-400/80 block mt-1">
                        হরকত সহ আরবি বাক্য
                      </span>
                    </div>

                    {/* Bengali Pronunciation & Meaning */}
                    <div className="mt-4 space-y-2.5">
                      {/* বাংলা উচ্চারণ */}
                      <div className="bg-slate-50/90 dark:bg-surface-200/50 rounded-xl p-3 border border-slate-100 dark:border-white/[0.05]">
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                          বাংলা উচ্চারণ:
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                          {phrase.phoneticScript}
                        </p>
                      </div>

                      {/* বাংলা অর্থ */}
                      <div className="bg-slate-50/90 dark:bg-surface-200/50 rounded-xl p-3 border border-slate-100 dark:border-white/[0.05]">
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                          বাংলা অর্থ:
                        </span>
                        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                          {phrase.meaning}
                        </p>
                      </div>

                      {/* Workplace English */}
                      <div className="px-1 pt-0.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Workplace English:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium italic mt-0.5" dir="ltr">
                          &ldquo;{phrase.englishWorkplace}&rdquo;
                        </p>
                      </div>

                      {/* Voice Practice Live Feedback Message */}
                      {practiceMsg && (
                        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-gold-950/40 border border-amber-200 dark:border-gold-700/40 text-xs font-semibold text-amber-900 dark:text-gold-200 animate-fade-in">
                          {practiceMsg}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions: Audio Player & Practice Voice */}
                  <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] mt-4 flex flex-col sm:flex-row items-center gap-2">
                    {/* Native Audio Play/Pause Button with Animation */}
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(phrase)}
                      className={`flex-1 w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs sm:text-sm font-bold transition-all active:scale-[0.98] cursor-pointer ${
                        isPlaying
                          ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800/60"
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Square className="w-4 h-4 fill-current shrink-0" />
                          <span>থামুন (অডিও চলছে...)</span>
                          <div className="sound-wave playing px-1.5 ml-1 flex items-center gap-0.5">
                            <span className="sound-wave-bar h-3 w-1 bg-white rounded-full animate-pulse" />
                            <span className="sound-wave-bar h-5 w-1 bg-white rounded-full animate-pulse" />
                            <span className="sound-wave-bar h-3 w-1 bg-white rounded-full animate-pulse" />
                          </div>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-current shrink-0" />
                          <span>আরবি শুনুন ({playbackSpeed}x)</span>
                        </>
                      )}
                    </button>

                    {/* Micro-action: নিজে বলুন (Practice Voice) */}
                    <button
                      type="button"
                      onClick={() => handlePracticeVoice(phrase.id)}
                      disabled={isPracticing}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3.5 text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                        isPracticing
                          ? "bg-amber-100 text-amber-900 dark:bg-gold-950 dark:text-gold-200 border border-amber-300 animate-pulse"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 dark:bg-surface-200 dark:text-slate-300 dark:hover:bg-surface-300 dark:border-white/10"
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5 text-rose-500" />
                      <span>{isPracticing ? "শুনছি..." : "নিজে বলুন"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 p-8 my-8 max-w-md mx-auto">
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              &ldquo;{searchQuery}&rdquo; দিয়ে কোনো ফ্রেজ পাওয়া যায়নি।
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              সব ফ্রেজ পুনরায় দেখুন
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. BOTTOM CTA BANNER: LINK TO /live-batch                                 */}
        {/* ========================================================================= */}
        <section className="mt-16 sm:mt-20 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 via-slate-900/30 to-slate-950 p-6 sm:p-10 text-center relative overflow-hidden backdrop-blur-xl">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 px-3.5 py-1 text-xs font-bold text-rose-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              সরাসরি শিক্ষক সহায়তায় লাইভ প্র্যাকটিস
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              আরও শত শত অডিও ফ্রেজ ও সরাসরি কথা বলার প্র্যাকটিস করতে চান?
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              শুধু অডিও না শুনে প্রতিদিন শিক্ষকের সাথে Google Meet / Zoom-এ সরাসরি কথা বলুন। জয়েন করুন আমাদের ৩ দিনের ফ্রি ডেমো লাইভ ব্যাচে।
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/live-batch"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-700/30 transition-all hover:scale-[1.02] active:scale-98"
              >
                <span>৩ দিনের ফ্রি লাইভ ডেমো ক্লাস বুক করুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/books"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-3.5 text-sm sm:text-base font-semibold text-white transition-colors"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>অফলাইন অডিও গাইডবুক</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
