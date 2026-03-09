import { NextResponse } from 'next/server';
import { fetchHackerNewsDiscussions } from '@/lib/market-analysis';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const idea = searchParams.get('idea');

    if (!idea) {
        return NextResponse.json({ error: 'Missing idea parameter' }, { status: 400 });
    }

    try {
        const discussions = await fetchHackerNewsDiscussions(idea);
        return NextResponse.json({ discussions }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
