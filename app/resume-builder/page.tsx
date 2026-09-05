import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResumeBuilderClient from "@/components/ResumeBuilderClient";

export const metadata: Metadata = {
  title: {
    absolute: "AI Resume Builder | Rimslin.com - Expat CV & Biodata Maker",
  },
  description:
    "Create high-converting, international standard CVs and resumes for Gulf and overseas jobs in 1 click with Rimslin's AI Resume Builder.",
  alternates: {
    canonical: "https://rimslin.com/resume-builder",
  },
  openGraph: {
    title: "AI Resume Builder | Rimslin.com - Expat CV & Biodata Maker",
    description:
      "Create high-converting, international standard CVs and resumes for Gulf and overseas jobs in 1 click with Rimslin's AI Resume Builder.",
    url: "https://rimslin.com/resume-builder",
    siteName: "Rimslin.com",
    type: "website",
  },
};

export default function ResumeBuilderPage() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-slate-50 text-slate-900 dark:bg-[#060b08] dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden relative">
        <ResumeBuilderClient />
      </main>
      <Footer />
    </div>
  );
}
