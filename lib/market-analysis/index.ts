import { normalizeText, extractKeywords } from "../data-cleaning";
import googleTrends from "google-trends-api";

// 1. Hacker News
export async function fetchHackerNewsDiscussions(idea: string) {
    try {
        const keywords = extractKeywords(idea, 2).join(" ");
        const searchInput = keywords || idea;
        const res = await fetch(`http://hn.algolia.com/api/v1/search?query=${encodeURIComponent(searchInput)}&tags=story&hitsPerPage=10`);
        const data = await res.json();

        return data.hits.map((hit: any) => ({
            id: hit.objectID,
            title: hit.title,
            score: hit.points,
            comments: hit.num_comments,
            url: hit.url,
            author: hit.author,
            keywords: extractKeywords(hit.title, 3)
        }));
    } catch (e) {
        console.error("HN Fetch Error", e);
        return [];
    }
}

// 2. PyTrends (Google Trends)
export async function fetchGoogleTrends(idea: string) {
    try {
        const keywords = extractKeywords(idea, 1);
        if (keywords.length === 0) return { search_demand: 50, trend_growth: 10 };

        const res = await googleTrends.interestOverTime({ keyword: keywords[0], startTime: new Date(Date.now() - (365 * 24 * 60 * 60 * 1000)) });
        const data = JSON.parse(res);

        const timeline = data.default.timelineData;
        if (!timeline || timeline.length === 0) return { search_demand: 10, trend_growth: 0 };

        const latest = timeline[timeline.length - 1].value[0];
        const oldest = timeline[0].value[0];

        const growth = oldest === 0 ? 100 : ((latest - oldest) / oldest) * 100;

        return {
            search_demand: latest,
            trend_growth: growth
        };
    } catch (e) {
        console.error("Google Trends Error", e);
        return { search_demand: 40, trend_growth: 5 }; // Fallback
    }
}

// 3. Product Hunt
export async function fetchProductHunt(idea: string, token: string) {
    if (!token) return [];
    try {
        const keywords = extractKeywords(idea, 2).join(' ');
        const searchInput = keywords || idea;
        const query = `
          query {
            posts(search: "${searchInput}", first: 5) {
              edges {
                node {
                  name
                  tagline
                  url
                  votesCount
                  description
                  createdAt
                }
              }
            }
          }
        `;

        const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ query })
        });
        const data = await response.json();
        const posts = data.data?.posts?.edges?.map((edge: any) => edge.node) || [];

        return posts.map((p: any) => ({
            id: p.url,
            product_name: p.name,
            description: p.tagline + " " + (p.description || ""),
            popularity_score: p.votesCount,
            launch_date: p.createdAt
        }));
    } catch (e) {
        console.error("Product Hunt Error", e);
        return [];
    }
}

// 4. SerpAPI
export async function fetchSerpAPI(idea: string, token: string) {
    if (!token) return [];
    try {
        const keywords = extractKeywords(idea, 2).join(' ');
        const searchInput = keywords || idea;
        const query = encodeURIComponent(`"best ${searchInput}" OR "${searchInput} tools" OR "${searchInput} startups"`);
        const res = await fetch(`https://serpapi.com/search.json?q=${query}&engine=google&api_key=${token}`);
        const data = await res.json();

        if (!data.organic_results) return [];

        return data.organic_results.slice(0, 5).map((result: any) => ({
            title: result.title,
            snippet: result.snippet,
            domain: result.domain || result.link
        }));
    } catch (e) {
        console.error("SerpAPI Error", e);
        return [];
    }
}
