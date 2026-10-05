"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
import NoiseOverlay from "@/components/ui/noise-overlay";
import Footer from "@/components/footer";

// Lazily load sections for optimized initial rendering & performance
const HeroSection = dynamic(() => import("@/components/sections/hero"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false,
});

const WorkSection = dynamic(() => import("@/components/sections/work"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false,
});

const GithubSection = dynamic(() => import("@/components/sections/github"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false,
});

const AboutSection = dynamic(() => import("@/components/sections/about"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false,
});

const SkillsSection = dynamic(() => import("@/components/sections/skills"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false,
});

const EducationSection = dynamic(() => import("@/components/sections/education"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false,
});

const ContactSection = dynamic(() => import("@/components/sections/contact"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false,
});

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {/* High-precision percentage count-up preloader */}
      <Loader onComplete={() => setLoadingComplete(true)} />

      {/* Main page content reveals after loader completes */}
      {loadingComplete && (
        <main className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-indigo-500/25 selection:text-indigo-300 transition-colors duration-300">
          <NoiseOverlay />
          <HeroSection />
          <WorkSection />
          <GithubSection />
          <AboutSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </>
  );
}
