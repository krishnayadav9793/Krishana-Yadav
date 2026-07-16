"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const loadingTexts = [
  "INITIALIZING INTERFACE...",
  "LOADING 3D ENGINES...",
  "FETCHING PROFILE DATA...",
  "COMPILING PORTFOLIO...",
  "OPTIMIZING VIEWPORTS...",
  "READY FOR LAUNCH!"
];

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Count up from 0 to 100
    const duration = 2500; // 2.5 seconds
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;
    
    let current = 0;
    const counter = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(counter);
        // Delay fade-out slightly to let the user see "100%"
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 600);
      }
      setCount(Math.floor(current));
    }, intervalTime);

    return () => clearInterval(counter);
  }, [onComplete]);

  useEffect(() => {
    // Cycle through loading texts
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0b0b] text-white font-sans"
        >
          {/* Subtle moving grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
            {/* Ambient glowing orb behind number */}
            <div className="absolute -translate-y-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            
            {/* Massive modern 3D percentage count */}
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-8xl md:text-9xl font-display font-bold tracking-tighter tabular-nums select-none text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600 drop-shadow-[0_10px_20px_rgba(255,255,255,0.05)]"
            >
              {count}%
            </motion.h1>

            {/* Glowing progress line */}
            <div className="w-64 h-[2px] bg-neutral-800 rounded-full overflow-hidden mt-6 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-neutral-400 via-white to-neutral-400 shadow-[0_0_12px_#fff]"
                style={{ width: `${count}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            {/* Fading info texts */}
            <motion.p
              key={textIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="mt-6 text-xs md:text-sm font-mono text-neutral-400 tracking-[0.2em] uppercase select-none min-h-[20px]"
            >
              {loadingTexts[textIndex]}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
