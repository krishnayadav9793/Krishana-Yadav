export const getCodeForces = async () => {
        const URL = "https://codeforces.com/api/"
        const USERNAME = "krishna_yadav_"
        let from = 1;
        let count = 10000;
        const data = await fetch(`${URL}user.status?handle=${USERNAME}&from=${from}&count=${count}`)
        const res = await data.json()
        console.log(res);
        return res

    }