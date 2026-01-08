'use client'
import { useEffect } from "react";
import About from "./about/page";
import { BackgroundRipple } from "./components/backgroundComponent";
import Contact from "./contact/page";
import Work from "./work/page";
export default function Home() {

  useEffect(() => {
    // simulate loader duration or API call
    const timer = setTimeout(() => {

    }, 3000); // loader runs for 3 sec

    return () => clearTimeout(timer);
  }, []);
  const children = <div className="mt-60 w-full">
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

    <div >
      <BackgroundRipple children={children} />
      <Work />
      <About />
      <Contact />
    </div>

  );
}
