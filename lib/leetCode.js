export const getLeetCode = async () => {
        const URL = "https://alfa-leetcode-api.onrender.com/";
        const USERNAME = "_krishna__yadav_";
        const data = await fetch(`${URL}${USERNAME}/profile`)
        const res = await data.json();
        // console.log(res)
        // console.log(res.totalSolved)
        // console.log(res.totalSubmissions[1])
        return res;
    }