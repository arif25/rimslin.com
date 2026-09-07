"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check in case user reloads when scrolled down
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`group fixed bottom-20 right-5.5 sm:bottom-20 sm:right-6 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center overflow-hidden rounded-full border-2 border-white/40 bg-gradient-to-br from-[#1DE9B6] via-[#00BFA5] to-[#009688] hover:from-[#00F5D4] hover:via-[#1DE9B6] hover:to-[#00BFA5] text-white shadow-2xl shadow-emerald-950/40 hover:shadow-emerald-950/60 transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Subtle dot pattern texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-20 pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:8px_8px]"
      />

      {/* Traveling light shine animation on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none rounded-full"
      />

      <ArrowUp
        className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-white relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </button>
  );
}
