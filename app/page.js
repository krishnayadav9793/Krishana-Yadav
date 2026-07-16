"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";

// Lazily load sections for optimized initial rendering (lazy loading)
const HeroSection = dynamic(() => import("@/components/sections/hero"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false
});

const WorkSection = dynamic(() => import("@/components/sections/work"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false
});

const AboutSection = dynamic(() => import("@/components/sections/about"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false
});

const ContactSection = dynamic(() => import("@/components/sections/contact"), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false
});

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {/* Percentage count-up preloader */}
      <Loader onComplete={() => setLoadingComplete(true)} />

      {/* Main page content reveals after loader completes */}
      {loadingComplete && (
        <main className="relative min-h-screen bg-background text-foreground">
          <HeroSection />
          <WorkSection />
          <AboutSection />
          <ContactSection />
        </main>
      )}
    </>
  );
}
