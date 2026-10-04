"use client";

import React from "react";
import { motion } from "motion/react";
import { MapPin, Calendar, Terminal, GraduationCap, Sparkles, Code2, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#050507] border-t border-white/[0.04]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.025),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="03 // PROFILE & PHILOSOPHY"
          title="About Me"
          description="Discover my background, education journey, and the core competencies driving my development career."
        />

        {/* Editorial Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Profile Card + Quick Facts (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-[#090a12]/80 border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="space-y-6">
              {/* Photo Container with High-tech Framing */}
              <div className="relative group w-full aspect-square max-w-[320px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Subtle Ambient Radial Lighting */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500/20 via-cyan-500/10 to-transparent rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                
                <img
                  src="/profile.jpg"
                  alt="Krishana Yadav Avatar"
                  className="relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Overlaid Pill Badge */}
                <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                  <span>KRISHANA YADAV</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    B.Tech CSE
                  </span>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left">
                  <div className="flex items-center gap-1.5 text-indigo-400 mb-1">
                    <MapPin size={13} />
                    <span className="text-[10px] text-neutral-400 uppercase font-mono">Location</span>
                  </div>
                  <p className="text-sm font-semibold text-white">India</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left">
                  <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                    <Calendar size={13} />
                    <span className="text-[10px] text-neutral-400 uppercase font-mono">Current Year</span>
                  </div>
                  <p className="text-sm font-semibold text-white">B.Tech Third Year</p>
                </div>
              </div>
            </div>

            {/* University Tag Footer */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} className="text-indigo-400" />
                IIIT Vadodara (IIITV)
              </span>
              <span className="text-neutral-500">2024 - Present</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative & Technical Mindset (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-9 rounded-3xl bg-[#090a12]/80 border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-left space-y-6"
          >
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs font-semibold">
                <Terminal size={12} />
                <span>ENGINEERING PHILOSOPHY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                Hello, I am Krishana
              </h3>

              {/* Exact existing narrative preserved word-for-word */}
              <div className="space-y-4 text-neutral-300 font-sans font-light text-base leading-relaxed">
                <p>
                  I am a computer science student with a primary focus on core algorithm optimizations and modern full-stack application development. Over the years, I have honed my skills solving complex math and graph challenges on Codeforces and LeetCode, accumulating deep theoretical expertise in Data Structures & Algorithms.
                </p>
                <p>
                  I love engineering apps that balance responsive interfaces with strong server logic. I am also highly interested in artificial intelligence models, building projects integrating web interfaces with custom machine learning APIs.
                </p>
              </div>
            </div>

            {/* Preserved Core Pillars Bento Sub-strip */}
            <div className="pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold">
                  <Code2 size={14} />
                  <span>ALGORITHMIC RIGOR</span>
                </div>
                <p className="text-xs text-neutral-400 font-light">
                  Continuous competitive problem solving on Codeforces & LeetCode with mathematically sound complexity bounds.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                  <Sparkles size={14} />
                  <span>FULL-STACK ARCHITECTURE</span>
                </div>
                <p className="text-xs text-neutral-400 font-light">
                  Designing resilient, distributed systems, real-time WebSockets, and clean component hierarchies.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
