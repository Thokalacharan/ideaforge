import { NextResponse } from 'next/server';
import { fetchProductHunt, fetchSerpAPI } from '@/lib/market-analysis';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const idea = searchParams.get('idea');

    if (!idea) {
        return NextResponse.json({ error: 'Missing idea parameter' }, { status: 400 });
    }

    try {
        const phToken = process.env.PRODUCTHUNT_TOKEN || "";
        const serpToken = process.env.SERPAPI_KEY || "";

        const [phCompetitors, serpResults] = await Promise.all([
            fetchProductHunt(idea, phToken),
            fetchSerpAPI(idea, serpToken)
        ]);

        const competitors = [...phCompetitors, ...serpResults.map((s: any) => ({
            name: s.title,
            tagline: s.snippet,
            url: s.domain
        }))].slice(0, 10);

        return NextResponse.json({ competitors }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
