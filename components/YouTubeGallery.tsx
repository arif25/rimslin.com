/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Clock,
  Video,
  Sparkles,
  Radio,
  Tv,
  ChevronDown,
  ArrowRight,
  Search,
} from "lucide-react";

export interface YouTubeVideo {
  id: string;
  start: number;
  title: string;
  channel: string;
  url: string;
}

export const ARABIC_VIDEOS: YouTubeVideo[] = [
  {
    id: "29OAgFh70MM",
    start: 2176,
    title: "200 ARABIC Words for Everyday Life || Basic Vocabulary",
    channel: "MinArabic",
    url: "https://www.youtube.com/watch?v=29OAgFh70MM&t=2176s",
  },
  {
    id: "xuc1vSzg1vo",
    start: 0,
    title: "100 ARABIC Words for Everyday Life || Basic Vocabulary",
    channel: "MinArabic",
    url: "https://www.youtube.com/watch?v=xuc1vSzg1vo",
  },
  {
    id: "ZUv1z8CoRMo",
    start: 0,
    title: "200 ARABIC Words for Everyday Life - Part 2",
    channel: "MinArabic",
    url: "https://www.youtube.com/watch?v=ZUv1z8CoRMo",
  },
  {
    id: "OmnBncn4hXU",
    start: 0,
    title: "30 Arabic Prepositions with Examples | Learn Arabic Grammar",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=OmnBncn4hXU",
  },
  {
    id: "vN5R2fDplFI",
    start: 0,
    title: "50 Essential Arabic Phrases for Everyday Conversation",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=vN5R2fDplFI",
  },
  {
    id: "uCzz1HlnHRQ",
    start: 2302,
    title: "100 ARABIC Words for Everyday Life - Core Essentials",
    channel: "MinArabic",
    url: "https://www.youtube.com/watch?v=uCzz1HlnHRQ&t=2302s",
  },
  {
    id: "DPIBBQ0JJzw",
    start: 0,
    title: "100 ARABIC Words for Everyday Life - Practice Edition",
    channel: "MinArabic",
    url: "https://www.youtube.com/watch?v=DPIBBQ0JJzw",
  },
  {
    id: "ADRr_6xTYbI",
    start: 4,
    title: "70 Everyday Arabic Phrases for Daily Conversations",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=ADRr_6xTYbI&t=4s",
  },
  {
    id: "2bJc5_6TTzA",
    start: 0,
    title: "Daily Life Arabic Phrases for Beginners | Learn Arabic Speaking",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=2bJc5_6TTzA",
  },
  {
    id: "MEmTQ3bzuyU",
    start: 0,
    title: "50 Arabic Verbs for Daily Routine | Daily Life Arabic Verbs",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=MEmTQ3bzuyU",
  },
  {
    id: "SmmPSyEIxCw",
    start: 0,
    title: "Spoken Arabic for Daily Life | Food & Drinks Vocabulary",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=SmmPSyEIxCw",
  },
  {
    id: "AR6oclY-3jY",
    start: 0,
    title: "20 Arabic Words for Everyday Life - Basic Vocabulary #1",
    channel: "ArabicPod101",
    url: "https://www.youtube.com/watch?v=AR6oclY-3jY",
  },
  {
    id: "DR4xNZqCSfE",
    start: 0,
    title: "800 Arabic Words for Everyday Life - Basic Vocabulary",
    channel: "ArabicPod101",
    url: "https://www.youtube.com/watch?v=DR4xNZqCSfE",
  },
  {
    id: "4ZRQNVuuo0c",
    start: 0,
    title: "6 Essential Arabic Words For Everyday Conversation",
    channel: "Learn Arabic Language",
    url: "https://www.youtube.com/watch?v=4ZRQNVuuo0c",
  },
  {
    id: "ylCAzIaogbQ",
    start: 0,
    title: "100 Essential Arabic Phrases for Daily Life",
    channel: "Arabic Learners Online",
    url: "https://www.youtube.com/watch?v=ylCAzIaogbQ",
  },
  {
    id: "Z9iGCqqLy-g",
    start: 0,
    title: "Daily Arabic Sentences for Beginners - English Meaning",
    channel: "MinArabic",
    url: "https://www.youtube.com/watch?v=Z9iGCqqLy-g",
  },
  {
    id: "7C2z4GqqS5E",
    start: 0,
    title: "Airport & Immigration Spoken Arabic: Complete Travel Guide",
    channel: "MinArabic",
    url: "https://www.youtube.com/watch?v=7C2z4GqqS5E",
  },
  {
    id: "6Dh-RL__uN4",
    start: 0,
    title: "Construction Site Arabic: Safety Commands & Supervisor Talk",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=6Dh-RL__uN4",
  },
  {
    id: "K4TOrB7at0Y",
    start: 0,
    title: "Hospital & Medical Clinic Communication in Spoken Arabic",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=K4TOrB7at0Y",
  },
  {
    id: "_uQrJ0TkZlc",
    start: 0,
    title: "Restaurant & Hospitality Phrases: Orders, Dining & Customer Care",
    channel: "MinArabic",
    url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
  },
  {
    id: "kXYiU_JCYtU",
    start: 0,
    title: "Driver & Delivery Arabic: Navigation, Landmarks & Police Inquiries",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
  },
  {
    id: "2Vv-BfVoq4g",
    start: 0,
    title: "Supermarket & Market Shopping: Numbers, Prices & Haggling Words",
    channel: "MinArabic",
    url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
  },
  {
    id: "M7lc1UVf-VE",
    start: 0,
    title: "Gulf Workplace Communication: Greetings, Requests & Work Ethics",
    channel: "Daily Life Arabic",
    url: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
  },
  {
    id: "dQw4w9WgXcQ",
    start: 0,
    title: "Emergency Arabic & Calling for Help: Police, Ambulance & Urgent Needs",
    channel: "ArabicPod101",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export interface YouTubeGalleryProps {
  videos?: YouTubeVideo[];
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  limit?: number;
  showViewAll?: boolean;
  isStandalonePage?: boolean;
}

/** Formats seconds into human-readable representation */
function formatSeconds(sec: number): string {
  if (sec <= 0) return "";
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds > 0 ? `${seconds}s` : ""}`.trim();
  }
  return `${minutes}m ${seconds > 0 ? `${seconds}s` : ""}`.trim();
}

/** Formats numbers to Bengali digits */
function toBengaliNumber(num: number): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)] || d);
}

export default function YouTubeGallery({
  videos = ARABIC_VIDEOS,
  title,
  subtitle,
  badge,
  className = "",
  limit,
  showViewAll = limit !== undefined,
  isStandalonePage = false,
}: YouTubeGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo>(videos[0] || ARABIC_VIDEOS[0]);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const heroPlayerRef = useRef<HTMLDivElement>(null);
  const playlistContainerRef = useRef<HTMLDivElement>(null);

  // Extract channels with video counts for filter pills
  const channelList = useMemo(() => {
    const counts: Record<string, number> = {};
    videos.forEach((v) => {
      counts[v.channel] = (counts[v.channel] || 0) + 1;
    });
    return [
      { name: "All", count: videos.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count })),
    ];
  }, [videos]);

  // Filter videos by selected channel and search query
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchesChannel = selectedChannel === "All" || v.channel === selectedChannel;
      if (!matchesChannel) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        v.title.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q)
      );
    });
  }, [videos, selectedChannel, searchQuery]);

  // Effective limit: strictly 4 items on homepage preview unless custom limit specified
  const effectiveLimit = limit !== undefined ? limit : (!isStandalonePage ? 4 : undefined);

  // Videos to display in playlist (sliced strictly if limited)
  const displayVideos = useMemo(() => {
    if (effectiveLimit && effectiveLimit > 0) {
      return filteredVideos.slice(0, effectiveLimit);
    }
    return filteredVideos;
  }, [filteredVideos, effectiveLimit]);


  // Keep activeVideo valid if videos list changes
  useEffect(() => {
    if (videos && videos.length > 0 && !videos.some((v) => v.id === activeVideo.id)) {
      setActiveVideo(videos[0]);
    }
  }, [videos, activeVideo.id]);

  // Dynamic iframe embed URL with autoplay & start time
  const embedUrl = useMemo(() => {
    const autoplayParam = `autoplay=${shouldAutoplay ? 1 : 0}`;
    const startParam = activeVideo.start && activeVideo.start > 0 ? `&start=${activeVideo.start}` : "";
    return `https://www.youtube.com/embed/${activeVideo.id}?${autoplayParam}${startParam}&rel=0&modestbranding=1&enablejsapi=1`;
  }, [activeVideo, shouldAutoplay]);

  // Handle video selection (activates video, enables autoplay, scrolls only on mobile)
  const handleSelectVideo = (video: YouTubeVideo, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveVideo(video);
    setShouldAutoplay(true);
    if (typeof window !== "undefined" && window.innerWidth < 1024 && heroPlayerRef.current) {
      heroPlayerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="video-gallery"
      ref={heroPlayerRef}
      className={`relative scroll-mt-24 sm:scroll-mt-28 overflow-hidden w-full max-w-full ${
        isStandalonePage
          ? "py-8 sm:py-14 bg-transparent"
          : "py-10 sm:py-14 bg-slate-100/70 border-t border-slate-200/80 dark:bg-[#050e08] dark:border-gulf-500/20"
      } transition-colors duration-200 ${className}`}
    >
      {/* Background Ambience Glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[500px] w-full max-w-[850px] -translate-x-1/2 rounded-full bg-hero-emerald-glow blur-[140px] opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 -z-10 h-[320px] w-[320px] rounded-full bg-gold-glow blur-[110px] opacity-25"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Header (rendered on homepage or custom title) */}
        {!isStandalonePage && (
          <div className="max-w-3xl mx-auto text-center w-full mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-3 shadow-sm">
              <Tv className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
              <span>{badge || "আরবি ভাষা শিক্ষা ভিডিও কালেকশন"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
              {title || "নিত্যদিনের আরবি কথোপকথন"}{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                {title ? "" : "ইউটিউব ভিডিও গ্যালারি"}
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {subtitle ||
                "গালফ স্পোকেন আরবি, নিত্যপ্রয়োজনীয় শব্দভাণ্ডার, বাক্য গঠন ও বাস্তব কথপোকথনের ভিডিও ক্লাস সরাসরি উপভোগ করুন।"}
            </p>

            {/* Channel Filter Pills */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {channelList.map((ch) => {
                const isActive = selectedChannel === ch.name;
                return (
                  <button
                    key={ch.name}
                    type="button"
                    onClick={() => setSelectedChannel(ch.name)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border ${
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm dark:bg-gulf-500 dark:text-slate-950 dark:border-gulf-400 font-semibold"
                        : "bg-white/80 dark:bg-surface-200/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-surface-400 hover:bg-slate-200/50 dark:hover:bg-surface-300"
                    }`}
                  >
                    {ch.name === "All" ? `সকল চ্যানেল (${toBengaliNumber(ch.count)})` : `${ch.name} (${toBengaliNumber(ch.count)})`}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Standalone Channel Filters & Search */}
        {isStandalonePage && (
          <div className="mb-8 max-w-2xl mx-auto w-full">
            {/* Search Box */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ভিডিও শিরোনাম বা চ্যানেল দিয়ে খুঁজুন..."
                className="w-full rounded-xl border border-slate-200/90 bg-white dark:border-white/10 dark:bg-surface-100/90 pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 px-1.5 py-0.5"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Channel Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {channelList.map((ch) => {
                const isActive = selectedChannel === ch.name;
                return (
                  <button
                    key={ch.name}
                    type="button"
                    onClick={() => setSelectedChannel(ch.name)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border ${
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm dark:bg-gulf-500 dark:text-slate-950 dark:border-gulf-400 font-semibold"
                        : "bg-white/80 dark:bg-surface-200/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-surface-400 hover:bg-slate-200/50"
                    }`}
                  >
                    {ch.name === "All" ? `সকল চ্যানেল (${toBengaliNumber(ch.count)})` : `${ch.name} (${toBengaliNumber(ch.count)})`}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 1. Grid Wrapper: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 2. Left Column: Active Player (7 Cols on desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 lg:sticky lg:top-20">
            {/* Video Frame */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-sm">
              <iframe
                key={`${activeVideo.id}-${shouldAutoplay}`}
                src={embedUrl}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="eager"
              />
            </div>

            {/* Active Info Card */}
            <div className="mt-3 bg-white dark:bg-surface-100 p-4 rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xs">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 text-xs py-0.5 px-2.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 dark:bg-gulf-500/20 dark:text-gulf-400 border border-emerald-200 dark:border-gulf-500/30">
                  <Radio className="w-3 h-3 text-emerald-600 dark:text-gulf-400" />
                  {activeVideo.channel}
                </span>

                {activeVideo.start > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs py-0.5 px-2.5 rounded-full font-medium bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/40 dark:border-amber-500/30 font-mono">
                    <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    Start @ {formatSeconds(activeVideo.start)} ({activeVideo.start}s)
                  </span>
                )}

                <span className="inline-flex items-center gap-1 text-xs py-0.5 px-2.5 rounded-full bg-slate-100 dark:bg-surface-200 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 font-mono">
                  Lesson {videos.findIndex((v) => v.id === activeVideo.id) + 1} of {videos.length}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                {activeVideo.title}
              </h3>

              {/* Description/details */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                সৌদি আরব, দুবাই, কাতার, কুয়েত ও ওমান প্রবাসীদের কর্মক্ষেত্রে প্রয়োজনীয় আরবি ও ইংরেজি ভাষা শিক্ষার বাস্তব লেকচার।
              </p>
            </div>
          </div>

          {/* 3. Right Column: Video Playlist / List (5 Cols on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-slate-50 dark:bg-[#07130b] border border-slate-200/80 dark:border-gulf-500/20 rounded-2xl p-2.5 sm:p-3 flex flex-col">
              {/* Video List starting directly from the first video item */}
              <div
                ref={playlistContainerRef}
                className={
                  isStandalonePage
                    ? "space-y-2.5 max-h-[720px] overflow-y-auto pr-1 playlist-scrollbar"
                    : "space-y-2.5 sm:space-y-3 h-auto overflow-visible"
                }
              >
                {displayVideos.map((video) => {
                  const isActive = video.id === activeVideo.id;
                  const overallIndex = videos.findIndex((v) => v.id === video.id);
                  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

                  return (
                    <button
                      type="button"
                      key={video.id}
                      aria-label={`Play video: ${video.title}`}
                      aria-pressed={isActive}
                      onClick={(e) => handleSelectVideo(video, e)}
                      className={`w-full text-left flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                        isActive
                          ? "ring-2 ring-emerald-500 bg-emerald-50/90 border border-emerald-300/80 text-emerald-900 font-semibold shadow-xs dark:bg-emerald-950/70 dark:border-emerald-700 dark:ring-emerald-400 dark:text-emerald-200"
                          : "bg-white hover:bg-slate-100 border border-slate-100 text-slate-700 dark:bg-surface-100/90 dark:hover:bg-surface-200 dark:border-white/5 dark:text-slate-300"
                      }`}
                    >
                      {/* Compact thumbnail on left */}
                      <div className="w-24 h-16 rounded-lg object-cover shrink-0 relative overflow-hidden bg-slate-900">
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {isActive ? (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-5 h-5 text-emerald-400 fill-current" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/10 hover:bg-black/25 flex items-center justify-center transition-colors">
                            <Play className="w-4 h-4 text-white/80 fill-white/80" />
                          </div>
                        )}
                        {video.start > 0 && (
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/75 text-[9px] font-mono text-white">
                            {formatSeconds(video.start)}
                          </span>
                        )}
                      </div>

                      {/* Info: Lesson number/title + duration badge */}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium line-clamp-2 leading-snug">
                          {overallIndex + 1}. {video.title}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                          <span className="truncate">{video.channel}</span>
                          <span>•</span>
                          <span>ভিডিও #{toBengaliNumber(overallIndex + 1)}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* View All CTA Button directly beneath playlist */}
              {showViewAll && !isStandalonePage && (
                <Link
                  href="/video-classes"
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm group"
                >
                  <span>সব ভিডিও ক্লাস দেখুন</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Educational Banner */}
        <div className="mt-14 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:border-gold-500/20 dark:bg-gold-500/5 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-gold-500/10 flex items-center justify-center text-amber-600 dark:text-gold-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                আরও নতুন লেকচার ও প্র্যাকটিস সেশন চান?
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                প্রতি সপ্তাহে সরাসরি গালফ প্রবাসী শিক্ষকদের নতুন ভিডিও ও অডিও লেসন আপডেট করা হয়।
              </p>
            </div>
          </div>

          <Link
            href="/#curriculum"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-gulf-500 dark:hover:bg-gulf-600 text-white dark:text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md shrink-0"
          >
            <span>সম্পূর্ণ কোর্স কারিকুলাম দেখুন</span>
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </Link>
        </div>
      </div>
    </section>
  );
}
