"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/message/BA7ZADIS4EEDG1";

  return (
    <div className="fixed bottom-6 left-6 z-40 group select-none">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp - Chat With Us"
        className="relative inline-flex items-center gap-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-xl shadow-emerald-950/30 border border-emerald-400/40 backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background"
      >
        {/* Pulse online indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-slate-950" />
        </span>

        {/* WhatsApp MessageCircle Icon */}
        <MessageCircle className="h-5 w-5 fill-current text-white shrink-0" />

        {/* 2-line Text Block: WHATSAPP / Chat With Us */}
        <div className="flex flex-col items-start leading-tight pr-0.5">
          <span className="text-[10px] font-bold tracking-wider uppercase opacity-90 leading-tight text-emerald-100">
            WHATSAPP
          </span>
          <span className="text-xs sm:text-sm font-semibold leading-tight text-white whitespace-nowrap">
            Chat With Us
          </span>
        </div>
      </a>
    </div>
  );
}
