"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap, BookOpen, Terminal, Calendar, Award, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const educationTimeline = [
  {
    year: "2024 - Present",
    status: "CURRENTLY ENROLLED",
    title: "Bachelor of Technology in Computer Science",
    institution: "Indian Institute of Technology (IIIT) Vadodara",
    description:
      "Deepening knowledge in advanced algorithms, machine learning, compiler design, and systems engineering. Maintaining a high GPA.",
    icon: GraduationCap,
    accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    badge: "B.Tech CSE"
  },
  {
    year: "2021 - 2023",
    status: "COMPLETED",
    title: "Senior Secondary Education (High School)",
    institution: "Kendriya Vidyalaya Azamgarh",
    description:
      "Focused heavily on physics, chemistry, and mathematics. Developed solid foundational problem-solving capacities.",
    icon: BookOpen,
    accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    badge: "Class XII"
  },
  {
    year: "2020",
    status: "COMPLETED",
    title: "Secondary School Certification",
    institution: "Kendriya Vidyalaya Azamgarh",
    description:
      "Introduced to basic computing and logic. Graduated with merit honors.",
    icon: Terminal,
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badge: "Class X"
  }
];

export default function EducationSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="education" className="relative py-28 md:py-36 bg-background text-foreground border-t border-black/[0.04] dark:border-white/[0.04] transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.02),transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="05 // ACADEMIC TIMELINE"
          title="Academic & Experience Timeline"
          description="Educational milestones shaping my theoretical foundations, mathematical discipline, and technical rigor."
        />

        {/* Vertical Timeline Structure */}
        <div ref={containerRef} className="relative mt-12 pl-6 sm:pl-10">

          {/* Static Track Line */}
          <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-white/[0.08]" />

          {/* Animated Glowing Progress Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[11px] sm:left-[19px] top-4 w-[2px] bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] origin-top"
          />

          <div className="space-y-12">
            {educationTimeline.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group text-left"
                >
                  {/* Glowing Node Marker */}
                  <div
                    className={`absolute -left-[27px] sm:-left-[43px] top-6 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110 shadow-lg ${item.accent}`}
                  >
                    <Icon size={16} />
                  </div>

                  {/* Timeline Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 shadow-[0_12px_32px_rgba(15,23,42,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white">
                          {item.year}
                        </span>
                        <span className="font-mono text-[10px] uppercase text-slate-500 dark:text-neutral-400 tracking-wider">
                          {item.status}
                        </span>
                      </div>

                      <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-mono text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-wider mt-1 mb-4">
                      {item.institution}
                    </p>

                    <p className="text-sm sm:text-base font-sans font-light text-slate-600 dark:text-neutral-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
