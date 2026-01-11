"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { getCodeForces } from "@/lib/codeforce";
import { getLeetCode } from "@/lib/leetCode";
export default function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const [codeforce,setCodeforce]=useState("Click button")
  useEffect(()=>{
    if(active==null)setCodeforce("Click button")
  },[active])
  const max=(a,b)=>{
    return a>b?a:b
  }
  const getCodeForcesData = async () => {
    setCodeforce("loading...")
    const data = await getCodeForces();
    const rating = await fetch(`https://codeforces.com/api/user.rating?handle=krishna_yadav_`)
    const rate= await rating.json()
    // console.log(rate)
    let maxRate=0
    rate.result.forEach(element => {
      maxRate=max(maxRate,element.newRating)
    });
    let qCount=0
    data.result.forEach(element => {
      if(element.verdict==="OK")qCount++;
    });
    console.log(maxRate,qCount)
    const setData=<div>
      <p>MaxRating :{maxRate}</p>
      <p>Total Questions :{qCount}</p>
    </div>
    setCodeforce(setData)
    
  }
  const getLeetCodeData =async ()=>{
    setCodeforce("loading...")
    const data =await getLeetCode()
    console.log(data)
    const setData =<div>
      <p>Total Questions :{data.totalSolved}</p>
      <p>Easy :{data.easySolved}</p>
      <p>Medium :{data.mediumSolved}</p>
      <p>Hard :{data.hardSolved}</p>
    </div>
    setCodeforce(setData)
  }
  const cards = [
    {
      description: "@krishna_yadav_",
      title: "Codeforces",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYWK0pVMN5rF0CTuiyG5RTeuIsG-7O3FmW4g&s",
      ctaText: "Get Data",
      ctaLink: getCodeForcesData,
      
    },
    // {
    //   description: "@the_coder97",
    //   title: "Codechef",
    //   src: "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/zruiknbedz8yqafxbazb?ik-sanitizeSvg=true",
    //   ctaText: "Get Data",
    //   ctaLink: "https://ui.aceternity.com/templates",
      
    // },

    {
      description: "@_krishna__yadav_",
      title: "Leetcode",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzL5t4AjLfYVSKQMirh89a1DN1VzwWKbiNw&s",
      ctaText: "Get Data",
      ctaLink: getLeetCodeData,
      
    },

  ];
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}>
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base">
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base">
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {codeforce}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul
        className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full  rounded-lg object-cover object-top" />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base">
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base">
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};


