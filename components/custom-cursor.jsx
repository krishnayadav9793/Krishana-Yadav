"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse positions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for trailing effect
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickable elements for hover scaling
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], .clickable"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Initial check & observer to bind hover state to dynamically rendered elements
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  // Disable custom cursor on touch devices
  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Outer Glowing Trail Aura */}
      {isVisible && (
        <motion.div
          className="absolute rounded-full bg-gradient-to-r from-cyan-500/30 via-indigo-500/25 to-pink-500/30 blur-2xl"
          style={{
            x: trailX,
            y: trailY,
            translateX: "-50%",
            translateY: "-50%",
            width: isHovering ? "180px" : "120px",
            height: isHovering ? "180px" : "120px",
          }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        />
      )}

      {/* Inner precise dot pointer */}
      {isVisible && (
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-black dark:bg-white mix-blend-difference"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
            scale: isHovering ? 2.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.1 }}
        />
      )}
    </div>
  );
}
