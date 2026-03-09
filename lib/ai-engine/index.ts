import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateAIAnalysis(
    idea: string,
    marketData: {
        searchDemand: number;
        trendGrowth: number;
        discussionKeywords: string[];
        competitors: any[];
        marketSaturationScore: number; // Derived from competitor_score
        startupScore: number;
    },
    token: string
) {
    if (!token) throw new Error("Gemini API key is missing.");

    const genAI = new GoogleGenerativeAI(token);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      Analyze this startup idea using the following real market data.
      
      Inputs:
      - Startup idea: "${idea}"
      - Search demand score: ${marketData.searchDemand}/100
      - Trend growth rate: ${marketData.trendGrowth}%
      - Discussion keywords: ${marketData.discussionKeywords.join(", ")}
      - Competitors detected: ${marketData.competitors.length} 
      - Competitor details: ${JSON.stringify(marketData.competitors)}
      - Market saturation score: ${marketData.marketSaturationScore.toFixed(2)} / 1.00 (higher means more saturated)
      - Final Computed Startup Viability Score: ${marketData.startupScore}/100
      
      Generate structured outputs exactly matching this JSON format:
      {
        "startupScore": ${marketData.startupScore},
        "customerDiscussionsSummary": "2-3 sentences summarizing what customers are discussing about this problem space based on the keywords and trend.",
        "marketInsights": "Detailed insight into the market opportunity based on search demand and growth.",
        "competitorsAnalysis": [
            {
               "name": "string",
               "tagline": "string",
               "positioning": "string",
               "url": "string"
            }
        ],
        "targetAudience": ["string", "string"], // 3-4 specific user personas
        "mvpFeatures": [
            {
                "feature": "string",
                "description": "string",
                "priority": "High" | "Medium" | "Low"
            }
        ],
        "recommendedTechStack": {
            "frontend": ["string"],
            "backend": ["string"],
            "database": ["string"],
            "infrastructure": ["string"]
        },
        "growthStrategy": ["string", "string"], // 3-4 actionable steps
        "pitchDeck": [
            { "title": "Slide 1 - Problem", "content": "string" },
            { "title": "Slide 2 - Solution", "content": "string" },
            { "title": "Slide 3 - Market Opportunity", "content": "string" },
            { "title": "Slide 4 - Product Features", "content": "string" },
            { "title": "Slide 5 - Competitor Landscape", "content": "string" },
            { "title": "Slide 6 - Business Model", "content": "string" },
            { "title": "Slide 7 - Go-to-Market Strategy", "content": "string" },
            { "title": "Slide 8 - Technology Stack", "content": "string" },
            { "title": "Slide 9 - Roadmap", "content": "string" }
        ],
        "risks": ["string", "string"],
        "marketGaps": [
            { "title": "string", "description": "string", "impact": "High" }
        ],
        "suggestions": ["string", "string"]
      }
    `;

    const generationConfig = {
        responseMimeType: "application/json",
        temperature: 0.7,
    };

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
    });

    const resultText = result.response.text();
    return JSON.parse(resultText);
}
