"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X, ArrowUpRight, FileDown, Github } from "lucide-react";
import MagneticButton from "./ui/magnetic-button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#work" },
  { label: "Telemetry", href: "#github" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sectionIds = ["home", "work", "github", "about", "skills", "education", "contact"];
      const scrollPosition = window.scrollY + 220;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#050507]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Krishana Yadav Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 via-white/5 to-cyan-500/20 border border-white/10 flex items-center justify-center text-white font-mono font-bold text-sm tracking-tighter group-hover:border-indigo-400/50 transition-colors">
              KY
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                Krishana Yadav
              </span>
              <span className="font-mono text-[10px] text-neutral-400 tracking-wider">
                IIITV // CSE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-inner">
            {navLinks.map((item) => {
              const targetId = item.href.slice(1);
              const isActive = activeSection === targetId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wide rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/15 -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub Profile Link */}
            <a
              href="https://github.com/krishnayadav9793"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:border-white/25 hover:bg-white/[0.08] transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>

            {/* Resume Download CTA */}
            <a
              href="https://drive.google.com/uc?export=download&id=1FvG5hXUJ7tPJ8Qm3e5l1B5jtrIFDEPIr"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-mono text-indigo-300 hover:bg-indigo-500/25 hover:text-indigo-200 hover:border-indigo-400/50 transition-all shadow-sm"
              aria-label="Download Resume"
            >
              <FileDown size={13} />
              <span>Resume</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
              aria-label="Toggle visual theme"
            >
              {theme === "dark" ? (
                <Sun size={15} className="text-amber-300" />
              ) : (
                <Moon size={15} className="text-indigo-400" />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-[#08080d]/95 backdrop-blur-2xl border-b border-white/10"
            >
              <div className="py-6 px-6 flex flex-col gap-3">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`py-2 text-sm font-mono tracking-wider border-b border-white/[0.06] transition-colors ${
                      activeSection === item.href.slice(1)
                        ? "text-indigo-400 font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}

                <div className="pt-4 flex items-center gap-3">
                  <a
                    href="https://github.com/krishnayadav9793"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center text-xs font-mono text-neutral-300 flex items-center justify-center gap-2"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://drive.google.com/uc?export=download&id=1FvG5hXUJ7tPJ8Qm3e5l1B5jtrIFDEPIr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-center text-xs font-mono text-indigo-300 flex items-center justify-center gap-2"
                  >
                    <FileDown size={14} />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
