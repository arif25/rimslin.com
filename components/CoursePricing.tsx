"use client";

import React from "react";
import Link from "next/link";
import EnrollButton from "./EnrollButton";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface CoursePlan {
    id: string;
    duration: string;
    title: string;
    price: number;
    originalPrice: number;
    badge?: string;
    popular?: boolean;
    features: string[];
}

const courses: CoursePlan[] = [
    {
        id: "3-months",
        duration: "৩ মাস",
        title: "বেসিক স্পোকেন ফাউন্ডেশন",
        price: 999, // আপনার সুবিধামতো আসল প্রাইস দিন
        originalPrice: 1999,
        badge: "স্টার্টার প্ল্যান",
        features: [
            "দৈনন্দিন প্রয়োজনীয় কথপোকথন",
            "আরবি ও বেসিক ইংলিশ শব্দভাণ্ডার",
            "অডিও প্র্যাকটিস ও সঠিক উচ্চারণ",
            "মোবাইল ও ওয়েব ফুল অ্যাক্সেস",
            "কোর্স সমাপনী সার্টিফিকেট",
        ],
    },
    {
        id: "6-months",
        duration: "৬ মাস",
        title: "স্ট্যান্ডার্ড ক্যারিয়ার ট্র্যাক",
        price: 1899, // আপনার সুবিধামতো আসল প্রাইস দিন
        originalPrice: 3499,
        badge: "সবচেয়ে জনপ্রিয়",
        popular: true,
        features: [
            "৩ মাসের সব ফিচার অন্তর্ভুক্ত",
            "পেশাভিত্তিক গাইড (ড্রাইভিং, নির্মাণ, হোটেল)",
            "এআই ভয়েস কোচ সিমুলেটর অ্যাক্সেস",
            "উচ্চারণ ও হরকত শুদ্ধিকরণ ক্লাস",
            "সরাসরি প্রশ্নোত্তরের সুবিধা",
            "লাইফটাইম রিসোর্স সাপোর্ট",
        ],
    },
    {
        id: "12-months",
        duration: "১২ মাস",
        title: "কমপ্লিট মাস্টার কোর্স",
        price: 2999, // আপনার সুবিধামতো আসল প্রাইস দিন
        originalPrice: 5999,
        badge: "সেরা ভ্যালু (Best Value)",
        features: [
            "সব ফিচার এবং আপডেট এক বছর",
            "দেশভিত্তিক আরবি উপভাষা (সৌদি, দুবাই, কাতার)",
            "ফুল এআই ভয়েস কোচ আনলিমিটেড",
            "কাস্টম সিভি / রেজুমি মেকার গাইড",
            "চাকরির ইন্টারভিউ স্পেশাল প্রস্তুতি",
            "২৪/৭ প্রায়োরিটি সাপোর্ট",
        ],
    },
];

export default function CoursePricing() {
    return (
        <section id="courses-pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
            <span id="pricing" className="sr-only" aria-hidden="true" />
            {/* হেডার */}
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    আপনার পছন্দমতো কোর্স প্ল্যান বেছে নিন
                </h2>
                <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    মধ্যপ্রাচ্যের কর্মসংস্থানের উপযোগী স্পোকেন অ্যারাবিক ও ইংলিশ শিখুন সহজে
                </p>
            </div>

            {/* ৩টি কার্ডের গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-300 ${course.popular
                                ? "bg-[#0b1b17] border-2 border-emerald-500 shadow-2xl shadow-emerald-950/50 scale-105 z-10"
                                : "bg-[#07110a] border border-white/10 hover:border-emerald-500/40"
                            }`}
                    >
                        {/* ব্যাজ */}
                        {course.badge && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${course.popular
                                            ? "bg-emerald-500 text-black shadow-md"
                                            : "bg-slate-800 text-slate-300 border border-slate-700"
                                        }`}
                                >
                                    {course.badge}
                                </span>
                            </div>
                        )}

                        <div>
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="text-emerald-400 font-semibold text-sm tracking-wide">
                                    {course.duration}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4">
                                {course.title}
                            </h3>

                            {/* প্রাইসিং */}
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-4xl font-extrabold text-white">
                                    ₹{course.price}
                                </span>
                                <span className="text-slate-500 line-through text-sm">
                                    ₹{course.originalPrice}
                                </span>
                            </div>

                            {/* ফিচার তালিকা */}
                            <ul className="space-y-3 mb-8 border-t border-white/5 pt-6">
                                {course.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* পেমেন্ট বাটন */}
                        <div className="w-full pt-4 border-t border-white/5 space-y-2.5">
                            <Link
                                href={`/courses#${course.id === "3-months" ? "starter" : course.id === "6-months" ? "workplace-pro" : "master"}`}
                                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group shadow-2xs active:scale-[0.99]"
                            >
                                <span>বিস্তারিত দেখুন</span>
                                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <EnrollButton
                                coursePrice={course.price}
                                courseName={`${course.title} (${course.duration})`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}