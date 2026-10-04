"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import {
  Code2,
  Layout,
  Smartphone,
  Server,
  Brain,
  Database,
  Cpu,
  Sparkles,
} from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const skillCategories = [
  {
    category: "Languages",
    icon: Code2,
    badge: "CORE SYNTAX",
    accent: "text-indigo-400",
    borderGlow: "hover:border-indigo-400/40",
    colSpan: "md:col-span-6 lg:col-span-4",
    items: ["C++", "JavaScript", "Python", "SQL", "HTML5/CSS3", "TypeScript"],
  },
  {
    category: "Frontend",
    icon: Layout,
    badge: "UI / UX ENGINE",
    accent: "text-cyan-400",
    borderGlow: "hover:border-cyan-400/40",
    colSpan: "md:col-span-6 lg:col-span-4",
    items: ["Next.js", "React.js", "Tailwind", "HTML5", "CSS3"],
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    badge: "CROSS PLATFORM",
    accent: "text-amber-400",
    borderGlow: "hover:border-amber-400/40",
    colSpan: "md:col-span-6 lg:col-span-4",
    items: ["React Native", "Expo", "Expo Hosting"],
  },
  {
    category: "Backend",
    icon: Server,
    badge: "SERVICES & APIS",
    accent: "text-emerald-400",
    borderGlow: "hover:border-emerald-400/40",
    colSpan: "md:col-span-6 lg:col-span-4",
    items: ["Express", "Node js", "Socket.io", "REST API"],
  },
  {
    category: "AI/ML",
    icon: Brain,
    badge: "INTELLIGENCE",
    accent: "text-rose-400",
    borderGlow: "hover:border-rose-400/40",
    colSpan: "md:col-span-6 lg:col-span-4",
    items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn"],
  },
  {
    category: "CS Core",
    icon: Cpu,
    badge: "THEORETICAL",
    accent: "text-violet-400",
    borderGlow: "hover:border-violet-400/40",
    colSpan: "md:col-span-6 lg:col-span-4",
    items: ["OOPS", "DBMS", "Computer Organization & Architecture"],
  },
  {
    category: "Databases & Tools",
    icon: Database,
    badge: "INFRASTRUCTURE & ENVIRONMENT",
    accent: "text-indigo-400",
    borderGlow: "hover:border-indigo-400/40",
    colSpan: "col-span-1 md:col-span-12",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Git/GitHub",
      "Docker",
      "Linux",
      "Vercel",
      "VS Code",
      "DockerHub",
      "Render",
      "Postman",
      "Jupyter Notebook",
      "MySql",
    ],
  },
];

function SkillBentoCard({ cat, idx }) {
  const cardRef = useRef(null);
  const Icon = cat.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className={`group relative p-6 sm:p-7 rounded-3xl bg-[#090a12]/80 border border-white/[0.08] ${cat.borderGlow} transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between text-left glow-spotlight ${cat.colSpan}`}
      style={{ "--glow-color": "rgba(99,102,241,0.05)" }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <Icon size={17} className={cat.accent} />
            </div>
            <h3 className="font-display font-bold text-base text-white group-hover:text-indigo-200 transition-colors">
              {cat.category}
            </h3>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 bg-white/[0.03] border border-white/10 px-2.5 py-0.5 rounded-full">
            {cat.badge}
          </span>
        </div>

        {/* Skill Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {cat.items.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05] text-neutral-300 hover:text-white font-mono text-xs transition-all duration-200 cursor-default select-none group/chip"
            >
              <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover/chip:bg-indigo-400 transition-colors" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Subtle Bottom Accent hairline */}
      <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <span>{cat.items.length} TECHNOLOGIES</span>
        <span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">CONFIG: PRODUCTION</span>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 md:py-36 bg-[#050507] border-t border-white/[0.04]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.025),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="04 // CAPABILITIES & STACK"
          title="Core Tech Stack"
          description="A categorized breakdown of languages, frameworks, systems, and developer tools I build with."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {skillCategories.map((cat, idx) => (
            <SkillBentoCard key={cat.category} cat={cat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
