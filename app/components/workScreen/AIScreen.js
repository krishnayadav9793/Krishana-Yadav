import { HoverEffect } from '@/components/ui/card-hover-effect';
import React from 'react'
import BG from './BG';
function AIScreen() {
  return (
    <div>
      {projects.length===0?<BG/>:<HoverEffect items={projects}/>}
    </div>
  )
}
const projects =[];
export default AIScreen
