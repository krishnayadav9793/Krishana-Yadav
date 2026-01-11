"use client";
import React, { useState } from "react";
import { Menu } from "../../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Landing from "./workScreen/Landing";
import WebScreen from "./workScreen/WebScreen";
import AppScreen from './workScreen/AppScreen.js'
import AIScreen from "./workScreen/AIScreen";
import DSAScreen from "./workScreen/DSAScreen";
export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center mb-3">
      <Navbar />
    </div>
  );
}

function Navbar({
  className
}) {
  const [Screens, setScreens] = useState(Landing)
  return (
    <div>
      <div
        className={cn(`sticky mt-10 inset-x-0 max-w-2xl mx-auto z-50`, className,'w-fit mb-2')}>
        <Menu className="w-fit">
          <button onClick={()=>setScreens(WebScreen)}> Web development</button>
          <button onClick={()=>setScreens(AppScreen)}> App development</button>
          <button onClick={()=>setScreens(DSAScreen)}> DSA </button>
          <button onClick={()=>setScreens(AIScreen)}> AI/ML</button>
        </Menu>
      </div>
      <div className="flex justify-center items-center min-h-[80vh]">{Screens}</div>
    </div>

  );
}
