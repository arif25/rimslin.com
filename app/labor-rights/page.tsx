'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ShieldCheck,
  PhoneCall,
  Scale,
  Clock,
  Coins,
  FileCheck2,
  AlertOctagon,
  Building2,
  ExternalLink,
  Info,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface CountryLaborInfo {
  countryCode: string;
  countryName: string;
  flag: string;
  laborMinistry: string;
  hotline: string;
  hotlineDesc: string;
  embassyPhone: string;
  embassyAddress: string;
  portalName: string;
  portalUrl: string;
  workHours: string;
  overtimeRule: string;
  leaveRule: string;
  wpsInfo: string;
  passportLaw: string;
  importantTips: string[];
}

const LABOR_COUNTRIES: CountryLaborInfo[] = [
  {
    countryCode: 'ksa',
    countryName: 'সৌদি আরব (KSA)',
    flag: '🇸🇦',
    laborMinistry: 'মানবসম্পদ ও সামাজিক উন্নয়ন মন্ত্রণালয় (MHRSD)',
    hotline: '19911',
    hotlineDesc: 'শ্রম অভিযোগ ও আইনগত পরামর্শ (বাংলা ভাষা অপশন রয়েছে)',
    embassyPhone: '+966 11 483 3062',
    embassyAddress: 'বাংলাদেশ দূতাবাস, ডিপ্লোম্যাটিক কোয়ার্টার, রিয়াদ',
    portalName: 'Qiwa / MHRSD Portal',
    portalUrl: 'https://qiwa.sa',
    workHours: 'দৈনিক সর্বোচ্চ ৮ ঘণ্টা বা সপ্তাহে ৪৮ ঘণ্টা (রমজানে মুসলিম কর্মীদের জন্য দৈনিক ৬ ঘণ্টা বা সপ্তাহে ৩৬ ঘণ্টা)।',
    overtimeRule: 'সাধারণ কর্মঘণ্টার বেশি কাজ করালে বেসিক বেতনের অতিরিক্ত ৫০% সহ ওভারটাইম প্রদান বাধ্যতামূলক।',
    leaveRule: 'এক বছর পূর্ণ হলে ২১ দিনের সবেতন বাৎসরিক ছুটি (টানা ৫ বছর পর ৩০ দিন) এবং ছুটির টিকিট প্রাপ্য।',
    wpsInfo: 'মদদ (Mudad) বা ব্যাংকের মাধ্যমে ওয়েজ প্রোটেকশন সিস্টেম (WPS) দ্বারা প্রতি মাসের বেতন সরাসরি ব্যাংক অ্যাকাউন্টে পরিশোধ করতে হবে। ক্যাশ টাকা দেয়া আইনত নিষিদ্ধ।',
    passportLaw: 'কফিল বা কোম্পানি কর্মীর পাসপোর্ট বা আকামা নিজের কাছে আটকে রাখা সম্পূর্ণ বেআইনি (সৌদি শ্রম আইন ধারা ৪০)।',
    importantTips: [
      'কিলফাত বা চুক্তি পরিবর্তনের জন্য ‘Qiwa’ অ্যাপ ও প্ল্যাটফর্মে আপনার অ্যাকাউন্ট চেক রাখুন।',
      'আকামা রিনিউ করার দায়িত্ব সম্পূর্ণ নিয়োগকর্তার; দেরি হলে জরিমানা নিয়োগকর্তা বহন করবে।',
      'গৃহকর্মী (খাদেমাহ/ড্রাইভার) সংক্রান্ত বিষয় ‘মুসানেদ’ (Musaned) সিস্টেমের অধীনে পরিচালিত হয়।',
      'যেকোনো আর্থিক বা বেতনের বিরোধে ১৯৯১১ নম্বরে কল করে কমপ্লেইন ফাইল করুন।',
    ],
  },
  {
    countryCode: 'uae',
    countryName: 'সংযুক্ত আরব আমিরাত (UAE)',
    flag: '🇦🇪',
    laborMinistry: 'মানবসম্পদ ও এমিরেটাইজেশন মন্ত্রণালয় (MOHRE)',
    hotline: '800 60',
    hotlineDesc: 'MOHRE সার্বক্ষণিক লেবার কল সেন্টার ও বিরোধ নিষ্পত্তি হেল্পলাইন',
    embassyPhone: '+971 2 446 5100',
    embassyAddress: 'বাংলাদেশ দূতাবাস, আবুধাবি / কনস্যুলেট জেনারেল, দুবাই',
    portalName: 'MOHRE Smart Services',
    portalUrl: 'https://www.mohre.gov.ae',
    workHours: 'দৈনিক সর্বোচ্চ ৮ ঘণ্টা বা সপ্তাহে ৪৮ ঘণ্টা (বাণিজ্যিক বা শিফট ডিউটির ক্ষেত্রে ৯ ঘণ্টা হতে পারে)।',
    overtimeRule: 'অতিরিক্ত কর্মঘণ্টার জন্য স্বাভাবিক বেতনের সাথে ২৫% এবং রাত ৯টা থেকে ভোর ৪টার মধ্যে কাজ করালে ৫০% বোনাস দিতে হবে।',
    leaveRule: 'প্রতি বছর ৩০ ক্যালেন্ডার দিনের বার্ষিক সবেতন ছুটি এবং সিক লিভ সুবিধা।',
    wpsInfo: 'সংযুক্ত আরব আমিরাতে WPS (Wage Protection System) সম্পূর্ণ বাধ্যতামূলক। প্রতি মাসের নির্দিষ্ট তারিখের মধ্যে ব্যাংক বা এক্সচেঞ্জ অ্যাকাউন্টে বেতন ছাড়তে হয়।',
    passportLaw: 'ইউএই শ্রম আইন ও সুপ্রিম কোর্ট অনুযায়ী নিয়োগকর্তা কর্মচারীর পাসপোর্ট আটকে রাখলে ফৌজদারি অপরাধ ও ভারী জরিমানা প্রযোজ্য।',
    importantTips: [
      'চাকরিতে যোগদানের আগে MOHRE অফার লেটার ও লেবার কন্ট্রাক্ট ডিজিটাল সাইন নিশ্চিত করুন।',
      'বেতন না পেলে MOHRE মোবাইল অ্যাপে ‘Salary Complaint’ বা ‘Labor Complaint’ দায়ের করা যায়।',
      'গ্র্যাচুইটি বা এন্ড-অফ-সার্ভিস বেনিফিট আইন অনুযায়ী প্রতি বছরের সার্ভিসের জন্য নির্দিষ্ট হারে প্রাপ্য।',
      'অযথা আনঅথোরাইজড এজেন্ট বা ফেইক ভিসা অফার থেকে সতর্ক থাকুন।',
    ],
  },
  {
    countryCode: 'qatar',
    countryName: 'কাতার (Qatar)',
    flag: '🇶🇦',
    laborMinistry: 'শ্রম মন্ত্রণালয় (Ministry of Labour - ADLSA)',
    hotline: '16008',
    hotlineDesc: 'শ্রমিক অভিযোগ ও সরকারি সাহায্য নম্বর (কল সেন্টার)',
    embassyPhone: '+974 4467 1987',
    embassyAddress: 'বাংলাদেশ দূতাবাস, আইনা খালিদ, দোহা',
    portalName: 'Qatar Labour Portal',
    portalUrl: 'https://www.mol.gov.qa',
    workHours: 'দৈনিক ৮ ঘণ্টা বা সপ্তাহে ৪৮ ঘণ্টা। গ্রীষ্মকালে খোলা আকাশের নিচে নির্দিষ্ট রোদের সময়ে কাজ নিষিদ্ধ থাকে।',
    overtimeRule: 'ওভারটাইম কাজের ক্ষেত্রে বেসিক বেতনের অতিরিক্ত ২৫% হারে বাড়তি মজুরি প্রদান করতে হয়।',
    leaveRule: 'টানা ১ বছর কাজের পর ন্যূনতম ৩ সপ্তাহ (বা ৪ সপ্তাহ চুক্তি অনুযায়ী) বাৎসরিক সবেতন ছুটি প্রাপ্য।',
    wpsInfo: 'কাতারের সকল রেজিস্টার্ড কোম্পানিকে কেন্দ্রীয় ব্যাংকের অনুমোদিত WPS সিস্টেমের আওতায় নিয়মিত বেতন স্থানান্তর করতে হয়।',
    passportLaw: 'কাতারে কাফালা ব্যবস্থা সংস্কারের পর পাসপোর্ট আটকে রাখা আইনত দণ্ডনীয় (ন্যূনতম ১০,০০০ থেকে ২৫,০০০ কাতারি রিয়াল পর্যন্ত জরিমানা)।',
    importantTips: [
      'কাতারে ন্যূনতম বেতন আইন (মিনিমাম ওয়েজ ১০০০ রিয়াল + থাকা-খাওয়ার এলাউন্স) সরকার দ্বারা নির্ধারিত।',
      'চাকরি পরিবর্তন (NOC) বা কোম্পানি বদলের জন্য মিনিস্ট্রি অব লেবার প্ল্যাটফর্মে আবেদন করা যায়।',
      'বাংলাদেশ দূতাবাসের লেবার উইং প্রবাসীদের যেকোনো আইনি বিরোধে মধ্যস্থতা প্রদান করে।',
    ],
  },
  {
    countryCode: 'kuwait',
    countryName: 'কুয়েত (Kuwait)',
    flag: '🇰🇼',
    laborMinistry: 'পাবলিক অথরিটি ফর ম্যানপাওয়ার (PAM - কুয়েত)',
    hotline: '128',
    hotlineDesc: 'পাবলিক অথরিটি ফর ম্যানপাওয়ার হেল্পলাইন ও লেবার কমপ্লেইন',
    embassyPhone: '+965 2533 1761',
    embassyAddress: 'বাংলাদেশ দূতাবাস, সুরা, ব্লক ১, কুয়েত সিটি',
    portalName: 'PAM Sahel Portal',
    portalUrl: 'https://www.manpower.gov.kw',
    workHours: 'দৈনিক ৮ ঘণ্টা বা সপ্তাহে ৪৮ ঘণ্টা (রমজানে সপ্তাহে ৩৬ ঘণ্টা)।',
    overtimeRule: 'স্বাভাবিক কর্মঘণ্টার বেশি কাজ করালে স্বাভাবিক বেতনের অতিরিক্ত ২৫% এবং সাপ্তাহিক ছুটির দিনে ৫০% ওভারটাইম।',
    leaveRule: 'প্রথম বছর পূর্ণ হলে ৩০ দিনের বাৎসরিক সবেতন ছুটি।',
    wpsInfo: 'কুয়েতের বেসরকারি খাতের কর্মীদের জন্য স্থানীয় ব্যাংকের স্যালারি অ্যাকাউন্টের মাধ্যমে নিয়মিত বেতন প্রদান বাধ্যতামূলক।',
    passportLaw: 'কুয়েতের আইন অনুযায়ী কোনো কর্মীর পাসপোর্ট বা ব্যক্তিগত পরিচয়পত্র জিম্মা রাখা কঠোরভাবে নিষিদ্ধ।',
    importantTips: [
      'আকামা ট্রান্সফার বা চুক্তি জটিলতায় ‘PAM’ (Public Authority for Manpower) অফিসে সরাসরি যোগাযোগ করা যায়।',
      'চাকরি শেষের বেনিফিট (ইন্ড অব সার্ভিস) নির্ধারণের জন্য সঠিক হিসাব রেকর্ড সংরক্ষণ করুন।',
      'অসুস্থ হলে সরকারি ক্লিনিক ও কুয়েতি লেবার ইনস্যুরেন্স কার্ড ব্যবহার করুন।',
    ],
  },
  {
    countryCode: 'oman',
    countryName: 'ওমান (Oman)',
    flag: '🇴🇲',
    laborMinistry: 'শ্রম মন্ত্রণালয় (Ministry of Labour - ওমান)',
    hotline: '80077000',
    hotlineDesc: 'শ্রম অধিকার হটলাইন ও জরুরি অভিযোগ নিবন্ধন কেন্দ্র',
    embassyPhone: '+968 2469 8328',
    embassyAddress: 'বাংলাদেশ দূতাবাস, শাতিল কুরাম, মাস্কাট',
    portalName: 'Oman Ministry of Labour',
    portalUrl: 'https://www.mol.gov.om',
    workHours: 'দৈনিক ৮ ঘণ্টা বা সপ্তাহে ৪০ থেকে ৪৮ ঘণ্টা (খাবার বিরতিসহ)।',
    overtimeRule: 'ওভারটাইম কাজের জন্য বেসিকের সাথে ২৫% অতিরিক্ত এবং রাতের শিফটে ৫০% অতিরিক্ত মজুরি দিতে হয়।',
    leaveRule: 'টানা ৬ মাস চাকরির পর প্রতি বছর ৩০ দিনের বার্ষিক সবেতন ছুটি।',
    wpsInfo: 'ওমান সেন্ট্রাল ব্যাংকের সাথে সমন্বিত মজুরি সুরক্ষা ব্যবস্থার মাধ্যমে প্রতি মাসের শেষ দিনে বেতন পরিশোধ নিশ্চিত করা হয়।',
    passportLaw: 'ওমানের রয়্যাল ডিক্রি অনুযায়ী কর্মীর পাসপোর্ট তার নিজের ব্যক্তিগত অধিকার, নিয়োগকর্তা তা আটকে রাখতে পারে না।',
    importantTips: [
      'ওমানে নতুন লেবার ল অনুযায়ী কর্মীর অধিকার ও এন্ড-অব-সার্ভিস গ্র্যাচুইটি আরও সুরক্ষা পেয়েছে।',
      'বেতন সংক্রান্ত বিরোধ ঘটলে অনলাইনেই মিনিস্ট্রি পোর্টালে সরাসরি লেবার কেস ওপেন করা সম্ভব।',
      'বাংলাদেশ দূতাবাস মাস্কাটের লিগ্যাল ডেস্ক প্রবাসীদের বিনামূল্যে পরামর্শ প্রদান করে।',
    ],
  },
];

export default function LaborRightsPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('ksa');

  const currentCountry = LABOR_COUNTRIES.find((c) => c.countryCode === selectedCountry) || LABOR_COUNTRIES[0];

  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-[#060b08] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden py-8 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Clean Header with Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline mb-4"
            >
              ← হোমপেজে ফিরে যান
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>আইনি সুরক্ষা ও আন্তর্জাতিক শ্রম অধিকার</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              উপসাগরীয় শ্রম অধিকার ও হেল্পলাইন (Gulf Labor Rights & Helpline)
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
              সৌদি আরব, কাতার, আমিরাত, ওমানে আপনার আইনি অধিকার, মজুরি সুরক্ষা (WPS) ও জরুরি দূতাবাস যোগাযোগ নম্বর। বিদেশে কাজ করার সময় আপনার অধিকার জানুন এবং নিরাপদে থাকুন।
            </p>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">
                আইনি অধিকার রক্ষা করতে আরবি জানা কেন অত্যন্ত জরুরি?
              </p>
              <p className="leading-relaxed">
                আরব দেশে কোম্পানি বা কফিলের সাথে যেকোনো বিরোধ, চুক্তি বা বেতন সংক্রান্ত সমস্যা সমাধানের প্রথম ধাপ হলো নিজের ভাষায় শক্তভাবে কথা বলতে পারা। ভাষা না জানার কারণে অধিকাংশ প্রবাসী আইনি সুবিধা থেকে বঞ্চিত হন।
              </p>
            </div>
          </div>

          {/* Country Selection Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
            {LABOR_COUNTRIES.map((item) => {
              const isActive = selectedCountry === item.countryCode;
              return (
                <button
                  key={item.countryCode}
                  type="button"
                  onClick={() => setSelectedCountry(item.countryCode)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-white dark:bg-surface-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-emerald-400'
                  }`}
                >
                  <span className="text-base">{item.flag}</span>
                  <span>{item.countryName}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Country Labor Rights Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Left 2 Columns: Core Legal Rights */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Working Hours & Overtime */}
              <div className="bg-white dark:bg-surface-100 rounded-2xl p-6 border border-slate-200/90 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                  <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    কাজের সময়, ছুটি ও ওভারটাইম আইন
                  </h2>
                </div>
                
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">দৈনিক ও সাপ্তাহিক কর্মঘণ্টা:</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{currentCountry.workHours}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">ওভারটাইম (Overtime Pay) নিয়ম:</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{currentCountry.overtimeRule}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">বার্ষিক সবেতন ছুটি ও টিকিট:</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{currentCountry.leaveRule}</p>
                  </div>
                </div>
              </div>

              {/* Wage Protection System (WPS) */}
              <div className="bg-white dark:bg-surface-100 rounded-2xl p-6 border border-slate-200/90 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                  <Coins className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    মজুরি সুরক্ষা ব্যবস্থা (WPS) ও ব্যাংক পেমেন্ট
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {currentCountry.wpsInfo}
                </p>
                <div className="bg-slate-50 dark:bg-surface-200/60 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">সতর্কতা: </span>
                  কখনো খালি বা ফাঁকা ভাউচারে স্বাক্ষর করবেন না। বেতন ব্যাংক অ্যাকাউন্টে জমা হলে স্টেটমেন্টই আপনার বেতনের সবচেয়ে বড় আইনি প্রমাণ।
                </div>
              </div>

              {/* Passport & Iqama Rights */}
              <div className="bg-white dark:bg-surface-100 rounded-2xl p-6 border border-slate-200/90 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                  <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    পাসপোর্ট ও আকামা সংক্রান্ত আইন
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {currentCountry.passportLaw}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    গুরুত্বপূর্ণ আইনি পরামর্শ:
                  </h4>
                  {currentCountry.importantTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Emergency Helplines & Embassy Directory */}
            <div className="space-y-6">
              
              {/* Ministry Hotline Card */}
              <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md border border-emerald-700/50">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>শ্রম মন্ত্রণালয় হটলাইন</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{currentCountry.laborMinistry}</h3>
                <p className="text-xs text-emerald-200/90 mb-4">{currentCountry.hotlineDesc}</p>

                <a
                  href={`tel:${currentCountry.hotline.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>হটলাইনে কল করুন: {currentCountry.hotline}</span>
                </a>

                {currentCountry.portalUrl && (
                  <a
                    href={currentCountry.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-emerald-800/70 hover:bg-emerald-800 text-emerald-100 text-xs font-medium transition-colors"
                  >
                    <span>{currentCountry.portalName} ভিজিট করুন</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Bangladesh Embassy / Consulate Contacts */}
              <div className="bg-white dark:bg-surface-100 rounded-2xl p-6 border border-slate-200/90 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    বাংলাদেশ দূতাবাস ও লেবার উইং
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-xs">ঠিকানা:</span>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{currentCountry.embassyAddress}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-xs">ফোন ও জরুরি হেল্পলাইন:</span>
                    <a
                      href={`tel:${currentCountry.embassyPhone.replace(/[^0-9+]/g, '')}`}
                      className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {currentCountry.embassyPhone}
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-surface-200/50 p-2.5 rounded-lg">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>আইনি সহায়তা বা সালিশের জন্য দূতাবাসের শ্রম কল্যাণ উইং (Labor Wing)-এ সরাসরি যোগাযোগ করুন।</span>
                  </div>
                </div>
              </div>

              {/* Emergency Arabic Advice */}
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-5 border border-amber-200 dark:border-amber-900/40 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 mb-2">
                  <AlertOctagon className="w-4 h-4 text-amber-600" />
                  <span>জরুরি আরবি বাক্যটি মুখস্থ রাখুন</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200 mb-2 font-arabic text-sm">
                  أُرِيدُ تَسْجِيلَ شَكْوَى فِي وِزَارَةِ العَمَلِ
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">উচ্চারণ:</span> উরিদু তাসজীল শাকওয়া ফি উইজারাতিল আমাল।
                </p>
                <p className="text-slate-600 dark:text-slate-300 mt-1">
                  <span className="font-semibold">অর্থ:</span> আমি শ্রম মন্ত্রণালয়ে অভিযোগ দায়ের করতে চাই।
                </p>
              </div>

            </div>

          </div>

          {/* Bottom Live Batch CTA Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 text-center shadow-lg border border-white/10">
            <h2 className="text-xl sm:text-2xl font-black mb-2">
              কর্মক্ষেত্রে আত্মবিশ্বাসের সাথে কথা বলুন ও নিজের অধিকার রক্ষা করুন
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
              কফিল বা সুপারের সামনে দ্বিধাদ্বন্দ্ব না রেখে সাবলীল আরবিতে কথা বলতে শিখুন আমাদের প্র্যাকটিক্যাল লাইভ ক্লাসে।
            </p>
            <Link
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all hover:scale-[1.02] active:scale-98"
              href="/live-batch"
            >
              কাজের অধিকার বুঝতে ও ভাষায় দক্ষ হতে লাইভ ব্যাচে জয়েন করুন →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
