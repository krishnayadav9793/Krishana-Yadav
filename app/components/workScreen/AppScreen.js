"use client"
import React from 'react'
import { HoverEffect } from '../../../components/ui/card-hover-effect'
import BG from './BG';
function AppScreen() {
  return (
    <div className="max-w-5xl mx-auto px-8 flex justify-center items-center ">
      {/* <BG/> */}
      {projects.length==0?<BG/>:<HoverEffect items={projects}/>}
    </div>
  )
}
const projects = [{
    title: "Game On",
    description:
      "Build a multigame app (second year project)",
    link: " https://expo.dev/artifacts/eas/gg3aBQ8dVMcBeYsRLfuQYG.apk",
}];
export default AppScreen
