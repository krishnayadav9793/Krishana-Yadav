import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
    const { username } = await req.json();
    const url = "https://leetcode.com/graphql";

    const payload = {
        query: `
            query userContestRankingInfo($username: String!) {
                userContestRanking(username: $username) {
                    rating
                    globalRanking
                    topPercentage
                }
                userContestRankingHistory(username: $username) {
                    attended
                    rating
                }
            }
        `,
        variables: { username: username }
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        const rankingInfo = result.data?.userContestRanking;
        const rankingHistory = result.data?.userContestRankingHistory || [];

        if (rankingInfo) {
            // Find max rating in contest history where the user attended
            const attendedHistory = rankingHistory.filter(h => h.attended && h.rating);
            const maxRatingValue = attendedHistory.length > 0 
                ? Math.max(...attendedHistory.map(h => h.rating)) 
                : rankingInfo.rating;

            return NextResponse.json({
                rating: Math.round(rankingInfo.rating),
                maxRating: Math.round(maxRatingValue),
                globalRank: rankingInfo.globalRanking,
                topPercentage: rankingInfo.topPercentage
            });
        } else {
            return NextResponse.json({ 
                error: "User has no contest history or does not exist.",
                rating: 1824, // fallback values
                maxRating: 1940
            });
        }
    } catch (error) {
        return NextResponse.json({ error: `Error fetching data: ${error.message}` });
    }
}