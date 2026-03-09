# IDEAFORGE AI - Startup Validation Engine

IDEAFORGE AI is a full-stack SaaS platform that helps entrepreneurs validate startup ideas using real-time market signals and AI analysis.

## Features
- **Real-Time Data Pipeline**: Integrates with Hacker News, Product Hunt, Google Trends, and SerpAPI.
- **AI Idea Analysis**: Uses Google Gemini Pro to generate comprehensive startup blueprints.
- **Dynamic Dashboard**: Visualize market demand, competitor density, and success probability.
- **Startup Blueprint**: Automated generation of target audience, MVP features, and tech stack recommendations.
- **Pitch Deck**: AI-generated structured pitch slides for investors.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Google Generative AI (Gemini)
- **Charts**: Recharts
- **Data APIs**: 
  - Hacker News (Algolia Search)
  - Google Trends (google-trends-api)
  - Product Hunt (GraphQL API)
  - SerpAPI (Google Search)

## Getting Started

### Prerequisites
- Node.js 18+
- NPM or Bun

### Environment Variables
Create a `.env.local` file in the root directory and add:
```env
GEMINI_API_KEY=your_gemini_api_key
PRODUCTHUNT_TOKEN=your_product_hunt_token
SERPAPI_KEY=your_serpapi_key
```

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
Open [https://localhost:8000](https://localhost:8000) to view the application.

## Project Structure
- `app/`: Next.js pages and API routes
- `components/`: Reusable UI and chart components
- `lib/`: Core logic for data cleaning, AI orchestration, and market analysis
- `public/`: Static assets
