"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Download, Terminal, Code2, Trophy, ArrowRight, Sparkles, Cpu, Layers } from "lucide-react";
import ThreeScene from "@/components/three-scene";
import MagneticButton from "@/components/ui/magnetic-button";

const typewriterWords = [
  "Competitive Programming (CP)",
  "Data Structures & Algorithms (DSA)",
  "Full-Stack Web Development",
  "Artificial Intelligence & Machine Learning (AI/ML)"
];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = typewriterWords[wordIdx];
    const typingSpeed = isDeleting ? 30 : 75;

    if (!isDeleting && displayText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % typewriterWords.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIdx]);

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 md:py-32 overflow-hidden bg-background text-foreground transition-colors duration-300"
    >
      {/* Subtle Technical Mesh Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute top-1/4 left-1/12 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-indigo-600/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/12 w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] bg-cyan-500/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Semantic Content & Typography Hierarchy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">
          
          {/* Eyebrow Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm text-slate-600 dark:text-neutral-300 font-mono text-xs tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-500 dark:text-neutral-400">SYS_CONFIG:</span>
            <span className="text-slate-900 dark:text-white font-medium">ACTIVE</span>
            <span className="text-slate-300 dark:text-neutral-600">|</span>
            <span className="text-slate-500 dark:text-neutral-400 hidden sm:inline">IIITV (CSE)</span>
          </motion.div>

          {/* Main Hero Statement */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
            >
              Architecting{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-600 dark:from-white dark:via-indigo-200 dark:to-indigo-400">
                robust systems
              </span>{" "}
              & optimized algorithms.
            </motion.h1>

            {/* Dynamic Typewriter Terminal Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="min-h-[44px] flex items-center pt-1"
            >
              <div className="flex items-center gap-2 font-mono text-sm sm:text-base md:text-lg text-slate-600 dark:text-neutral-400">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold select-none">❯</span>
                <span>I build solutions in</span>
                <span className="text-indigo-600 dark:text-indigo-300 font-semibold border-r-2 border-indigo-500 dark:border-indigo-400 pr-1 animate-pulse">
                  {displayText}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Supporting Bio Text (EXACT EXISTING CONTENT PRESERVED) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-600 dark:text-neutral-300 font-sans font-light leading-relaxed max-w-2xl"
          >
            Hi, I’m <strong className="text-slate-900 dark:text-white font-semibold">Krishana Yadav</strong>.
            A passionate developer and problem solver specializing in writing optimized code, solving complex algorithms, and building beautiful, accessible digital products.
          </motion.p>

          {/* CTAs with Magnetic micro-interaction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton
              as="a"
              href="https://drive.google.com/uc?export=download&id=1FvG5hXUJ7tPJ8Qm3e5l1B5jtrIFDEPIr"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-gradient-to-r dark:from-indigo-500 dark:via-indigo-600 dark:to-indigo-700 dark:text-white font-medium text-sm shadow-[0_8px_24px_rgba(15,23,42,0.15)] dark:shadow-[0_0_25px_rgba(99,102,241,0.35)] dark:hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] border border-slate-800 dark:border-indigo-400/30 group"
            >
              <Download size={16} className="mr-2 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#work"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300/80 hover:border-slate-400 shadow-sm dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-white dark:border-white/10 dark:hover:border-white/25 text-sm font-medium transition-all group"
            >
              <span>View Projects</span>
              <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform text-slate-500 dark:text-neutral-400 group-hover:text-slate-900 dark:group-hover:text-white" />
            </MagneticButton>
          </motion.div>

          {/* Preserved Achievement Metrics Bento Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 w-full max-w-xl"
          >
            <div className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.07] shadow-sm dark:shadow-none backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <Code2 size={15} className="text-indigo-600 dark:text-indigo-400" />
                <span className="font-mono text-[10px] text-slate-500 dark:text-neutral-400 uppercase tracking-wider">CP / DSA</span>
              </div>
              <p className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">1500+ Solved</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.07] shadow-sm dark:shadow-none backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={15} className="text-cyan-600 dark:text-cyan-400" />
                <span className="font-mono text-[10px] text-slate-500 dark:text-neutral-400 uppercase tracking-wider">CODEFORCES</span>
              </div>
              <p className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">Pupil Rated</p>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.07] shadow-sm dark:shadow-none backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <Cpu size={15} className="text-indigo-600 dark:text-indigo-400" />
                <span className="font-mono text-[10px] text-slate-500 dark:text-neutral-400 uppercase tracking-wider">NODE // LOC</span>
              </div>
              <p className="text-sm font-semibold font-mono text-slate-900 dark:text-white truncate">_krishna__yadav_</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Three.js Interactive Visual Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center w-full"
        >
          <div className="relative w-full max-w-[500px] rounded-3xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] p-3 sm:p-5 shadow-[0_20px_48px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden group">
            
            {/* Top Frame Status Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200/80 dark:border-white/[0.06] mb-2 font-mono text-[11px] text-slate-500 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                <span className="ml-2 text-slate-700 dark:text-neutral-300 font-semibold tracking-wide">SYSTEM_NETWORK.3D</span>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400 text-[10px]">WebGL 2.0</span>
            </div>

            {/* Interactive Three.js Scene */}
            <ThreeScene />

            {/* Bottom System Identity Strip */}
            <div className="flex items-center justify-between px-3 py-2.5 mt-2 border-t border-slate-200/80 dark:border-white/[0.06] font-mono text-[10px] text-slate-500 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 dark:text-neutral-500">ID:</span>
                <span className="text-slate-800 dark:text-white font-medium">KRISHANA YADAV</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 dark:text-neutral-500">STATUS:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">READY</span>
              </div>
            </div>

            {/* Corner Decorative Crosshairs */}
            <div className="absolute top-2 left-2 text-slate-300 dark:text-neutral-700 text-[10px] font-mono select-none">+</div>
            <div className="absolute top-2 right-2 text-slate-300 dark:text-neutral-700 text-[10px] font-mono select-none">+</div>
            <div className="absolute bottom-2 left-2 text-slate-300 dark:text-neutral-700 text-[10px] font-mono select-none">+</div>
            <div className="absolute bottom-2 right-2 text-slate-300 dark:text-neutral-700 text-[10px] font-mono select-none">+</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
