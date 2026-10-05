"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Github,
  Star,
  GitFork,
  Users,
  BookOpen,
  Code,
  GitCommit,
  Activity,
  Calendar,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Terminal,
} from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const FALLBACK_DATA = {
  profile: {
    name: "Krishana Yadav",
    username: "krishnayadav9793",
    avatarUrl: "https://avatars.githubusercontent.com/u/120286828?v=4",
    bio: "Full Stack Developer & B.Tech CSE Student at IIIT Vadodara (IIITV). Passionate about building robust web apps and competitive programming.",
    location: "Vadodara, India",
    followers: 82,
    following: 76,
    publicRepos: 28,
    url: "https://github.com/krishnayadav9793",
  },
  stats: {
    totalStars: 15,
    totalForks: 8,
    languages: [
      { name: "JavaScript", percentage: 52 },
      { name: "C++", percentage: 28 },
      { name: "React Native", percentage: 12 },
      { name: "CSS", percentage: 8 },
    ],
  },
  topRepos: [
    {
      name: "Learn_Flex",
      description:
        "Full-stack competitive learning platform enabling technical preparation through quizzes, practice sessions, and 1v1 quiz battles.",
      stars: 6,
      forks: 3,
      language: "JavaScript",
      url: "https://github.com/krishnayadav9793/Learn_Flex",
      updatedAt: "2026-07-30T10:00:00Z",
    },
    {
      name: "devsync",
      description:
        "A modern, real-time collaborative development workspace featuring live code editing, chat, and WebRTC video/audio communication.",
      stars: 5,
      forks: 2,
      language: "JavaScript",
      url: "https://github.com/krishnayadav9793/devsync",
      updatedAt: "2026-07-29T15:30:00Z",
    },
    {
      name: "Game-On",
      description:
        "Cross-platform Multi-Game Android Application featuring 10+ interactive games built with React Native and Expo.",
      stars: 3,
      forks: 2,
      language: "JavaScript",
      url: "https://github.com/krishnayadav9793/Game-On",
      updatedAt: "2026-07-25T12:00:00Z",
    },
    {
      name: "Krishana-Yadav",
      description:
        "Personal portfolio website built using Next.js, React, Tailwind CSS, Framer Motion, and Node.js/Nodemailer.",
      stars: 2,
      forks: 1,
      language: "JavaScript",
      url: "https://github.com/krishnayadav9793/Krishana-Yadav",
      updatedAt: "2026-07-30T22:00:00Z",
    },
  ],
  activity: [
    {
      id: "act-1",
      type: "PushEvent",
      title: "Pushed 3 commits to repository",
      repoName: "Learn_Flex",
      repoUrl: "https://github.com/krishnayadav9793/Learn_Flex",
      details: '"Optimized socket.io connections for quiz battles"',
      date: "2026-07-30T18:00:00Z",
    },
    {
      id: "act-2",
      type: "PushEvent",
      title: "Pushed 1 commit to repository",
      repoName: "devsync",
      repoUrl: "https://github.com/krishnayadav9793/devsync",
      details: '"Added WebRTC multi-peer connection stabilizer"',
      date: "2026-07-29T14:15:00Z",
    },
    {
      id: "act-3",
      type: "WatchEvent",
      title: "Starred repository",
      repoName: "framer/motion",
      repoUrl: "https://github.com/framer/motion",
      details: "",
      date: "2026-07-28T09:30:00Z",
    },
  ],
};

function StatCounter({ value, prefix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (!isInView || value === undefined) return;
    const end = parseInt(value, 10);
    if (isNaN(end) || end === 0) {
      setDisplayValue(value);
      return;
    }
    const duration = 1000;
    const increment = Math.max(Math.floor(end / 30), 1);
    const stepTime = Math.max(Math.floor(duration / (end / increment)), 16);

    let start = 0;
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

  return <span ref={ref}>{prefix}{displayValue}</span>;
}

export default function GithubSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch("/api/github/");
        const result = await response.json();
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setData(FALLBACK_DATA);
        }
      } catch (err) {
        console.error("GitHub fetch error:", err);
        setData(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHubData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatRelativeTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const { profile, stats, topRepos, activity } = data || FALLBACK_DATA;

  return (
    <section id="github" className="relative py-28 md:py-36 bg-background text-foreground border-t border-black/[0.04] dark:border-white/[0.04] transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="02 // TELEMETRY & OPEN SOURCE"
          title="Open Source & Activity"
          description="Real-time tracking of my repositories, top technologies, public contributions, and coding activities."
        />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: Profile Card + Quick Metrics + Languages (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            {/* Profile Overview Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] shadow-[0_12px_32px_rgba(15,23,42,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shrink-0">
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{profile.name}</h3>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 mt-0.5"
                  >
                    @{profile.username} <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>

              <p className="text-xs font-sans text-slate-600 dark:text-neutral-300 leading-relaxed mb-6 font-light">
                {profile.bio}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-neutral-400 mb-6 border-y border-slate-200/80 dark:border-white/[0.06] py-3">
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-indigo-600 dark:text-indigo-400" />
                  <span><strong className="text-slate-900 dark:text-white font-medium">{profile.followers}</strong> followers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-cyan-600 dark:text-cyan-400" />
                  <span><strong className="text-slate-900 dark:text-white font-medium">{profile.following}</strong> following</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-neutral-400 font-mono">
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-rose-500 dark:text-rose-400" />
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <BookOpen size={13} className="text-amber-500 dark:text-amber-400" />
                  <span>{profile.publicRepos} Public Repositories</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] text-left shadow-sm dark:shadow-none">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center mb-3">
                  <Star size={15} />
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-widest block">Total Stars</span>
                <p className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                  <StatCounter value={stats.totalStars} />
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] text-left shadow-sm dark:shadow-none">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <GitFork size={15} />
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-widest block">Forks</span>
                <p className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                  <StatCounter value={stats.totalForks} />
                </p>
              </div>
            </div>

            {/* Top Technologies */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] text-left shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2 mb-4">
                <Code size={15} className="text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                  Language Distribution
                </h4>
              </div>

              <div className="space-y-3.5">
                {stats.languages.map((lang, idx) => {
                  const barColors = [
                    "bg-indigo-500",
                    "bg-cyan-500",
                    "bg-amber-400",
                    "bg-rose-400"
                  ];
                  const colorClass = barColors[idx % barColors.length];

                  return (
                    <div key={lang.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-500 dark:text-neutral-400">
                        <span className="text-slate-800 dark:text-neutral-200 font-medium">{lang.name}</span>
                        <span>{lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${colorClass} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Contribution Grid + Featured Repos + Commit Stream (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full text-left">
            
            {/* Contribution Calendar Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] shadow-[0_12px_32px_rgba(15,23,42,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-indigo-600 dark:text-indigo-400" />
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">GitHub Contribution Graph</h4>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono text-[9px] uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-ping" />
                  <span>Real-time Calendar</span>
                </div>
              </div>

              {/* GitHub SVG Chart */}
              <div className="overflow-x-auto no-scrollbar py-2">
                <div className="min-w-[660px] max-w-full flex items-center justify-center">
                  <img
                    src={`https://ghchart.rshah.org/6366f1/${profile.username}`}
                    alt={`${profile.name}'s GitHub contributions chart`}
                    className="w-full h-auto brightness-95 contrast-125 select-none"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-neutral-400 mt-4 border-t border-slate-200/80 dark:border-white/[0.06] pt-3">
                <span>Reflected from active GitHub commits</span>
                <a
                  href={`https://github.com/${profile.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  View full history <ArrowUpRight size={11} />
                </a>
              </div>
            </div>

            {/* Featured Repositories Bento Row */}
            <div>
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
                <span>Featured Open Source Repositories</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topRepos.map((repo, idx) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 rounded-2xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] hover:border-indigo-300 dark:hover:border-indigo-400/40 hover:bg-slate-50/50 dark:hover:bg-[#0c0d18] transition-all duration-300 h-full flex flex-col justify-between shadow-sm dark:shadow-none"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors tracking-tight">
                            {repo.name}
                          </h5>
                          <ArrowUpRight size={13} className="text-slate-400 dark:text-neutral-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-neutral-300 font-sans font-light leading-relaxed mb-4 line-clamp-2 h-[34px]">
                          {repo.description || "No description provided."}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-neutral-400 border-t border-slate-200/80 dark:border-white/[0.06] pt-3">
                        <div className="flex items-center gap-3">
                          {repo.language && (
                            <span className="flex items-center gap-1 text-slate-700 dark:text-neutral-300">
                              <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-0.5">
                            <Star size={11} className="text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitFork size={11} className="text-cyan-600 dark:text-cyan-400" />
                            {repo.forks}
                          </span>
                        </div>
                        <span>{formatDate(repo.updatedAt)}</span>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live Commit Stream */}
            <div className="mt-2">
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Activity size={16} className="text-indigo-600 dark:text-indigo-400 animate-pulse" />
                <span>Recent Commit Stream</span>
              </h4>

              <div className="relative border-l border-slate-200 dark:border-white/[0.08] ml-3 pl-6 space-y-5 py-1">
                {activity.length === 0 ? (
                  <p className="text-xs font-mono text-slate-400 dark:text-neutral-500 italic">No recent public actions recorded.</p>
                ) : (
                  activity.map((act, idx) => (
                    <div key={act.id || idx} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border border-indigo-400/30 bg-slate-50 dark:bg-background flex items-center justify-center">
                        <GitCommit size={10} className="text-indigo-600 dark:text-indigo-400" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <p className="text-xs font-medium text-slate-900 dark:text-white">
                            {act.title}{" "}
                            <a
                              href={act.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 dark:text-indigo-300 font-semibold hover:underline"
                            >
                              {act.repoName}
                            </a>
                          </p>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                            {formatRelativeTime(act.date)}
                          </span>
                        </div>
                        {act.details && (
                          <p className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 italic pl-3 border-l border-slate-200 dark:border-white/[0.08] py-0.5 leading-normal">
                            {act.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
