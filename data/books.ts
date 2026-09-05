export interface BookSampleChapter {
  chapterNumber: number;
  title: string;
  pageRange: string;
  topics: string[];
  sampleText: string[];
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  category: 'arabic' | 'hindi' | 'english' | 'career';
  rating: number;
  reviewsCount: number;
  formats: {
    pdf: {
      available: boolean;
      price: number; // in BDT
      originalPrice?: number;
    };
    hardcopy: {
      available: boolean;
      price: number;
      originalPrice?: number;
      stock: number;
    };
  };
  samplePdfUrl?: string;
  description: string;
  author: string;
  publisher: string;
  edition: string;
  pages: number;
  badge?: string;
  highlights: string[];
  sampleChapters: BookSampleChapter[];
}

export const BOOKS: Book[] = [
  {
    id: "gulf-arabic-workplace-guide",
    title: "গালফ ওয়ার্কপ্লেস আরবি অভিধান ও স্পোকেন গাইড",
    subtitle: "কাজের সাইট, কফিল ও মার্কেটের প্রয়োজনীয় ১০০০+ বাক্য ও উচ্চারণ নির্দেশিকা",
    coverImage: "/books/gulf-arabic-guide.jpg",
    category: "arabic",
    rating: 4.9,
    reviewsCount: 148,
    formats: {
      pdf: {
        available: true,
        price: 99,
        originalPrice: 199,
      },
      hardcopy: {
        available: true,
        price: 250,
        originalPrice: 380,
        stock: 35,
      },
    },
    samplePdfUrl: "/sample-previews/arabic-sample.pdf",
    description: "সৌদি আরব, সংযুক্ত আরব আমিরাত (দুবাই), কাতার, কুয়েত ও ওমানের স্থানীয় কথ্য আরবি (খালিজি ও আম্মিয়া) সরাসরি শেখার আধুনিক গাইডবুক। কর্মক্ষেত্র, নির্মাণ সাইট, সুপারমার্কেট, হসপিটালিটি ও কফিলের সাথে কথা বলার বাস্তব বাক্য বাংলা উচ্চারণে সাজানো।",
    author: "মাওলানা আরিফুর রহমান ও গালফ স্পোকেন রিসার্চ টিম",
    publisher: "রিমসলিন পাবলিকেশন (Rimslin Press)",
    edition: "২০২৬ নতুন পরিমার্জিত সংস্করণ",
    pages: 224,
    badge: "বেস্টসেলার",
    highlights: [
      "১,২০০+ বাস্তব কাজের আরবি বাক্য বাংলা উচ্চারণসহ",
      "নির্মাণ সাইট, ড্রাইভিং ও টেকনিক্যাল কাজের জরুরি শব্দকোষ",
      "কফিল ও মুদির সাথে বেতন, আকামা ও ছুটি সংক্রান্ত কথা",
      "জরুরি হাসপাতাল, পুলিশ ও বিমানবন্দর সহায়িকা"
    ],
    sampleChapters: [
      {
        chapterNumber: 1,
        title: "অধ্যায় ১: কর্মক্ষেত্রে জরুরি নির্দেশ ও অভিবাদন",
        pageRange: "পৃষ্ঠা ১৫-২৮",
        topics: ["সালাম ও প্রতিদিনের সম্ভাষণ", "কাজ শুরু ও সরঞ্জাম চাওয়া", "সময়ের হিসাব ও সময়ানুবর্তিতা"],
        sampleText: [
          "কাইফা হালুক? (كيف حالك؟) — আপনি কেমন আছেন?",
          "আলহামদুলিল্লাহ, কুল্লু তামাম (الحمد لله، كل شيء تمام) — সব ঠিকঠাক আছে।",
          "শুগল হাদা মাররা মান্তায (شغل هذا مرة ممتاز) — এই কাজটা খুবই চমৎকার হয়েছে।",
          "আনা আবগা মুসাআ'দা ফি হাদা (أنا أبغى مساعدة في هذا) — আমাকে এই কাজে একটু সাহায্য করুন।"
        ]
      },
      {
        chapterNumber: 2,
        title: "অধ্যায় ২: আকামা, চুক্তি ও অফিসিয়াল কথাবার্তা",
        pageRange: "পৃষ্ঠা ৫২-৬৮",
        topics: ["আকামা নবায়ন সংক্রান্ত বাক্য", "মাসিক বেতন ও ওভারটাইম হিসাব", "ছুটি ও পাসপোর্ট হস্তান্তর"],
        sampleText: [
          "কাম তারিখ ইনতিহা আল-ইকামা? (كم تاريخ انتهاء الإقامة؟) — আকামার মেয়াদ শেষ হওয়ার তারিখ কবে?",
          "আনা মা ইস্তালিমতু রাতিব হাদা আশ-শাহর (أنا ما استلمت راتب هذا الشهر) — আমি চলতি মাসের বেতন পাইনি।",
          "আবগা ইজাযা উসবু'ইন লিল-বালাদ (أبغى إجازة أسبوعين للبلد) — আমি দেশে যাওয়ার জন্য দুই সপ্তাহের ছুটি চাই।"
        ]
      }
    ]
  },
  {
    id: "expat-hindi-urdu-spoken-handbook",
    title: "প্রবাসী হিন্দি ও উর্দু দ্রুত শেখার সহজ বই",
    subtitle: "সাইটে ভারতীয় ও পাকিস্তানি সহকর্মীদের সাথে সহজে কাজের বোঝাপড়ার উপায়",
    coverImage: "/books/hindi-urdu-spoken.jpg",
    category: "hindi",
    rating: 4.8,
    reviewsCount: 92,
    formats: {
      pdf: {
        available: true,
        price: 89,
        originalPrice: 160,
      },
      hardcopy: {
        available: true,
        price: 220,
        originalPrice: 320,
        stock: 28,
      },
    },
    samplePdfUrl: "/sample-previews/hindi-sample.pdf",
    description: "গালফ ও মালয়েশিয়ার সাইটে ভারতীয়, পাকিস্তানি ও নেপালি সহকর্মীদের সাথে কাজের নির্দেশ ও বন্ধুত্ব তৈরির সহজ বাংলা মাধ্যমে হিন্দি-উর্দু স্পোকেন সহায়িকা। জটিল ব্যাকরণ ছাড়া সরাসরি বাস্তব কথোপকথন।",
    author: "এম. কে. চৌধুরী (সাবেক দোহা সাইট সুপারভাইজার)",
    publisher: "রিমসলিন পাবলিকেশন (Rimslin Press)",
    edition: "২০২৫ পরিবর্ধিত সংস্করণ",
    pages: 180,
    badge: "সহজ পাঠ",
    highlights: [
      "৮০০+ সাইট ওয়ার্কপ্লেস হিন্দি ও উর্দু বাক্য",
      "ইলেকট্রিক্যাল, প্লাম্বিং ও রডবাইন্ডিং পরিভাষা",
      "বাংলা লিপিতে সহজ সাবলীল উচ্চারণ",
      "জরুরি হিসাব ও কেনাকাটার কথোপকথন"
    ],
    sampleChapters: [
      {
        chapterNumber: 1,
        title: "অধ্যায় ১: সাইটে কাজের শুরু ও নির্দেশ আদানপ্রদান",
        pageRange: "পৃষ্ঠা ১২-২৪",
        topics: ["যন্ত্রপাতি আদান-প্রদান", "মাপজোক ও লেভেল চেক", "সেফটি হেলমেট ও বুট পরা"],
        sampleText: [
          "ইয়ে সামান জলদি ওহা লে যাও (ये सामान जल्दी वहाँ ले जाओ) — এই মালামাল দ্রুত সেখানে নিয়ে যাও।",
          "ইয়ে মাপ সহি নেহি হ্যায়, দোবারা নাপো (यह माप सही नहीं है, दोबारा नापो) — এই পরিমাপ সঠিক নয়, আবার মাপো।",
          "আজ ওভারটাইম কিতনা ঘন্তা হোগা? (आज ओवरटाइम कितना घंटा होगा?) — আজ কত ঘণ্টা ওভারটাইম হবে?"
        ]
      }
    ]
  },
  {
    id: "expat-workplace-basic-spoken-english",
    title: "প্রবাসী কর্মক্ষেত্রের বেসিক স্পোকেন ইংলিশ",
    subtitle: "এয়ারপোর্ট ইমিগ্রেশন, সুপারমার্কেট, হোটেল ও সাইট সুপারভাইজারের সাথে সাবলীল ইংরেজি",
    coverImage: "/books/workplace-spoken-english.jpg",
    category: "english",
    rating: 4.9,
    reviewsCount: 215,
    formats: {
      pdf: {
        available: true,
        price: 99,
        originalPrice: 199,
      },
      hardcopy: {
        available: true,
        price: 260,
        originalPrice: 400,
        stock: 42,
      },
    },
    samplePdfUrl: "/sample-previews/english-sample.pdf",
    description: "মধ্যপ্রাচ্য, ইউরোপ বা দক্ষিণ-পূর্ব এশিয়ায় চাকরির প্রথম দিন থেকেই কনফিডেন্টলি ইংরেজি বলার জাদুকরী বই। বিমানবন্দর ক্লিয়ারেন্স, ফর্ম পূরণ, জব ইন্টারভিউ ও ডেইলি কনভারসেশন সহজে বাংলায় শেখানো হয়েছে।",
    author: "তানভীর আহমেদ ও আন্তর্জাতিক ক্যারিয়ার সেল",
    publisher: "রিমসলিন পাবলিকেশন (Rimslin Press)",
    edition: "২০২৬ স্মার্ট সংস্করণ",
    pages: 240,
    badge: "জনপ্রিয়",
    highlights: [
      "এয়ারপোর্ট ইমিগ্রেশন ও বোর্ডিং পাশের সঠিক ইংরেজি",
      "ডেস্কে বা ফোনে ক্লায়েন্টের সাথে যোগাযোগের কৌশল",
      "কর্মক্ষেত্রের সেফটি সাইন ও ইনস্ট্রাকশন ডিকশনারি",
      "ইন্টারভিউতে আত্মবিশ্বাসী সেলফ ইন্ট্রোডাকশন ফর্মুলা"
    ],
    sampleChapters: [
      {
        chapterNumber: 1,
        title: "অধ্যায় ১: এয়ারপোর্ট ও ট্রাভেল ইংলিশ",
        pageRange: "পৃষ্ঠা ৯-২২",
        topics: ["বোর্ডিং পাস চেকইন", "ইমিগ্রেশন কাউন্টার প্রশ্ন ও উত্তর", "ব্যাগেজ ক্লেইম ডেস্ক"],
        sampleText: [
          "Where is the boarding gate for flight EK 585? — ফ্লাইট ইকে ৫৮৫ এর বোর্ডিং গেটটি কোথায়?",
          "Here is my passport and valid employment visa. — এই নিন আমার পাসপোর্ট এবং বৈধ কর্মসংস্থান ভিসা।",
          "Could you please help me locate my luggage? — আপনি কি দয়া করে আমার লাগেজটি খুঁজে পেতে সাহায্য করবেন?"
        ]
      }
    ]
  },
  {
    id: "gulf-technical-trade-visa-kit",
    title: "গালফ টেকনিক্যাল ট্রেড ও ভিসা ইন্টারভিউ সহায়িকা",
    subtitle: "ইলেকট্রিশিয়ান, প্লাম্বার, এসি টেকনিশিয়ান, মেকানিক ও ওয়েল্ডিং প্র্যাকটিক্যাল টেস্ট গাইড",
    coverImage: "/books/technical-trade-visa-kit.jpg",
    category: "career",
    rating: 4.9,
    reviewsCount: 110,
    formats: {
      pdf: {
        available: true,
        price: 120,
        originalPrice: 220,
      },
      hardcopy: {
        available: true,
        price: 290,
        originalPrice: 450,
        stock: 19,
      },
    },
    samplePdfUrl: "/sample-previews/trade-sample.pdf",
    description: "বিএমইটি (BMET) ও সৌদি তাকামুল (Takmol) স্কিল ভেরিফিকেশন টেস্ট এবং গালফের ডেলিগেশন ইন্টারভিউতে ১০০% পাশের জন্য কারিগরি ট্রেড পরীক্ষার পরিপূর্ণ সহায়িকা। সচিত্র যন্ত্রপাতির নাম, সেফটি স্ট্যান্ডার্ড ও প্রশ্ন-উত্তর।",
    author: "ইঞ্জিনিয়ার এস. ইসলাম (প্রবাসী স্কিল ট্রেইনার)",
    publisher: "রিমসলিন পাবলিকেশন (Rimslin Press)",
    edition: "২০২৬ আপগ্রেডেড এডিশন",
    pages: 260,
    badge: "ট্রেড স্পেশাল",
    highlights: [
      "তাকামুল (SVP) স্কিল টেস্টের স্ট্যান্ডার্ড প্রশ্ন ও সমাধান",
      "ইলেকট্রিশিয়ান, প্লাম্বার, এসি ও পাইপফিটার সচিত্র গাইড",
      "আরবি ও ইংরেজিতে টেকনিক্যাল টুলের নাম ও সাইজ",
      "ইন্টারভিউ বোর্ডের ভয় দূর করার টেকনিক্যাল প্রশ্নোত্তর"
    ],
    sampleChapters: [
      {
        chapterNumber: 1,
        title: "অধ্যায় ১: সৌদি তাকামুল টেস্ট ও প্র্যাকটিক্যাল ভাইভা",
        pageRange: "পৃষ্ঠা ১৭-৩৫",
        topics: ["পরীক্ষকের সাথে কথা বলার আদবকেতা", "সার্কিট ব্রেকার ও ওয়্যারিং কানেকশন", "মাল্টিমিটার রিডিং টেস্ট"],
        sampleText: [
          "হাদা ওয়্যার আসফার খাদ্দার হুয়া আর্থিং (هذا واير أصفر أخضر هو تأريض) — এই হলুদ-সবুজ তারটি হলো আর্থিং তার।",
          "What is the voltage rating of this three-phase DB? — এই থ্রি-ফেজ ডিস্ট্রিবিউশন বোর্ডের ভোল্টেজ রেটিং কত?",
          "Always turn off main breaker before maintenance. — রক্ষণাবেক্ষণ শুরুর আগে সর্বদা প্রধান ব্রেকার বন্ধ রাখুন।"
        ]
      }
    ]
  },
  {
    id: "dubai-saudi-taxi-driver-guide",
    title: "দুবাই ও সৌদি ট্যাক্সি ড্রাইভার স্পোকেন গাইড",
    subtitle: "রোড সাইন, জিপিএস ডিরেকশন, পুলিশ ট্রাফিক ও যাত্রীদের সাথে আরবি-ইংরেজি কথোপকথন",
    coverImage: "/books/taxi-driver-guide.jpg",
    category: "arabic",
    rating: 4.8,
    reviewsCount: 88,
    formats: {
      pdf: {
        available: true,
        price: 95,
        originalPrice: 180,
      },
      hardcopy: {
        available: true,
        price: 240,
        originalPrice: 350,
        stock: 22,
      },
    },
    samplePdfUrl: "/sample-previews/taxi-sample.pdf",
    description: "দুবাই আরটিএ (RTA) বা সৌদি আরবে উবার, কারিম ও ট্যাক্সি চালানোর জন্য নিখুঁত গাইড। ট্রাফিক পুলিশ চেকপোস্ট, পথনির্দেশ চাওয়া, মিটার ও ক্যাশ/কার্ড পেমেন্টের সাবলীল কথ্য আরবি ও ইংরেজি।",
    author: "ক্যাপ্টেন জাহিদ হাসান (দুবাই ট্যাক্সি ট্রেইনার)",
    publisher: "রিমসলিন পাবলিকেশন (Rimslin Press)",
    edition: "২০২৫ রিলিজ",
    pages: 190,
    badge: "ড্রাইভার স্পেশাল",
    highlights: [
      "আরটিএ ও ট্রাফিক পরীক্ষার রোড টেস্ট নির্দেশিকা",
      "ডান, বাম, ইউ-টার্ন, সিগন্যাল ও গন্তব্য নির্ধারণের বাক্য",
      "যাত্রীর সাথে ভাড়া, এসি ও লাগেজ সংক্রান্ত কথোপকথন",
      "ট্রাফিক জরিমানা এড়ানোর জরুরি আইনি নিয়মাবলি"
    ],
    sampleChapters: [
      {
        chapterNumber: 1,
        title: "অধ্যায় ১: গন্তব্য ও রুট ডিরেকশন",
        pageRange: "পৃষ্ঠা ১১-২৬",
        topics: ["যাত্রী রিসিভ ও ড্রপ", "রাস্তার ডিরেকশন দেওয়া ও নেওয়া", "মিটার স্টার্ট ও কার্ড পেমেন্ট"],
        sampleText: [
          "আইন তুরিদ আত-তাহাব ইয়া আখি? (أين تريد الذهاب يا أخي؟) — ভাই, আপনি কোথায় যেতে চান?",
          "খালিদ ফিল ইয়ামিন, বা'দাইন উফর ইউ-টার্ন (خلك في اليمين، بعدين افر يو-تيرن) — ডানে থাকুন, তারপর ইউ-টার্ন নিন।",
          "Would you like to pay by card or cash? — আপনি কি কার্ডে পেমেন্ট করবেন নাকি ক্যাশে?"
        ]
      }
    ]
  },
  {
    id: "expat-restaurant-catering-arabic",
    title: "প্রবাসী রেস্তোরাঁ ও ক্যাটারিং সার্ভিস ভাষা সহায়িকা",
    subtitle: "খাবারের তালিকা, কাস্টমার সার্ভিস, শেফ কিচেন ও সুপারমার্কেট স্পোকেন গাইড",
    coverImage: "/books/catering-arabic.jpg",
    category: "arabic",
    rating: 4.9,
    reviewsCount: 134,
    formats: {
      pdf: {
        available: true,
        price: 89,
        originalPrice: 175,
      },
      hardcopy: {
        available: true,
        price: 230,
        originalPrice: 340,
        stock: 31,
      },
    },
    samplePdfUrl: "/sample-previews/catering-sample.pdf",
    description: "গালফের হোটেল, বুফে রেস্তোরাঁ, কফি শপ ও ফাস্টফুড কিচেনে কর্মরত ওয়েটার ও শেফদের জন্য আবশ্যক বই। আরবি খাদ্যসামগ্রী, মশলা, কাস্টমার অর্ডার গ্রহণ ও ক্যাশ কাউন্টারের প্রয়োজনীয় বাক্যমালা।",
    author: "শেফ মো. রফিকুল ইসলাম (সাবেক রিয়াদ হোটেল শেফ)",
    publisher: "রিমসলিন পাবলিকেশন (Rimslin Press)",
    edition: "২০২৬ পরিমার্জিত সংস্করণ",
    pages: 200,
    badge: "হসপিটালিটি",
    highlights: [
      "১০০+ আরবি ও আন্তর্জাতিক খাবারের নাম ও মশলার তালিকা",
      "অর্ডার নেওয়া, বিল দেওয়া ও ধন্যবাদ জ্ঞাপনের সুন্দর বাক্য",
      "রান্নাঘরের নিরাপত্তা ও হাইজিন স্ট্যান্ডার্ড টার্মিনোলজি",
      "টিপস ও কাস্টমার রিভিউ বাড়ানোর কার্যকরী টিপস"
    ],
    sampleChapters: [
      {
        chapterNumber: 1,
        title: "অধ্যায় ১: টেবিল সার্ভিস ও অর্ডার গ্রহণ",
        pageRange: "পৃষ্ঠা ১৪-২৭",
        topics: ["অতিথিকে অভ্যর্থনা", "মেন্যু উপস্থাপন", "পানীয় ও ডেজার্ট অফার"],
        sampleText: [
          "মারহাবা বিকুম! আইয়ি খেদমা মুমকিন আক্বাদ্দিমহা? (مرحبا بكم! أي خدمة ممكن أقدمها؟) — স্বাগতম! আমি কি সাহায্য করতে পারি?",
          "তিবগা শায় কারাক ওয়ালা ক্বাহওয়া আরাবিয়া? (تبغى شاي كرك ولا قهوة عربية؟) — আপনি কি করক চা চান নাকি আরবি কফি?",
          "হাদা আল-আকেল হার্র মাররা, ইনতাবিহ (هذا الأكل حار مرة، انتبه) — এই খাবারটি অনেক গরম, সাবধান।"
        ]
      }
    ]
  }
];
