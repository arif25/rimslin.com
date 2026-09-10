/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getCourseBySlug } from "@/lib/courses";
import { Course, Lesson } from "@/types/course";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Play,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Eye,
  AlertCircle,
  Share2,
  Check,
  MessageCircle,
  PhoneCall,
  GraduationCap,
  Layers,
  Award,
  Video,
} from "lucide-react";

interface CourseDetailPageProps {
  params?: {
    slug: string;
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const routerParams = useParams();
  const router = useRouter();

  // Support both params.slug from page props and useParams() from client router
  const slug =
    params?.slug || (routerParams?.slug as string) || "";

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [imgError, setImgError] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showEnrollModal, setShowEnrollModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadCourse() {
      if (!slug) return;
      try {
        setLoading(true);
        // Requirement: Use getCourseBySlug(params.slug) to fetch specific course data
        const data = await getCourseBySlug(slug);
        setCourse(data);

        // Pre-select first previewable lesson if available
        if (data?.modules) {
          for (const mod of data.modules) {
            const previewLesson = mod.lessons?.find((l) => l.isFreePreview);
            if (previewLesson) {
              setActiveLesson(previewLesson);
              break;
            }
          }
        }
      } catch (err) {
        console.error("Error loading course details:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [slug]);

  // Total lessons count
  const totalLessons =
    course?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

  // Share handler
  const handleShare = async () => {
    if (navigator.share && course) {
      try {
        await navigator.share({
          title: course.title,
          text: course.description,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  const whatsappEnrollUrl = course
    ? `https://wa.me/916290051284?text=${encodeURIComponent(
        `হ্যালো Rimslin টিম, আমি "${course.title}" (কোর্স ফি: ₹${course.price}) কোর্সটিতে Enroll করতে চাই। ভর্তির পরবর্তী ধাপগুলো জানাবেন।`
      )}`
    : "#";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-background dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-1 py-8 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link
              href="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              হোম (Home)
            </Link>
            <span>/</span>
            <Link
              href="/courses"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              সকল কোর্স (Courses)
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md font-bold">
              {course?.title || "কোর্স বিবরণ"}
            </span>
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="space-y-8">
              <div className="h-80 w-full rounded-3xl bg-slate-200/80 dark:bg-surface-200 animate-pulse" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-96 rounded-3xl bg-slate-200/80 dark:bg-surface-200 animate-pulse" />
                <div className="h-96 rounded-3xl bg-slate-200/80 dark:bg-surface-200 animate-pulse" />
              </div>
            </div>
          ) : !course ? (
            /* 404 / Course Not Found */
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/20 bg-white/70 dark:bg-surface-100/70 p-10 sm:p-16 text-center shadow-sm backdrop-blur-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-300/40">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                কোর্সটি পাওয়া যায়নি (Course Not Found)
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                দুঃখিত, এই লিংকের কোর্সটি খুঁজে পাওয়া যায়নি অথবা এখনও প্রকাশিত হয়নি।
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>সকল কোর্স তালিকায় ফিরে যান</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Course Content Layout */
            <div className="space-y-10">
              {/* 1. Course Hero Section */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 dark:from-surface-100 dark:via-surface-100/90 dark:to-emerald-950/20 p-6 sm:p-10 shadow-xl backdrop-blur-md">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Hero Details (7 cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/40">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{course.level || "All Levels"}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-surface-200 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 shadow-sm">
                        <BookOpen className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{course.modules?.length || 0} টি মডিউল</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-surface-200 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 shadow-sm">
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                        <span>{totalLessons} টি প্র্যাকটিক্যাল লেসন</span>
                      </span>
                    </div>

                    {/* Course Title */}
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                      {course.title}
                    </h1>

                    {/* Full Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {course.description}
                    </p>

                    {/* Action Bar (Price, Enroll Now CTA & Share) */}
                    <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          কোর্স ফি (Price)
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                            ₹{course.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-slate-400">
                            / এককালীন (One-time)
                          </span>
                        </div>
                      </div>

                      {/* Primary "Enroll Now" Action Button */}
                      <button
                        onClick={() => setShowEnrollModal(true)}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-[#00BFA5] to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/25 active:scale-95 transition-all"
                      >
                        <GraduationCap className="h-5 w-5" />
                        <span>Enroll Now (ভর্তি হন)</span>
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-200 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-surface-300 text-xs font-semibold shadow-sm transition-all"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-600" />
                            <span>লিংক কপি হয়েছে!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="h-4 w-4" />
                            <span>শেয়ার করুন</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right Hero Preview Thumbnail / Card (5 cols) */}
                  <div className="lg:col-span-5">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-slate-900 flex items-center justify-center group">
                      {course.thumbnailUrl && !imgError ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          onError={() => setImgError(true)}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
                          <BookOpen className="h-14 w-14 text-emerald-500 mb-3" />
                          <span className="text-sm font-bold text-white">
                            {course.title}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                      {/* Video Preview Tag if active lesson exists */}
                      {activeLesson && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={() => {
                              const playerElem = document.getElementById("video-preview-player");
                              playerElem?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all group"
                          >
                            <Play className="h-7 w-7 fill-current ml-1" />
                          </button>
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                        <span className="font-semibold flex items-center gap-1.5">
                          <ShieldCheck className="h-4 w-4 text-emerald-400" />
                          <span>ভেরিফাইড সার্টিফিকেট অন্তর্ভুক্ত</span>
                        </span>
                        <span className="font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur">
                          {totalLessons} Lessons
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Free Preview Video Player (if active lesson selected) */}
              {activeLesson && (
                <div
                  id="video-preview-player"
                  className="overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100 shadow-xl p-5 sm:p-8 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        ফ্রি প্রিভিউ ভিডিও (Lesson Preview)
                      </span>
                    </div>

                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-surface-200 text-slate-600 dark:text-slate-300">
                      সময়: {activeLesson.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Play className="h-4 w-4 text-emerald-600 fill-current" />
                      <span>{activeLesson.title}</span>
                    </h3>
                  </div>

                  {/* Responsive Iframe Embed */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
                    <iframe
                      src={activeLesson.videoUrl}
                      title={activeLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                </div>
              )}

              {/* 3. Main Syllabus & Side Enrollment Card Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Syllabus Curriculum (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100/90 p-6 sm:p-8 shadow-md space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                          <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                          <span>কোর্স কারিকুলাম ও মডিউল সূচি (Syllabus)</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                          মোট {course.modules?.length || 0} টি মডিউল এবং {totalLessons} টি প্র্যাকটিক্যাল লেসন
                        </p>
                      </div>
                    </div>

                    {/* Modules & Lessons */}
                    <div className="space-y-5">
                      {course.modules?.map((mod, modIdx) => (
                        <div
                          key={mod.id || modIdx}
                          className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-surface-200/40 p-5 space-y-3"
                        >
                          {/* Module Header */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white font-extrabold text-xs shrink-0 shadow-sm">
                                {modIdx + 1}
                              </div>
                              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                {mod.title}
                              </h3>
                            </div>

                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                              {mod.lessons?.length || 0} টি লেসন
                            </span>
                          </div>

                          {/* Lessons in Module */}
                          <div className="mt-2 space-y-2 pl-2 sm:pl-11">
                            {mod.lessons?.map((lesson, lessonIdx) => {
                              const isSelected = activeLesson?.id === lesson.id;
                              return (
                                <div
                                  key={lesson.id || lessonIdx}
                                  onClick={() => {
                                    if (lesson.isFreePreview) {
                                      setActiveLesson(lesson);
                                      const playerElem = document.getElementById("video-preview-player");
                                      playerElem?.scrollIntoView({ behavior: "smooth" });
                                    }
                                  }}
                                  className={`flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm transition-all ${
                                    isSelected
                                      ? "border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold shadow-sm"
                                      : "border-slate-200/60 dark:border-white/5 bg-white dark:bg-surface-100 hover:border-slate-300 dark:hover:border-white/10 text-slate-700 dark:text-slate-300"
                                  } ${
                                    lesson.isFreePreview
                                      ? "cursor-pointer hover:border-emerald-400"
                                      : "cursor-default opacity-85"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    {lesson.isFreePreview ? (
                                      <Play className="h-4 w-4 text-emerald-600 dark:text-emerald-400 fill-current shrink-0" />
                                    ) : (
                                      <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                    )}
                                    <span className="truncate">{lesson.title}</span>
                                  </div>

                                  <div className="flex items-center gap-2.5 shrink-0 ml-3">
                                    {lesson.isFreePreview ? (
                                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300/40">
                                        <Eye className="h-3 w-3" />
                                        <span>Free Preview</span>
                                      </span>
                                    ) : (
                                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                        Locked
                                      </span>
                                    )}

                                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                      {lesson.duration}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Sticky Enrollment Summary Box (4 cols) */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                  <div className="rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100/95 p-6 sm:p-7 shadow-xl space-y-6">
                    <div>
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        কোর্স ফি ও ভর্তি
                      </span>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                          ₹{course.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          (এককালীন ফি)
                        </span>
                      </div>
                    </div>

                    {/* "Enroll Now" Action Button */}
                    <button
                      onClick={() => setShowEnrollModal(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-[#00BFA5] to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/20 active:scale-95 transition-all"
                    >
                      <GraduationCap className="h-5 w-5" />
                      <span>Enroll Now (ভর্তি হন)</span>
                    </button>

                    {/* Course Features Included List */}
                    <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <p className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                        এই কোর্সে যা যা অন্তর্ভুক্ত:
                      </p>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{course.modules?.length || 0} টি স্বয়ংসম্পূর্ণ মডিউল ও {totalLessons} টি ক্লাস</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>লাইফটাইম আনলিমিটেড এক্সেস</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>কোর্স সমাপনান্তে সার্টিফিকেট প্রদান</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>২৪/৭ ডেডিকেটেড সাপোর্ট গ্রুপ</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>মোবাইল ও ল্যাপটপ উভয়েই সাবলীল ক্লাস</span>
                      </div>
                    </div>

                    {/* Direct WhatsApp Help */}
                    <div className="pt-4 border-t border-slate-100 dark:border-white/10">
                      <a
                        href={whatsappEnrollUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100/80 transition-all"
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-600" />
                        <span>WhatsApp এ সরাসরি যোগাযোগ করুন</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Enrollment Confirmation Modal */}
      {showEnrollModal && course && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-100 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    কোর্স এনরোলমেন্ট (Course Enrollment)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Rimslin লার্নিং প্ল্যাটফর্ম
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowEnrollModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-200 text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Course Summary Box */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-surface-200/50 p-4 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {course.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1">
                <span>কোর্স ফি:</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  ₹{course.price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p className="leading-relaxed">
                ভর্তি নিশ্চিত করতে আমাদের সাপোর্ট টিমের সাথে WhatsApp এ যোগাযোগ করে
                আপনার স্টুডেন্ট আইডি ও পেমেন্ট সম্পন্ন করুন। পেমেন্ট ভেরিফাই হওয়ার পর
                আপনার ড্যাশবোর্ডে কোর্সটি আনলক করে দেওয়া হবে।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappEnrollUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowEnrollModal(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-md transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp এ ভর্তি নিশ্চিত করুন</span>
              </a>

              <button
                onClick={() => setShowEnrollModal(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
