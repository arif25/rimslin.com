import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AudioPhraseDemo from "@/components/AudioPhraseDemo";
import JobTracks from "@/components/JobTracks";
import Curriculum from "@/components/Curriculum";
import AIVoiceCoach from "@/components/AIVoiceCoach";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-hidden relative bg-background bg-gulf-pattern selection:bg-gulf-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden relative">
        <Hero />
        <Stats />
        <AudioPhraseDemo />
        <JobTracks />
        <Curriculum />
        <AIVoiceCoach />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
