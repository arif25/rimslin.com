/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, ChevronDown, GraduationCap, LogIn } from "lucide-react";
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
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
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

  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      await logout();
      if (onActionComplete) onActionComplete();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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
    : user?.email?.[0]?.toUpperCase() || user?.phoneNumber?.slice(-2) || "U";

  // First name for header pill display
  const firstName =
    user?.displayName?.trim().split(" ")[0] ||
    (user?.phoneNumber ? user.phoneNumber.slice(-4) : "User");

  // =========================================================================
  // 2. MOBILE DRAWER VARIANT
  // =========================================================================
  if (variant === "mobile") {
    if (!user) {
      return (
        <Link
          href="/login"
          onClick={() => {
            if (onActionComplete) onActionComplete();
          }}
          className={`w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm shadow-emerald-600/20 transition-all active:scale-98 ${className}`}
        >
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
        </Link>
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
                {user.displayName || "Student"}
              </span>
              <span className="inline-flex px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                {user.phoneNumber ? "Phone" : "Google"}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user.email || user.phoneNumber}
            </p>
          </div>
        </div>

        {/* Action Links */}
        <div className="space-y-2 pt-1 border-t border-emerald-500/15 dark:border-emerald-500/10">
          <Link
            href="/dashboard"
            onClick={() => {
              if (onActionComplete) onActionComplete();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95"
          >
            <GraduationCap className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/profile"
              onClick={() => {
                if (onActionComplete) onActionComplete();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-sm"
            >
              <User className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Profile</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/40 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shadow-sm"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. HEADER DESKTOP / NAVBAR VARIANT
  // =========================================================================
  if (!user) {
    return (
      <Link
        href="/login"
        className={`inline-flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 px-3 sm:px-3.5 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all active:scale-95 shrink-0 ${className}`}
        title="Sign In"
      >
        <LogIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="whitespace-nowrap">Sign In</span>
      </Link>
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
        title={user.displayName || user.email || user.phoneNumber || "User Profile"}
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
                  {user.displayName || "Student"}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {user.email || user.phoneNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-0.5">
            <Link
              href="/dashboard"
              onClick={() => {
                setIsDropdownOpen(false);
                if (onActionComplete) onActionComplete();
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/50 transition-colors"
            >
              <GraduationCap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/profile"
              onClick={() => {
                setIsDropdownOpen(false);
                if (onActionComplete) onActionComplete();
              }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 hover:text-emerald-800 dark:hover:bg-slate-800/80 dark:hover:text-white transition-colors"
            >
              <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>My Profile</span>
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
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
}
