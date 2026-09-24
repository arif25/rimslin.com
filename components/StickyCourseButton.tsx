"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Play, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface StickyCourseButtonProps {
  onStartCourse?: () => void;
  className?: string;
}

export default function StickyCourseButton({
  onStartCourse,
  className = "",
}: StickyCourseButtonProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);
  const collapseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHasMounted(true);

    // Auto-collapse after 4 seconds on mobile initial load
    collapseTimerRef.current = setTimeout(() => {
      setIsMobileCollapsed(true);
    }, 4000);

    return () => {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    };
  }, []);

  // Collapse if clicked outside on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileCollapsed(true);
        if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // If mobile was collapsed, expand it temporarily on tap
    if (isMobileCollapsed) {
      setIsMobileCollapsed(false);
    }
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);

    // If custom action callback is provided, invoke it
    if (onStartCourse) {
      onStartCourse();
      return;
    }

    // Homepage: smooth scroll to #courses-pricing
    if (pathname === "/") {
      const target =
        document.getElementById("courses-pricing") ||
        document.getElementById("course-plans");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else if (pathname === "/courses") {
      // Already on /courses: smoothly scroll to first course section or top
      const target =
        document.getElementById("starter") ||
        document.getElementById("course-plans");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Any other page (e.g. /about, /contact): navigate to /courses
      router.push("/courses");
    }

    // Auto-collapse on mobile after 3 seconds following click
    collapseTimerRef.current = setTimeout(() => {
      setIsMobileCollapsed(true);
    }, 3000);
  };

  if (!hasMounted) return null;

  return (
    <div
      className={`fixed top-[200px] right-[10px] z-50 select-none group/sticky ${className}`}
    >
      {/* Ambient gentle breathing glow ring */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-1 rounded-[30px] bg-gradient-to-r from-emerald-500/40 via-teal-400/30 to-emerald-600/40 blur-md opacity-60 group-hover/sticky:opacity-100 transition-opacity duration-500 animate-pulse ${
          isMobileCollapsed ? "w-14 h-14 rounded-full" : "rounded-[30px]"
        } md:!w-full md:!h-full md:!rounded-[30px]`}
      />

      {/* Mobile pulse indicator when collapsed */}
      {isMobileCollapsed && (
        <span className="absolute -top-1 -right-1 z-10 flex h-3 w-3 md:hidden pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-slate-900" />
        </span>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        aria-label={t.navbar.startCourse}
        aria-expanded={!isMobileCollapsed}
        className={`group relative overflow-hidden flex items-center justify-center gap-2 rounded-[28px] bg-gradient-to-r from-emerald-600 via-[#00BFA5] to-teal-700 hover:from-emerald-500 hover:via-[#1DE9B6] hover:to-teal-600 text-white font-semibold shadow-xl shadow-emerald-950/40 hover:shadow-emerald-900/60 border border-white/30 backdrop-blur-md hover:scale-[1.03] active:scale-95 transition-all duration-300 ease-in-out cursor-pointer ${
          isMobileCollapsed
            ? "w-12 h-12 rounded-[28px] p-0 flex items-center justify-center"
            : "py-3 px-5 rounded-[28px]"
        } md:!w-auto md:!h-auto md:!py-3.5 md:!px-6 md:!rounded-[28px] md:!flex md:!items-center md:!justify-center md:!gap-2.5`}
      >
        {/* Subtle radial dot pattern overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[28px] opacity-20 pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:8px_8px]"
        />

        {/* Traveling light shine animation on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[28px] -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none"
        />

        {/* Play Icon */}
        <Play className="w-5 h-5 fill-current text-white shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10" />

        {/* Text Container: Collapses on mobile after 4s, always visible on desktop */}
        <span
          className={`whitespace-nowrap font-bold text-xs sm:text-sm tracking-wider uppercase drop-shadow-sm transition-all duration-300 relative z-10 ${
            isMobileCollapsed ? "hidden" : "inline-block"
          } md:!inline-block`}
        >
          {t.navbar.startCourse}
        </span>

        {/* Direction Arrow: Follows text visibility */}
        <ArrowRight
          className={`w-3.5 h-3.5 rtl:rotate-180 shrink-0 text-white/90 drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1 relative z-10 ${
            isMobileCollapsed ? "hidden" : "inline-block"
          } md:!inline-block`}
        />
      </button>
    </div>
  );
}
