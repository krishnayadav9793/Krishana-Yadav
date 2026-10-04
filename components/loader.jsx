"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const loadingSteps = [
  "SYS_INITIALIZE // MOUNTING RUNTIME",
  "HYDRATING THREE.JS 3D ENGINE",
  "CONNECTING REPOSITORIES & METRICS",
  "COMPILING INTERFACE PROTOCOLS",
  "ESTABLISHING TELEMETRY UPLINK",
  "SYSTEM ONLINE // LAUNCH READY"
];

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 1800; // Snappy 1.8s
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 300);
      }
      setCount(Math.floor(current));
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 280);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050507] text-white"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

          {/* Central Radial Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
            {/* Top Monospace Tag */}
            <div className="flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
              <span>KRISHANA YADAV // PORTFOLIO</span>
            </div>

            {/* Massive percentage count */}
            <h1 className="text-8xl sm:text-9xl font-display font-extrabold tracking-tighter tabular-nums select-none bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
              {count}
              <span className="text-3xl sm:text-4xl text-indigo-400 font-mono font-light ml-1">%</span>
            </h1>

            {/* Hairline Progress Bar */}
            <div className="w-full max-w-xs h-[2px] bg-neutral-800 rounded-full overflow-hidden mt-8 relative">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.8)] transition-all duration-75 ease-out"
                style={{ width: `${count}%` }}
              />
            </div>

            {/* Status Telemetry Text */}
            <motion.p
              key={stepIndex}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              className="mt-5 text-xs font-mono text-neutral-400 tracking-[0.15em] uppercase select-none min-h-[18px]"
            >
              {loadingSteps[stepIndex]}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
