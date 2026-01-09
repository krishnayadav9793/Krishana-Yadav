"use client"
import React, { useState } from 'react'
import { CardStackDemo } from '../components/AboutCards';
import { HoverBorderGradientDemo } from '../components/AboutButton';
import { TimelineDemo } from '../components/TimelineScreen';
function About() {
  const [screen ,setScreen]=useState(<CardStackDemo/>)
  const [btn ,setBtn]=useState("Timeline")
  const changeScreen = ()=>{
    if(btn==="Timeline"){
      setScreen(<TimelineDemo/>)
      setBtn("Read about me")
    }else {
      setScreen(<CardStackDemo/>)
      setBtn("Timeline")
    }
  }
  return (
    <div id="about" className=' flex flex-col justify-center items-center  sans-serif min-h-screen dark:bg-neutral-950 bg-neutral-100 '>
      <div className=' h-fit'>
        {screen}
      </div>
      <div className='mt-24' onClick={changeScreen}>
        <HoverBorderGradientDemo btnContent={btn} />
      </div>
    </div>
  )
}

export default About
