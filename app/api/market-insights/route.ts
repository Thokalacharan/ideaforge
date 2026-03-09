import { NextResponse } from 'next/server';
import { fetchGoogleTrends } from '@/lib/market-analysis';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const idea = searchParams.get('idea');

    if (!idea) {
        return NextResponse.json({ error: 'Missing idea parameter' }, { status: 400 });
    }

    try {
        const insights = await fetchGoogleTrends(idea);
        return NextResponse.json({ insights }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
