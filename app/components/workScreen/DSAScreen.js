import React from 'react'
// import dotenv from "dotenv";
// dotenv.config();
import ExpandableCardDemo from '@/components/expandable-card-demo-grid';
import { Menu } from "../../../components/ui/navbar-menu";
import { AnimatedTooltipPreview } from './Platforms';
function DSAScreen() {
    
    
    
    const getCodeChef = async () => {

    }
    return (
        <div className='flex flex-col justify-center items-center gap-5'>
            <div className="w-fit p-7 rounded-md dark:bg-black bg-neutral-200 border-2 border-grey flex justify-center items-center border-b-4 border-b-blue-800">
                 <AnimatedTooltipPreview />
            </div>
               
            
            <div className='w-screen'>
                <ExpandableCardDemo/>
            </div>
        </div>

    )
}

export default DSAScreen
