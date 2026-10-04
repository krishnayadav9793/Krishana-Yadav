"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { getLeetCode } from "@/lib/leetCode";
import { getCodeForces, getCodeforcesInfo } from "@/lib/codeforce";
import { ExternalLink, Github, Trophy, Smartphone, ArrowUpRight, Radio, Activity, Code2 } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const projects = [
  {
    id: "devsync",
    title: "Devsync",
    description:
      "DevSync is a modern, real-time collaborative development workspace designed to streamline remote teamwork for engineering and programming teams. By unifying code editing, project management, and live communication, DevSync eliminates the friction of switching between multiple standalone tools like text editors, chat apps, and video conferencing software.",
    tags: ["React", "Node.js", "WebSockets", "Docker", "WEBRTC", "Express", "Tailwind CSS", "JWT"],
    demoLink: "https://devsync-three.vercel.app/",
    codeLink: "https://github.com/krishnayadav9793/devsync",
    category: "Full Stack",
    featured: true,
  },
  {
    id: "learn-flex",
    title: "Learn Flex",
    description:
      "Learn Flex is a full-stack competitive learning platform that enables students to prepare for technical exams through weekly quizzes, topic-wise practice questions, and real-time 1v1 quiz battles. Users selecting the same exam are automatically matched, given a randomized 10-question challenge, and compete within 10 minutes, with the highest scorer declared the winner.",
    tags: ["React", "Express", "JsonWebToken", "Socket.io", "Tailwind", "Vercel", "Render"],
    demoLink: "https://learn-flex-yw72.vercel.app/HomePage",
    codeLink: "https://github.com/krishnayadav9793/Learn_Flex",
    category: "Full Stack",
    featured: false,
  },
  {
    id: "game-on",
    title: "Game On",
    description:
      "Developed and deployed a cross-platform Multi-Game Android Application featuring 10+ interactive games using React Native and Expo. Built a responsive, component-based architecture for a seamless user experience, collaborated using Git/GitHub, and distributed the application through Expo EAS for testing and deployment.",
    tags: ["React Native", "Expo", "Git/ GitHub", "Expo EAS"],
    demoLink: "https://github.com/krishnayadav9793/Game-On",
    codeLink: "https://github.com/krishnayadav9793/Game-On",
    category: "Android App",
    featured: false,
    image: "/Game-on.png"
  }
];

function AnimatedNumber({ value, prefix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (!isInView || !value) return;

    const end = parseInt(value, 10);
    if (isNaN(end) || end === 0) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200;
    let start = 0;
    const increment = Math.max(Math.floor(end / 40), 1);
    const stepTime = Math.max(Math.floor(duration / (end / increment)), 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-bold text-white tracking-tight">
      {prefix}{displayValue}
    </span>
  );
}

function ProfileTelemetryCard({ title, icon: Icon, solved, current, currentLabel = "Rating", max, maxLabel = "Max Rating", accentColor, link }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#0a0b12]/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] glow-spotlight"
      style={{ "--glow-color": "rgba(99,102,241,0.06)" }}
    >
      {/* Background Accent Gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none ${accentColor}`} />

      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <Icon size={18} className="text-white" />
          </div>
          <div>
            <h4 className="font-display font-bold text-base text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
              <span>{title}</span>
              <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white transition-colors" />
            </h4>
            <span className="font-mono text-[10px] text-neutral-400">TELEMETRY SYNCED</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Live</span>
        </div>
      </div>

      {/* Middle metric */}
      <div className="pt-6 pb-4 z-10">
        <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-widest block">
          Solved Questions
        </span>
        <div className="text-3xl sm:text-4xl mt-1 flex items-baseline gap-1">
          <AnimatedNumber value={solved} />
          <span className="text-xs font-mono text-neutral-400">/ total</span>
        </div>
      </div>

      {/* Bottom Ratings row */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.06] z-10">
        <div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">{currentLabel}</span>
          <div className="text-lg sm:text-xl font-bold font-display mt-0.5">
            <AnimatedNumber value={current} />
          </div>
        </div>
        <div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">{maxLabel}</span>
          <div className="text-lg sm:text-xl font-bold font-display mt-0.5">
            <AnimatedNumber value={max} />
          </div>
        </div>
      </div>
    </a>
  );
}

export default function WorkSection() {
  const [leetcodeData, setLeetcodeData] = useState({ solved: "0", currentRating: "0", maxRating: "0" });
  const [cfData, setCfData] = useState({ solved: "0", currentRating: "0", maxRating: "0" });

  useEffect(() => {
    async function loadData() {
      try {
        const lc = await getLeetCode();
        let solvedLc = "500+";
        if (lc && lc.totalSolved) solvedLc = lc.totalSolved.toString();

        let currentRating = "1600+";
        let maxRating = "1700+";
        try {
          const resRating = await fetch("/api/getleetcoderating", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "_krishna__yadav_" })
          });
          const ratingData = await resRating.json();
          if (ratingData?.rating) currentRating = ratingData.rating.toString();
          if (ratingData?.maxRating) maxRating = ratingData.maxRating.toString();
        } catch (err) {
          console.error("Local LeetCode fetch error:", err);
        }

        setLeetcodeData({ solved: solvedLc, currentRating, maxRating });
      } catch (err) {
        console.error("LeetCode data error:", err);
      }

      try {
        const cfStatus = await getCodeForces();
        let solvedCfCount = "400+";
        if (cfStatus?.result) {
          solvedCfCount = cfStatus.result.filter((s) => s.verdict === "OK").length.toString();
        }

        const cfInfo = await getCodeforcesInfo();
        let currentCfRating = "1100+";
        let maxCfRating = "1200+";
        if (cfInfo?.result?.[0]) {
          currentCfRating = cfInfo.result[0].rating?.toString() || "1100+";
          maxCfRating = cfInfo.result[0].maxRating?.toString() || "1200+";
        }

        setCfData({ solved: solvedCfCount, currentRating: currentCfRating, maxRating: maxCfRating });
      } catch (err) {
        console.error("Codeforces data error:", err);
      }
    }
    loadData();
  }, []);

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const secondaryProjects = projects.filter((p) => p.id !== featuredProject.id);

  return (
    <section id="work" className="relative py-28 md:py-36 bg-[#050507]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="01 // WORK & TELEMETRY"
          title="Featured Projects & Competitive Analytics"
          description="A real-time overview of my computer science projects and daily progress tracking on popular programming competitive hubs."
        />

        {/* Coding Hubs Live Telemetry Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <ProfileTelemetryCard
            title="LeetCode"
            icon={Code2}
            accentColor="bg-amber-500"
            solved={leetcodeData.solved !== "0" ? leetcodeData.solved : "720"}
            current={leetcodeData.currentRating !== "0" ? leetcodeData.currentRating : "1824"}
            currentLabel="Contest Rating"
            max={leetcodeData.maxRating !== "0" ? leetcodeData.maxRating : "1940"}
            maxLabel="Top Rating"
            link="https://leetcode.com/u/_krishna__yadav_/"
          />
          <ProfileTelemetryCard
            title="Codeforces"
            icon={Trophy}
            accentColor="bg-cyan-500"
            solved={cfData.solved !== "0" ? cfData.solved : "450"}
            current={cfData.currentRating !== "0" ? cfData.currentRating : "1512"}
            currentLabel="Pupil Rating"
            max={cfData.maxRating !== "0" ? cfData.maxRating : "1612"}
            maxLabel="Max Rating"
            link="https://codeforces.com/profile/krishna_yadav_"
          />
        </div>

        {/* FEATURED PROJECT: Flagship Bento Card */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl bg-[#090a12]/90 border border-white/[0.08] hover:border-white/20 p-6 sm:p-8 md:p-10 transition-all duration-300 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Project Details */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-semibold">
                      FEATURED PROJECT // {featuredProject.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">ARCH: DISTRIBUTED</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
                    {featuredProject.title}
                  </h3>
                </div>

                <p className="text-neutral-300 font-sans font-light text-sm sm:text-base leading-relaxed">
                  {featuredProject.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neutral-300 font-mono text-xs group-hover:border-white/15 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="flex items-center gap-4 pt-3">
                  <a
                    href={featuredProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <a
                    href={featuredProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/25 text-white font-mono text-xs transition-all"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>

              {/* Right Column: High-tech Visual Workspace Representation */}
              <div className="lg:col-span-5 w-full">
                <div className="relative rounded-2xl bg-[#0d0e18] border border-white/[0.08] p-5 shadow-inner overflow-hidden font-mono text-xs text-left">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] text-neutral-400">devsync.workspace.ts</span>
                    <span className="text-emerald-400 text-[10px]">RTC_CONNECTED</span>
                  </div>

                  {/* Code Mockup Snippet */}
                  <div className="space-y-1.5 text-[11px] text-neutral-300 leading-relaxed overflow-x-auto">
                    <div>
                      <span className="text-indigo-400">import</span> &#123; WebRTC, Socket &#125;{" "}
                      <span className="text-indigo-400">from</span>{" "}
                      <span className="text-emerald-300">"devsync/core"</span>;
                    </div>
                    <div className="text-neutral-500">// Initialize multi-peer workspace</div>
                    <div>
                      <span className="text-indigo-400">const</span> workspace ={" "}
                      <span className="text-cyan-300">new</span> CollaborativeRoom(&#123;
                    </div>
                    <div className="pl-4">
                      roomId: <span className="text-amber-300">"global-cluster"</span>,
                    </div>
                    <div className="pl-4">
                      encryption: <span className="text-amber-300">"AES-GCM"</span>,
                    </div>
                    <div className="pl-4">
                      webrtc: <span className="text-emerald-400">true</span>
                    </div>
                    <div>&#125;);</div>
                    <div className="pt-2 text-neutral-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                      <span className="text-indigo-300 text-[10px]">Real-time synchronized across peers</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* ASYMMETRIC BENTO GRID FOR SECONDARY PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {secondaryProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl bg-[#090a12]/80 border border-white/[0.08] hover:border-white/20 p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)] ${
                idx === 0 ? "md:col-span-7" : "md:col-span-5"
              }`}
            >
              <div className="space-y-4 text-left">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[11px] text-neutral-300">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github size={14} />
                    </a>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                      aria-label="Live Demo"
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                <h4 className="text-2xl font-display font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h4>

                <p className="text-sm font-sans font-light text-neutral-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Optional Mobile Image Asset Preview for Game On */}
                {project.image && (
                  <div className="pt-2 rounded-2xl overflow-hidden max-h-[160px] border border-white/[0.06] bg-black/40 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>

              {/* Tags & Action Footer */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-wrap gap-1.5 text-left">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.06] text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
