import { NextResponse } from 'next/server';
import { fetchHackerNewsDiscussions, fetchGoogleTrends, fetchProductHunt, fetchSerpAPI } from '@/lib/market-analysis';
import { calculateStartupScore } from '@/lib/scoring-algorithm';
import { generateAIAnalysis } from '@/lib/ai-engine';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { idea } = body;

        if (!idea || typeof idea !== 'string' || idea.trim() === '') {
            return NextResponse.json({ error: 'A valid startup idea is required.' }, { status: 400 });
        }

        const geminiToken = process.env.GEMINI_API_KEY;
        const phToken = process.env.PRODUCTHUNT_TOKEN || "";
        const serpToken = process.env.SERPAPI_KEY || "";

        if (!geminiToken) {
            return NextResponse.json({ error: 'Gemini API key is missing.' }, { status: 500 });
        }

        // 1. Fetch data in parallel
        const [hnDiscussions, trendsData, phCompetitors, serpResults] = await Promise.all([
            fetchHackerNewsDiscussions(idea),
            fetchGoogleTrends(idea),
            fetchProductHunt(idea, phToken),
            fetchSerpAPI(idea, serpToken)
        ]);

        // 2. Aggregate competitors from PH and Serp
        const competitors = [...phCompetitors, ...serpResults.map((s: any) => ({
            name: s.title,
            tagline: s.snippet,
            url: s.domain
        }))].slice(0, 10);

        // 3. Aggregate discussion keywords
        const discussionKeywords = Array.from(new Set(hnDiscussions.flatMap((d: any) => d.keywords))) as string[];
        const discussionKeywordsSliced = discussionKeywords.slice(0, 20);

        // 4. Calculate Score
        const metrics = {
            search_demand: trendsData.search_demand,
            trend_growth: trendsData.trend_growth,
            discussion_volume: hnDiscussions.reduce((acc: number, d: any) => acc + (d.comments || 0), 0) || (hnDiscussions.length * 5),
            competitor_count: competitors.length
        };
        const startupScore = calculateStartupScore(metrics);
        const marketSaturationScore = Math.min(1, competitors.length / 50);

        // 5. Generate Mega AI JSON Phase
        const aiData = await generateAIAnalysis(idea, {
            searchDemand: metrics.search_demand,
            trendGrowth: metrics.trend_growth,
            discussionKeywords,
            competitors,
            marketSaturationScore,
            startupScore
        }, geminiToken);

        // Return the orchestrated payload combining AI data and raw fetched data
        return NextResponse.json({
            idea,
            ...aiData,
            rawMetrics: metrics,
            rawDiscussions: hnDiscussions
        }, { status: 200 });

    } catch (error: any) {
        console.error('API Error details:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong while orchestrating data.' },
            { status: 500 }
        );
    }
}
