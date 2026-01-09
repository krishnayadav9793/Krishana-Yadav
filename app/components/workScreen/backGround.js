"use client";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

export function SVGMaskEffectDemo() {
  return (
    <div
      className="flex h-[40rem] w-full items-center justify-center overflow-hidden ">
      <MaskContainer
        revealText={
          <p
            className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-white">
            I work across Data Structures & Algorithms, Web Development, and AI/ML,
            building solutions that are efficient, scalable, and actually make sense.
          </p>
        }
        className="h-[40rem] rounded-md border text-white dark:text-black">
        I build with DSA for thinking, Web for experience, and AI/ML for intelligence,
        writing code that scales — and survives user behavior.
      </MaskContainer>
    </div>
  );
}
