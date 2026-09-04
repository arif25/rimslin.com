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
      className={`group fixed bottom-6 right-6 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-gulf-500 hover:from-emerald-500 hover:to-gulf-400 dark:from-gulf-600 dark:to-emerald-500 dark:hover:from-gulf-500 dark:hover:to-emerald-400 text-white shadow-lg shadow-emerald-950/25 dark:shadow-gulf-950/50 border border-emerald-400/30 dark:border-gulf-400/40 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gulf-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp
        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </button>
  );
}
