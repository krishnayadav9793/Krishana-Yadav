import React from 'react'
// import dotenv from "dotenv";
// dotenv.config();
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import { AnimatedTooltipPreview } from './Platforms';
function DSAScreen() {
    const getLeetCode = async () => {
        const URL = "https://alfa-leetcode-api.onrender.com/";
        const USERNAME = "_krishna__yadav_";
        const data = await fetch(`${URL}${USERNAME}/profile`)
        const res = await data.json();
        console.log(res)
        console.log(res.totalSolved)
        console.log(res.totalSubmissions[1])
    }
    const rating = { 800: 0, 900: 0, 1000: 0, 1100: 0, 1200: 0, 1300: 0, 1400: 0, 1500: 0, 1600: 0, 1700: 0, 1800: 0, 1900: 0, 2000: 0 }
    const printFun = (res) => {
        let ans = 0
        res.result.forEach(element => {
            // console.log("hiii")
            if (element.verdict === "OK" && element.problem.rating) rating[element.problem.rating]++;
        });
        console.log(rating);
        const box = document.getElementById("codeforce")
        const label=[],color=[],value=[]
        for(let i=800;i<=2000;i+=100){
            if(rating[i]){
                label.push(i);
                value.push(rating[i])
            }
        }
        const data = {
            labels: label,
            datasets: [{
                label: "Codeforces",
                data: value,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        };
        const chart = new ChartJS(box, {
            type: 'bar',
            data: data,
           
        });
        console.log(chart)

    }
    const getCodeForces = async () => {
        const URL = "https://codeforces.com/api/"
        const USERNAME = "krishna_yadav_"
        let from = 1;
        let count = 10000;
        const data = await fetch(`${URL}user.status?handle=${USERNAME}&from=${from}&count=${count}`)
        const res = await data.json()
        // console.log(res);
        printFun(res)

    }
    const getCodeChef = async () => {

    }
    return (
        <div>
            <div>
                <AnimatedTooltipPreview />
            </div>
            <div className='flex flex-col'>
                <canvas id="codeforce"><p>codeforce</p></canvas>
                <canvas id="codechef"></canvas>
                <button onClick={getCodeForces}>getCodeForces</button>
            </div>
        </div>

    )
}

export default DSAScreen
