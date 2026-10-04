"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Twitter, Award, Mail, Heart } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#040406] border-t border-white/[0.06] py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Branding & Status */}
        <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-base tracking-tight text-white">
              Krishana Yadav
            </span>
            <span className="text-neutral-500 font-mono text-xs">/</span>
            <span className="font-mono text-xs text-neutral-400">Software Engineer</span>
          </div>
          <p className="text-xs text-neutral-400 font-mono">
            Vadodara, India &bull; {time ? `IST ${time}` : "Asia/Kolkata"} &bull; <span className="text-emerald-400">All systems normal</span>
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/krishnayadav9793"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-all"
            aria-label="GitHub Profile"
          >
            <Github size={15} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-all"
            aria-label="Twitter Profile"
          >
            <Twitter size={15} />
          </a>
          <a
            href="https://codeforces.com/profile/krishna_yadav_"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-all"
            aria-label="Codeforces Profile"
          >
            <Award size={15} />
          </a>
          <a
            href="mailto:karanyadav21398@gmail.com"
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-all"
            aria-label="Send Email"
          >
            <Mail size={15} />
          </a>
        </div>

        {/* Right: Back to top button */}
        <div className="flex items-center gap-4">
          <p className="text-xs text-neutral-400 font-mono hidden sm:inline">
            &copy; {new Date().getFullYear()} Krishana Yadav
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
