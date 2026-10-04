"use client";

import React from "react";
import { motion } from "motion/react";

export default function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className = ""
}) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex flex-col ${
        isCentered ? "items-center text-center" : "items-start text-left"
      } space-y-4 mb-14 md:mb-18 w-full ${className}`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 font-mono text-xs tracking-wider uppercase backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
          {title}
        </span>
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-sm sm:text-base text-neutral-400 font-sans font-light leading-relaxed ${
            isCentered ? "max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
