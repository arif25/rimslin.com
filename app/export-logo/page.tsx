"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Download,
  Image as ImageIcon,
  Check,
  Copy,
  Layers,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  Globe,
} from "lucide-react";

export default function ExportLogoPage() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<"dark" | "light" | "transparent">("dark");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  /**
   * High-Resolution Client-side HTML5 Canvas Snapshot Exporter
   */
  const exportViaCanvas = async (
    format: "square" | "horizontal" | "transparent-strip",
    theme: "dark" | "light" | "transparent",
    fileName: string
  ) => {
    setDownloading(fileName);

    try {
      const isSquare = format === "square";
      const isStrip = format === "transparent-strip";
      const width = isSquare ? 800 : isStrip ? 1040 : 1200;
      const height = isSquare ? 800 : isStrip ? 240 : 630;

      const canvas = document.createElement("canvas");
      // Supersample at 2x for ultra-sharp high-DPI retina output
      const scale = 2;
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      ctx.scale(scale, scale);

      // 1. Draw Background
      if (theme === "dark") {
        ctx.fillStyle = "#060b08";
        ctx.fillRect(0, 0, width, height);
      } else if (theme === "light") {
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, width, height);
      } else {
        // Transparent background
        ctx.clearRect(0, 0, width, height);
      }

      // 2. Fetch the clean standalone SVG
      const svgFileName = theme === "light" ? "/rimslin-logo-light.svg" : "/rimslin-logo-dark.svg";
      const svgRes = await fetch(svgFileName);
      const svgText = await svgRes.text();

      // Convert SVG text to an Image source
      const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      });

      // 3. Draw Logo Centered on Canvas
      const logoOriginalWidth = 520;
      const logoOriginalHeight = 120;
      const renderScale = isSquare ? 1.25 : isStrip ? 1.4 : 1.55;
      const drawWidth = logoOriginalWidth * renderScale;
      const drawHeight = logoOriginalHeight * renderScale;

      const drawX = (width - drawWidth) / 2;
      const drawY = (height - drawHeight) / 2;

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      URL.revokeObjectURL(url);

      // 4. Download file
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) return;
        const downloadUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
        setDownloading(null);
      }, "image/png");
    } catch (err) {
      console.error("Canvas export failed, falling back to direct download:", err);
      // Fallback: direct download from /public or API route
      const fallbackUrl =
        format === "square"
          ? `/api/export-logo?format=square&theme=${theme}`
          : `/api/export-logo?format=horizontal&theme=${theme}`;
      const a = document.createElement("a");
      a.href = fallbackUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white pb-20">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমপেজে ফিরে যান (Return Home)</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Brand Exporter</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Rimslin Logo &amp; Brand Asset Exporter
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Export the official Header Logo with brand icon, typography, and Career badge as standalone vector SVG and high-resolution PNG files for Facebook, LinkedIn, WhatsApp, and social media banners.
          </p>
        </div>

        {/* =================================================================== */}
        {/* SECTION 1: ONE-CLICK QUICK DOWNLOADS                                */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Square Profile PNG */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Square Profile PNG (800x800)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Centered, 1:1 aspect ratio. Perfect for WhatsApp Business, LinkedIn Page, Facebook Profile, and Twitter avatar.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() =>
                  exportViaCanvas("square", selectedTheme, "rimslin-logo-square.png")
                }
                disabled={downloading === "rimslin-logo-square.png"}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>
                  {downloading === "rimslin-logo-square.png"
                    ? "রেন্ডার হচ্ছে..."
                    : "Download Square PNG"}
                </span>
              </button>

              <a
                href="/rimslin-logo-square.png"
                download="rimslin-logo-square.png"
                className="w-full py-1.5 text-center text-xs text-slate-400 hover:text-emerald-400 transition-colors block"
              >
                Direct File Link (/public)
              </a>
            </div>
          </div>

          {/* Card 2: Horizontal Banner PNG */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Horizontal Banner PNG (1200x630)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Standard 1.91:1 OpenGraph resolution. Ideal for Facebook posts, LinkedIn banners, article link previews, and presentations.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() =>
                  exportViaCanvas("horizontal", selectedTheme, "rimslin-logo-horizontal.png")
                }
                disabled={downloading === "rimslin-logo-horizontal.png"}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>
                  {downloading === "rimslin-logo-horizontal.png"
                    ? "রেন্ডার হচ্ছে..."
                    : "Download Banner PNG"}
                </span>
              </button>

              <a
                href="/rimslin-logo-horizontal.png"
                download="rimslin-logo-horizontal.png"
                className="w-full py-1.5 text-center text-xs text-slate-400 hover:text-emerald-400 transition-colors block"
              >
                Direct File Link (/public)
              </a>
            </div>
          </div>

          {/* Card 3: Standalone Vector SVG */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Standalone Vector SVG (.svg)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pure vector graphic with standard SVG paths and responsive dark/light adaptive styling. Infinite resolution for print &amp; web.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="/rimslin-social-logo.svg"
                download="rimslin-social-logo.svg"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Download Vector SVG</span>
              </a>

              <a
                href="/rimslin-social-logo.svg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 text-center text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center justify-center gap-1"
              >
                <span>Preview Raw SVG in Browser</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SECTION 2: LIVE VISUAL PREVIEWS                                    */}
        {/* =================================================================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Live Visual Previews</h2>
              <p className="text-xs text-slate-400">
                Inspect how the logo renders across different background styles.
              </p>
            </div>

            {/* Theme Filter Selector */}
            <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
              <button
                type="button"
                onClick={() => setSelectedTheme("dark")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  selectedTheme === "dark"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Dark Theme
              </button>
              <button
                type="button"
                onClick={() => setSelectedTheme("light")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  selectedTheme === "light"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Light Theme
              </button>
              <button
                type="button"
                onClick={() => setSelectedTheme("transparent")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  selectedTheme === "transparent"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Transparent
              </button>
            </div>
          </div>

          {/* Preview Canvas 1: Dark Mode Canvas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Dark Background (#060b08)</span>
              <button
                type="button"
                onClick={() =>
                  exportViaCanvas("horizontal", "dark", "rimslin-logo-dark-horizontal.png")
                }
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Export this view
              </button>
            </div>
            <div className="p-10 rounded-2xl border border-slate-800 bg-[#060b08] flex items-center justify-center shadow-2xl overflow-hidden">
              {/* Mounted Exact Header Logo */}
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-400 to-amber-400 p-[1.5px] shadow-lg shadow-emerald-950/40 shrink-0">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#07120b] p-2">
                    <Globe className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                      Rimslin<span className="text-amber-500">.com</span>
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] sm:text-xs font-bold tracking-tight rounded-md bg-emerald-950/40 text-emerald-300 border border-emerald-800/60 leading-none shrink-0">
                      StepAhead
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
                    Expat Language &amp; Career Platform
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Canvas 2: Light Mode Canvas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Light Background (#f8fafc)</span>
              <button
                type="button"
                onClick={() =>
                  exportViaCanvas("horizontal", "light", "rimslin-logo-light-horizontal.png")
                }
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Export this view
              </button>
            </div>
            <div className="p-10 rounded-2xl border border-slate-700 bg-slate-50 flex items-center justify-center shadow-xl overflow-hidden">
              {/* Mounted Exact Header Logo (Light theme) */}
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-400 to-amber-400 p-[1.5px] shadow-sm shrink-0">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-100 p-2">
                    <Globe className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                      Rimslin<span className="text-amber-500">.com</span>
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] sm:text-xs font-bold tracking-tight rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 leading-none shrink-0">
                      StepAhead
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide">
                    Expat Language &amp; Career Platform
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Canvas 3: Transparent Checkerboard Canvas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Transparent Background (Alpha Channel)</span>
              <button
                type="button"
                onClick={() =>
                  exportViaCanvas("transparent-strip", "transparent", "rimslin-logo-transparent.png")
                }
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Export Transparent PNG
              </button>
            </div>
            <div
              className="p-10 rounded-2xl border border-slate-800 flex items-center justify-center shadow-xl overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                backgroundColor: "#0f172a",
              }}
            >
              {/* Standalone SVG image preview directly */}
              <img
                src="/rimslin-social-logo.svg"
                alt="Rimslin Transparent Social Logo"
                className="h-16 sm:h-20 w-auto"
              />
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* SECTION 3: CODE SNIPPETS & EMBEDDING                                */}
        {/* =================================================================== */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Embed Link &amp; File Paths</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Vector SVG
              </span>
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>/rimslin-social-logo.svg</span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard("/rimslin-social-logo.svg", "svg-path")
                  }
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copy path"
                >
                  {copied === "svg-path" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Square Profile PNG
              </span>
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>/rimslin-logo-square.png</span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard("/rimslin-logo-square.png", "square-path")
                  }
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copy path"
                >
                  {copied === "square-path" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Banner PNG
              </span>
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>/rimslin-logo-horizontal.png</span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard("/rimslin-logo-horizontal.png", "banner-path")
                  }
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copy path"
                >
                  {copied === "banner-path" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
