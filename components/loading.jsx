"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Krishana",
    },
    {
      text: "Yadav",
    }
  ];
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      
      <TypewriterEffectSmooth words={words} />
      
    </div>
  );
}
