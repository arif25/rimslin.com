/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useMemo } from "react";
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

  // Videos to display in grid (sliced if limited)
  const displayVideos = useMemo(() => {
    if (limit && limit > 0) {
      return filteredVideos.slice(0, limit);
    }
    return filteredVideos;
  }, [filteredVideos, limit]);

  // Current active index within the filtered list
  const currentIndex = useMemo(() => {
    const idx = filteredVideos.findIndex((v) => v.id === activeVideo.id);
    return idx >= 0 ? idx : 0;
  }, [filteredVideos, activeVideo.id]);

  // Dynamic iframe embed URL with autoplay & start time
  const embedUrl = useMemo(() => {
    const autoplayParam = `autoplay=${shouldAutoplay ? 1 : 0}`;
    const startParam = activeVideo.start && activeVideo.start > 0 ? `&start=${activeVideo.start}` : "";
    return `https://www.youtube.com/embed/${activeVideo.id}?${autoplayParam}${startParam}&rel=0&modestbranding=1`;
  }, [activeVideo, shouldAutoplay]);

  // Handle video selection (scrolls to hero player on mobile/desktop)
  const handleSelectVideo = (video: YouTubeVideo) => {
    setActiveVideo(video);
    setShouldAutoplay(true);
    if (heroPlayerRef.current) {
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
          : "py-20 sm:py-28 bg-slate-100/70 border-t border-slate-200/80 dark:bg-[#050e08] dark:border-gulf-500/20"
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

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 min-w-0">
        {/* Section Header (rendered on homepage or custom title) */}
        {!isStandalonePage && (
          <div className="max-w-3xl mx-auto text-center w-full mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:border-gulf-500/30 dark:bg-gulf-950/50 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-gulf-300 backdrop-blur-md mb-4 shadow-sm">
              <Tv className="h-3.5 w-3.5 text-emerald-600 dark:text-gulf-400" />
              <span>{badge || `আরবি ভাষা শিক্ষা ভিডিও কালেকশন (${toBengaliNumber(videos.length)} টি ক্লাস)`}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title || "নিত্যদিনের আরবি কথোপকথন"}{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-[#6ee7b7] dark:via-[#34d399] dark:to-[#fcd34d] bg-clip-text text-transparent">
                {title ? "" : "ইউটিউব ভিডিও গ্যালারি"}
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {subtitle ||
                "গালফ স্পোকেন আরবি, নিত্যপ্রয়োজনীয় শব্দভাণ্ডার, বাক্য গঠন ও বাস্তব কথপোকথনের ভিডিও ক্লাস সরাসরি উপভোগ করুন।"}
            </p>

            {/* Channel Filter Pills */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {channelList.map((ch) => {
                const isActive = selectedChannel === ch.name;
                return (
                  <button
                    key={ch.name}
                    type="button"
                    onClick={() => setSelectedChannel(ch.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/25 dark:bg-gulf-500 dark:text-slate-950 dark:border-gulf-400 font-semibold"
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
          <div className="mb-10 max-w-4xl mx-auto w-full">
            {/* Search Box */}
            <div className="relative max-w-lg mx-auto mb-6">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ভিডিও শিরোনাম বা চ্যানেল দিয়ে খুঁজুন (যেমন: Words, Airport, Site)..."
                className="w-full rounded-2xl border border-slate-200/90 bg-white dark:border-white/10 dark:bg-surface-100/90 pl-10 pr-10 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Channel Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {channelList.map((ch) => {
                const isActive = selectedChannel === ch.name;
                return (
                  <button
                    key={ch.name}
                    type="button"
                    onClick={() => setSelectedChannel(ch.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/25 dark:bg-gulf-500 dark:text-slate-950 dark:border-gulf-400 font-semibold"
                        : "bg-white/80 dark:bg-surface-200/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-surface-400 hover:bg-slate-200/50 dark:hover:bg-surface-300"
                    }`}
                  >
                    {ch.name === "All" ? `সকল চ্যানেল (${ch.count})` : `${ch.name} (${ch.count})`}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* A. TOP HERO PLAYER (Cinema View) */}
        <div className="w-full max-w-5xl mx-auto mb-10 sm:mb-14">
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-200/80 dark:border-gulf-500/30">
            {/* 16:9 Aspect Ratio Main Player */}
            <div className="relative w-full aspect-video bg-black overflow-hidden">
              <iframe
                key={`${activeVideo.id}-${activeVideo.start}`}
                src={embedUrl}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="eager"
              />
            </div>

            {/* Active Video Title & Metadata */}
            <div className="p-4 sm:p-6 bg-white dark:bg-surface-100 border-t border-slate-200 dark:border-white/10 transition-colors">
              <div className="flex flex-col gap-2">
                {/* Channel Name Badge, Start Timestamp, and Lesson Counter */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-gulf-500/20 dark:text-gulf-400 border border-emerald-200 dark:border-gulf-500/30">
                    <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-gulf-400" />
                    {activeVideo.channel}
                  </span>

                  {activeVideo.start > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/40 dark:border-amber-500/30 font-mono">
                      <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      Start @ {formatSeconds(activeVideo.start)} ({activeVideo.start}s)
                    </span>
                  )}

                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Lesson {videos.findIndex((v) => v.id === activeVideo.id) + 1} of {videos.length}
                  </span>
                </div>

                {/* Active Video Title */}
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                  {activeVideo.title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* B. VIDEO THUMBNAIL GRID */}
        <div className="w-full">
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-600 dark:text-gulf-400" />
                <span>
                  {limit
                    ? `ভিডিও ক্লাস প্রিভিউ (${toBengaliNumber(displayVideos.length)} টি ক্লাস)`
                    : `সকল ভিডিও প্লেলিস্ট (${toBengaliNumber(filteredVideos.length)} টি ক্লাস)`}
                </span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                যেকোনো কার্ডে ক্লিক করে সরাসরি উপরের প্লেয়ারে দেখুন
              </p>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {currentIndex + 1} of {filteredVideos.length} Selected
              </span>
            </div>
          </div>

          {/* Cards Grid: Clean preview grid when limited, full responsive grid when standalone */}
          {displayVideos.length > 0 ? (
            <div
              ref={playlistContainerRef}
              className={`w-full ${
                !limit && !isStandalonePage
                  ? "max-h-[520px] overflow-y-auto overflow-x-hidden playlist-scrollbar p-1"
                  : ""
              }`}
            >
              <div
                className={`grid gap-3.5 sm:gap-5 ${
                  limit
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {displayVideos.map((video) => {
                  const overallIndex = videos.findIndex((v) => v.id === video.id);
                  const isActive = video.id === activeVideo.id;
                  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

                  return (
                    <div
                      key={video.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Play video: ${video.title}`}
                      aria-pressed={isActive}
                      onClick={() => handleSelectVideo(video)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectVideo(video);
                        }
                      }}
                      className={`group relative flex flex-col rounded-2xl overflow-hidden text-left cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        isActive
                          ? "ring-2 ring-emerald-500 dark:ring-gulf-400 border-transparent bg-emerald-50/90 dark:bg-gulf-950/50 shadow-xl shadow-emerald-500/20 -translate-y-1"
                          : "border border-slate-200/90 dark:border-white/10 bg-white dark:bg-surface-100 shadow-sm hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/10"
                      }`}
                    >
                      {/* YouTube Thumbnail Container with 16:9 Aspect Ratio */}
                      <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          loading="lazy"
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                            isActive
                              ? "scale-105 filter contrast-105"
                              : "opacity-90 group-hover:opacity-100"
                          }`}
                        />

                        {/* Dark gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none" />

                        {/* Centered Play Button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                              isActive
                                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/50 scale-105 opacity-100"
                                : "bg-black/65 text-white border border-white/25 opacity-80 group-hover:opacity-100 group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:border-transparent group-hover:scale-110"
                            }`}
                          >
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                          </div>
                        </div>

                        {/* Active "Now Playing" Highlight Badge */}
                        {isActive && (
                          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-600 dark:bg-gulf-500 text-white dark:text-slate-950 text-[10px] sm:text-[11px] font-bold shadow-md tracking-wide">
                            <span className="flex items-end gap-0.5 h-3">
                              <span className="w-0.5 bg-current h-2 animate-pulse" />
                              <span className="w-0.5 bg-current h-3 animate-pulse delay-75" />
                              <span className="w-0.5 bg-current h-1.5 animate-pulse delay-150" />
                            </span>
                            <span>PLAYING</span>
                          </div>
                        )}

                        {/* Start timestamp tag if non-zero */}
                        {video.start > 0 && !isActive && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 text-[10px] font-bold shadow-sm">
                            @{video.start}s
                          </div>
                        )}

                        {/* Index Badge */}
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-mono font-bold shadow-sm">
                          #{overallIndex + 1}
                        </div>
                      </div>

                      {/* Card Content: Title & Channel Tag */}
                      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h5
                            className={`text-xs sm:text-sm font-semibold line-clamp-2 leading-snug transition-colors ${
                              isActive
                                ? "text-emerald-700 dark:text-gulf-300 font-bold"
                                : "text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-gulf-400"
                            }`}
                            title={video.title}
                          >
                            {video.title}
                          </h5>
                        </div>

                        {/* Channel Name Tag & Footer Info */}
                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-white/5">
                          <span className="truncate max-w-[140px] font-medium text-[11px] text-slate-600 dark:text-slate-300">
                            {video.channel}
                          </span>
                          {video.start > 0 ? (
                            <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 shrink-0">
                              @{formatSeconds(video.start)}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 shrink-0">Full Video</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 p-8 my-8 max-w-md mx-auto">
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                &ldquo;{searchQuery}&rdquo; দিয়ে কোনো ভিডিও পাওয়া যায়নি।
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedChannel("All");
                }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-gulf-400 hover:underline"
              >
                সব ভিডিও ক্লাস পুনরায় দেখুন
              </button>
            </div>
          )}
        </div>

        {/* Centered Modern "View All" CTA Button (Homepage Preview Mode) */}
        {showViewAll && (
          <div className="mt-12 sm:mt-14 flex flex-col items-center justify-center text-center px-4">
            <Link
              href="/video-classes"
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 px-7 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-700/25 hover:shadow-xl hover:shadow-emerald-600/35 transition-all duration-300 hover:scale-[1.02] active:scale-98 border border-emerald-400/30"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <Tv className="h-4 w-4 text-white animate-pulse" />
              </span>
              <span className="font-extrabold tracking-wide">
                সব ভিডিও ক্লাস দেখুন (২৪ টি ক্লাস)
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 max-w-md">
              নিত্যদিনের শব্দভাণ্ডার, ব্যাকরণ, কথোপকথন ও কাজের সাইটের সম্পূর্ণ ২৪টি ভিডিও ক্লাস
            </p>
          </div>
        )}

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
