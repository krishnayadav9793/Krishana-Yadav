"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import { 
  Github, Star, GitFork, Users, BookOpen, Code, 
  GitCommit, Activity, Calendar, Sparkles, ExternalLink, MapPin
} from "lucide-react";

// Fallback data in case the fetch fails or during offline testing
const FALLBACK_DATA = {
  profile: {
    name: "Krishana Yadav",
    username: "krishnayadav9793",
    avatarUrl: "https://avatars.githubusercontent.com/u/120286828?v=4",
    bio: "Full Stack Developer & B.Tech CSE Student at IIT Vadodara. Passionate about building robust web apps and competitive programming.",
    location: "Vadodara, India",
    followers: 82,
    following: 76,
    publicRepos: 28,
    url: "https://github.com/krishnayadav9793"
  },
  stats: {
    totalStars: 15,
    totalForks: 8,
    languages: [
      { name: "JavaScript", percentage: 52 },
      { name: "C++", percentage: 28 },
      { name: "React Native", percentage: 12 },
      { name: "CSS", percentage: 8 }
    ]
  },
  topRepos: [
    {
      name: "Learn_Flex",
      description: "Full-stack competitive learning platform enabling technical preparation through quizzes, practice sessions, and 1v1 quiz battles.",
      stars: 6,
      forks: 3,
      language: "JavaScript",
      url: "https://github.com/krishnayadav9793/Learn_Flex",
      updatedAt: "2026-07-30T10:00:00Z"
    },
    {
      name: "devsync",
      description: "A modern, real-time collaborative development workspace featuring live code editing, chat, and WebRTC video/audio communication.",
      stars: 5,
      forks: 2,
      language: "JavaScript",
      url: "https://github.com/krishnayadav9793/devsync",
      updatedAt: "2026-07-29T15:30:00Z"
    },
    {
      name: "Game-On",
      description: "Cross-platform Multi-Game Android Application featuring 10+ interactive games built with React Native and Expo.",
      stars: 3,
      forks: 2,
      language: "JavaScript",
      url: "https://github.com/krishnayadav9793/Game-On",
      updatedAt: "2026-07-25T12:00:00Z"
    },
    {
      name: "Krishana-Yadav",
      description: "Personal portfolio website built using Next.js, React, Tailwind CSS, Framer Motion, and Node.js/Nodemailer.",
      stars: 2,
      forks: 1,
      language: "JavaScript",
      url: "https://github.com/krishnayadav9793/Krishana-Yadav",
      updatedAt: "2026-07-30T22:00:00Z"
    }
  ],
  activity: [
    {
      id: "act-1",
      type: "PushEvent",
      title: "Pushed 3 commits to repository",
      repoName: "Learn_Flex",
      repoUrl: "https://github.com/krishnayadav9793/Learn_Flex",
      details: '"Optimized socket.io connections for quiz battles"',
      date: "2026-07-30T18:00:00Z"
    },
    {
      id: "act-2",
      type: "PushEvent",
      title: "Pushed 1 commit to repository",
      repoName: "devsync",
      repoUrl: "https://github.com/krishnayadav9793/devsync",
      details: '"Added WebRTC multi-peer connection stabilizer"',
      date: "2026-07-29T14:15:00Z"
    },
    {
      id: "act-3",
      type: "WatchEvent",
      title: "Starred repository",
      repoName: "framer/motion",
      repoUrl: "https://github.com/framer/motion",
      details: "",
      date: "2026-07-28T09:30:00Z"
    }
  ]
};

// Count-up helper component (similar to work.jsx)
function StatCounter({ value, prefix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView || value === undefined) return;
    
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end) || end === 0) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200;
    const incrementTime = Math.max(Math.floor(duration / end), 16);
    
    const step = () => {
      start += Math.max(Math.floor(end / 40), 1);
      if (start >= end) {
        setDisplayValue(end);
      } else {
        setDisplayValue(start);
        setTimeout(step, incrementTime);
      }
    };
    
    step();
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{displayValue}</span>;
}

// Interactive Tilt Card wrapper for sections
function TiltCard({ children, className = "", glowColor = "rgba(99,102,241,0.06)" }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);

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
      className={`preserve-3d rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-border/40 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer glow-spotlight ${className}`}
      style={{
        rotateX,
        rotateY,
        "--glow-color": glowColor
      }}
    >
      {children}
    </motion.div>
  );
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
          console.warn("Using fallback GitHub data due to API error:", result.error);
          setData(FALLBACK_DATA);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
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

  if (loading) {
    return (
      <section id="github" className="relative py-24 bg-background min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.01)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
        <div className="flex flex-col items-center space-y-4 z-10">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <Github className="absolute inset-0 m-auto text-indigo-500" size={24} />
          </div>
          <p className="text-sm font-mono text-muted-foreground animate-pulse">Syncing GitHub Insights...</p>
        </div>
      </section>
    );
  }

  const { profile, stats, topRepos, activity } = data || FALLBACK_DATA;

  return (
    <section id="github" className="relative py-24 bg-background overflow-hidden border-t border-border/20">
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.02),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.02),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.01)_1px,transparent_1px)] bg-[size:6rem_6rem]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 font-mono text-xs font-semibold">
            <Github size={12} />
            <span>GitHub Live Dashboard</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-neutral-400">
            Open Source & Activity
          </h2>
          <div className="w-16 h-1 bg-indigo-500 rounded-full" />
          <p className="text-base text-muted-foreground font-sans font-light max-w-lg">
            Real-time tracking of my repositories, top technologies, public contributions, and coding activities.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Profile Card & Stats (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            {/* Profile Overview Card */}
            <TiltCard className="p-6 text-left" glowColor="rgba(99,102,241,0.05)">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-border/60">
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">{profile.name}</h3>
                  <a 
                    href={profile.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-mono text-indigo-500 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    @{profile.username} <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <p className="text-xs font-sans text-muted-foreground leading-relaxed mb-6 font-light">
                {profile.bio}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-6 border-t border-b border-border/20 py-3">
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-indigo-400" />
                  <span><strong>{profile.followers}</strong> followers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-cyan-400" />
                  <span><strong>{profile.following}</strong> following</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {profile.location && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin size={14} className="text-rose-400" />
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen size={14} className="text-amber-400" />
                  <span>{profile.publicRepos} Public Repositories</span>
                </div>
              </div>
            </TiltCard>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-border/40 text-left">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                  <Star size={16} />
                </div>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Total Stars</p>
                <p className="text-2xl font-bold font-display text-foreground mt-1">
                  <StatCounter value={stats.totalStars} />
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-border/40 text-left">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                  <GitFork size={16} />
                </div>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Forks Generated</p>
                <p className="text-2xl font-bold font-display text-foreground mt-1">
                  <StatCounter value={stats.totalForks} />
                </p>
              </div>
            </div>

            {/* Top Languages */}
            <div className="p-6 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-border/40 text-left">
              <div className="flex items-center gap-2 mb-4">
                <Code size={16} className="text-indigo-500" />
                <h4 className="font-display font-semibold text-sm text-foreground">Top Technologies (Repo count)</h4>
              </div>
              <div className="space-y-3.5">
                {stats.languages.map((lang, idx) => {
                  // Harmonious color cycle
                  const barColors = [
                    "bg-indigo-500",
                    "bg-cyan-500",
                    "bg-amber-500",
                    "bg-rose-500",
                    "bg-emerald-500"
                  ];
                  const colorClass = barColors[idx % barColors.length];

                  return (
                    <div key={lang.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-muted-foreground">
                        <span className="text-foreground font-medium">{lang.name}</span>
                        <span>{lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${colorClass} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Contribution Chart & Repos Grid & Activity (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full text-left">
            
            {/* Contribution Calendar Card */}
            <div className="p-6 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-border/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" />
                  <h4 className="font-display font-semibold text-sm text-foreground">GitHub Contributions</h4>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-mono text-[9px] uppercase tracking-wide font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                  <span>Real-time Calendar</span>
                </div>
              </div>

              {/* Responsive Container for Contribution Grid SVG */}
              <div className="overflow-x-auto no-scrollbar py-2">
                <div className="min-w-[680px] max-w-full flex items-center justify-center">
                  {/* Using ghchart service with indigo color themed accent */}
                  <img 
                    src={`https://ghchart.rshah.org/6366f1/${profile.username}`} 
                    alt={`${profile.name}'s GitHub contributions chart`}
                    className="w-full h-auto dark:opacity-85 dark:brightness-105 select-none"
                    onError={(e) => {
                      // fallback representation if the chart service is down
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mt-4 border-t border-border/20 pt-3">
                <span>Reflected from active GitHub commits</span>
                <a 
                  href={`https://github.com/${profile.username}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-indigo-500 transition-colors flex items-center gap-1"
                >
                  View full history <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Top Repositories section */}
            <div>
              <h4 className="text-xl font-bold font-display text-foreground mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-500" />
                <span>Featured Repositories</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topRepos.map((repo, idx) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <a 
                      href={repo.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group block p-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-border/40 hover:border-indigo-500/40 hover:bg-neutral-100/80 dark:hover:bg-neutral-900/70 transition-all duration-300 h-full relative"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-display font-semibold text-sm text-foreground group-hover:text-indigo-500 transition-colors tracking-tight">
                          {repo.name}
                        </h5>
                        <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <p className="text-[11px] text-muted-foreground font-sans font-light leading-relaxed mb-4 line-clamp-2 h-[34px]">
                        {repo.description || "No description provided."}
                      </p>

                      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t border-border/20 pt-3">
                        <div className="flex items-center gap-3">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-indigo-500" />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-0.5">
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitFork size={10} className="text-blue-400" />
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

            {/* Live Activity Timeline */}
            <div className="mt-4">
              <h4 className="text-xl font-bold font-display text-foreground mb-6 flex items-center gap-2">
                <Activity size={18} className="text-indigo-500 animate-pulse" />
                <span>Recent Commit Stream</span>
              </h4>

              <div className="relative border-l border-border/60 ml-3 pl-6 space-y-6 py-2">
                {activity.length === 0 ? (
                  <p className="text-xs font-mono text-muted-foreground italic">No recent public actions recorded.</p>
                ) : (
                  activity.map((act, idx) => {
                    // Decide event icon & color
                    let EventIcon = GitCommit;
                    let iconColorClass = "text-indigo-500 bg-indigo-500/10 border-indigo-500/20";
                    
                    if (act.type === "CreateEvent") {
                      EventIcon = Sparkles;
                      iconColorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
                    } else if (act.type === "WatchEvent") {
                      EventIcon = Star;
                      iconColorClass = "text-amber-500 bg-amber-500/10 border-amber-500/20";
                    }

                    return (
                      <motion.div
                        key={act.id || idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="relative group"
                      >
                        {/* Dot Bullet */}
                        <div className={`absolute -left-[37px] top-0.5 w-6 h-6 rounded-full border flex items-center justify-center ${iconColorClass} z-10 group-hover:scale-110 transition-transform duration-200`}>
                          <EventIcon size={11} />
                        </div>

                        {/* Content */}
                        <div className="space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <p className="text-xs font-medium text-foreground">
                              {act.title}{" "}
                              <a 
                                href={act.repoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-indigo-500 font-semibold hover:underline"
                              >
                                {act.repoName}
                              </a>
                            </p>
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {formatRelativeTime(act.date)}
                            </span>
                          </div>
                          {act.details && (
                            <p className="text-[11px] font-mono text-muted-foreground italic pl-3 border-l border-border/40 py-0.5 leading-normal">
                              {act.details}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
