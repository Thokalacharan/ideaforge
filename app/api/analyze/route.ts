import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Helper to fetch from Product Hunt GraphQL API
async function searchProductHunt(idea: string, token: string) {
    try {
        // Generate a simple keyword from the idea to search PH
        // In a production app, you might use an LLM or NLP to extract exact keywords
        // Here we'll just use the first few significant words of the idea
        const words = idea.split(' ').filter(w => w.length > 3);
        const searchQuery = words.slice(0, 3).join(' ');

        const query = `
      query {
        posts(search: "${searchQuery}", first: 5) {
          edges {
            node {
              name
              tagline
              url
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

        if (data.errors) {
            console.error('Product Hunt API Error:', data.errors);
            return [];
        }

        const posts = data.data?.posts?.edges?.map((edge: any) => edge.node) || [];
        return posts.map((p: any) => `${p.name} - ${p.tagline} (${p.url})`);
    } catch (error) {
        console.error('Failed to search Product Hunt:', error);
        return [];
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { idea } = body;

        if (!idea || typeof idea !== 'string' || idea.trim() === '') {
            return NextResponse.json(
                { error: 'A valid startup idea is required.' },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'Gemini API key is missing. Please set GEMINI_API_KEY in your environment variables.' },
                { status: 500 }
            );
        }

        let productHuntContext = "";

        // Only attempt Product Hunt search if token is available
        if (process.env.PRODUCTHUNT_TOKEN) {
            const phProducts = await searchProductHunt(idea, process.env.PRODUCTHUNT_TOKEN);
            if (phProducts.length > 0) {
                productHuntContext = `
                Note: Here are some existing real-world products from Product Hunt that might be similar or related to this idea:
                ${phProducts.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

                Please take these into account when generating the "competitors" section, and assess how the proposed idea compares to them. Return these specific products if they are relevant competitors.
                `;
            }
        }

        // Initialize the Gemini client
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
      You are an elite startup consultant, venture capitalist, and market analyst.
      Analyze the following startup idea practically and critically, focusing on real-world viability.

      Startup Idea: "${idea}"
      ${productHuntContext}

      Respond STRICTLY with a JSON object matching this exact structure:
      {
        "startupScore": number, // A realistic score from 0 to 100 assessing overall viability
        "marketOpportunity": "string", // A 2-3 sentence analysis of the market size and gap
        "targetCustomers": ["string", "string"], // 3-4 specific user personas or demographics
        "competitors": [
          {
            "name": "string", // Competitor name (use real Product Hunt data if provided and relevant)
            "tagline": "string", // Short description of what they do
            "positioning": "string", // Business model/positioning (e.g., "Enterprise B2B", "Consumer B2C", "SaaS", "Freemium")
            "url": "string" // Competitor URL (if from Product Hunt data, otherwise leave empty or guess)
          }
        ],
        "risks": ["string", "string"], // 3-4 significant business, technical, or market risks
        "suggestions": ["string", "string"] // 3-4 actionable steps for the founder to improve or pivot the idea
      }
    `;

        // Configure for JSON output
        const generationConfig = {
            responseMimeType: "application/json",
            temperature: 0.7,
        };

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig,
        });

        const resultText = result.response.text();

        if (!resultText) {
            throw new Error('Failed to generate analysis from Gemini.');
        }

        // Parse the strict JSON response
        const analysisResult = JSON.parse(resultText);

        return NextResponse.json(analysisResult, { status: 200 });
    } catch (error: any) {
        console.error('API Error details:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong while analyzing market signals.' },
            { status: 500 }
        );
    }
}
