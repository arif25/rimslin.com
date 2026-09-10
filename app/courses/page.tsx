/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getAllCourses } from "@/lib/courses";
import { Course } from "@/types/course";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Search,
  Clock,
  CheckCircle2,
  GraduationCap,
  Layers,
  Play,
  Filter,
} from "lucide-react";

export default function CoursesCatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  // Filter courses by search query and level
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel =
        selectedLevel === "All" ||
        course.level?.toLowerCase() === selectedLevel.toLowerCase();
      return matchesSearch && matchesLevel;
    });
  }, [courses, searchQuery, selectedLevel]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-background dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
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
              কোর্স ক্যাটালগ (Courses)
            </span>
          </div>

          {/* Page Hero Header */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 dark:from-surface-100 dark:via-surface-100/90 dark:to-emerald-950/20 p-8 sm:p-12 shadow-xl backdrop-blur-md">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
            />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/40">
                <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>প্রফেশনাল কোর্সসমূহ (All Online Courses)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                আপনার ক্যারিয়ার ও দক্ষতার নতুন দিগন্ত
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                দেশ ও বিদেশে চাকরি, ক্যারিয়ার এবং ফ্রিল্যান্সিংয়ে নিজেকে এক ধাপ এগিয়ে
                নিতে শুরু করুন প্র্যাকটিক্যাল হ্যান্ডস-অন কোর্স। লাইভ সাপোর্ট ও
                লাইফটাইম এক্সেস সহ।
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="কোর্স বা বিষয় খুঁজুন (Search courses)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-200/80 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Level Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>লেভেল:</span>
                </span>
                {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedLevel === level
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-white dark:bg-surface-200 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-300 border border-slate-200/80 dark:border-white/5"
                    }`}
                  >
                    {level === "All" ? "সব লেভেল" : level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <span>উপলব্ধ কোর্স তালিকা ({filteredCourses.length})</span>
              </h2>
            </div>

            {/* Loading Skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-surface-100/80 p-5 space-y-4 animate-pulse shadow-sm"
                  >
                    <div className="aspect-video w-full rounded-2xl bg-slate-200 dark:bg-surface-200" />
                    <div className="h-5 w-24 rounded-full bg-slate-200 dark:bg-surface-200" />
                    <div className="h-6 w-3/4 rounded-lg bg-slate-200 dark:bg-surface-200" />
                    <div className="h-12 w-full rounded-lg bg-slate-200 dark:bg-surface-200" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-7 w-20 rounded bg-slate-200 dark:bg-surface-200" />
                      <div className="h-9 w-28 rounded-xl bg-slate-200 dark:bg-surface-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              /* Empty State */
              <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/20 bg-white/60 dark:bg-surface-100/60 p-12 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-surface-200 text-slate-400">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  কোনো কোর্স পাওয়া যায়নি
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  আপনার খোঁজা বিষয়ের সাথে মেলে এমন কোনো কোর্স এই মুহূর্তে নেই। ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
                </p>
                {(searchQuery || selectedLevel !== "All") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedLevel("All");
                    }}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                  >
                    ফিল্টার রিসেট করুন
                  </button>
                )}
              </div>
            ) : (
              /* Course Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCourses.map((course) => {
                  const totalLessons =
                    course.modules?.reduce(
                      (acc, m) => acc + (m.lessons?.length || 0),
                      0
                    ) || 0;

                  // Level-based badge styling
                  const levelColors: Record<string, string> = {
                    Beginner:
                      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300/40",
                    Intermediate:
                      "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300/40",
                    Advanced:
                      "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300/40",
                  };
                  const badgeClass =
                    levelColors[course.level] ||
                    "bg-slate-100 text-slate-800 dark:bg-surface-200 dark:text-slate-300 border-slate-200 dark:border-white/10";

                  const courseSlug = course.slug || course.id;

                  return (
                    <div
                      key={course.id || course.slug}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/95 dark:bg-surface-100/95 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                    >
                      {/* Course Thumbnail */}
                      <Link
                        href={`/courses/${courseSlug}`}
                        className="relative aspect-video w-full overflow-hidden bg-slate-900 block"
                      >
                        {course.thumbnailUrl ? (
                          <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-400">
                            <BookOpen className="h-10 w-10 text-emerald-500" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Level Badge on Thumbnail */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${badgeClass}`}
                          >
                            <Sparkles className="h-3 w-3" />
                            <span>{course.level || "All Levels"}</span>
                          </span>
                        </div>

                        {/* Modules count overlay badge */}
                        <div className="absolute bottom-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/70 text-white backdrop-blur-md border border-white/10">
                            <Layers className="h-3 w-3 text-emerald-400" />
                            <span>{course.modules?.length || 0} মডিউল</span>
                          </span>
                        </div>
                      </Link>

                      {/* Course Card Body */}
                      <div className="flex flex-1 flex-col p-6 space-y-4">
                        {/* Title */}
                        <Link href={`/courses/${courseSlug}`}>
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {course.title}
                          </h3>
                        </Link>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed flex-1">
                          {course.description}
                        </p>

                        {/* Lessons & Feature Stats */}
                        <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-amber-500" />
                            <span>{totalLessons} টি প্র্যাকটিক্যাল লেসন</span>
                          </span>
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>লাইফটাইম এক্সেস</span>
                          </span>
                        </div>

                        {/* Card Footer: Price & View Details Action */}
                        <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                              কোর্স ফি
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                              ₹{course.price.toLocaleString("en-IN")}
                            </span>
                          </div>

                          {/* "View Details" button linking to /courses/[slug] */}
                          <Link
                            href={`/courses/${courseSlug}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/20 active:scale-95 transition-all"
                          >
                            <span>View Details</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
