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
        className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border-2 border-white/40 bg-gradient-to-br from-[#1DE9B6] via-[#00BFA5] to-[#009688] hover:from-[#00F5D4] hover:via-[#1DE9B6] hover:to-[#00BFA5] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-2xl shadow-emerald-950/40 hover:shadow-emerald-950/60 transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background"
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

        {/* Pulse online indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white border-2 border-emerald-900" />
        </span>

        {/* WhatsApp MessageCircle Icon */}
        <MessageCircle className="h-5 w-5 fill-current text-white shrink-0 relative z-10 drop-shadow-sm" />

        {/* 2-line Text Block: WHATSAPP / Chat With Us */}
        <div className="flex flex-col items-start leading-tight pr-0.5 relative z-10">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-white/90 leading-tight drop-shadow-sm">
            WHATSAPP
          </span>
          <span className="text-xs sm:text-sm font-bold leading-tight text-white whitespace-nowrap drop-shadow-sm">
            Chat With Us
          </span>
        </div>
      </a>
    </div>
  );
}
