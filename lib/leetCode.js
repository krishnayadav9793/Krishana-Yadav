"use client"


export const getLeetCode = async () => {
    const URL = "https://alfa-leetcode-api.onrender.com/";
    const USERNAME = "_krishna__yadav_";
    const data = await fetch(`${URL}${USERNAME}/profile`)
    const res = await data.json();

    try {
        const response = await fetch("/api/getleetcoderating",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ username: USERNAME })
            }
        )
        const data = await response.json();
        // console.log(data)
        res.rating = data?.rating
    } catch (e) {
        console.log(`Error from leetcode.js`)
    }
    return res;
}