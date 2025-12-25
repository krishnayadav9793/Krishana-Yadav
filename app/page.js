'use client'

import { BackgroundRipple } from "./components/backgroundComponent";
import Work from "./work/page";
export default function Home() {
  const children =<div className="mt-60 w-full">
        <h2
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Welcome to my profile
        </h2>
        <p
          className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          Hi, I’m Krishana Yadav.
            A passionate developer and problem solver who loves building impactful web applications and exploring new technologies.
        </p>
      </div>
  return (

    <div className="grid grid-rows-4">
      <BackgroundRipple children={children}/>
      <Work/>
    </div>

  );
}
