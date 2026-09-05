"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Download,
  Printer,
  RefreshCw,
  Globe,
  Briefcase,
  User,
  Wrench,
  Languages,
  CheckCircle2,
  AlertCircle,
  Zap,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface GeneratedResume {
  fullName: string;
  targetJobTitle: string;
  contactInfo: {
    phone?: string;
    email?: string;
    location?: string;
    languages?: string;
  };
  summary: string;
  experience: {
    title: string;
    companyOrLocation: string;
    duration: string;
    responsibilities: string[];
  }[];
  coreSkills: string[];
  tradeStrengths?: string[];
  languages: { language: string; level: string }[];
  additionalDetails: string[];
  rawText: string;
}

const PRESETS = [
  {
    name: "ড্রাইভার (Gulf Driver)",
    title: "Light & Heavy Vehicle Driver",
    exp: "৪ বছর (সৌদি আরব ও রিয়াদ হাইওয়ে ড্রাইভিং)",
    skills: "Gulf GPS Navigation, Defensive Driving, Vehicle Maintenance, Traffic Laws",
    country: "সৌদি আরব (Saudi Arabia)",
  },
  {
    name: "ইলেকট্রিশিয়ান (Electrician)",
    title: "Maintenance & Building Electrician",
    exp: "৩ বছর (কাতার কমার্শিয়াল ও রেসিডেনসিয়াল সাইট)",
    skills: "DB Dressing, Conduit Bending, Wiring, Circuit Troubleshooting, Single & 3-Phase",
    country: "কাতার (Qatar)",
  },
  {
    name: "কনস্ট্রাকশন (Mason / Laborer)",
    title: "Civil Construction & Masonry Craftsman",
    exp: "৫ বছর (দুবাই হাই-রাইজ কনস্ট্রাকশন প্রজেক্ট)",
    skills: "Block Work, Plastering, Tile Fixing, Scaffolding Safety, Site Coordination",
    country: "সংযুক্ত আরব আমিরাত (UAE - Dubai)",
  },
  {
    name: "হোটেল ও রেস্তোরাঁ (Waiter / F&B)",
    title: "Hospitality Steward & Food Service Staff",
    exp: "২ বছর (কুয়েত রেস্তোরাঁ ও ক্যাফে চেন)",
    skills: "Customer Service, Food Hygiene, Order Taking, POS Billing, Multilingual Communication",
    country: "কুয়েত (Kuwait)",
  },
];

export default function ResumeBuilderClient() {
  // Form state
  const [name, setName] = useState("Md. Arif Hossain (আরিফ হোসেন)");
  const [jobTitle, setJobTitle] = useState("Light & Heavy Duty Driver");
  const [experience, setExperience] = useState("৪ বছর (সৌদি আরব - রিয়াদ ও জেদ্দা হাইওয়ে ড্রাইভিং)");
  const [skills, setSkills] = useState("Gulf GPS Navigation, Defensive Driving, Routine Vehicle Maintenance, Highway Safety");
  const [targetCountry, setTargetCountry] = useState("সৌদি আরব (Saudi Arabia)");
  const [phone, setPhone] = useState("+880 1700-000000");
  const [email, setEmail] = useState("arif.expat@example.com");

  // Output & UI state
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState<GeneratedResume | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setJobTitle(preset.title);
    setExperience(preset.exp);
    setSkills(preset.skills);
    setTargetCountry(preset.country);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !jobTitle.trim()) {
      setErrorMessage("দয়া করে আপনার নাম এবং কাজের পদবী প্রদান করুন।");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          jobTitle,
          experience,
          skills,
          targetCountry,
          phone,
          email,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "রেজুমি তৈরিতে সাময়িক সমস্যা হচ্ছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }

      setResumeData(data.resume);
    } catch (err: any) {
      setErrorMessage(
        err?.message?.includes("দয়া করে")
          ? err.message
          : "রেজুমি তৈরিতে সাময়িক সমস্যা হচ্ছে, অনুগ্রহ করে আবার চেষ্টা করুন"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-16 left-1/2 -z-10 h-[500px] w-full max-w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px] dark:bg-emerald-500/15" />

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Rimslin AI Resume Builder
        </h1>

        <p className="mt-2 text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
          প্রবাসী স্মার্ট এআই রেজুমি বিল্ডার
        </p>

        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          গালফ (সৌদি, দুবাই, কাতার) ও আন্তর্জাতিক কোম্পানিগুলোর উপযোগী আন্তর্জাতিক মানের CV ও বায়োডাটা তৈরি করুন সেকেন্ডে।
        </p>

        {/* Trade Quick Presets Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1">
            দ্রুত পূরণ করতে ক্লিক করুন:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className="rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 px-2.5 py-1 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 transition-colors shadow-sm"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: INPUT FORM                                                   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/90 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-gray-800 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                আপনার তথ্য পূরণ করুন
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                বাংলা বা ইংরেজি যেকোনো ভাষায় লিখতে পারেন
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-5 flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 p-3 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-4 text-xs sm:text-sm">
            {/* Full Name */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                আপনার পুরো নাম <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: Md. Arif Hossain (আরিফ হোসেন)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Target Job Title */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                কাজের পদবী / ট্রেড <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="যেমন: Light Driver / Electrician / Construction Mason"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                অভিজ্ঞতার বিবরণ (বছর ও আগের দেশ/প্রজেক্ট)
              </label>
              <textarea
                rows={2}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="যেমন: ৪ বছর সৌদি আরবে রিয়াদ প্রজেক্টে হাইওয়ে ও সাইট ড্রাইভিং"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                মূল দক্ষতা ও ব্যবহৃত টুলস
              </label>
              <textarea
                rows={2}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="যেমন: GPS Navigation, সাইট সেফটি, টুলস হ্যান্ডলিং, ইলেকট্রিক ওয়ারিং"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>

            {/* Target Country */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                টার্গেট দেশ বা অঞ্চল
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  placeholder="যেমন: সৌদি আরব, দুবাই (UAE), কাতার বা ইউরোপ"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ফোন / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1700-000000"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ইমেইল অ্যাড্রেস
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none text-xs"
                />
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-4 text-sm shadow-lg shadow-emerald-600/25 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>AI রেজুমি তৈরি হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>রেজুমি তৈরি করুন (Generate Resume)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: OUTPUT PREVIEW SECTION                                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7">
          {resumeData ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>রেজুমি প্রিভিউ (Ready to Export)</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Copy Full Resume */}
                  <button
                    type="button"
                    onClick={() => copyToClipboard(resumeData.rawText, "full")}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 px-3 py-1.5 text-xs font-bold hover:bg-emerald-100 transition-colors"
                  >
                    {copiedSection === "full" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>সম্পূর্ণ সিভি কপি</span>
                      </>
                    )}
                  </button>

                  {/* Print / Save PDF */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
                    title="Print / Save as PDF"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print / PDF</span>
                  </button>
                </div>
              </div>

              {/* Formatted Resume Sheet */}
              <div
                id="resume-printable-sheet"
                className="rounded-3xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900/95 p-6 sm:p-8 shadow-xl text-slate-800 dark:text-slate-100 space-y-6"
              >
                {/* 1. Header & Contact */}
                <div className="border-b border-slate-200 dark:border-gray-800 pb-6 relative group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {resumeData.fullName}
                      </h3>
                      <p className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                        {resumeData.targetJobTitle}
                      </p>
                    </div>

                    <span className="self-start sm:self-auto rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold px-3 py-1">
                      Gulf Standard CV
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
                    {resumeData.contactInfo.phone && (
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{resumeData.contactInfo.phone}</span>
                      </span>
                    )}
                    {resumeData.contactInfo.email && (
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{resumeData.contactInfo.email}</span>
                      </span>
                    )}
                    {resumeData.contactInfo.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{resumeData.contactInfo.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Professional Summary */}
                <div className="relative group">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Professional Summary / পরিচিতি</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(resumeData.summary, "summary")}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs inline-flex items-center gap-1 transition-opacity"
                    >
                      {copiedSection === "summary" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span className="text-[10px]">কপি</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-gray-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-gray-800/80">
                    {resumeData.summary}
                  </p>
                </div>

                {/* 3. Core Skills */}
                <div className="relative group">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <Wrench className="h-3.5 w-3.5" />
                      <span>Core Skills & Competencies / মূল দক্ষতা</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(resumeData.coreSkills.join(", "), "skills")}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs inline-flex items-center gap-1 transition-opacity"
                    >
                      {copiedSection === "skills" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span className="text-[10px]">কপি</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.coreSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold px-2.5 py-1"
                      >
                        <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Professional Experience */}
                <div className="relative group">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>Work Experience / কর্ম অভিজ্ঞতা</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          resumeData.experience
                            .map((e) => `${e.title} - ${e.companyOrLocation} (${e.duration})\n${e.responsibilities.join("\n")}`)
                            .join("\n\n"),
                          "experience"
                        )
                      }
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs inline-flex items-center gap-1 transition-opacity"
                    >
                      {copiedSection === "experience" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span className="text-[10px]">কপি</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {resumeData.experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-100 dark:border-gray-800/80 bg-slate-50/70 dark:bg-gray-800/40 p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                            {exp.title}
                          </h5>
                          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                          {exp.companyOrLocation}
                        </p>
                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Languages & Visa Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                      <Languages className="h-3.5 w-3.5" />
                      <span>Languages / ভাষার দক্ষতা</span>
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {resumeData.languages.map((lang, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-gray-800/60 p-2 border border-slate-100 dark:border-gray-800"
                        >
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {lang.language}
                          </span>
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Deployment Readiness / পাসপোর্ট</span>
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {resumeData.additionalDetails.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-gray-800/60 p-2 border border-slate-100 dark:border-gray-800 text-slate-700 dark:text-slate-300 text-[11px]"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State / Prompt to Generate */
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-900/40 p-12 text-center min-h-[460px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 mb-4 shadow-sm">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                আপনার বায়োডাটা প্রিভিউ এখানে প্রদর্শিত হবে
              </h3>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                বামপাশের ফর্মে আপনার নাম, পেশা ও অভিজ্ঞতা লিখে &ldquo;রেজুমি তৈরি করুন&rdquo; বাটনে ক্লিক করলেই আন্তর্জাতিক মানের সিভি তৈরি হয়ে যাবে।
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span>গালফ ও ইউরোপের যেকোনো চাকরির জন্য উপযোগী</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
