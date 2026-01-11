"use client";
import React from "react";
import { AnimatedTooltip } from "../../../components/ui/animated-tooltip";
// import codeforces from "../../../public/assets/image.png"

const people = [
    {
        id: 1,
        name: "Codechef",
        image: "https://cdn.brandfetch.io/idM2-b7Taf/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
        href: "https://www.codechef.com/users/the_coder97"
    },
    {
        id: 2,
        name: "Codeforces",
        image: "https://scontent.fvns1-1.fna.fbcdn.net/v/t39.30808-6/271102688_4949757445046078_2415031066549490395_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ZY4JYf21UkAQ7kNvwEgzU7i&_nc_oc=Adke-DMXe_ZeUKx0IXll9AZAvtZjzaXA4DIcIx5nI4HxSJLweDjQ9T7KuBCT1Bi69dpGXzCSv1sSe3xiLbJzw2xR&_nc_zt=23&_nc_ht=scontent.fvns1-1.fna&_nc_gid=HgXGbtCbqDqUolFCcadtLQ&oh=00_Afm_F8IE5jhShfA8QxRszhBPchhvx65AZRtYUZ7srVRE7Q&oe=6952E173",
        href: "https://codeforces.com/profile/krishna_yadav_"
    },
    {
        id: 3,
        name: "Leetcode",
        // designation: "Data Scientist",
        image: "https://cdn-1.webcatalog.io/catalog/leetcode/leetcode-social-preview.png?v=1714774949349",
        href: "https://leetcode.com/u/_krishna__yadav_/"
    }, 
    {
        id:4,
        name:"Atcoder",
        image:"https://velog.velcdn.com/images/harryyangkr/post/5e8f17f5-ff65-4084-8cdb-644cdc7b6b29/image.png",
        href:"https://atcoder.jp/users/krishna__yadav_"
    },
    {
        id:5,
        name:"Geeks for Geeks",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA4exfK9w9g_rL_0M-REN0UYKkEhSSDadugw&s",
        href:"https://www.geeksforgeeks.org/profile/krishnayadav9793"
    },
    {
        id:6,
        name:"Hacker rank",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjah62RXXXxaUXaQzO7RhjqGU6JuHbttZAwg&s",
        href:"https://www.hackerrank.com/profile/karanyadav21398"
    }

];

export function AnimatedTooltipPreview() {
    return (
        <div className="flex flex-row items-center justify-center mt-10 ml-5 mr-5 w-full ">
            <AnimatedTooltip items={people} />
            
        </div>
    );
}
