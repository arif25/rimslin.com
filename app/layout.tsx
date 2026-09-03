import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Bengali, Noto_Sans_Devanagari, Noto_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-bengali",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-devanagari",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rimslin.com"),
  title: {
    default: "Rimslin | গালফ স্পোকেন আরবি, জব ইংলিশ ও হিন্দি শিক্ষা",
    template: "%s | Rimslin",
  },
  description:
    "সৌদি আরব, দুবাই (UAE), কাতার, কুয়েত ও ওমান কাজের জন্য সহজে শিখুন গালফ স্পোকেন আরবি (খালিজি/আম্মিয়া), প্র্যাকটিক্যাল স্পোকেন ইংলিশ ও হিন্দি। ব্যাকরণ ছাড়া সহজে কথা বলুন।",
  keywords: [
    "Rimslin",
    "Gulf Arabic for Bengali",
    "প্রবাসী আরবি ভাষা শিক্ষা",
    "Spoken Arabic Khaleeji",
    "দুবাই আরবি ভাষা",
    "সৌদি স্পোকেন আরবি",
    "কাতার আরবি ভাষা",
    "Gulf Job English",
    "Bengali to Arabic for Work",
    "প্রবাসী ভাইদের আরবি কোর্স",
  ],
  authors: [{ name: "Rimslin Gulf Hub", url: "https://rimslin.com" }],
  creator: "Rimslin",
  publisher: "Rimslin",
  alternates: {
    canonical: "https://rimslin.com",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://rimslin.com",
    siteName: "Rimslin",
    title: "Rimslin | গালফ আরবি, স্পোকেন ইংলিশ ও প্রবাসী জব স্কিলস",
    description:
      "দুবাই, সৌদি আরব ও কাতার যাওয়ার আগে সহজে শিখুন গালফ আরবি ও স্পোকেন ইংলিশ। কোনো জটিল ব্যাকরণ নয়, সরাসরি কাজের ভাষা।",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rimslin - Gulf Language Hub for Bengali Speakers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rimslin | গালফ স্পোকেন আরবি ও প্রবাসী ভাষা শিক্ষা",
    description:
      "সৌদি আরব, দুবাই, কাতার, কুয়েত কাজের জন্য সহজ গালফ আরবি ও স্পোকেন ইংলিশ কোর্স।",
    images: ["/og-image.png"],
    creator: "@rimslin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#060b08",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`dark overflow-x-hidden max-w-full w-full ${inter.variable} ${notoSansBengali.variable} ${notoSansDevanagari.variable} ${notoSansArabic.variable}`}>
      <body className="min-h-screen bg-background text-slate-100 antialiased selection:bg-gulf-500 selection:text-white overflow-x-hidden max-w-full w-full relative">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
