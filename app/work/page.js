"use client"
import React, { useState } from 'react'
import { NavbarDemo } from '../components/Header'
import { BackgroundRipple } from '../components/backgroundComponent'
// import { BackgroundLines } from '@/components/ui/background-lines'
import Landing from '../components/workScreen/Landing'
function Work() {
    // const [Screens ,setScreens]= useState(Landing) 
  return (
    <div id="work" className=' min-h-screen bg-neutral-100 dark:bg-[#0b0b0b]'>
      <NavbarDemo/>
    </div>
  )
}

export default Work
