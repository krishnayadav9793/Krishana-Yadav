'use client'
// import Link from 'next/link'
import React from 'react'
import { useState } from 'react';
import {motion} from 'framer-motion';
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" }
  
];
function Header() {
  const [hovered, setHovered] = useState(null);
  return (
    <div className='bg-slate-900/80 backdrop-blur-md grid grid-cols-2 p-4 min-w-10 fixed top-0 w-full z-50  '>
        <div>
            <h1 className='font-bold text-2xl'>Krishana Yadav</h1>
        </div>
        <div className="flex justify-center gap-8 text-[20px]">
        {navItems.map((item) => (
          <div
            key={item.name}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            className="relative group cursor-pointer"
          >
            <a
              href={item.href}
              className="  transition-colors"
            >
              {item.name}
            </a>

            
            {hovered === item.name && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 h-[3px] bg-gray-700 rounded-full"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
