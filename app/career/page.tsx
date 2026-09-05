import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerContent from "@/components/CareerContent";

export const metadata: Metadata = {
  title: {
    absolute: "Career Hub | Rimslin.com - Expat AI Resume, Interview Prep & Jobs",
  },
  description:
    "Empower your overseas career with Rimslin's AI Resume Builder, AI Interview Practice, and Workplace Language Training for Gulf & global expats.",
  alternates: {
    canonical: "https://rimslin.com/career",
  },
  openGraph: {
    title: "Career Hub | Rimslin.com - Expat AI Resume, Interview Prep & Jobs",
    description:
      "Empower your overseas career with Rimslin's AI Resume Builder, AI Interview Practice, and Workplace Language Training for Gulf & global expats.",
    url: "https://rimslin.com/career",
    siteName: "Rimslin.com",
    type: "website",
  },
};

export default function CareerPage() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden relative">
        <CareerContent />
      </main>
      <Footer />
    </div>
  );
}
