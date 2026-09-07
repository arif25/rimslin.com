/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, ChevronDown, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AuthButtonProps {
  variant?: "header" | "mobile";
  onActionComplete?: () => void;
  className?: string;
}

export default function AuthButton({
  variant = "header",
  onActionComplete,
  className = "",
}: AuthButtonProps) {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  const handleLogin = async () => {
    try {
      setIsSigningIn(true);
      await loginWithGoogle();
      if (onActionComplete) onActionComplete();
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      await logout();
      if (onActionComplete) onActionComplete();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Google 4-color "G" Logo SVG
  const GoogleGIcon = () => (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );

  // 1. Pre-mount & Auth Loading Skeleton Placeholder
  if (!hasMounted || loading) {
    if (variant === "mobile") {
      return (
        <div className="w-full h-12 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      );
    }
    return (
      <div className={`h-8 w-24 sm:h-9 sm:w-28 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse shrink-0 ${className}`} />
    );
  }

  // Helper for initials
  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : user?.email?.[0].toUpperCase() || "U";

  // First name for header pill display
  const firstName = user?.displayName?.trim().split(" ")[0] || "ইউজার";

  // =========================================================================
  // 2. MOBILE DRAWER VARIANT
  // =========================================================================
  if (variant === "mobile") {
    if (!user) {
      return (
        <button
          type="button"
          onClick={handleLogin}
          disabled={isSigningIn}
          className={`w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold text-sm shadow-sm hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 transition-all active:scale-98 ${className}`}
        >
          {isSigningIn ? (
            <div className="h-4 w-4 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
          ) : (
            <GoogleGIcon />
          )}
          <span>{isSigningIn ? "লগইন হচ্ছে..." : "গুগল দিয়ে লগইন"}</span>
        </button>
      );
    }

    return (
      <div className={`w-full rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-950/20 p-3.5 space-y-3 ${className}`}>
        {/* User Card Header */}
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 rounded-full overflow-hidden border-2 border-emerald-500/40 bg-white dark:bg-surface-200 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-sm shrink-0 shadow-sm">
            {user.photoURL && !imgError ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {user.displayName || "সম্মানিত ইউজার"}
              </span>
              <span className="inline-flex px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                Google
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Action Links */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-500/15 dark:border-emerald-500/10">
          <Link
            href="/profile"
            onClick={() => {
              if (onActionComplete) onActionComplete();
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-sm"
          >
            <User className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>প্রোফাইল</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/40 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shadow-sm"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. HEADER DESKTOP / NAVBAR VARIANT
  // =========================================================================
  if (!user) {
    return (
      <button
        type="button"
        onClick={handleLogin}
        disabled={isSigningIn}
        className={`inline-flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 px-2.5 sm:px-3 text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 dark:bg-[#08150d] text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 hover:bg-emerald-50/60 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-95 shrink-0 ${className}`}
        title="গুগল দিয়ে লগইন করুন"
      >
        {isSigningIn ? (
          <div className="h-3.5 w-3.5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
        ) : (
          <GoogleGIcon />
        )}
        <span className="hidden sm:inline whitespace-nowrap">
          {isSigningIn ? "লগইন হচ্ছে..." : "গুগল দিয়ে লগইন"}
        </span>
        <span className="sm:hidden whitespace-nowrap">
          {isSigningIn ? "..." : "লগইন"}
        </span>
      </button>
    );
  }

  return (
    <div className={`relative inline-block text-left z-50 shrink-0 ${className}`} ref={dropdownRef}>
      {/* User Avatar & Name Button Trigger */}
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 pl-1.5 pr-2 sm:pr-2.5 rounded-full sm:rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 dark:bg-[#08150d] text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 shrink-0"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        title={user.displayName || user.email || "ইউজার প্রোফাইল"}
      >
        {/* User Avatar image / fallback */}
        <div className="relative h-6 w-6 sm:h-6.5 sm:w-6.5 rounded-full overflow-hidden border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-[10px] shrink-0">
          {user.photoURL && !imgError ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* User First Name */}
        <span className="hidden md:inline text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
          {firstName}
        </span>

        <ChevronDown
          className={`h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180 text-emerald-600 dark:text-emerald-400" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Popover */}
      {isDropdownOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-1.5 w-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 dark:bg-[#08150d] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-2 z-[100] animate-in fade-in-50 slide-in-from-top-2 duration-150">
          {/* User Details Header */}
          <div className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-1.5">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full overflow-hidden border border-emerald-500/30 bg-emerald-100/50 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-xs shrink-0">
                {user.photoURL && !imgError ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {user.displayName || "সম্মানিত ইউজার"}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-0.5">
            <Link
              href="/profile"
              onClick={() => {
                setIsDropdownOpen(false);
                if (onActionComplete) onActionComplete();
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-slate-800/80 dark:hover:text-white transition-colors"
            >
              <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>প্রোফাইল (My Profile)</span>
            </Link>
          </div>

          <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors text-left"
          >
            <LogOut className="h-4 w-4" />
            <span>লগআউট (Sign out)</span>
          </button>
        </div>
      )}
    </div>
  );
}
