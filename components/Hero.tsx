"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
  Wrench,
  Car,
  Navigation,
  UtensilsCrossed,
  ShoppingBag,
  FileText,
  Scale,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import GlobalDestinationsMarquee from "@/components/GlobalDestinationsMarquee";

interface SlideData {
  id: number;
  tag: string;
  image: string;
  imageTag: string;
  titlePrefix: string;
  highlight: string;
  highlightSecondary?: string;
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

const FALLBACK_IMAGE = "/images/hero-banner.jpg";

export default function Hero() {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Curated human-centric slide content based on language
  const getSlides = (): SlideData[] => {
    if (language === "en") {
      return [
        {
          id: 1,
          tag: "✨ 3-in-1 Gulf Job Language Training",
          image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
          imageTag: "✨ 3-in-1 Language Training",
          titlePrefix: "Master High-Salary Expat Jobs with ",
          highlight: "Workplace Arabic",
          highlightSecondary: "Essential Hindi & Basic English",
          subtitle:
            "Learn essential workplace communication before traveling to Dubai, Saudi Arabia, or Qatar. Arabic for bosses & customers, workplace Hindi for site colleagues, and practical English for signs & forms.",
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
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=80",
          imageTag: "👷‍♂️ Practical Site Arabic",
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
          image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🚗 Road & Delivery Navigation",
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
          image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
          imageTag: "☕ Customer Service & Sales",
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
          image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🌍 Authentic Gulf Dialects",
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
          image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🩺 Medical Care & Emergencies",
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
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
          imageTag: "📄 Legal Rights & Contracts",
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
          image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🎙️ AI Pronunciation Coach",
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
          image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🎧 Offline Audio Lessons",
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
          tag: "✨ ३-इन-१ प्रैक्टिकल गल्फ भाषा कोर्स",
          image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
          imageTag: "✨ ३-इन-१ भाषा प्रशिक्षण",
          titlePrefix: "गल्फ में अच्छी सैलरी वाली नौकरी के लिए ",
          highlight: "आसान अरबी",
          highlightSecondary: "काम की हिंदी और बेसिक इंग्लिश",
          subtitle:
            "सऊदी, यूएई या कतर जाने से पहले काम की भाषा आसानी से सीखें। कफील व ग्राहकों से अरबी में, साइट साथियों से हिंदी में और फॉर्म व साइनबोर्ड समझने के लिए जरूरी अंग्रेजी।",
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
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=80",
          imageTag: "👷‍♂️ साइट व्यावहारिक अरबी",
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
          image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🚗 रोड व कस्टमर नेविगेशन",
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
          image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
          imageTag: "☕ कस्टमर सर्विस व सेल्स",
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
          image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🌍 असली गल्फ स्थानीय बोली",
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
          image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🩺 स्वास्थ्य व आपातकालीन बातचीत",
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
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
          imageTag: "📄 कानूनी अधिकार व इकामा",
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
          image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🎙️ एआई वॉयस कोचिंग",
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
          image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🎧 ऑफलाइन ऑडियो अभ्यास",
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
          tag: "✨ الدورة الشاملة لثلاث لغات عمل أساسية",
          image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
          imageTag: "✨ التدريب اللغوي المتكامل",
          titlePrefix: "تواصل عملي وفعال لرواتب وفرص أفضل عبر ",
          highlight: "العربية الخليجية",
          highlightSecondary: "لغة العمل الهندية والإنجليزية",
          subtitle:
            "تعلم لغة العمل الحقيقية قبل السفر إلى الإمارات، السعودية أو قطر. العربية للمشرفين والزبائن، الهندية للتعامل مع الزملاء في الموقع، والإنجليزية للإجراءات والاستمارات.",
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
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=80",
          imageTag: "👷‍♂️ عربية الموقع العملية",
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
          image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🚗 ملاحة الطرق والتوصيل",
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
          image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
          imageTag: "☕ خدمة العملاء والمبيعات",
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
          image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🌍 اللهجات الخليجية الأصلية",
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
          image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🩺 الطوارئ والرعاية الصحية",
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
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
          imageTag: "📄 الحقوق النظامية والعقود",
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
          image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🎙️ مدرب النطق بالذكاء الاصطناعي",
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
          image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
          imageTag: "🎧 دروس صوتية دون إنترنت",
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
        tag: "✨ ৩-ইন-১ প্র্যাকটিক্যাল গালফ ভাষা কোর্স",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
        imageTag: "✨ প্রফেশনাল মাল্টি-ল্যাঙ্গুয়েজ ট্রেনিং",
        titlePrefix: "বিদেশে ভালো বেতনের চাকরির জন্য ",
        highlight: "সহজ আরবি",
        highlightSecondary: "কাজের হিন্দি ও বেসিক ইংলিশ",
        subtitle:
          "সৌদি, আমিরাত বা কাতার যাওয়ার আগে সহজে শিখুন বাস্তব কাজের ভাষা। কফিল ও কাস্টমারের সাথে কথা বলতে আরবি, সাইটের সহকর্মীদের সাথে হিন্দি এবং জরুরি ফর্ম পূরণ ও সাইন বোঝার জন্য দরকারি ইংরেজি।",
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
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=80",
        imageTag: "👷‍♂️ সাইট প্র্যাকটিক্যাল আরবি",
        titlePrefix: "কাজের সাইটে ওস্তাদ এবং সুপারের সাথে ",
        highlight: "কথা বলার দরকারি আরবি ও হিন্দি",
        subtitle:
          "টুলস, কাজ মাপজোখ, মালামাল চাওয়া এবং সাইটের ভারতীয়/নেপালি সহকর্মীদের সাথে সহজে হিন্দি ও আরবিতে কাজের নির্দেশ বোঝার ফর্মুলা।",
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
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80",
        imageTag: "🚗 রোড ও কাস্টমার নেভিগেশন",
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
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
        imageTag: "☕ কাস্টমার সার্ভিস ও সেলস",
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
        image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
        imageTag: "🌍 আসল গালফ আম্মিয়া ভাষা",
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
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80",
        imageTag: "🩺 স্বাস্থ্য ও জরুরি কথোপকথন",
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
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
        imageTag: "📄 অধিকার ও আইনি সুরক্ষা",
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
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
        imageTag: "🎙️ এআই ভয়েস অ্যানালাইসিস",
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
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80",
        imageTag: "🎧 অফলাইন অডিও লেসন",
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
  const AUTO_PLAY_DURATION = 6500; // Calm 6.5s per slide for comfortable reading
  const TICK_INTERVAL = 50; // Smooth 50ms progress step
  const [progress, setProgress] = useState(0);

  const prevSlide = useCallback(() => {
    setProgress(0);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setProgress(0);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((idx: number) => {
    setProgress(0);
    setCurrentSlide(idx);
  }, []);

  // Smooth auto-play progress ticker & slide advancing (clean reset on currentSlide change)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / AUTO_PLAY_DURATION) * 100;
        if (next >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch swipe support with instant pause during interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const trackLabels = {
    bn: {
      arabic: "কাজের আরবি",
      arabicSub: "(Workplace Arabic)",
      hindi: "জরুরি হিন্দি",
      hindiSub: "(Workplace Hindi)",
      english: "সহজ ইংরেজি",
      englishSub: "(Basic English)",
    },
    hi: {
      arabic: "काम की अरबी",
      arabicSub: "(Workplace Arabic)",
      hindi: "जरूरी हिंदी",
      hindiSub: "(Workplace Hindi)",
      english: "बेसिक इंग्लिश",
      englishSub: "(Basic English)",
    },
    en: {
      arabic: "Workplace Arabic",
      arabicSub: "(Gulf Spoken)",
      hindi: "Workplace Hindi",
      hindiSub: "(Site Communication)",
      english: "Basic English",
      englishSub: "(Forms & Signs)",
    },
    ar: {
      arabic: "العربية المهنية",
      arabicSub: "(Workplace Arabic)",
      hindi: "لغة العمل الهندية",
      hindiSub: "(Workplace Hindi)",
      english: "الإنجليزية الأساسية",
      englishSub: "(Basic English)",
    },
  }[language] || {
    arabic: "কাজের আরবি",
    arabicSub: "(Workplace Arabic)",
    hindi: "জরুরি হিন্দি",
    hindiSub: "(Workplace Hindi)",
    english: "সহজ ইংরেজি",
    englishSub: "(Basic English)",
  };

  return (
    <section className="relative z-10 overflow-x-clip w-full max-w-full min-h-[calc(100svh-4rem)] md:min-h-0 py-3 sm:py-6 md:pt-10 md:pb-20 flex flex-col justify-center select-none bg-slate-50/50 dark:bg-transparent">
      {/* Background ambient lighting & soft-emerald pattern */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-20 dark:opacity-10" />
        <div className="absolute -top-40 left-1/2 h-[550px] w-full max-w-[850px] -translate-x-1/2 rounded-full bg-emerald-500/15 dark:bg-emerald-500/10 blur-[130px]" />
        <div className="absolute top-1/2 right-0 h-[400px] w-full max-w-[450px] rounded-full bg-amber-400/15 dark:bg-amber-400/10 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl w-full px-3 sm:px-6 lg:px-8 min-w-0 my-auto">
        <div className="flex flex-col items-center w-full max-w-full min-w-0">
          {/* ========================================================================= */}
          {/* 3 PRIMARY CORE LANGUAGE BADGES (CLEANED UP & DECLUTTERED)                 */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
            {/* 🟢 Track 1: Workplace Arabic */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 dark:border-emerald-500/30 dark:bg-emerald-950/50 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 shadow-sm backdrop-blur-md transition-transform hover:scale-105">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>{trackLabels.arabic}</span>
              <span className="text-[10px] sm:text-xs opacity-75 font-medium">{trackLabels.arabicSub}</span>
            </div>

            {/* 🟠 Track 2: Workplace Hindi */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-500/30 bg-amber-50/90 dark:border-amber-500/30 dark:bg-amber-950/50 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 shadow-sm backdrop-blur-md transition-transform hover:scale-105">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span>{trackLabels.hindi}</span>
              <span className="text-[10px] sm:text-xs opacity-75 font-medium">{trackLabels.hindiSub}</span>
            </div>

            {/* 🔵 Track 3: Basic English */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-sky-500/30 bg-sky-50/90 dark:border-sky-500/30 dark:bg-sky-950/50 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold text-sky-800 dark:text-sky-300 shadow-sm backdrop-blur-md transition-transform hover:scale-105">
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse shrink-0" />
              <span>{trackLabels.english}</span>
              <span className="text-[10px] sm:text-xs opacity-75 font-medium">{trackLabels.englishSub}</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE HERO SLIDER / CAROUSEL CONTAINER (SIDE-BY-SIDE 2-COLUMN SPLIT) */}
          {/* ========================================================================= */}
          <div
            className="relative w-full max-w-6xl flex flex-col items-center justify-center select-none px-1 sm:px-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onPointerDown={() => setIsPaused(true)}
            onPointerUp={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Previous Slide Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="hidden xl:flex absolute -left-7 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-surface-100/90 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-gulf-300 hover:bg-white dark:hover:bg-surface-200 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 z-30"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>

            {/* Desktop Next Slide Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="hidden xl:flex absolute -right-7 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-surface-100/90 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-gulf-300 hover:bg-white dark:hover:bg-surface-200 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 z-30"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>

            {/* ========================================================================= */}
            {/* CSS GRID STACKED SLIDES: Lock height naturally to tallest slide (Zero CLS)*/}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 grid-rows-1 w-full items-center justify-items-center min-h-[460px] sm:min-h-[440px] lg:min-h-[350px]">
              {slides.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`col-start-1 row-start-1 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto z-10 visible"
                        : "opacity-0 translate-y-3 scale-[0.99] pointer-events-none z-0 invisible"
                    }`}
                    aria-hidden={!isActive}
                  >
                    {/* 2-Column Split: 7 Cols Left (Bengali Content) + 5 Cols Right (Trade Image) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center w-full">
                      {/* ------------------------------------------------------------- */}
                      {/* LEFT COLUMN (7 COLS): Badges, Headline, Subtext, Action CTAs  */}
                      {/* ------------------------------------------------------------- */}
                      <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Contextual Slide Tag Badge */}
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/90 text-emerald-800 shadow-sm dark:border-gulf-500/30 dark:bg-gulf-950/60 dark:text-gulf-300 backdrop-blur-md dark:shadow-lg dark:shadow-gulf-950/50 mb-2 sm:mb-3.5 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold">
                          <span>{slide.tag}</span>
                        </div>

                        {/* Main Headline with dual-gradient styling */}
                        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] font-extrabold tracking-tight leading-snug sm:leading-tight lg:leading-[1.2] text-slate-900 dark:text-white">
                          {slide.titlePrefix}
                          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-gulf-400 dark:via-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
                            {slide.highlight}
                          </span>
                          {slide.highlightSecondary ? (
                            <>
                              <span className="text-slate-800 dark:text-slate-200">, </span>
                              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 dark:from-gold-400 dark:via-amber-300 dark:to-orange-400 bg-clip-text text-transparent">
                                {slide.highlightSecondary}
                              </span>
                            </>
                          ) : null}
                          {slide.titleSuffix || ""}
                        </h1>

                        {/* Tagline / Subtitle */}
                        <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
                          {slide.subtitle}
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-3.5 sm:mt-5 md:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 w-full sm:w-auto max-w-full px-1">
                          <Link
                            href={slide.primaryBtn.href}
                            tabIndex={isActive ? 0 : -1}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 dark:from-gulf-600 dark:via-emerald-600 dark:to-gold-500 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-900/20 dark:shadow-gulf-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-center truncate"
                          >
                            <span>{slide.primaryBtn.text}</span>
                            {slide.primaryBtn.icon && (
                              <slide.primaryBtn.icon className="h-4 w-4 rtl:rotate-180 shrink-0" />
                            )}
                          </Link>

                          {slide.secondaryBtn && (
                            <Link
                              href={slide.secondaryBtn.href}
                              tabIndex={isActive ? 0 : -1}
                              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 text-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:border-gulf-500/30 dark:bg-surface-100/80 dark:text-gulf-200 dark:hover:bg-surface-200 dark:hover:text-white px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all duration-200 shadow-sm active:scale-95 text-center truncate"
                            >
                              {slide.secondaryBtn.icon && (
                                <slide.secondaryBtn.icon className="h-4 w-4 text-amber-500 dark:text-gold-400 shrink-0" />
                              )}
                              <span>{slide.secondaryBtn.text}</span>
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* ------------------------------------------------------------- */}
                      {/* RIGHT COLUMN (5 COLS): Human-Centric Realistic Trade Card     */}
                      {/* ------------------------------------------------------------- */}
                      <div className="lg:col-span-5 w-full flex items-center justify-center">
                        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none h-[220px] sm:h-[260px] md:h-[290px] lg:h-[330px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-xl shadow-emerald-950/10 dark:shadow-black/50 bg-slate-100 dark:bg-surface-200 group/card">
                          <Image
                            src={imageErrors[slide.id] ? FALLBACK_IMAGE : slide.image}
                            alt={slide.tag}
                            fill
                            priority={idx === 0}
                            sizes="(max-width: 1024px) 90vw, 460px"
                            onError={() => handleImageError(slide.id)}
                            className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                          />

                          {/* Subtle ambient gradient overlay for crisp contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                          {/* Floating Topic / Trust Tag */}
                          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 dark:bg-black/85 border border-white/20 text-white text-[11px] sm:text-xs font-bold backdrop-blur-md shadow-md">
                              <span>{slide.imageTag}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================================================================= */}
            {/* SLIDE NAVIGATION CONTROLS (Responsive Counter, Progress & Dashes) */}
            {/* ================================================================= */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-8 max-w-full px-2">
              {/* Mobile Previous Chevron Button */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="sm:hidden flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-surface-100/90 text-slate-700 dark:text-slate-200 shadow-sm active:scale-90 transition-transform"
              >
                <ChevronLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>

              {/* Desktop/Tablet Clickable Dash Indicators with Active Fill */}
              <div className="hidden sm:flex items-center gap-2">
                {slides.map((_, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`relative transition-all duration-300 rounded-full overflow-hidden cursor-pointer ${
                        isActive
                          ? "w-9 h-2 bg-slate-200 dark:bg-white/15 shadow-inner"
                          : "w-2.5 h-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40 hover:scale-110"
                      }`}
                    >
                      {isActive && (
                        <span
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 to-amber-500 dark:from-gulf-400 dark:to-gold-400 rounded-full"
                          style={{
                            width: `${progress}%`,
                            transition: isPaused ? "none" : "width 50ms linear",
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Compact Counter Indicator & Smooth Progress Bar Line */}
              <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-surface-100/80 backdrop-blur-md shadow-sm">
                {/* Slim Filling Progress Bar Line */}
                <div className="w-12 sm:w-20 h-1 sm:h-1.5 bg-slate-200 dark:bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-gulf-500 dark:via-emerald-400 dark:to-gold-400 rounded-full"
                    style={{
                      width: `${progress}%`,
                      transition: isPaused ? "none" : "width 50ms linear",
                    }}
                  />
                </div>

                {/* Counter display (e.g. 06 / 09) */}
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-700 dark:text-gulf-400">
                    {String(currentSlide + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 mx-0.5 sm:mx-1">/</span>
                  <span>{String(slides.length).padStart(2, "0")}</span>
                </span>
              </div>

              {/* Mobile Next Chevron Button */}
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="sm:hidden flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-surface-100/90 text-slate-700 dark:text-slate-200 shadow-sm active:scale-90 transition-transform"
              >
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Key Value Props */}
          <div className="mt-3 sm:mt-5 md:mt-8 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-1 sm:gap-y-2 text-[10px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 dark:text-gulf-400 shrink-0" />
              <span>{t.hero.prop1}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 dark:text-gulf-400 shrink-0" />
              <span>{t.hero.prop2}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 dark:text-gulf-400 shrink-0" />
              <span>{t.hero.prop3}</span>
            </div>
          </div>

          {/* Global Destinations Infinite Marquee */}
          <GlobalDestinationsMarquee />
        </div>
      </div>
    </section>
  );
}
