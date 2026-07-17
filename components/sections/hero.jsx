"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Download, Terminal, Award, Code2, Cpu } from "lucide-react";

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
  const cardRef = useRef(null);

  // Typewriter effect loop
  useEffect(() => {
    let timer;
    const currentWord = typewriterWords[wordIdx];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && displayText === currentWord) {
      // Pause when full word is typed
      timer = setTimeout(() => setIsDeleting(true), 1500);
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

  // Framer Motion 3D tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background"
    >
      {/* Dynamic Grid Background with Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)]" />
      <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side: Title and Subtitles */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs md:text-sm tracking-wider uppercase"
          >
            <Terminal size={14} className="animate-pulse" />
            <span>Welcome to my universe</span>
          </motion.div>

          {/* Typewriter Area */}
          <div className="min-h-[50px] md:min-h-[60px] flex items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-2xl font-mono text-muted-foreground tracking-tight"
            >
              I build solutions in{" "}
              <span className="text-foreground font-semibold border-r-2 border-indigo-500 dark:border-indigo-400 pr-1.5 py-0.5 animate-pulse text-indigo-500 dark:text-indigo-400">
                {displayText}
              </span>
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl font-sans font-light leading-relaxed"
          >
            Hi, I’m <strong className="text-foreground font-medium">Krishana Yadav</strong>.
            A passionate developer and problem solver specializing in writing optimized code, solving complex algorithms, and building beautiful, accessible digital products.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4 items-center"
          >
            {/* Download Resume */}
            <a
              href="https://drive.google.com/uc?export=download&id=1FvG5hXUJ7tPJ8Qm3e5l1B5jtrIFDEPIr"
              download
              target="_blank"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.03] transition-all duration-300 group"
            >
              <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </a>
            
            {/* View Work Anchor Button */}
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-border bg-card/60 backdrop-blur-md text-foreground font-medium hover:bg-muted hover:scale-[1.03] transition-all duration-300"
            >
              View Projects
            </a>
          </motion.div>

          {/* Floating Achievements / Tech Focus Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-8 pt-4 md:pt-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-indigo-500">
                <Code2 size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono">CP / DSA</p>
                <p className="text-sm font-semibold">1500+ Solved</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-cyan-500">
                <Award size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono">CODEFORCES</p>
                <p className="text-sm font-semibold">Pupil Rated</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Interactive 3D Card / Name Graphics */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            className="perspective-1000 w-full max-w-[420px] aspect-[4/5] flex items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY }}
              className="preserve-3d relative w-full h-full rounded-3xl bg-neutral-100/40 dark:bg-neutral-900/40 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/40 p-8 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Inner glowing light bubble tracking mouse */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--glow-x,50%)_var(--glow-y,50%),rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />

              {/* Card Header details */}
              <div className="preserve-3d flex items-center justify-between">
                <span className="font-mono text-xs text-indigo-500 dark:text-indigo-400 tracking-widest font-semibold">
                  SYS_CONFIG: ACTIVE
                </span>
                <Cpu size={18} className="text-neutral-400 dark:text-neutral-500 animate-spin-slow" />
              </div>

              {/* 3D TEXT NAME GROUP */}
              <div className="preserve-3d flex flex-col items-start gap-1 py-12">
                {/* 3D parallax layered name */}
                <div className="relative font-display font-extrabold tracking-tighter text-6xl md:text-7xl preserve-3d">
                  {/* Backdrop glowing shadow */}
                  <span className="absolute left-1 top-1 text-indigo-500/10 dark:text-indigo-500/20 translate-z-[-20px] select-none">
                    KRISHANA
                  </span>
                  {/* Foreground Layer */}
                  <span className="block text-foreground translate-z-[20px] bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground/90 to-neutral-400">
                    KRISHANA
                  </span>
                </div>

                <div className="relative font-display font-extrabold tracking-tighter text-6xl md:text-7xl preserve-3d">
                  {/* Backdrop glowing shadow */}
                  <span className="absolute left-1 top-1 text-cyan-500/10 dark:text-cyan-500/20 translate-z-[-20px] select-none">
                    YADAV
                  </span>
                  {/* Foreground Layer */}
                  <span className="block text-indigo-500 dark:text-indigo-400 translate-z-[40px] bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                    YADAV
                  </span>
                </div>
              </div>

              {/* Card Footer details */}
              <div className="preserve-3d flex items-end justify-between border-t border-border/40 pt-6">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                    Developer Node
                  </p>
                  <p className="font-sans font-semibold text-sm text-foreground">
                    krishna_yadav_
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                    Location
                  </p>
                  <p className="font-sans font-semibold text-sm text-foreground">
                    India
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
