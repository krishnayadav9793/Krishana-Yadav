"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scrolling to add backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section on scroll
      const sections = ["home", "work", "about", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "py-3 bg-background/70 backdrop-blur-xl border-b border-border/40 shadow-sm"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Terminal size={18} className="animate-pulse" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/75">
              krishana<span className="text-indigo-500 font-light">.y</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-200/50 dark:bg-neutral-800/40 p-1.5 rounded-full border border-border/20">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-5 py-2 text-sm font-medium tracking-wide rounded-full transition-colors duration-300 ${
                    isActive ? "text-white dark:text-black" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Switcher */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted cursor-pointer transition-all duration-300 active:scale-95 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-muted cursor-pointer transition-all duration-300 active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <div
          className={`absolute top-full inset-x-0 z-[99] md:hidden bg-background/95 backdrop-blur-2xl border-b border-border shadow-xl transition-all duration-300 ease-in-out origin-top ${
            isOpen
              ? "max-h-[400px] opacity-100 pointer-events-auto visible"
              : "max-h-0 opacity-0 pointer-events-none invisible overflow-hidden"
          }`}
        >
          <div className="py-6 px-8 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 text-lg font-display font-medium border-b border-border/40 transition-colors duration-200 ${
                  activeSection === item.href.slice(1) ? "text-indigo-500 font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </motion.header>
    </>
  );
}
