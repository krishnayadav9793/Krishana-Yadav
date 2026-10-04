"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export default function MagneticButton({
  children,
  className = "",
  strength = 18,
  onClick,
  as = "button",
  href,
  download,
  target,
  rel,
  ariaLabel
}) {
  const ref = useRef(null);
  const [canHover, setCanHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    // Only enable magnetic pull on mouse-capable desktop devices without reduced motion
    const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkSupport = () => {
      setCanHover(mqHover.matches && !mqMotion.matches);
    };

    checkSupport();
    mqHover.addEventListener("change", checkSupport);
    mqMotion.addEventListener("change", checkSupport);

    return () => {
      mqHover.removeEventListener("change", checkSupport);
      mqMotion.removeEventListener("change", checkSupport);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set((distanceX / rect.width) * strength);
    y.set((distanceY / rect.height) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = as === "a" ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={ref}
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`relative inline-flex items-center justify-center transition-colors duration-200 select-none ${className}`}
    >
      {children}
    </MotionComponent>
  );
}
