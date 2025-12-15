'use client'
import { motion } from "framer-motion";
import Image from "next/image";
// import Krishana from "../public/assets/Krishana-Yadav.webp"
import krishana from "../public/assets/krishana.jpg"
export default function Home() {

  return (

    <div className="grid  items-center  justify-center w-[70%] h-full py-5 text-4xl grid-cols-2 ">
      <motion.div className="flex justify-center items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease:"backOut" }}
      >
        <Image src={krishana}
          width={300}
          height={550}
          alt="Picture of the author"
          className="rounded-2xl mr-8"
        />

      </motion.div>
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center  w-[40vw] flex-col gap-5 font-bold text-6xl text-blue-500"
        >
          Krishana
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="flex justify-center  w-[40vw] flex-col gap-5 font-bold text-6xl"
        >
          Yadav
        </motion.h1>
        <motion.div className="mt-10 flex "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <ul className="gap-3 ">
            <li>Computer Science Student at IIIT Vadodara </li>
            <li>Full stack Developer</li>
            <li>AI/ML Enthusiast</li>
          </ul>
        </motion.div>
      </div>

    </div>

  );
}
