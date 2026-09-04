"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Headphones,
  CheckCircle2,
  Building2,
  Tv,
  HardHat,
  Bot,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Globe,
  HeartPulse,
  PhoneCall,
  Download,
  PlayCircle,
  Wrench,
  Car,
  Navigation,
  UtensilsCrossed,
  ShoppingBag,
  FileText,
  Scale,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface SlideData {
  id: number;
  tag: string;
  titlePrefix: string;
  highlight: string;
  titleSuffix?: string;
  subtitle: string;
  primaryBtn: {
    text: string;
    href: string;
    icon?: any;
  };
  secondaryBtn?: {
    text: string;
    href: string;
    icon?: any;
  };
}

export default function Hero() {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Curated slide content based on language
  const getSlides = (): SlideData[] => {
    if (language === "en") {
      return [
        {
          id: 1,
          tag: "✨ Specialized Language Training for Expatriates",
          titlePrefix: "Master High-Salary Communication with ",
          highlight: "Gulf Spoken Arabic & Practical English",
          subtitle:
            "Learn essential workplace language before traveling to Dubai, Saudi Arabia, or Qatar. Direct conversational phrases for work without complicated grammar.",
          primaryBtn: {
            text: "Enroll in Course",
            href: "#course-plans",
            icon: ArrowRight,
          },
          secondaryBtn: {
            text: "Watch Video Lessons",
            href: "#video-gallery",
            icon: Tv,
          },
        },
        {
          id: 2,
          tag: "🏗️ Construction, Electricians & Technicians",
          titlePrefix: "Essential Workplace Arabic for ",
          highlight: "Site Foremen & Supervisors",
          subtitle:
            "Learn core terms for tools, measurements, requesting supplies, and understanding job instructions clearly on site.",
          primaryBtn: {
            text: "View Trade Arabic",
            href: "#job-tracks",
            icon: HardHat,
          },
          secondaryBtn: {
            text: "Learn Tool Names",
            href: "#phrase-demo",
            icon: Wrench,
          },
        },
        {
          id: 3,
          tag: "🚗 Driving & Delivery Job Special",
          titlePrefix: "Master Road Routes, Traffic Signals & ",
          highlight: "Customer Communications",
          subtitle:
            "Essential guide for finding locations, traffic rules, gas stations, and confidently speaking with delivery customers.",
          primaryBtn: {
            text: "Learn Driver Arabic",
            href: "#job-tracks",
            icon: Car,
          },
          secondaryBtn: {
            text: "Location Dialogues",
            href: "#daily-dialogues",
            icon: Navigation,
          },
        },
        {
          id: 4,
          tag: "🍽️ Restaurant, Cafe & Cashier Jobs",
          titlePrefix: "Spoken Arabic & English for ",
          highlight: "Customer Service & Retail Sales",
          subtitle:
            "Take orders, manage bill payments, learn menu items, and master respectful customer greetings effortlessly.",
          primaryBtn: {
            text: "View Service Arabic",
            href: "#job-tracks",
            icon: UtensilsCrossed,
          },
          secondaryBtn: {
            text: "Menu & Dialogues",
            href: "#daily-dialogues",
            icon: ShoppingBag,
          },
        },
        {
          id: 5,
          tag: "🌍 Country-Specific Authentic Dialects",
          titlePrefix: "Speak the Real Local Dialect of ",
          highlight: "Your Gulf Destination",
          subtitle:
            "Textbook Arabic differs greatly from real expat life. Master Saudi Ammiya and Gulf spoken dialects easily by country.",
          primaryBtn: {
            text: "Select Country",
            href: "#country-dialects",
            icon: Globe,
          },
          secondaryBtn: {
            text: "Regional Audio",
            href: "#phrase-demo",
            icon: Headphones,
          },
        },
        {
          id: 6,
          tag: "🚨 Emergency Safety & Medical Care",
          titlePrefix: "Explain Symptoms to Doctors & ",
          highlight: "Request Medicine at the Pharmacy",
          subtitle:
            "Communicate your health symptoms directly in Arabic and English during hospital visits or sudden medical emergencies.",
          primaryBtn: {
            text: "Medical Arabic",
            href: "#emergency-phrases",
            icon: HeartPulse,
          },
          secondaryBtn: {
            text: "View Helplines",
            href: "/contact",
            icon: PhoneCall,
          },
        },
        {
          id: 7,
          tag: "📄 Iqama, Salary & Legal Contracts",
          titlePrefix: "Discuss Accounts & Rights with ",
          highlight: "Sponsors and Employers",
          subtitle:
            "Clear, respectful communication formulas for discussing salary, overtime, leave entitlements, and Iqama renewal.",
          primaryBtn: {
            text: "Worker Guidebook",
            href: "#worker-rights",
            icon: FileText,
          },
          secondaryBtn: {
            text: "Legal Guide",
            href: "/terms-and-conditions",
            icon: Scale,
          },
        },
        {
          id: 8,
          tag: "🎙️ AI Pronunciation Voice Coach",
          titlePrefix: "Correct Your Pronunciation and ",
          highlight: "Practice Spoken Arabic with AI",
          subtitle:
            "Speak directly into your phone, receive instant pronunciation feedback, and eliminate hesitation before flying abroad.",
          primaryBtn: {
            text: "Launch Voice Coach",
            href: "#ai-coach",
            icon: Bot,
          },
          secondaryBtn: {
            text: "Listen to Demo",
            href: "#phrase-demo",
            icon: Sparkles,
          },
        },
        {
          id: 9,
          tag: "🎧 Practice Offline Without Internet",
          titlePrefix: "Download to Phone & ",
          highlight: "Learn Arabic Audio in Your Free Time",
          subtitle:
            "Improve pronunciation during rest hours or site breaks with downloadable audio lessons—no internet connection required.",
          primaryBtn: {
            text: "Download Free Audio Pack",
            href: "#audio-downloads",
            icon: Download,
          },
          secondaryBtn: {
            text: "PDF Guidebook",
            href: "#course-plans",
            icon: FileText,
          },
        },
      ];
    }

    if (language === "hi") {
      return [
        {
          id: 1,
          tag: "✨ प्रवासियों के लिए विशेष भाषा कोर्स",
          titlePrefix: "गल्फ में अच्छी सैलरी वाली नौकरी के लिए ",
          highlight: "आसान अरबी और स्पोकन इंग्लिश",
          subtitle:
            "दुबई, सऊदी अरब और कतर जाने से पहले काम की भाषा आसानी से सीखें। बिना किसी कठिन व्याकरण के सीधे बातचीत का आसान फॉर्मूला।",
          primaryBtn: {
            text: "कोर्स शुरू करें",
            href: "#course-plans",
            icon: ArrowRight,
          },
          secondaryBtn: {
            text: "वीडियो क्लास देखें",
            href: "#video-gallery",
            icon: Tv,
          },
        },
        {
          id: 2,
          tag: "🏗️ कंस्ट्रक्शन, इलेक्ट्रीशियन व तकनीशियन",
          titlePrefix: "कार्यस्थल पर उस्ताद और सुपरवाइजर से ",
          highlight: "बातचीत की जरूरी अरबी",
          subtitle:
            "टूल्स, मापजोख, सामान मांगना और काम के निर्देश समझने के लिए जरूरी शब्द और वाक्य सीखें।",
          primaryBtn: {
            text: "ट्रेड अरबी देखें",
            href: "#job-tracks",
            icon: HardHat,
          },
          secondaryBtn: {
            text: "टूल्स के नाम सीखें",
            href: "#phrase-demo",
            icon: Wrench,
          },
        },
        {
          id: 3,
          tag: "🚗 ड्राइविंग व डिलीवरी जॉब स्पेशल",
          titlePrefix: "रास्ते, ट्रैफिक सिग्नल व ग्राहकों से ",
          highlight: "बातचीत का अभ्यास",
          subtitle:
            "लोकेशन ढूंढना, ट्रैफिक नियम, पेट्रोल पंप और डिलीवरी ग्राहकों से सहजता से बात करने की जरूरी गाइड।",
          primaryBtn: {
            text: "ड्राइविंग अरबी सीखें",
            href: "#job-tracks",
            icon: Car,
          },
          secondaryBtn: {
            text: "लोकेशन बातचीत",
            href: "#daily-dialogues",
            icon: Navigation,
          },
        },
        {
          id: 4,
          tag: "🍽️ रेस्टोरेंट, कैफे व कैशियर जॉब",
          titlePrefix: "कस्टमर सर्विस और सेल्स के लिए ",
          highlight: "आसान अरबी और इंग्लिश",
          subtitle:
            "ऑर्डर लेना, बिलिंग, खाने की चीजें और ग्राहकों से सम्मानपूर्वक बात करना आसानी से सीखें।",
          primaryBtn: {
            text: "सर्विस भाषा देखें",
            href: "#job-tracks",
            icon: UtensilsCrossed,
          },
          secondaryBtn: {
            text: "मेन्यू व डायलॉग",
            href: "#daily-dialogues",
            icon: ShoppingBag,
          },
        },
        {
          id: 5,
          tag: "🌍 देश अनुसार असली स्थानीय बोली",
          titlePrefix: "जिस देश जा रहे हैं, वहाँ की ",
          highlight: "असली क्षेत्रीय भाषा बोलें",
          subtitle:
            "किताबी अरबी और खाड़ी देशों की वास्तविक बोलचाल में बहुत अंतर होता है। सऊदी अम्मिया और गल्फ भाषा देश अनुसार सीखें।",
          primaryBtn: {
            text: "देश चुनें",
            href: "#country-dialects",
            icon: Globe,
          },
          secondaryBtn: {
            text: "क्षेत्रीय ऑडियो",
            href: "#phrase-demo",
            icon: Headphones,
          },
        },
        {
          id: 6,
          tag: "🚨 आपातकालीन सुरक्षा व स्वास्थ्य",
          titlePrefix: "डॉक्टर को बीमारी समझाना और ",
          highlight: "दवा की दुकान पर दवा मांगना",
          subtitle:
            "अचानक बीमारी होने पर अस्पताल में डॉक्टर को अपनी समस्या सीधे अरबी और अंग्रेजी में समझाएं।",
          primaryBtn: {
            text: "मेडिकल अरबी",
            href: "#emergency-phrases",
            icon: HeartPulse,
          },
          secondaryBtn: {
            text: "हेल्पलाइन देखें",
            href: "/contact",
            icon: PhoneCall,
          },
        },
        {
          id: 7,
          tag: "📄 इकामा, वेतन व अनुबंध पत्र",
          titlePrefix: "कफील या कंपनी के साथ ",
          highlight: "हिसाब और अधिकारों पर बात करें",
          subtitle:
            "वेतन, ओवरटाइम, छुट्टी और इकामा नवीनीकरण पर सम्मानजनक और स्पष्ट तरीके से बात करने का फॉर्मूला।",
          primaryBtn: {
            text: "श्रमिक गाइड",
            href: "#worker-rights",
            icon: FileText,
          },
          secondaryBtn: {
            text: "कानूनी जानकारी",
            href: "/terms-and-conditions",
            icon: Scale,
          },
        },
        {
          id: 8,
          tag: "🎙️ एआई वॉयस कोच",
          titlePrefix: "सही उच्चारण के साथ सीधे बोलकर ",
          highlight: "अरबी प्रैक्टिस करें",
          subtitle:
            "मोबाइल से सीधे वॉयस देकर बातचीत सीखें और विदेश जाने से पहले अपनी झिझक दूर करें।",
          primaryBtn: {
            text: "वॉयस कोच शुरू करें",
            href: "#ai-coach",
            icon: Bot,
          },
          secondaryBtn: {
            text: "डेमो सुनें",
            href: "#phrase-demo",
            icon: Sparkles,
          },
        },
        {
          id: 9,
          tag: "🎧 बिना इंटरनेट ऑफलाइन प्रैक्टिस",
          titlePrefix: "मोबाइल में डाउनलोड कर काम के बीच ",
          highlight: "सुनकर अरबी याद करें",
          subtitle:
            "कमरे में या काम के बाद ऑडियो सुनकर उच्चारण सुधारें। किसी भी इंटरनेट कनेक्शन की जरूरत नहीं।",
          primaryBtn: {
            text: "फ्री ऑडियो पैक लें",
            href: "#audio-downloads",
            icon: Download,
          },
          secondaryBtn: {
            text: "पीडीएफ गाइड",
            href: "#course-plans",
            icon: FileText,
          },
        },
      ];
    }

    if (language === "ar") {
      return [
        {
          id: 1,
          tag: "✨ برامج لغوية مهنية للوافدين",
          titlePrefix: "تواصل عملي وفعال لرواتب وفرص أفضل عبر ",
          highlight: "العربية الخليجية والإنجليزية",
          subtitle:
            "تعلم لغة العمل الحقيقية قبل السفر إلى الإمارات، السعودية أو قطر بدون تعقيدات نحوية، مباشرة عبر التخاطب العملي.",
          primaryBtn: {
            text: "ابدأ الدورة الآن",
            href: "#course-plans",
            icon: ArrowRight,
          },
          secondaryBtn: {
            text: "شاهد الدروس المرئية",
            href: "#video-gallery",
            icon: Tv,
          },
        },
        {
          id: 2,
          tag: "🏗️ الإنشاءات، الكهرباء والمهن الفنية",
          titlePrefix: "عربية الموقع للمحادثة مع ",
          highlight: "المشرفين والمعلمين في العمل",
          subtitle:
            "أدوات القياس، طلب المواد وفهم التعليمات والإشارات الفنية في موقع العمل بكل دقة.",
          primaryBtn: {
            text: "مسار المهن الفنية",
            href: "#job-tracks",
            icon: HardHat,
          },
          secondaryBtn: {
            text: "أسماء الأدوات",
            href: "#phrase-demo",
            icon: Wrench,
          },
        },
        {
          id: 3,
          tag: "🚗 القيادة وخدمات التوصيل السريع",
          titlePrefix: "تدريب عملي على الطرق والإشارات و",
          highlight: "التواصل مع الزبائن",
          subtitle:
            "تحديد المواقع، قوانين المرور، محطات الوقود والتحدث مع العملاء لتوصيل الطلبات باحترافية.",
          primaryBtn: {
            text: "عربية السائقين",
            href: "#job-tracks",
            icon: Car,
          },
          secondaryBtn: {
            text: "محادثات المواقع",
            href: "#daily-dialogues",
            icon: Navigation,
          },
        },
        {
          id: 4,
          tag: "🍽️ المطاعم والمقاهي والكاشير",
          titlePrefix: "العربية والإنجليزية لخدمة العملاء و",
          highlight: "المبيعات وواجهة الزبائن",
          subtitle:
            "استقبال الطلبات، المحاسبة، أسماء الأطعمة وعبارات الترحيب والاحترام للعملاء.",
          primaryBtn: {
            text: "عربية الخدمات",
            href: "#job-tracks",
            icon: UtensilsCrossed,
          },
          secondaryBtn: {
            text: "القوائم والمحادثات",
            href: "#daily-dialogues",
            icon: ShoppingBag,
          },
        },
        {
          id: 5,
          tag: "🌍 اللهجات الخليجية الأصلية لكل دولة",
          titlePrefix: "تحدث باللهجة الحقيقية حسب ",
          highlight: "الدولة الخليجية التي تسافر إليها",
          subtitle:
            "الفارق كبير بين الفصحى واللهجات الدارجة. أتقن العامية السعودية واللهجة الإماراتية والقطرية بسهولة.",
          primaryBtn: {
            text: "اختر الدولة",
            href: "#country-dialects",
            icon: Globe,
          },
          secondaryBtn: {
            text: "صوتيات اللهجات",
            href: "#phrase-demo",
            icon: Headphones,
          },
        },
        {
          id: 6,
          tag: "🚨 الطوارئ والسلامة الصحية والطبية",
          titlePrefix: "شرح الأعراض للأطباء و",
          highlight: "طلب الأدوية من الصيدليات",
          subtitle:
            "عبر عن حالتك الصحية بوضوح ومباشرة باللغتين العربية والإنجليزية في المستشفيات والعيادات.",
          primaryBtn: {
            text: "عربية الطوارئ",
            href: "#emergency-phrases",
            icon: HeartPulse,
          },
          secondaryBtn: {
            text: "أرقام المساعدة",
            href: "/contact",
            icon: PhoneCall,
          },
        },
        {
          id: 7,
          tag: "📄 الإقامة والرواتب والعقود القانونية",
          titlePrefix: "تحدث مع الكفيل أو الإدارة حول ",
          highlight: "المستحقات والحقوق النظامية",
          subtitle:
            "صيغ محترمة وواضحة لمناقشة الرواتب، العمل الإضافي، الإجازات وتجديد الإقامة.",
          primaryBtn: {
            text: "دليل العمالة",
            href: "#worker-rights",
            icon: FileText,
          },
          secondaryBtn: {
            text: "الدليل النظامي",
            href: "/terms-and-conditions",
            icon: Scale,
          },
        },
        {
          id: 8,
          tag: "🎙️ المدرب الصوتي الذكي بالذكاء الاصطناعي",
          titlePrefix: "صحح نطقك ومارس التحدث ",
          highlight: "مباشرة بصوتك مع الذكاء الاصطناعي",
          subtitle:
            "تحدث من هاتفك واحصل على تصحيح فوري لمخارج الحروف وتخلص من التردد قبل السفر.",
          primaryBtn: {
            text: "تشغيل المدرب الصوتي",
            href: "#ai-coach",
            icon: Bot,
          },
          secondaryBtn: {
            text: "استمع للعينة",
            href: "#phrase-demo",
            icon: Sparkles,
          },
        },
        {
          id: 9,
          tag: "🎧 تدريب صوتي دون الحاجة لإنترنت",
          titlePrefix: "حمل على هاتفك وتعلم ",
          highlight: "بالاستماع في فترات الراحة",
          subtitle:
            "حسن مخارج الحروف بالاستماع المتكرر في الغرفة أو وقت الراحة دون الحاجة لاتصال بالإنترنت.",
          primaryBtn: {
            text: "تحميل الباقة الصوتية",
            href: "#audio-downloads",
            icon: Download,
          },
          secondaryBtn: {
            text: "دليل PDF",
            href: "#course-plans",
            icon: FileText,
          },
        },
      ];
    }

    // Default: Bengali (bn)
    return [
      {
        id: 1,
        tag: "✨ প্রবাসী ভাইদের জন্য বিশেষায়িত কোর্স",
        titlePrefix: "বিদেশে ভালো বেতনের চাকরির জন্য ",
        highlight: "সহজ আরবি ও স্পোকেন ইংলিশ",
        subtitle:
          "দুবাই, সৌদি আরব ও কাতার যাওয়ার আগে সহজে শিখুন বাস্তব কাজের ভাষা। কঠিন ব্যাকরণ ছাড়া সরাসরি কথোপকথনের সহজ ফর্মুলা।",
        primaryBtn: {
          text: "কোর্স শুরু করুন",
          href: "#course-plans",
          icon: ArrowRight,
        },
        secondaryBtn: {
          text: "ভিডিও ক্লাস দেখুন",
          href: "#video-gallery",
          icon: Tv,
        },
      },
      {
        id: 2,
        tag: "🏗️ কনস্ট্রাকশন, ইলেকট্রিশিয়ান ও টেকনিশিয়ান",
        titlePrefix: "কাজের সাইটে ওস্তাদ এবং সুপারের সাথে ",
        highlight: "কথা বলার দরকারি আরবি",
        subtitle:
          "টুলস, কাজ মাপজোখ, মালামাল চাওয়া এবং কাজের নির্দেশ বোঝার জন্য প্রয়োজনীয় শব্দ ও বাক্য শিখুন।",
        primaryBtn: {
          text: "ট্রেড ভাষা দেখুন",
          href: "#job-tracks",
          icon: HardHat,
        },
        secondaryBtn: {
          text: "টুলসের নাম শিখুন",
          href: "#phrase-demo",
          icon: Wrench,
        },
      },
      {
        id: 3,
        tag: "🚗 ড্রাইভিং ও ডেলিভারি জব স্পেশাল",
        titlePrefix: "রাস্তাঘাট, সিগন্যাল ও কাস্টমারের সাথে ",
        highlight: "কথা বলার প্র্যাকটিস",
        subtitle:
          "লোকেশন খোঁজা, ট্রাফিক নিয়ম, পেট্রল পাম্প এবং ডেলিভারি কাস্টমারের সাথে স্বচ্ছন্দে কথা বলার প্রয়োজনীয় গাইড।",
        primaryBtn: {
          text: "ড্রাইভিং আরবি শিখুন",
          href: "#job-tracks",
          icon: Car,
        },
        secondaryBtn: {
          text: "লোকেশন ডায়ালগ",
          href: "#daily-dialogues",
          icon: Navigation,
        },
      },
      {
        id: 4,
        tag: "🍽️ রেস্তোরাঁ, ক্যাফে ও ক্যাশিয়ার জব",
        titlePrefix: "কাস্টমার সার্ভিস ও সেলসের ",
        highlight: "সহজ কথ্য আরবি এবং ইংরেজি",
        subtitle:
          "অর্ডার নেওয়া, বিলিং, খাবারের নাম এবং গ্রাহকের সাথে সম্মানসূচক সম্ভাষণ শিখুন সহজেই।",
        primaryBtn: {
          text: "সার্ভিস ভাষা দেখুন",
          href: "#job-tracks",
          icon: UtensilsCrossed,
        },
        secondaryBtn: {
          text: "মেনু ও ডায়ালগ",
          href: "#daily-dialogues",
          icon: ShoppingBag,
        },
      },
      {
        id: 5,
        tag: "🌍 দেশভিত্তিক আসল কথ্য ডায়ালেক্ট",
        titlePrefix: "যে দেশে যাচ্ছেন, সেখানকার ",
        highlight: "আসল আঞ্চলিক ভাষায় কথা বলুন",
        subtitle:
          "বইয়ের আরবির সাথে প্রবাসের আসল ভাষার পার্থক্য অনেক। সৌদির আম্মিয়া ও গালফ কথ্য ভাষা সহজে আয়ত্ত করুন।",
        primaryBtn: {
          text: "দেশ নির্বাচন করুন",
          href: "#country-dialects",
          icon: Globe,
        },
        secondaryBtn: {
          text: "আঞ্চলিক অডিও",
          href: "#phrase-demo",
          icon: Headphones,
        },
      },
      {
        id: 6,
        tag: "🚨 জরুরি নিরাপত্তা ও স্বাস্থ্য",
        titlePrefix: "ডাক্তারকে রোগ বোঝানো ও ",
        highlight: "ফার্মেসিতে ওষুধ চাওয়ার সহজ উপায়",
        subtitle:
          "হঠাৎ অসুস্থতায় হাসপাতালের ডাক্তারের কাছে নিজের সমস্যার কথা সরাসরি আরবি ও ইংরেজিতে বুঝিয়ে বলুন।",
        primaryBtn: {
          text: "মেডিকেল আরবি",
          href: "#emergency-phrases",
          icon: HeartPulse,
        },
        secondaryBtn: {
          text: "হেল্পলাইন দেখুন",
          href: "/contact",
          icon: PhoneCall,
        },
      },
      {
        id: 7,
        tag: "📄 আকামা, বেতন ও চুক্তিপত্র",
        titlePrefix: "কফিল বা কোম্পানির সাথে ",
        highlight: "হিসাব ও অধিকার নিয়ে কথা বলুন",
        subtitle:
          "বেতন, ওভারটাইম, ছুটি এবং আকামা নবায়নের বিষয়ে স্পষ্ট ও সম্মানজনকভাবে কথা বলার ফর্মুলা।",
        primaryBtn: {
          text: "শ্রমিক সহায়িকা",
          href: "#worker-rights",
          icon: FileText,
        },
        secondaryBtn: {
          text: "আইনি গাইড",
          href: "/terms-and-conditions",
          icon: Scale,
        },
      },
      {
        id: 8,
        tag: "🎙️ এআই ভয়েস কোচ",
        titlePrefix: "ভুল উচ্চারণ শুধরে সরাসরি মুখে বলে ",
        highlight: "আরবি প্র্যাকটিস করুন",
        subtitle:
          "মোবাইল থেকেই সরাসরি ভয়েস দিয়ে প্র্যাকটিস করুন এবং বিদেশ যাওয়ার আগেই মুখের জড়তা দূর করুন।",
        primaryBtn: {
          text: "ভয়েস কোচ চালু করুন",
          href: "#ai-coach",
          icon: Bot,
        },
        secondaryBtn: {
          text: "ডেমো শুনুন",
          href: "#phrase-demo",
          icon: Sparkles,
        },
      },
      {
        id: 9,
        tag: "🎧 ইন্টারনেট ছাড়াও প্র্যাকটিস",
        titlePrefix: "মোবাইলে ডাউনলোড করে কাজের ফাঁকে ",
        highlight: "কানে শুনে মুখস্থ করুন",
        subtitle:
          "রুমে বা কাজের অবসরে অডিও শুনে শুনে উচ্চারণ রপ্ত করুন। কোনো ইন্টারনেট সংযোগের প্রয়োজন নেই।",
        primaryBtn: {
          text: "ফ্রি অডিও প্যাক ডাউনলোড",
          href: "#audio-downloads",
          icon: Download,
        },
        secondaryBtn: {
          text: "পিডিএফ গাইড",
          href: "#course-plans",
          icon: FileText,
        },
      },
    ];
  };

  const slides = getSlides();

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Auto-play interval: 5.5 seconds (5500ms), paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section className="relative z-10 overflow-hidden w-full max-w-full pt-8 pb-20 md:pt-14 md:pb-28">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 h-[550px] w-full max-w-[800px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[400px] w-full max-w-[400px] rounded-full bg-gold-glow blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="flex flex-col items-center text-center w-full max-w-full min-w-0">
          {/* ========================================================================= */}
          {/* INTERACTIVE HERO SLIDER / CAROUSEL CONTAINER                              */}
          {/* ========================================================================= */}
          <div
            className="relative w-full max-w-4xl min-h-[440px] sm:min-h-[380px] md:min-h-[340px] flex flex-col items-center justify-center select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Previous Slide Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="hidden lg:flex absolute -left-6 xl:-left-12 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-surface-100/80 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-gulf-300 hover:bg-white dark:hover:bg-surface-200 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 z-20"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>

            {/* Desktop Next Slide Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="hidden lg:flex absolute -right-6 xl:-right-12 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-surface-100/80 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-gulf-300 hover:bg-white dark:hover:bg-surface-200 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 z-20"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>

            {/* Active Slide Content with smooth fade-in */}
            <div
              key={activeSlide.id}
              className="w-full flex flex-col items-center text-center animate-fade-in transition-all duration-500 ease-out"
            >
              {/* Contextual Slide Tag Badge (Clean, without year badge) */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 text-emerald-800 shadow-sm dark:border-gulf-500/30 dark:bg-gulf-950/60 dark:text-gulf-300 backdrop-blur-md dark:shadow-lg dark:shadow-gulf-950/50 mb-5 px-4 py-1.5 text-xs font-semibold">
                <span>{activeSlide.tag}</span>
              </div>

              {/* Main Headline */}
              <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight text-slate-900 dark:text-white">
                {activeSlide.titlePrefix}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-gulf-400 dark:via-emerald-300 dark:to-gold-400 bg-clip-text text-transparent">
                  {activeSlide.highlight}
                </span>
                {activeSlide.titleSuffix || ""}
              </h1>

              {/* Tagline / Subtitle */}
              <p className="mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg font-normal leading-relaxed">
                {activeSlide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href={activeSlide.primaryBtn.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 dark:from-gulf-600 dark:via-emerald-600 dark:to-gold-500 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-emerald-900/20 dark:shadow-gulf-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <span>{activeSlide.primaryBtn.text}</span>
                  {activeSlide.primaryBtn.icon && (
                    <activeSlide.primaryBtn.icon className="h-5 w-5 rtl:rotate-180" />
                  )}
                </Link>

                {activeSlide.secondaryBtn && (
                  <Link
                    href={activeSlide.secondaryBtn.href}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:border-gulf-500/30 dark:bg-surface-100/80 dark:text-gulf-200 dark:hover:bg-surface-200 dark:hover:text-white px-8 py-3.5 text-base font-semibold backdrop-blur-md transition-all duration-200 shadow-sm active:scale-95"
                  >
                    {activeSlide.secondaryBtn.icon && (
                      <activeSlide.secondaryBtn.icon className="h-5 w-5 text-amber-500 dark:text-gold-400" />
                    )}
                    <span>{activeSlide.secondaryBtn.text}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* ================================================================= */}
            {/* SLIDE NAVIGATION CONTROLS (Responsive Counter, Progress & Dashes) */}
            {/* ================================================================= */}
            <div className="flex items-center justify-center gap-3 mt-8 max-w-full px-2">
              {/* Mobile Previous Chevron Button */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="sm:hidden flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-surface-100/90 text-slate-700 dark:text-slate-200 shadow-sm active:scale-90 transition-transform"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              </button>

              {/* Desktop/Tablet Minimal Clickable Dash Indicators */}
              <div className="hidden sm:flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === idx
                        ? "w-7 h-2 bg-gradient-to-r from-emerald-600 to-amber-500 dark:from-gulf-500 dark:to-gold-400 shadow-sm"
                        : "w-2 h-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Compact Counter Indicator & Slim Mobile Progress Bar */}
              <div className="flex items-center gap-2.5 px-3 py-1 rounded-full border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-surface-100/80 backdrop-blur-md shadow-sm">
                {/* Mobile Slim Progress Bar */}
                <div className="sm:hidden w-16 h-1.5 bg-slate-200 dark:bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 dark:from-gulf-500 dark:to-gold-400 transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentSlide + 1) / slides.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Counter display (e.g. 03 / 09) */}
                <span className="text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-700 dark:text-gulf-400">
                    {String(currentSlide + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 mx-1">/</span>
                  <span>{String(slides.length).padStart(2, "0")}</span>
                </span>
              </div>

              {/* Mobile Next Chevron Button */}
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="sm:hidden flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-surface-100/90 text-slate-700 dark:text-slate-200 shadow-sm active:scale-90 transition-transform"
              >
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Key Value Props */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-gulf-400" />
              <span>{t.hero.prop1}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-gulf-400" />
              <span>{t.hero.prop2}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-gulf-400" />
              <span>{t.hero.prop3}</span>
            </div>
          </div>

          {/* Gulf Country Trust Flags Strip */}
          <div className="mt-14 w-full max-w-5xl rounded-2xl border border-slate-200/80 bg-white/70 shadow-lg shadow-black/5 dark:border-white/[0.08] dark:bg-surface-100/50 p-6 backdrop-blur-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-4 flex items-center justify-center gap-2">
              <Building2 className="h-4 w-4 text-amber-500 dark:text-gold-400" />
              <span>{t.hero.destinationsTitle}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {t.hero.destinations.map((dest, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50/90 hover:bg-white hover:border-emerald-500/40 dark:border-white/[0.05] dark:bg-surface-200/50 dark:hover:bg-surface-200 dark:hover:border-gulf-500/40 py-3 px-2 text-center transition-all shadow-sm dark:shadow-none"
                >
                  <span className="text-2xl mb-1">{dest.flag}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                    {dest.country}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-300 font-mono mt-0.5">
                    {dest.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
