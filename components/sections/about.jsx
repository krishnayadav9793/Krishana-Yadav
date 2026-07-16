"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap, MapPin, Calendar, Heart, Terminal, BookOpen, Layers, Award } from "lucide-react";

const educationTimeline = [
  {
    year: "2023 - Present",
    title: "Bachelor of Technology in Computer Science",
    institution: "Indian Institute of Technology (IIT) / Engineering University",
    description: "Deepening knowledge in advanced algorithms, machine learning, compiler design, and systems engineering. Maintaining a high GPA.",
    icon: GraduationCap
  },
  {
    year: "2021 - 2023",
    title: "Senior Secondary Education (High School)",
    institution: "Science & Mathematics Board",
    description: "Focused heavily on physics, chemistry, and mathematics. Developed solid foundational problem-solving capacities.",
    icon: BookOpen
  },
  {
    year: "2020",
    title: "Secondary School Certification",
    institution: "National Public School",
    description: "Introduced to basic computing and logic. Graduated with merit honors.",
    icon: Terminal
  }
];

const coreSkills = [
  { category: "Languages", items: ["C++", "JavaScript", "Python", "SQL", "HTML5/CSS3"] },
  { category: "Frameworks", items: ["Next.js", "React.js", "Node.js", "FastAPI", "Express.js"] },
  { category: "Databases & Tools", items: ["PostgreSQL", "MongoDB", "Git/GitHub", "Docker", "Linux"] }
];

export default function AboutSection() {
  const containerRef = useRef(null);
  
  // Custom horizontal scrolling visual cue scroll values
  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useTransform(scrollXProgress, [0, 1], [0, 1]);

  return (
    <section id="about" className="relative py-24 bg-background overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.03),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-neutral-400">
            About Me
          </h2>
          <div className="w-16 h-1 bg-indigo-500 rounded-full" />
          <p className="text-base text-muted-foreground font-sans font-light max-w-lg">
            Discover my background, education journey, and the core competencies driving my development career.
          </p>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Side: Avatar and Quick Facts */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
              {/* Rotating glowing background ring */}
              <div className="absolute inset-[-10px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl animate-spin-slow opacity-75 blur-md group-hover:scale-105 transition-all duration-500" />
              
              {/* Image box wrapper */}
              <div className="absolute inset-[3px] bg-background rounded-[22px] overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Krishana Yadav Avatar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Quick stats floating grid */}
            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-[360px]">
              <div className="p-3 bg-neutral-100/50 dark:bg-neutral-900/50 border border-border/40 rounded-xl text-center">
                <MapPin size={16} className="mx-auto text-indigo-500 mb-1" />
                <p className="text-[10px] text-muted-foreground uppercase font-mono">Location</p>
                <p className="text-xs font-semibold">India</p>
              </div>
              <div className="p-3 bg-neutral-100/50 dark:bg-neutral-900/50 border border-border/40 rounded-xl text-center">
                <Calendar size={16} className="mx-auto text-cyan-500 mb-1" />
                <p className="text-[10px] text-muted-foreground uppercase font-mono">Current Year</p>
                <p className="text-xs font-semibold">B.Tech Third Year</p>
              </div>
            </div>
          </div>

          {/* Right Side: Text Bio */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Hello, I am Krishana
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              I am a computer science student with a primary focus on core algorithm optimizations and modern full-stack application development. Over the years, I have honed my skills solving complex math and graph challenges on Codeforces and LeetCode, accumulating deep theoretical expertise in Data Structures & Algorithms.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              I love engineering apps that balance responsive interfaces with strong server logic. I am also highly interested in artificial intelligence models, building projects integrating web interfaces with custom machine learning APIs.
            </p>

            {/* Sub-skills panel */}
            <div className="pt-4 border-t border-border/40 space-y-4">
              <h4 className="font-display font-semibold text-lg flex items-center gap-2">
                <Layers size={18} className="text-indigo-500" /> Core Tech Stack
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {coreSkills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <p className="text-xs font-mono font-semibold text-indigo-500 uppercase">{skill.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {skill.items.map((item) => (
                        <span key={item} className="text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-muted-foreground border border-border/20">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Divider with Scroll Indicator */}
        <div className="flex items-center justify-between mb-8 border-b border-border/40 pb-4">
          <h3 className="text-2xl font-bold font-display tracking-tight text-foreground">
            Academic & Experience Timeline
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider hidden sm:inline">
              Swipe to scroll
            </span>
            <div className="w-24 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <motion.div style={{ scaleX }} className="h-full bg-indigo-500 origin-left" />
            </div>
          </div>
        </div>

        {/* SIDEWAYS SCROLLING TIMELINE CARDS */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing no-scrollbar snap-x snap-mandatory"
        >
          {educationTimeline.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-shrink-0 w-[290px] sm:w-[360px] snap-center p-6 md:p-8 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-border/40 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500">
                      {item.year}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-indigo-500">
                      <Icon size={16} />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold font-display tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs font-mono font-semibold text-muted-foreground uppercase">
                    {item.institution}
                  </p>
                  <p className="text-sm font-sans font-light text-muted-foreground leading-relaxed pt-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
