"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import { getLeetCode } from "@/lib/leetCode";
import { getCodeForces, getCodeforcesInfo } from "@/lib/codeforce";
import { ExternalLink, Github, Trophy, Smartphone, Flame } from "lucide-react";

// Predefined fallback project data
const projects = [
  {
    title: "Learn Flex",
    description: "Learn Flex is a full-stack competitive learning platform that enables students to prepare for technical exams through weekly quizzes, topic-wise practice questions, and real-time 1v1 quiz battles. Users selecting the same exam are automatically matched, given a randomized 10-question challenge, and compete within 10 minutes, with the highest scorer declared the winner.",
    tags: ["React", "Express", "JsonWebToken", "Socket.io" ,"Tailwind" ,"Vercel" , "Render"],
    demoLink: "https://learn-flex-yw72.vercel.app/HomePage",
    codeLink: "https://github.com/krishnayadav9793/Learn_Flex",
    category: "Full Stack",
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Devsync",
    description: "DevSync is a modern, real-time collaborative development workspace designed to streamline remote teamwork for engineering and programming teams. By unifying code editing, project management, and live communication, DevSync eliminates the friction of switching between multiple standalone tools like text editors, chat apps, and video conferencing software.",
    tags: ["React", "Node.js", "WebSockets", "Docker" , "WEBRTC" , "Express" ,"Tailwind CSS" ,"JWT"],
    demoLink: "https://devsync-three.vercel.app/",
    codeLink: "https://github.com/krishnayadav9793/devsync",
    category: "Full Stack",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Game On",
    description: "Developed and deployed a cross-platform Multi-Game Android Application featuring 10+ interactive games using React Native and Expo. Built a responsive, component-based architecture for a seamless user experience, collaborated using Git/GitHub, and distributed the application through Expo EAS for testing and deployment.",
    tags: ["React Native", "Expo", "Git/ GitHub", "Expo EAS"],
    demoLink: "https://github.com/krishnayadav9793/Game-On",
    codeLink: "https://github.com/krishnayadav9793/Game-On",
    category: "Android App",
    color: "from-amber-500 to-orange-600"
  }
];

// Interactive Tilt Card wrapper for projects
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);

    // Apply mouse glow coordinates
    cardRef.current.style.setProperty("--mouse-x", `${(e.clientX - rect.left)}px`);
    cardRef.current.style.setProperty("--mouse-y", `${(e.clientY - rect.top)}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="preserve-3d relative flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-border/40 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer glow-spotlight [--glow-color:rgba(99,102,241,0.08)] dark:[--glow-color:rgba(255,255,255,0.03)]"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 blur-xl rounded-full" />
      
      <div className="preserve-3d space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-200/50 dark:bg-neutral-800/60 text-muted-foreground">
            {project.category}
          </span>
          <div className="flex items-center gap-2 text-muted-foreground translate-z-[10px]">
            <a href={project.codeLink} target="_blank" className="hover:text-foreground hover:scale-110 transition-all">
              <Github size={18} />
            </a>
            <a href={project.demoLink} target="_blank" className="hover:text-foreground hover:scale-110 transition-all">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <h3 className="text-xl font-bold font-display tracking-tight text-foreground translate-z-[20px]">
          {project.title}
        </h3>

        <p className="text-sm font-sans font-light text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="preserve-3d flex flex-wrap gap-2 mt-6 translate-z-[15px]">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-neutral-200/40 dark:bg-neutral-800/40 text-foreground border border-border/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// Count-up helper component that starts when inside viewport
function AnimatedNumber({ value, prefix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView || !value) return;
    
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end) || end === 0) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500; // 1.5 seconds
    const incrementTime = Math.max(Math.floor(duration / end), 16);
    
    const step = () => {
      start += Math.max(Math.floor(end / 60), 1);
      if (start >= end) {
        setDisplayValue(end);
      } else {
        setDisplayValue(start);
        setTimeout(step, incrementTime);
      }
    };
    
    step();
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-bold tracking-tight text-3xl md:text-4xl text-foreground">
      {prefix}
      {displayValue}
    </span>
  );
}

// Coding Profile stats container
function ProfileStatsCard({ title, icon: Icon, solved, current, currentLabel = "Rating", max, maxLabel = "Max Rating", themeColor }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 120 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);

    // Apply mouse glow coordinates for gradient background lighting
    cardRef.current.style.setProperty("--mouse-x", `${(e.clientX - rect.left)}px`);
    cardRef.current.style.setProperty("--mouse-y", `${(e.clientY - rect.top)}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="preserve-3d p-6 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-border/40 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[210px] h-auto select-none cursor-pointer relative overflow-hidden glow-spotlight [--glow-color:rgba(99,102,241,0.04)] dark:[--glow-color:rgba(255,255,255,0.02)]"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${themeColor} shadow-md`}>
            <Icon size={18} />
          </div>
          <span className="font-display font-bold text-base text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[9px] uppercase tracking-wider font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Synced</span>
        </div>
      </div>

      {/* Middle Row: Large Solved Number */}
      <div className="pt-2 text-left">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Solved Questions</p>
        <div className="flex items-baseline gap-1 mt-0.5">
          <AnimatedNumber value={solved} />
          <span className="text-xs text-muted-foreground font-mono">/ total</span>
        </div>
      </div>

      {/* Bottom Grid: Current & Max Ratings */}
      <div className="grid grid-cols-2 gap-4 border-t border-border/40 pt-3 text-left">
        <div>
          <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">{currentLabel}</p>
          <p className="text-base font-bold font-display text-foreground mt-0.5">
            <AnimatedNumber value={current} />
          </p>
        </div>
        <div>
          <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">{maxLabel}</p>
          <p className="text-base font-bold font-display text-foreground mt-0.5">
            <AnimatedNumber value={max} />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const [leetcodeData, setLeetcodeData] = useState({ solved: "0", currentRating: "0", maxRating: "0" });
  const [cfData, setCfData] = useState({ solved: "0", currentRating: "0", maxRating: "0" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try{
        const response = await fetch("/api/github/")
        console.log(response)
      }catch(e){
        console.log(e);
      }
      try {
        const lc = await getLeetCode();
        let solvedLc = "500+";
        if (lc && lc.totalSolved) {
          solvedLc = lc.totalSolved.toString();
        }

        let currentRating = "1600+";
        let maxRating = "1700+";
        try {
          const resRating = await fetch("/api/getleetcoderating", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "_krishna__yadav_" })
          });
          const ratingData = await resRating.json();
          if (ratingData && ratingData.rating) {
            currentRating = ratingData.rating.toString();
          }
          if (ratingData && ratingData.maxRating) {
            maxRating = ratingData.maxRating.toString();
          }
        } catch (err) {
          console.error("Error fetching local leetcode rating:", err);
        }

        setLeetcodeData({
          solved: solvedLc,
          currentRating: currentRating,
          maxRating: maxRating
        });
      } catch (err) {
        console.error("Error loading LeetCode stats:", err);
      }

      try {
        const cfStatus = await getCodeForces();
        let solvedCfCount = "400+";
        if (cfStatus && cfStatus.result) {
          solvedCfCount = cfStatus.result.filter(sub => sub.verdict === "OK").length.toString();
        }

        const cfInfo = await getCodeforcesInfo();
        let currentCfRating = "1100+";
        let maxCfRating = "1200+";
        if (cfInfo && cfInfo.result && cfInfo.result[0]) {
          currentCfRating = cfInfo.result[0].rating?.toString() || "1100+";
          maxCfRating = cfInfo.result[0].maxRating?.toString() || "1200+";
        }

        setCfData({
          solved: solvedCfCount,
          currentRating: currentCfRating,
          maxRating: maxCfRating
        });
      } catch (err) {
        console.error("Error loading Codeforces stats:", err);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <section id="work" className="relative py-24 bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-neutral-400">
            Work & Analytics
          </h2>
          <div className="w-16 h-1 bg-indigo-500 rounded-full" />
          <p className="text-base text-muted-foreground font-sans font-light max-w-lg">
            A real-time overview of my computer science projects and daily progress tracking on popular programming competitive hubs.
          </p>
        </div>

        {/* Dynamic Coding Platform Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          <ProfileStatsCard
            title="LeetCode"
            icon={Code2}
            themeColor="bg-[#ffa116]"
            solved={leetcodeData.solved !== "0" ? leetcodeData.solved : "720"}
            current={leetcodeData.currentRating !== "0" ? leetcodeData.currentRating : "1824"}
            currentLabel="Rating"
            max={leetcodeData.maxRating !== "0" ? leetcodeData.maxRating : "1940"}
            maxLabel="Max Rating"
          />
          <ProfileStatsCard
            title="Codeforces"
            icon={Trophy}
            themeColor="bg-[#3182ce]"
            solved={cfData.solved !== "0" ? cfData.solved : "450"}
            current={cfData.currentRating !== "0" ? cfData.currentRating : "1512"}
            currentLabel="Rating"
            max={cfData.maxRating !== "0" ? cfData.maxRating : "1612"}
            maxLabel="Max Rating"
          />
        </div>

        {/* Projects Showcase Title */}
        <h3 className="text-2xl font-bold font-display tracking-tight text-left mb-8 text-foreground">
          Featured Projects
        </h3>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Dummy standard modules to fit icon dependencies
function Code2(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
  );
}
