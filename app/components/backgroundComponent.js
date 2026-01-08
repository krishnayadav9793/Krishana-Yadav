"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function BackgroundRipple({children}) {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden" id="home">
      <BackgroundRippleEffect />
      {children}
    </div>
  );
}
