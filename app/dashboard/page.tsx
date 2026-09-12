/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UserProfile } from "@/lib/userService";
import { getAllCourses } from "@/lib/courses";
import { Course } from "@/types/course";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  GraduationCap,
  LogOut,
  BookOpen,
  Play,
  ArrowRight,
  Mail,
  ShieldCheck,
  Sparkles,
  Clock,
  Video,
  Volume2,
  FileText,
  AlertCircle,
  ExternalLink,
  Layers,
} from "lucide-react";

// Known course metadata mapping for friendly display
const COURSE_CATALOG: Record<
  string,
  {
    title: string;
    subtitle: string;
    duration: string;
    category: string;
    icon: any;
    badgeColor: string;
  }
> = {
  "3m": {
    title: "এয়ারপোর্ট ও ডেইলি সারভাইভাল কোর্স",
    subtitle: "নতুন কর্মীদের জন্য দেশ ছাড়ার পূর্বে প্রাথমিক প্রস্তুতি",
    duration: "৩ মাস মেয়াদী (3 Months)",
    category: "সারভাইভাল আরবি",
    icon: Video,
    badgeColor: "emerald",
  },
  "6m": {
    title: "ওয়ার্কপ্লেস কমিউনিকেশন ও স্যালারি টক",
    subtitle: "কাজের সাইট, সুপারভাইজার ও বসের সাথে সরাসরি বোঝাপড়া",
    duration: "৬ মাস মেয়াদী (6 Months)",
    category: "প্রফেশনাল জব স্পোকেন",
    icon: Video,
    badgeColor: "amber",
  },
  "12m": {
    title: "কমপ্লিট গালফ ল্যাঙ্গুয়েজ মাস্টার কোর্স",
    subtitle: "গালফ চাকরি ও লাইফস্টাইল এর ১০০% সম্পূর্ণ ভাষা দক্ষতা",
    duration: "১২ মাস মেয়াদী (12 Months)",
    category: "মাস্টার কোর্স",
    icon: Video,
    badgeColor: "teal",
  },
  "video-classes": {
    title: "আরবি ভাষা শিক্ষা ২৪ ক্লাস ভিডিও কালেকশন",
    subtitle: "ব্যবহারিক কাজ ও দৈনন্দিন কথ্য আরবির সম্পূর্ণ ভিডিও কোর্স",
    duration: "২৪ ভিডিও লেসন",
    category: "ভিডিও ক্লাস",
    icon: Video,
    badgeColor: "blue",
  },
};

export default function StudentDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imgError, setImgError] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  useEffect(() => {
    // 1. Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // No user authenticated: redirect to home page
        router.push("/");
        return;
      }

      setCurrentUser(user);

      // 2. Fetch User Document from Firestore at users/{uid}
      try {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data() as UserProfile);
        } else {
          // Fallback to basic auth details if Firestore doc isn't created yet
          setProfileData({
            uid: user.uid,
            displayName: user.displayName || "Student",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            photoURL: user.photoURL || "",
            role: "student",
            enrolledCourses: [],
            lastLoginAt: new Date(),
          });
        }
      } catch (err) {
        console.error("Error fetching student profile from Firestore:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Load all published courses from Firestore for catalog & enrollment matching
  useEffect(() => {
    async function loadCatalog() {
      try {
        const courses = await getAllCourses();
        setAvailableCourses(courses);
      } catch (err) {
        console.error("Error loading course catalog:", err);
      }
    }

    loadCatalog();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Helper for Initials
  const displayName = profileData?.displayName || currentUser?.displayName || "শিক্ষার্থী";
  const email = profileData?.email || currentUser?.email || "";
  const photoURL = profileData?.photoURL || currentUser?.photoURL || "";
  const role = profileData?.role || "student";
  const enrolledCourses = profileData?.enrolledCourses || [];

  const initials = displayName
    ? displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : email?.[0]?.toUpperCase() || "S";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-background dark:text-slate-100 selection:bg-gulf-500 selection:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-1 py-8 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link
              href="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              হোম (Home)
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">
              স্টুডেন্ট ড্যাশবোর্ড (Student Dashboard)
            </span>
          </div>

          {/* 1. Loading Skeleton State */}
          {loading ? (
            <div className="space-y-6">
              {/* Profile Card Skeleton */}
              <div className="h-48 w-full rounded-3xl bg-slate-200/80 dark:bg-surface-200 animate-pulse" />

              {/* Courses Header Skeleton */}
              <div className="h-8 w-48 rounded-lg bg-slate-200/80 dark:bg-surface-200 animate-pulse" />

              {/* Courses Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="h-64 rounded-3xl bg-slate-200/80 dark:bg-surface-200 animate-pulse" />
                <div className="h-64 rounded-3xl bg-slate-200/80 dark:bg-surface-200 animate-pulse" />
                <div className="h-64 rounded-3xl bg-slate-200/80 dark:bg-surface-200 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* 2. Student Profile Header Card */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-surface-100/95 p-6 sm:p-8 shadow-xl backdrop-blur-md">
                {/* Background Ambient Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl"
                />

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  {/* Avatar & User Details */}
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    {/* User Avatar */}
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-emerald-50 dark:bg-surface-200 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-black text-2xl sm:text-3xl shadow-md shrink-0">
                      {photoURL && !imgError ? (
                        <img
                          src={photoURL}
                          alt={displayName}
                          referrerPolicy="no-referrer"
                          onError={() => setImgError(true)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight truncate">
                          {displayName}
                        </h1>

                        {/* Role Badge */}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40 uppercase tracking-wider">
                          <GraduationCap className="h-3.5 w-3.5" />
                          <span>{role}</span>
                        </span>

                        {/* Verified Badge */}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-slate-100 text-slate-700 dark:bg-surface-200 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                          <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Active</span>
                        </span>
                      </div>

                      {/* Email info */}
                      <div className="mt-1.5 flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                        <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{email}</span>
                      </div>

                      {/* Status Summary */}
                      <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                        এনরোল্ড কোর্স:{" "}
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {enrolledCourses.length} টি
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right Actions: Logout Button */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 dark:border-red-900/40 bg-white dark:bg-surface-200 text-red-600 dark:text-red-400 font-bold text-xs sm:text-sm hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-800/60 transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <div className="h-4 w-4 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
                      ) : (
                        <LogOut className="h-4 w-4" />
                      )}
                      <span>লগআউট (Logout)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Enrolled Courses Section */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 shadow-sm">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        আমার এনরোল্ড কোর্সসমূহ (My Courses)
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        আপনার সক্রিয় কোর্স ম্যাটেরিয়ালস ও ক্লাসে যোগ দিন
                      </p>
                    </div>
                  </div>

                  {enrolledCourses.length > 0 && (
                    <Link
                      href="/#courses"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                    >
                      <span>নতুন কোর্স খুঁজুন</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>

                {/* Condition A: Empty State (No Courses Enrolled) */}
                {enrolledCourses.length === 0 ? (
                  <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-300 dark:border-white/20 bg-white/60 dark:bg-surface-100/60 p-8 sm:p-14 text-center shadow-sm backdrop-blur-sm">
                    {/* Empty Icon */}
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-300/40 shadow-inner">
                      <AlertCircle className="h-8 w-8" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      কোনো কোর্সে এখনও ভর্তি হননি
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                      আপনি এখনও কোনো কোর্সে এনরোল করেননি। প্রবাসী কাজের জন্য সহজে
                      স্পোকেন আরবি ও প্র্যাকটিক্যাল ইংলিশ শিখতে আমাদের বিশেষ কোর্স প্ল্যানগুলো
                      দেখুন এবং আজই আপনার প্রথম ক্লাস শুরু করুন।
                    </p>

                    {/* CTA Button Linking to /#courses */}
                    <div className="mt-8 flex justify-center">
                      <Link
                        href="/#courses"
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/30 hover:shadow-emerald-900/40 transition-all active:scale-95"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>কোর্স প্ল্যান দেখুন (Browse Courses)</span>
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Condition B: Enrolled State (Responsive Grid) */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((courseId, idx) => {
                      // Check Firestore catalog first, then fallback to local catalog
                      const firestoreMatch = availableCourses.find(
                        (c) => c.slug === courseId || c.id === courseId
                      );

                      const meta = firestoreMatch
                        ? {
                            title: firestoreMatch.title,
                            subtitle: firestoreMatch.description,
                            duration: `${firestoreMatch.modules?.length || 0} টি মডিউল`,
                            category: firestoreMatch.level || "ওয়েব ও স্কিল কোর্স",
                          }
                        : COURSE_CATALOG[courseId] || {
                            title: `কোর্স: ${courseId.toUpperCase()}`,
                            subtitle: "গালফ ভাষা ও প্রবাসী কাজের প্র্যাকটিক্যাল কোর্স",
                            duration: "ফুল এক্সেস (Lifetime Access)",
                            category: "এনরোল্ড কোর্স",
                          };

                      return (
                        <div
                          key={idx}
                          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100/90 p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                          {/* Card Top Row: Badge & Duration */}
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/30">
                                <Sparkles className="h-3 w-3" />
                                <span>{meta.category}</span>
                              </span>

                              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                <Clock className="h-3.5 w-3.5 text-amber-500" />
                                <span>{meta.duration}</span>
                              </div>
                            </div>

                            {/* Course Title & ID */}
                            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                              {meta.title}
                            </h3>

                            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {meta.subtitle}
                            </p>

                            <div className="mt-3 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                              ID: <span className="font-semibold text-slate-600 dark:text-slate-300">{courseId}</span>
                            </div>
                          </div>

                          {/* Card Bottom Row: Start Class CTA Button */}
                          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                            <Link
                              href={`/courses/${courseId}`}
                              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-[#00BFA5] to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 group/btn"
                            >
                              <Play className="h-4 w-4 fill-current transition-transform group-hover/btn:scale-110" />
                              <span>Start Class</span>
                              <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform group-hover/btn:translate-x-0.5" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Live Firestore Available Courses Catalog */}
              {availableCourses.length > 0 && (
                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 shadow-sm">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                          অনলাইন স্পেশাল কোর্স ক্যাটালগ (Featured Courses)
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          সরাসরি ফায়ারস্টোর ডেটাবেজ থেকে প্রকাশিত আধুনিক কোর্সসমূহ
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {availableCourses.slice(0, 2).map((course) => (
                      <div
                        key={course.id || course.slug}
                        className="group overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {/* Thumbnail */}
                          {course.thumbnailUrl && (
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                              <img
                                src={course.thumbnailUrl}
                                alt={course.title}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                                  <Sparkles className="h-3 w-3 text-amber-400" />
                                  <span>{course.level}</span>
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="p-6">
                            <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                                <Layers className="h-3.5 w-3.5" />
                                <span>{course.modules?.length || 0} Modules</span>
                              </span>
                              <span className="font-bold text-base text-slate-900 dark:text-white">
                                ₹{course.price.toLocaleString("en-IN")}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {course.title}
                            </h3>

                            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {course.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-6 pt-0">
                          <Link
                            href={`/courses/${course.slug}`}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white font-bold text-xs sm:text-sm transition-all"
                          >
                            <span>কোর্স বিবরণ ও প্রিভিউ</span>
                            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom CTA Button to Courses Page */}
                  <div className="mt-8 flex justify-center">
                    <Link
                      href="/courses"
                      className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all"
                    >
                      <span>সব কোর্স দেখুন</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              )}

              {/* 5. Quick Access Learning Hub */}
              <div className="mt-12 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-surface-100/70 p-6 sm:p-8 backdrop-blur-md">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span>অন্যান্য লার্নিং টুলস ও ম্যাটেরিয়ালস (Learning Hub)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link
                    href="/video-classes"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-surface-200 border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-surface-300 transition-all shadow-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        <Video className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          ২৪ টি ভিডিও ক্লাস
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          ভিডিও লেসন কালেকশন
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-all" />
                  </Link>

                  <Link
                    href="/audio-phrases"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-surface-200 border border-slate-200 dark:border-white/5 hover:border-teal-500/50 hover:bg-teal-50/40 dark:hover:bg-surface-300 transition-all shadow-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                        <Volume2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                          অডিও উচ্চারণ লাইব্রেরি
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          কাজের প্রয়োজনীয় ডায়ালগ
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600 transition-all" />
                  </Link>

                  <Link
                    href="/resume-builder"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-surface-200 border border-slate-200 dark:border-white/5 hover:border-blue-500/50 hover:bg-blue-50/40 dark:hover:bg-surface-300 transition-all shadow-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          এআই সিভি বিল্ডার
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          প্রফেশনাল গালফ CV তৈরি
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-all" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
