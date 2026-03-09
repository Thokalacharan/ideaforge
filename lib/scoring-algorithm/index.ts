export interface MarketMetrics {
    search_demand: number; // 0-100
    trend_growth: number; // Growth percentage
    discussion_volume: number; // Raw count
    competitor_count: number; // Raw count
    average_competitor_popularity?: number;
}

export function calculateStartupScore(metrics: MarketMetrics): number {
    // Normalize all metrics between 0 and 1
    const search_score = Math.min(100, Math.max(0, metrics.search_demand)) / 100;

    // Trend growth: clamp between 0 and 100%
    const trend_score = Math.min(100, Math.max(0, metrics.trend_growth)) / 100;

    // Discussion volume: max out at 200 discussions
    const discussion_score = Math.min(200, metrics.discussion_volume) / 200;

    // Competitor count: cap at 50
    const competitor_score = Math.min(50, metrics.competitor_count) / 50;

    // Final calculation based on formula
    const rawScore =
        0.35 * search_score +
        0.25 * trend_score +
        0.20 * discussion_score +
        0.20 * (1 - competitor_score);

    // Convert 0-1 to 0-100 and round
    return Math.round(Math.max(0, Math.min(1, rawScore)) * 100);
}
