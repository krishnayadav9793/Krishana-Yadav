import React from 'react'
// import dotenv from "dotenv";
// dotenv.config();
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
    const getCodeForces = async ()=>{
        const URL ="https://codeforces.com/api/"
        const USERNAME = "krishna_yadav_"
        let from =1;
        let count=10000;
        const data = fetch(`${URL}user.status?handle=${USERNAME}&from=${from}&count=${count}`)
        const res = await data.json()
        console.log(res)
    }
    return (
        <div>
            <button onClick={getLeetCode}>get leetcode data</button>
            <button onClick={getCodeForces}>get codeforces data</button>
        </div>
    )
}

export default DSAScreen
