"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollButton from "@/components/EnrollButton";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ShieldCheck,
  Award,
  Mic,
  Headphones,
  Users,
  Briefcase,
  Layers,
  HelpCircle,
  ArrowRight,
  Zap,
  Globe2,
  Check,
  Minus,
} from "lucide-react";

interface SyllabusModule {
  id: string;
  durationLabel: string;
  title: string;
  summary: string;
  topics: string[];
  sampleDialogue?: {
    arabic: string;
    pronunciation: string;
    bangla: string;
  };
}

interface CourseTier {
  id: string;
  sectionId: string;
  tierNumber: string;
  duration: string;
  durationEn: string;
  badge: string;
  popular?: boolean;
  price: number;
  originalPrice: number;
  discount: string;
  title: string;
  subtitle: string;
  targetProfessions: string[];
  overview: string;
  modules: SyllabusModule[];
  aiCoachDetails: string;
  benefits: string[];
}

const courseTiers: CourseTier[] = [
  {
    id: "3m",
    sectionId: "starter",
    tierNumber: "০১",
    duration: "৩ মাস মেয়াদী",
    durationEn: "3 Months Starter",
    badge: "নতুনদের জন্য সেরা",
    price: 1950,
    originalPrice: 3500,
    discount: "৪৪% ছাড়",
    title: "এয়ারপোর্ট ও ডেইলি সারভাইভাল আরবি কোর্স",
    subtitle:
      "প্রথমবার দেশ ছাড়ার পূর্বে বিমানবন্দর, ইমিগ্রেশন, রাস্তাঘাট ও দৈনন্দিন প্রয়োজনীয় কথপোকথনের সম্পূর্ণ প্রস্তুতি।",
    targetProfessions: [
      "🚗 ড্রাইভার ও ডেলিভারি রাইডার",
      "🧹 ক্লিনার ও সাধারণ কর্মী",
      "📦 ফ্যাক্টরি ও ওয়্যারহাউজ লেবার",
      "✈️ প্রথমবার বিদেশগামী যেকোনো কর্মী",
    ],
    overview:
      "নতুন কর্মীদের সবচেয়ে বড় ভীতি থাকে এয়ারপোর্ট ইমিগ্রেশন এবং গালফে নেমে রাস্তা বা দোকানে সঠিক কথা বলা নিয়ে। এই কোর্সটি বিশেষভাবে ডিজাইন করা হয়েছে যেন দেশ ছাড়ার আগেই আপনি স্বাভাবিকভাবে চলতে পারেন এবং কারও মুখাপেক্ষী না হতে হয়।",
    modules: [
      {
        id: "3m-m1",
        durationLabel: "মাস ০১",
        title: "এয়ারপোর্ট, ইমিগ্রেশন ও জরুরি ট্রাভেল প্রস্তুতি",
        summary: "ঢাকা বিমানবন্দর থেকে গালফে ল্যান্ডিং পর্যন্ত প্রতিটি ধাপের প্রয়োজনীয় কথোপকথন।",
        topics: [
          "ইমিগ্রেশন অফিসারের প্রশ্ন ও সঠিক উত্তর দেওয়ার কৌশল",
          "লাগেজ ক্লেইম, কাস্টমস ও বোর্ডিং ডায়ালগ",
          "গালফের লোকাল সিম কার্ড ও ইন্টারনেট চাওয়ার ভাষা",
          "এয়ারপোর্ট থেকে বের হয়ে ট্যাক্সি নেওয়া ও লোকেশন বোঝানো",
        ],
        sampleDialogue: {
          arabic: "মিন ফাদলিক, ওয়েইন মোকান আল-ইমিগ্রেশন?",
          pronunciation: "মিন ফাদলিক, ওয়েন মাকান আল-ইমিগ্রেশন?",
          bangla: "দয়া করে বলুন, ইমিগ্রেশন কাউন্টার কোনদিকে?",
        },
      },
      {
        id: "3m-m2",
        durationLabel: "মাস ০২",
        title: "রাস্তাঘাট, পরিবহন ও বাক্কালা (দোকান) কেনাকাটা",
        summary: "দৈনন্দিন চলাচল, কেনাকাটা ও টাকা-পয়সার হিসাব সহজেই সম্পন্ন করার ডায়ালগ।",
        topics: [
          "ট্যাক্সি ড্রাইভারের সাথে গন্তব্য, দিকনির্দেশনা ও ভাড়ার কথা",
          "বাক্কালা (মুদি দোকান) ও সুপারমার্কেটে জিনিসপত্র কেনা",
          "খাবারের দোকানে খাবার অর্ডার ও বিল পরিশোধ",
          "১ থেকে ১০০ পর্যন্ত আরবি সংখ্যা ও রিয়াল/দিরহামের হিসাব",
        ],
        sampleDialogue: {
          arabic: "বিকাম হাদা? আবগা হাদা শাই হালিক।",
          pronunciation: "বিকাম হাদা? আবগা হাদা শাই হালিব।",
          bangla: "এটার দাম কত? আমি এক কাপ দুধ চা চাই।",
        },
      },
      {
        id: "3m-m3",
        durationLabel: "মাস ০৩",
        title: "জরুরি স্বাস্থ্যসেবা, নিরাপত্তা ও কর্মক্ষেত্র শিষ্টাচার",
        summary: "অসুস্থ হলে সাহায্য চাওয়া, নিরাপত্তা নিয়ম এবং সহকর্মীদের সাথে প্রাথমিক ভাববিনিময়।",
        topics: [
          "ফার্মেসিতে গিয়ে নিজের অসুস্থতা প্রকাশ ও ওষুধ চাওয়া",
          "পুলিশ বা সিকিউরিটির সাথে কথা বলার নিয়ম ও শিষ্টাচার",
          "কাজের সাধারণ হাঁ-না, সময়মতো উপস্থিতি ও প্রাথমিক কম্যান্ড বোঝা",
          "কুশল বিনিময় ও প্রয়োজনীয় দৈনন্দিন ১০০+ গোল্ডেন বাক্য",
        ],
        sampleDialogue: {
          arabic: "আনা মারিদ জিব্বান, আবগা দাওয়া লিস-সুদা।",
          pronunciation: "আনা মারীদ্ব জিদ্দান, আবগা দাওয়া লিস-সুদা।",
          bangla: "আমি খুব অসুস্থ, আমার মাথার ব্যথার ওষুধ প্রয়োজন।",
        },
      },
    ],
    aiCoachDetails:
      "সারভাইভাল মোড: এয়ারপোর্ট ইমিগ্রেশন অফিসার ও ট্যাক্সি ড্রাইভারের সিমুলেশন বট। বাস্তব পরিস্থিতিতে কথা বলে মুখের জড়তা দূর করার সুবিধা।",
    benefits: [
      "৩৫০+ বাস্তব অডিও ক্লিপ (ডাউনলোডযোগ্য অফলাইন এক্সেস)",
      "মোবাইল ও ওয়েব অ্যাপ থেকে আজীবন পড়ার সুযোগ",
      "১,০০০+ দৈনন্দিন সারভাইভাল শব্দভাণ্ডার ও বাক্যতালিকা",
      "সহজ বাংলা উচ্চারণ ও ব্যাকরণহীন স্পোকেন পদ্ধতি",
      "কোর্স সমাপনী ডিজিটাল সার্টিফিকেট",
    ],
  },
  {
    id: "6m",
    sectionId: "workplace-pro",
    tierNumber: "০২",
    duration: "৬ মাস মেয়াদী",
    durationEn: "6 Months Workplace Pro",
    badge: "সবচেয়ে জনপ্রিয় চয়েস",
    popular: true,
    price: 3450,
    originalPrice: 6000,
    discount: "৪৩% ছাড়",
    title: "ওয়ার্কপ্লেস কমিউনিকেশন, স্যালারি টক ও প্রফেশনাল স্পোকেন",
    subtitle:
      "কাজের সাইট, সুপারভাইজার, ইঞ্জিনিয়ার ও মুদিরের সাথে সরাসরি কাজের নির্দেশ বোঝা এবং বেতন বৃদ্ধির আলোচনার স্বয়ংসম্পূর্ণ কোর্স।",
    targetProfessions: [
      "🏗️ কনস্ট্রাকশন ও সিভিল সাইট ওয়ার্কার",
      "🔧 মেকানিক, ইলেকট্রিশিয়ান ও প্লাম্বার",
      "🍽️ রেস্তোরাঁ শেফ, ওয়েটার ও কিচেন হেল্পার",
      "🏪 রিটেইল শপ, শোরুম ও সুপারশপ কর্মী",
    ],
    overview:
      "মধ্যপ্রাচ্যে বেশিরভাগ কর্মীর বেতন আটকে থাকে শুধুমাত্র সঠিক আরবিতে বসের সাথে কথা বলতে না পারার কারণে। এই কোর্সে ৩ মাসের সম্পূর্ণ সারভাইভাল মডিউলের পাশাপাশি সাইট টেকনিক্যাল পরিভাষা, ওভারটাইম হিসাব এবং বেতন বৃদ্ধির সুনির্দিষ্ট নেগোশিয়েশন শেখানো হয়।",
    modules: [
      {
        id: "6m-m1",
        durationLabel: "মাস ০১-০২",
        title: "৩ মাসের সারভাইভাল + টেকনিক্যাল টুলস ও পরিভাষা",
        summary: "ফাউন্ডেশন ঝালাই করার পাশাপাশি কাজের সাইটের সরঞ্জাম ও পরিমাপের সম্পূর্ণ আরবি।",
        topics: [
          "৩ মাসের সম্পূর্ণ এয়ারপোর্ট ও ট্রাভেল মডিউল অন্তর্ভুক্ত",
          "নির্মাণ, ওয়ার্কশপ ও টেকনিক্যাল যন্ত্রপাতি ও টুলসের সঠিক আরবি নাম",
          "দৈর্ঘ্য, প্রস্থ, উচ্চতা, ওজন ও মেট্রিক হিসাবের পরিভাষা",
          "সাইটের নিরাপত্তা সরঞ্জাম (হেলমেট, বুট, গ্লাভস) নির্দেশাবলী",
        ],
        sampleDialogue: {
          arabic: "জিব আল-মাতরাকা ওয়াল-মিযান, সুগুল হাদা লাযিম দাকীক।",
          pronunciation: "জিব আল-মাতরাকাহ ওয়াল-মিযান, শুগুল হাদা লাযিম দাকীক।",
          bangla: "হাতুড়ি আর লেভেল গজ নিয়ে আসুন, এই কাজটি একদম নিখুঁত হতে হবে।",
        },
      },
      {
        id: "6m-m2",
        durationLabel: "মাস ০৩-০৪",
        title: "ফোরম্যান ও সাইট ইঞ্জিনিয়ারের কাজের নির্দেশ বোঝা",
        summary: "কাজের সাইটে ভুল বোঝাবুঝি ছাড়াই দ্রুত ও নির্ভুলভাবে কাজ সম্পাদন করার ভাষা।",
        topics: [
          "সাইট ইঞ্জিনিয়ারের ড্রয়িং বা কাজের ডিরেকশন সহজে বোঝা",
          "ভুল কাজ শুধরে নেওয়া এবং বিকল্প সমাধান দেওয়া",
          "কাজের উপকরণ শেষ হলে স্টোরকিপারের কাছে ম্যাটেরিয়াল রিকুইজিশন",
          "কাজ শেষ করে ফোরম্যানকে চেকিংয়ের জন্য ডেকে আনা",
        ],
        sampleDialogue: {
          arabic: "মুদির, সুগুল খালাস বিল-কামিল, তা'আল শুফ হিনা।",
          pronunciation: "মুদির, শুগুল খালাস বিল-কামিল, তা'আল শুফ হিনা।",
          bangla: "স্যার, কাজটি সম্পূর্ণ শেষ হয়েছে, দয়া করে এসে একবার দেখে নিন।",
        },
      },
      {
        id: "6m-m3",
        durationLabel: "মাস ০৫-০৬",
        title: "মুদিরের সাথে বেতন বৃদ্ধি, ওভারটাইম ও ছুটি নেগোশিয়েশন",
        summary: "চাকরিতে টিকে থাকা এবং নিজের ন্যায্য অধিকার আদায়ের জন্য সম্মানজনক আরবি বাক্য।",
        topics: [
          "বকেয়া বেতনের জন্য মুদিরের সাথে বিনয়ী কিন্তু দৃঢ় কথোপকথন",
          "অতিরিক্ত কাজের ওভারটাইম হিসাব বুঝিয়ে আদায় করা",
          "বার্ষিক ছুটি, দেশে যাওয়ার টিকিট ও ছুটির বেতন আবেদন",
          "মধ্যপ্রাচ্যের সাধারণ শ্রম আইন (WPS) ও আইনি সুরক্ষার পরিভাষা",
        ],
        sampleDialogue: {
          arabic: "মুদির, মিতা জিব রাতিব হাগ্গা হাদা শাহর? আনা ইশতাকালাতু ওভারটাইম কাসীর।",
          pronunciation: "মুদির, মিতা জিব রাতিব হাগ্গা হাদা শাহর? আনা ইশতাগালতু ওভারটাইম কাসীর।",
          bangla: "মুদির, এই মাসের বেতন কবে দিবেন? আমি এ মাসে অনেক ওভারটাইম করেছি।",
        },
      },
    ],
    aiCoachDetails:
      "ওয়ার্কপ্লেস প্রো সিমুলেটর: সাইট ফোরম্যান এবং মুদিরের সাথে দ্বিপাক্ষিক অডিও রোলপ্লে। বেতন ও ছুটি চাওয়ার ডায়ালগে তাৎক্ষণিক উচ্চারণ ও জড়তা স্কোর।",
    benefits: [
      "৮৫০+ হাই-কোয়ালিটি প্রফেশনাল অডিও ও ভিডিও লেসন",
      "৩ মাসের সম্পূর্ণ সারভাইভাল কারিকুলাম বিনামূল্যে অন্তর্ভুক্ত",
      "সাপ্তাহিক লাইভ উচ্চারণ সংশোধন ও সরাসরি প্রশ্নোত্তর সেশন",
      "গালফ স্ট্যান্ডার্ড কাজের ডিজিটাল রেজুমে/সিভি ফরমেট",
      "অফিসিয়াল ভেরিফায়েড ডিজিটাল সার্টিফিকেট",
    ],
  },
  {
    id: "12m",
    sectionId: "master",
    tierNumber: "০৩",
    duration: "১২ মাস মেয়াদী",
    durationEn: "12 Months Master Career Pack",
    badge: "সর্বোচ্চ ক্যারিয়ার গ্রোথ (Best Value)",
    price: 5950,
    originalPrice: 10500,
    discount: "৪৩% ছাড়",
    title: "কমপ্লিট গালফ আরবি + বিজনেস ইংলিশ + হিন্দি মাস্টার কোর্স",
    subtitle:
      "সুপারভাইজার, ক্যাশিয়ার, শোরুম এক্সিকিউটিভ ও ম্যানেজার পদে প্রমোশনের জন্য ৩ ভাষার সম্পূর্ণ আন্তর্জাতিক স্পোকেন ডিপ্লোমা।",
    targetProfessions: [
      "🛒 শোরুম সেলস ও হাই-এন্ড রিটেইল ক্যাশিয়ার",
      "👔 সাইট ফোরম্যান, সুপারভাইজার ও টিম লিডার",
      "🏨 হোটেল রিসিপশনিস্ট ও ফ্রন্ট ডেস্ক এক্সিকিউটিভ",
      "📈 প্রমোশন ও বেতন দ্বিগুণ করার উচ্চাকাঙ্ক্ষী কর্মী",
    ],
    overview:
      "গালফ কান্ট্রিগুলোতে উচ্চ বেতনের অফিসিয়াল ও কাস্টমার সার্ভিস জবে শুধু সাধারণ আরবি যথেষ্ট নয়—দরকার পড়ে স্থানীয় উপভাষা, বেসিক বিজনেস ইংলিশ এবং হিন্দি/উর্দু বোঝাপড়া। ১২ মাসের এই মাস্টার প্যাকে থাকছে সব বিষয়ের আন্তর্জাতিক কমপ্লিট সল্যুশন।",
    modules: [
      {
        id: "12m-m1",
        durationLabel: "কোয়ার্টার ০১",
        title: "অ্যাডভান্সড স্পোকেন অ্যারাবিক ও ফ্লুয়েন্সি বুটস্ট্র্যাপ",
        summary: "শব্দ ভেবে কথা বলার বদলে অবচেতন মনে সাবলীল আরবি বাক্য গঠন করার পদ্ধতি।",
        topics: [
          "৬ মাসের সম্পূর্ণ ওয়ার্কপ্লেস কারিকুলাম অন্তর্ভুক্ত",
          "দ্রুত কথ্য আরবির সংযোগ ও স্থানীয় প্রবাদ-প্রবচন",
          "কাস্টমারের জটিল কমপ্লেইন হ্যান্ডলিং ও কাস্টমার সন্তুষ্টি",
          "কর্মক্ষেত্রে লিডারশিপ ও জুনিয়র কর্মীদের দিকনির্দেশনা দেওয়া",
        ],
        sampleDialogue: {
          arabic: "আহলান ওয়া সাহলান! তাফাদদ্বাল, কাইফা আকদির আসাইদুক আল-ইয়ওম?",
          pronunciation: "আহলান ওয়া সাহলান! তাফাদ্দাল, কাইফা আকদির আসাইদুক আল-ইয়াওম?",
          bangla: "স্বাগতম! আসুন, আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        },
      },
      {
        id: "12m-m2",
        durationLabel: "কোয়ার্টার ০২",
        title: "স্থানীয় গালফ উপভাষা স্পেশাল (সৌদি, দুবাই, কাতার, ওমান)",
        summary: "দেশভিত্তিক স্থানীয় আরবি উচ্চারণের সূক্ষ্ম পার্থক্য ও লোকাল এক্সপ্রেশন।",
        topics: [
          "সৌদি আরবের নজদি ও হেজাজি কথ্য আরবির বিশেষ শব্দাবলি",
          "দুবাই ও আমিরাতের আধুনিক প্রফেশনাল ও লোকাল ডায়ালেক্ট",
          "কাতার, কুয়েত ও ওমানের শান্ত ও সম্মানজনক আঞ্চলিক ভঙ্গি",
          "উপভাষা পরিবর্তন হলেও সাবলীলভাবে কথা চালিয়ে যাওয়ার কৌশল",
        ],
        sampleDialogue: {
          arabic: "শো আখবারাক ইয়া হাবীবী? কুল্লু তামাম ইনশাআল্লাহ।",
          pronunciation: "শো আখবারাক ইয়া হাবীবী? কুল্লু তামাম ইনশাআল্লাহ।",
          bangla: "কী খবর বন্ধু? সবকিছু ঠিকঠাক চলছে তো ইনশাআল্লাহ?",
        },
      },
      {
        id: "12m-m3",
        durationLabel: "কোয়ার্টার ০৩-০৪",
        title: "বিজনেস ইংলিশ + কর্মক্ষেত্র হিন্দি/উর্দু ও ইন্টারভিউ মক",
        summary: "বহুজাতিক টিমের সাথে কাজ এবং প্রমোশন ইন্টারভিউতে সর্বোচ্চ স্কোর পাওয়ার প্রশিক্ষণ।",
        topics: [
          "কাস্টমার ও আন্তর্জাতিক ম্যানেজমেন্টের সাথে বিজনেস স্পোকেন ইংলিশ",
          "ভারতীয় ও পাকিস্তানি সহকর্মীদের সাথে টিমওয়ার্কের হিন্দি ও উর্দু ভাষা",
          "গালফের বড় কোম্পানিতে চাকরির ইন্টারভিউ মক টেস্ট ও প্রশ্নাবলি",
          "১-অন-১ পার্সোনাল মেন্টরিং এবং আন্তর্জাতিক মানের সিভি সাপোর্ট",
        ],
        sampleDialogue: {
          arabic: "Please review the updated progress report, kul haaja jaahiz.",
          pronunciation: "প্লিজ রিভিউ দ্য আপডেটেড প্রগ্রেস রিপোর্ট, কুল হাজা জাহিজ।",
          bangla: "দয়া করে নতুন কাজের রিপোর্টটি দেখুন, সবকিছু প্রস্তুত আছে।",
        },
      },
    ],
    aiCoachDetails:
      "আনলিমিটেড লাইফটাইম এআই ভয়েস কোচ: ইন্টারভিউ মক টেস্ট, সেলস কাউন্টার কনভারসেশন ও কাস্টমার সার্ভিস স্পিচ অ্যানালাইজার। আজীবন সব আপগ্রেড ফ্রি।",
    benefits: [
      "১,৫০০+ অডিও-ভিডিও কমপ্লিট মাস্টারক্লাস লেসন",
      "৩টি প্রধান ভাষা (আরবি + বিজনেস ইংলিশ + ওয়ার্কপ্লেস হিন্দি)",
      "সৌদি, দুবাই, কাতার ও ওমানের আলাদা ৪টি উপভাষা গাইডবুক",
      "১-অন-১ এক্সক্লুসিভ মেন্টরিং ও ইন্টারভিউ প্রস্তুতি",
      "প্রফেশনাল গালফ সিভি তৈরি ও আন্তর্জাতিক মাস্টার ডিপ্লোমা",
    ],
  },
];

interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  pro: string | boolean;
  master: string | boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "কোর্স অ্যাক্সেস ও মেয়াদ",
    starter: "৩ মাস (আজীবন অ্যাক্সেস)",
    pro: "৬ মাস (আজীবন অ্যাক্সেস)",
    master: "১২ মাস (আজীবন অ্যাক্সেস)",
  },
  {
    feature: "অডিও ক্লিপ ও লেসন সংখ্যা",
    starter: "৩৫০+ বাস্তব অডিও ক্লিপ",
    pro: "৮৫০+ অডিও ও ভিডিও লেসন",
    master: "১,৫০০+ সম্পূর্ণ মাস্টার ক্লাস",
  },
  {
    feature: "এয়ারপোর্ট ও ট্রাভেল প্রস্তুতি",
    starter: true,
    pro: true,
    master: true,
  },
  {
    feature: "বাক্কালা, ট্যাক্সি ও দৈনন্দিন কেনাকাটা",
    starter: true,
    pro: true,
    master: true,
  },
  {
    feature: "সাইট টেকনিক্যাল টুলস ও ইঞ্জিনিয়ার কম্যান্ড",
    starter: "প্রাথমিক ধারণা",
    pro: true,
    master: true,
  },
  {
    feature: "মুদিরের সাথে বেতন বৃদ্ধি ও ছুটি নেগোশিয়েশন",
    starter: false,
    pro: true,
    master: true,
  },
  {
    feature: "গালফ লোকাল উপভাষা (সৌদি, দুবাই, কাতার)",
    starter: false,
    pro: "বেসিক নোটস",
    master: "৪টি সম্পূর্ণ আঞ্চলিক গাইড",
  },
  {
    feature: "বিজনেস ইংলিশ ও ওয়ার্কপ্লেস হিন্দি/উর্দু",
    starter: false,
    pro: false,
    master: true,
  },
  {
    feature: "রিমসলিন এআই ভয়েস কোচ সিমুলেটর",
    starter: "সারভাইভাল মোড",
    pro: "ওয়ার্কপ্লেস রোলপ্লে মোড",
    master: "আনলিমিটেড অল-মোডস",
  },
  {
    feature: "সিভি / রেজুমে মেকিং ও ইন্টারভিউ মক",
    starter: false,
    pro: "সিভি ফরম্যাট",
    master: "১-অন-১ ইন্টারভিউ গাইড",
  },
  {
    feature: "ডিজিটাল ভেরিফায়েড সার্টিফিকেট",
    starter: "কোর্স সার্টিফিকেট",
    pro: "প্রো সার্টিফিকেট",
    master: "মাস্টার ডিপ্লোমা",
  },
];

const faqs = [
  {
    q: "কোন কোর্স প্ল্যানটি আমার পেশার জন্য সবচেয়ে উপযুক্ত?",
    a: "আপনি যদি প্রথমবার বিদেশে যান এবং দৈনন্দিন চলাচলের ভয় দূর করতে চান, তবে ৩ মাসের 'Starter' কোর্সটি যথেষ্ট। কিন্তু আপনি যদি কাজের সাইটে ইঞ্জিনিয়ার ও ফোরম্যানের নির্দেশ সঠিকভাবে বুঝতে চান এবং মালিকের সাথে বেতন বৃদ্ধি ও ছুটি নিয়ে আত্মবিশ্বাসের সাথে কথা বলতে চান, তবে ৬ মাসের 'Workplace Pro' সেরা পছন্দ (আমাদের ৮৫% শিক্ষার্থী এটি নেন)। আর শোরুম সেলস, ক্যাশিয়ার, সুপারভাইজার বা ভালো বেতনের স্থায়ী ক্যারিয়ারের জন্য ১২ মাসের 'Master Career Pack' অতুলনীয়।",
  },
  {
    q: "পেমেন্ট সম্পন্ন করার পর কীভাবে লেসন শুরু করব?",
    a: "Razorpay-এর মাধ্যমে পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই আপনার পেমেন্ট অটোমেটিক ভেরিফাই হবে এবং আপনার ড্যাশবোর্ড সরাসরি ওপেন হয়ে যাবে। আপনি যেকোনো মোবাইল ব্রাউজার, ল্যাপটপ বা কম্পিউটার থেকে তাৎক্ষণিক সব অডিও লেসন শুনতে পারবেন।",
  },
  {
    q: "কোর্সের ফি কি এককালীন নাকি কোনো মাসিক সাবস্ক্রিপশন চার্জ আছে?",
    a: "এটি সম্পূর্ণ এককালীন (One-time) ফি। এতে কোনো লুকানো চার্জ, মাসিক সাবস্ক্রিপশন বা রিনিউয়াল ফি নেই। একবার এনরোল করলে আপনি আজীবন এই কোর্সের রিসোর্স ব্যবহার করতে পারবেন।",
  },
  {
    q: "দেশের বাইরে (সৌদি, দুবাই, কাতার, ওমান) থেকে কি পেমেন্ট করা যাবে?",
    a: "হ্যাঁ! যেকোনো দেশের আন্তর্জাতিক ভিসা বা মাস্টারকার্ড ডেবিট/ক্রেডিট কার্ড এবং গালফের লোকাল কার্ড দিয়ে সরাসরি পেমেন্ট করতে পারবেন। কোনো অসুবিধা হলে আমাদের অফিসিয়াল হোয়াটসঅ্যাপে (+916290051284) যোগাযোগ করলে সাহায্য করা হবে।",
  },
  {
    q: "রিমসলিন এআই ভয়েস কোচ কী এবং এটি কীভাবে আমাকে সাহায্য করবে?",
    a: "এআই ভয়েস কোচ হলো একটি বুদ্ধিমান ইন্টারঅ্যাক্টিভ স্পোকেন সিমুলেটর। আপনি যেমন মধ্যপ্রাচ্যের মুদির বা পুলিশের সাথে কথা বলবেন, এই এআই ঠিক সেভাবে আপনার সাথে আরবিতে প্রশ্ন-উত্তর করবে এবং আপনার মুখের উচ্চারণ ও জড়তা পরীক্ষা করে সরাসরি স্কোর দেবে।",
  },
  {
    q: "আমি কি মোবাইল থেকে লেসনগুলো শুনতে ও ডাউনলোড করতে পারব?",
    a: "হ্যাঁ, কোর্সের প্রতিটি অডিও লেসন মোবাইলের জন্য অপ্টিমাইজ করা এবং আপনি চাইলে দুর্বল নেটওয়ার্কের কথা মাথায় রেখে অফলাইন প্র্যাকটিসের জন্য ডাউনলোড করে রাখতে পারবেন।",
  },
];

export default function CoursesPage() {
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>("all");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "3m-m1": true,
    "6m-m2": true,
    "12m-m2": true,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const matched = courseTiers.some(
          (t) => t.sectionId === hash || `tier-${t.id}` === hash
        );
        if (matched) {
          setSelectedTierFilter("all");
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 50);
        }
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  const filteredTiers =
    selectedTierFilter === "all"
      ? courseTiers
      : courseTiers.filter((tier) => tier.id === selectedTierFilter);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-background dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link
              href="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              হোম (Home)
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">
              কোর্স কারিকুলাম ও এনরোলমেন্ট ডিরেক্টরি (Courses)
            </span>
          </div>

          {/* Page Hero Header */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-br from-white via-slate-50 to-emerald-50/50 dark:from-[#07140b] dark:via-[#050e08] dark:to-[#0a1a10] p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl dark:bg-emerald-500/15"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl dark:bg-gold-500/10"
            />

            <div className="relative z-10 max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-500/30 shadow-sm">
                <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>রিমসলিন প্রফেশনাল স্পোকেন ল্যাঙ্গুয়েজ একাডেমি</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                মধ্যপ্রাচ্য প্রবাসী কর্মীদের জন্য{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                  ক্যারিয়ারভিত্তিক স্পোকেন কোর্স
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                দেশ ছাড়ার আগেই প্র্যাকটিস করে কথা বলার ভয় দূর করুন। কাজের সাইট, ড্রাইভিং, শোরুম
                কিংবা মুদিরের সাথে বেতন বাড়ানোর দরকষাকষি—প্রতিটি পেশার জন্য সাজানো পূর্ণাঙ্গ
                কারিকুলাম।
              </p>

              {/* Trust Metrics Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>নিরাপদ Razorpay পেমেন্ট</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xs">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>তাৎক্ষণিক ড্যাশবোর্ড অ্যাক্সেস</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xs">
                  <Headphones className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>আজীবন অডিও এক্সেস</span>
                </span>
              </div>
            </div>
          </section>

          {/* Tier Quick Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                <span>প্ল্যান বাছাই করুন:</span>
              </span>
              <button
                onClick={() => setSelectedTierFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTierFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md"
                    : "bg-white dark:bg-surface-100 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-200 border border-slate-200 dark:border-white/10"
                }`}
              >
                সব প্ল্যান ({courseTiers.length})
              </button>
              {courseTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTierFilter(tier.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedTierFilter === tier.id
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-white dark:bg-surface-100 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-200 border border-slate-200 dark:border-white/10"
                  }`}
                >
                  <span>{tier.duration}</span>
                  {tier.popular && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black">
                      POPULAR
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              সরাসরি যেকোনো প্ল্যানে এনরোল করে আজ থেকেই পড়া শুরু করুন
            </div>
          </div>

          {/* Detailed Course Tiers - Split-View Breakdown */}
          <div className="space-y-12 sm:space-y-16">
            {filteredTiers.map((tier) => (
              <section
                key={tier.id}
                id={tier.sectionId}
                className={`scroll-mt-24 sm:scroll-mt-28 relative rounded-3xl border transition-all duration-300 overflow-hidden shadow-xl backdrop-blur-xl ${
                  tier.popular
                    ? "border-emerald-500/60 dark:border-emerald-400/50 bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-[#091b12] dark:via-[#07130b] dark:to-[#050e08] ring-2 ring-emerald-500/20 shadow-emerald-950/20"
                    : "border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#07110a]/90 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <span id={`tier-${tier.id}`} className="sr-only" aria-hidden="true" />
                {/* Top Banner Tag for Popular / Starter */}
                <div className="px-6 sm:px-8 py-3 border-b border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-200 dark:bg-surface-200 text-slate-800 dark:text-slate-200">
                      প্ল্যান {tier.tierNumber}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        tier.popular
                          ? "bg-amber-100 text-amber-900 border border-amber-300/80 dark:bg-amber-950/80 dark:text-gold-300 dark:border-amber-700/60"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-300/60 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-700/50"
                      }`}
                    >
                      ★ {tier.badge}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{tier.duration} (সম্পূর্ণ লাইফটাইম রিসোর্স এক্সেস)</span>
                  </div>
                </div>

                {/* Main Split Layout: Left Content (65%), Right Sticky Box (35%) */}
                <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Syllabus & Course Breakdown (col-span-7 / 8) */}
                  <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                    {/* Header Info */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                        {tier.title}
                      </h2>
                      <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {tier.subtitle}
                      </p>
                      <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {tier.overview}
                      </p>
                    </div>

                    {/* Target Professions Box */}
                    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-surface-200/50 p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                        <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>যাদের জন্য এই কোর্সটি বিশেষভাবে উপযোগী:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tier.targetProfessions.map((prof, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-surface-100 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 shadow-2xs"
                          >
                            {prof}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Structured Timeline Syllabus Breakdown */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                          <h3 className="text-lg font-black text-slate-900 dark:text-white">
                            কারিকুলাম ও মডিউল ব্রেকডাউন ({tier.modules.length} টি প্রধান ধাপ)
                          </h3>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          ক্লিক করে বিস্তারিত দেখুন
                        </span>
                      </div>

                      <div className="space-y-3.5">
                        {tier.modules.map((mod, mIdx) => {
                          const isExpanded = expandedModules[mod.id] ?? false;
                          return (
                            <div
                              key={mod.id}
                              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 overflow-hidden transition-all duration-200 shadow-xs"
                            >
                              <button
                                type="button"
                                onClick={() => toggleModule(mod.id)}
                                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-surface-200/60 transition-colors"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                                      {mod.durationLabel}
                                    </span>
                                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                      {mod.title}
                                    </h4>
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {mod.summary}
                                  </p>
                                </div>

                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-surface-200 text-slate-600 dark:text-slate-300 shrink-0 mt-0.5">
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </div>
                              </button>

                              {isExpanded && (
                                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 dark:border-white/5 space-y-4 bg-slate-50/50 dark:bg-surface-100/50">
                                  <div>
                                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                      এই মডিউলের প্রধান বিষয়সমূহ:
                                    </div>
                                    <ul className="space-y-2">
                                      {mod.topics.map((topic, tIdx) => (
                                        <li
                                          key={tIdx}
                                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                                        >
                                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                          <span className="leading-snug">{topic}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Sample Dialogue Snippet */}
                                  {mod.sampleDialogue && (
                                    <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 dark:border-gold-500/20 dark:bg-gold-950/20 p-3.5 space-y-1">
                                      <div className="text-[10px] font-extrabold text-amber-800 dark:text-gold-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <Headphones className="w-3 h-3 text-amber-600 dark:text-gold-400" />
                                        <span>বাস্তব ডায়ালগ নমুনা (Sample Spoken Clip):</span>
                                      </div>
                                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                                        &ldquo;{mod.sampleDialogue.arabic}&rdquo;
                                      </div>
                                      <div className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                                        উচ্চারণ: {mod.sampleDialogue.pronunciation}
                                      </div>
                                      <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                                        অর্থ: {mod.sampleDialogue.bangla}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* AI Voice Coach Mock Simulator Box */}
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/60 dark:border-emerald-500/20 dark:bg-emerald-950/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shrink-0 shadow-md shadow-emerald-600/30">
                        <Mic className="h-6 w-6 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                            রিমসলিন এআই ভয়েস কোচ সিমুলেটর অ্যাক্সেস
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
                            ইন্টারেক্টিভ
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {tier.aiCoachDetails}
                        </p>
                      </div>
                    </div>

                    {/* Included Benefits List */}
                    <div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                        এই প্যাকেজের সাথে অন্তর্ভুক্ত সুবিধাসমূহ:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {tier.benefits.map((b, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Sticky Pricing & Razorpay Checkout Box (col-span-5 / 4) */}
                  <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4">
                    <div className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-surface-100 p-6 shadow-xl backdrop-blur-xl space-y-6">
                      {/* Price Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            অফার কোর্স ফি
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/50">
                            {tier.discount}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2.5">
                          <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            ₹{tier.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-sm font-semibold text-slate-400 line-through">
                            ₹{tier.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          সম্পূর্ণ এককালীন ফি • কোনো মাসিক চার্জ বা লুকানো ফি নেই
                        </p>
                      </div>

                      {/* Course Title Reminder */}
                      <div className="rounded-xl bg-slate-50 dark:bg-surface-200/60 p-3 text-xs border border-slate-200/80 dark:border-white/5 space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {tier.title}
                        </div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          মেয়াদ: {tier.duration} ({tier.durationEn})
                        </div>
                      </div>

                      {/* Live Razorpay Enroll Button */}
                      <div className="space-y-2">
                        <EnrollButton
                          coursePrice={tier.price}
                          courseName={`${tier.duration} - ${tier.durationEn}`}
                          className={
                            tier.popular
                              ? "w-full py-4 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:via-teal-500 hover:to-amber-400 text-white font-extrabold rounded-xl shadow-xl shadow-emerald-500/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-center text-sm"
                              : "w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/20 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-center text-sm"
                          }
                        />

                        <div className="text-center">
                          <span className="text-[11px] text-slate-400 dark:text-slate-500">
                            পেমেন্ট সম্পন্ন হলেই ইনস্ট্যান্ট কোর্স চালু হবে
                          </span>
                        </div>
                      </div>

                      {/* WhatsApp Help / Consultation Button */}
                      <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                        <Link
                          href={`https://wa.me/916290051284?text=${encodeURIComponent(
                            `হ্যালো রিমসলিন সাপোর্ট, আমি ${tier.duration} (${tier.title}) কোর্সটি সম্পর্কে জানতে চাই।`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-50/80 dark:bg-emerald-950/40 py-2.5 px-3 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>হোয়াটসঅ্যাপে ফ্রি পরামর্শ নিন</span>
                        </Link>

                        {/* Security Guarantees */}
                        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>100% সুরক্ষিত গেটওয়ে</span>
                          </span>
                          <span>•</span>
                          <span>লাইফটাইম এক্সেস</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Quick Course Comparison Matrix Table */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-[#07110a] p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden space-y-8">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-gold-300 border border-amber-300/60 dark:border-amber-700/50">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-gold-400" />
                <span>তুলনামূলক চার্ট</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                ৩টি প্ল্যানের বিস্তারিত ফিচার তুলনা
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                আপনার বাজেট ও লক্ষ্য অনুযায়ী সেরা কোর্সটি সহজে বেছে নিন।
              </p>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="py-4 px-4 font-bold">কোর্স সুবিধাসমূহ</th>
                    <th className="py-4 px-4 font-bold text-center">
                      ৩ মাস স্টার্টার
                      <div className="text-sm font-black text-slate-900 dark:text-white normal-case mt-0.5">
                        ₹১,৯৫০
                      </div>
                    </th>
                    <th className="py-4 px-4 font-bold text-center bg-emerald-500/5 dark:bg-emerald-500/10 rounded-t-xl">
                      ৬ মাস প্রো ★
                      <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 normal-case mt-0.5">
                        ₹৩,৪৫০
                      </div>
                    </th>
                    <th className="py-4 px-4 font-bold text-center">
                      ১২ মাস মাস্টার
                      <div className="text-sm font-black text-slate-900 dark:text-white normal-case mt-0.5">
                        ₹৫,৯৫০
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs sm:text-sm">
                  {comparisonData.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-200">
                        {row.feature}
                      </td>

                      {/* Starter Col */}
                      <td className="py-3.5 px-4 text-center text-slate-600 dark:text-slate-300">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? (
                            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span>{row.starter}</span>
                        )}
                      </td>

                      {/* Pro Col (Highlighted) */}
                      <td className="py-3.5 px-4 text-center text-slate-800 dark:text-slate-100 font-bold bg-emerald-500/5 dark:bg-emerald-500/10">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span>{row.pro}</span>
                        )}
                      </td>

                      {/* Master Col */}
                      <td className="py-3.5 px-4 text-center text-slate-600 dark:text-slate-300">
                        {typeof row.master === "boolean" ? (
                          row.master ? (
                            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                          ) : (
                            <Minus className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span>{row.master}</span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {/* Actions Row */}
                  <tr className="border-t-2 border-slate-200 dark:border-white/10">
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                      অনলাইন এনরোলমেন্ট
                    </td>
                    <td className="py-4 px-4 text-center">
                      <EnrollButton
                        coursePrice={1950}
                        courseName="৩ মাস মেয়াদী - 3 Months Starter"
                        className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 transition-opacity"
                      >
                        এনরোল • ₹১,৯৫০
                      </EnrollButton>
                    </td>
                    <td className="py-4 px-4 text-center bg-emerald-500/5 dark:bg-emerald-500/10 rounded-b-xl">
                      <EnrollButton
                        coursePrice={3450}
                        courseName="৬ মাস মেয়াদী - 6 Months Workplace Pro"
                        className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors"
                      >
                        এনরোল • ₹৩,৪৫০
                      </EnrollButton>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <EnrollButton
                        coursePrice={5950}
                        courseName="১২ মাস মেয়াদী - 12 Months Master Career Pack"
                        className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 transition-opacity"
                      >
                        এনরোল • ₹৫,৯৫০
                      </EnrollButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Quick FAQ Section */}
          <section className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-surface-100 p-6 sm:p-8 lg:p-10 shadow-xl space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>সাধারণ প্রশ্নোত্তর (FAQ)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                কোর্স সম্পর্কিত প্রয়োজনীয় তথ্য
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50/70 dark:bg-surface-200/50 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white dark:bg-surface-100 text-slate-500 shrink-0">
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Bottom Consultation CTA Banner */}
          <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-[#0d2215] via-[#09180f] to-[#06100a] p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"
            />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                কোন কোর্সটি আপনার জন্য উপযুক্ত তা বুঝতে পারছেন না?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                আমাদের অভিজ্ঞ ভাষা পরামর্শকের সাথে হোয়াটসঅ্যাপে ফ্রি কথা বলে নিজের পেশা ও লক্ষ্য
                অনুযায়ী সেরা প্ল্যানটি বেছে নিন।
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="https://wa.me/916290051284?text=Hello%20Rimslin%20Support,%20I%20want%20free%20consultation%20on%20Rimslin%20courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-bold py-3.5 px-6 text-sm shadow-xl shadow-emerald-950/40 hover:scale-[1.02] transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>হোয়াটসঅ্যাপে ফ্রি পরামর্শ নিন</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#course-plans"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 py-3.5 px-6 text-sm font-semibold transition-colors"
                >
                  <span>হোমপেজ কোর্স সারসংক্ষেপ</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
