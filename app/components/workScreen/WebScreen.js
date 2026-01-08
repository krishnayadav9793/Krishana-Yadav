import React from 'react'
import { HoverEffect } from '../../../components/ui/card-hover-effect'
import BG from './BG';
function WebScreen() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      {projects.length===0?<BG/>:<HoverEffect items={projects}/>}
    </div>
  )
}
const projects = [{
    title: "Guess the Number Game",
    description:
      "Build this while learning html css (first year project)",
    link: " https://krishnayadav9793.github.io/Guess-the-game/",
},{
  title: "BMI Calculator",
    description:
      "Build this app while learning js(API CALLING)",
    link: " https://krishnayadav9793.github.io/BMI-CALCULATOR/",
}];
export default WebScreen
