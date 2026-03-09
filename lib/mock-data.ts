// ============================================================
// MOCK DATA FOR IDEAFORGE AI
// ============================================================

export const searchTrendData = [
    { month: "Jan", searches: 2400, growth: 12 },
    { month: "Feb", searches: 3200, growth: 18 },
    { month: "Mar", searches: 2800, growth: 15 },
    { month: "Apr", searches: 4100, growth: 24 },
    { month: "May", searches: 4800, growth: 28 },
    { month: "Jun", searches: 5200, growth: 32 },
    { month: "Jul", searches: 5800, growth: 36 },
    { month: "Aug", searches: 6400, growth: 41 },
    { month: "Sep", searches: 7100, growth: 45 },
    { month: "Oct", searches: 7800, growth: 48 },
    { month: "Nov", searches: 8500, growth: 52 },
    { month: "Dec", searches: 9200, growth: 56 },
];

export const competitorDensityData = [
    { category: "Direct", count: 8, fill: "#8b5cf6" },
    { category: "Indirect", count: 15, fill: "#3b82f6" },
    { category: "Potential", count: 22, fill: "#06b6d4" },
    { category: "Adjacent", count: 12, fill: "#10b981" },
];

export const marketSaturationData = [
    { month: "Jan", saturation: 32, opportunity: 68 },
    { month: "Feb", saturation: 35, opportunity: 65 },
    { month: "Mar", saturation: 38, opportunity: 62 },
    { month: "Apr", saturation: 34, opportunity: 66 },
    { month: "May", saturation: 40, opportunity: 60 },
    { month: "Jun", saturation: 42, opportunity: 58 },
    { month: "Jul", saturation: 39, opportunity: 61 },
    { month: "Aug", saturation: 44, opportunity: 56 },
    { month: "Sep", saturation: 46, opportunity: 54 },
    { month: "Oct", saturation: 43, opportunity: 57 },
    { month: "Nov", saturation: 48, opportunity: 52 },
    { month: "Dec", saturation: 45, opportunity: 55 },
];

export const startupScore = {
    overall: 78,
    breakdown: {
        marketDemand: 85,
        competition: 62,
        feasibility: 79,
        innovation: 88,
        monetization: 74,
    },
};

export const competitors = [
    {
        name: "EduSynth AI",
        description: "AI-powered lecture summarization for universities",
        positioning: "Enterprise B2B",
        logo: "ES",
        color: "#8b5cf6",
    },
    {
        name: "NoteGenius",
        description: "Smart note-taking with AI summaries",
        positioning: "Consumer B2C",
        logo: "NG",
        color: "#3b82f6",
    },
    {
        name: "StudyMind",
        description: "AI study assistant with flashcard generation",
        positioning: "Freemium",
        logo: "SM",
        color: "#10b981",
    },
    {
        name: "LectureBot",
        description: "Automated lecture transcription and summaries",
        positioning: "SaaS",
        logo: "LB",
        color: "#f59e0b",
    },
];

export const customerDiscussions = {
    totalDiscussions: 1247,
    commonComplaints: [
        "Existing tools miss key concepts from lectures",
        "Summaries lack context and are too brief",
        "No integration with university LMS platforms",
        "Pricing too high for student budgets",
    ],
    featureRequests: [
        "Real-time lecture summarization",
        "Multi-language support",
        "Integration with Zoom and Google Meet",
        "Collaborative study notes",
        "Quiz generation from lectures",
    ],
};

export const marketOpportunity = {
    score: 82,
    opportunities: [
        {
            title: "Underserved: Community College Students",
            description: "Most tools target universities, ignoring community colleges",
            impact: "High",
        },
        {
            title: "Missing: Real-time Processing",
            description: "No competitor offers live lecture summarization",
            impact: "High",
        },
        {
            title: "Growing: AI Education Tools",
            description: "Search trends growing 56% year-over-year",
            impact: "Medium",
        },
        {
            title: "Gap: LMS Integration",
            description: "Canvas, Blackboard integration missing in most tools",
            impact: "High",
        },
    ],
};

export const successPredictor = {
    probability: 73,
    breakdown: {
        marketDemand: 85,
        competitionLevel: 58,
        executionDifficulty: 65,
        innovationStrength: 82,
    },
};

export const blueprintData = {
    targetAudience: [
        {
            persona: "College Student",
            ageGroup: "18-24",
            profession: "Undergraduate Student",
            painPoints: [
                "Difficulty keeping up with fast-paced lectures",
                "Time-consuming manual note revision",
                "Missing key concepts during class",
            ],
            motivations: [
                "Better grades with less effort",
                "More time for extracurriculars",
                "Accessible study materials",
            ],
        },
        {
            persona: "Graduate Researcher",
            ageGroup: "24-32",
            profession: "Masters/PhD Student",
            painPoints: [
                "Managing information from multiple seminars",
                "Cross-referencing lecture content with papers",
                "Language barriers in international programs",
            ],
            motivations: [
                "Efficient literature review",
                "Better research productivity",
                "Comprehensive knowledge retention",
            ],
        },
    ],
    mvpFeatures: [
        { feature: "Audio/Video Lecture Upload", priority: "P0", effort: "Medium" },
        { feature: "AI-Powered Summarization", priority: "P0", effort: "High" },
        { feature: "Key Concept Extraction", priority: "P0", effort: "Medium" },
        { feature: "Flashcard Auto-Generation", priority: "P1", effort: "Medium" },
        { feature: "Search & Organization", priority: "P1", effort: "Low" },
        { feature: "Export as PDF/Markdown", priority: "P1", effort: "Low" },
        { feature: "Quiz Generation", priority: "P2", effort: "High" },
        { feature: "LMS Integration", priority: "P2", effort: "High" },
    ],
    techStack: {
        frontend: ["Next.js", "React", "TailwindCSS", "TypeScript"],
        backend: ["Node.js", "Python (ML Pipeline)", "FastAPI"],
        ai: ["OpenAI Whisper (Transcription)", "GPT-4 (Summarization)", "LangChain"],
        database: ["PostgreSQL", "Redis (Cache)", "Pinecone (Vector DB)"],
    },
    monetization: {
        tiers: [
            {
                name: "Free",
                price: "$0/mo",
                features: ["5 lectures/month", "Basic summaries", "Text export"],
            },
            {
                name: "Pro",
                price: "$9.99/mo",
                features: [
                    "Unlimited lectures",
                    "Advanced AI summaries",
                    "Flashcard generation",
                    "Priority processing",
                ],
            },
            {
                name: "Team",
                price: "$29.99/mo",
                features: [
                    "Everything in Pro",
                    "Collaborative notes",
                    "LMS integration",
                    "Admin dashboard",
                    "API access",
                ],
            },
        ],
    },
    growthStrategy: {
        earlyAdopters: "Partner with 10 university student organizations for beta testing",
        marketingChannels: [
            "TikTok/Instagram student influencers",
            "Reddit (r/college, r/studytips)",
            "Product Hunt launch",
            "University Facebook groups",
        ],
        launchPlan: [
            { phase: "Alpha", timeline: "Month 1-2", goal: "100 beta users from 3 universities" },
            { phase: "Beta", timeline: "Month 3-4", goal: "1,000 users, iterate on feedback" },
            { phase: "Launch", timeline: "Month 5", goal: "Product Hunt launch, PR push" },
            { phase: "Growth", timeline: "Month 6-12", goal: "10,000 users, monetization" },
        ],
    },
};

export const savedIdeas = [
    {
        id: "1",
        title: "AI Lecture Summarizer for Students",
        score: 78,
        date: "2026-03-08",
        status: "Promising" as const,
    },
    {
        id: "2",
        title: "AI-Powered Resume Builder",
        score: 65,
        date: "2026-03-05",
        status: "Moderate" as const,
    },
    {
        id: "3",
        title: "Smart Grocery Delivery Optimizer",
        score: 82,
        date: "2026-03-01",
        status: "Promising" as const,
    },
    {
        id: "4",
        title: "AR Interior Design Platform",
        score: 91,
        date: "2026-02-28",
        status: "Excellent" as const,
    },
    {
        id: "5",
        title: "AI Health Symptom Checker",
        score: 44,
        date: "2026-02-20",
        status: "Challenging" as const,
    },
    {
        id: "6",
        title: "Blockchain Supply Chain Tracker",
        score: 57,
        date: "2026-02-15",
        status: "Moderate" as const,
    },
];

export const pitchDeckSlides = [
    {
        title: "Problem",
        content: "Students lose up to 40% of lecture content because they can't keep up with note-taking. Existing tools provide generic summaries that miss key concepts and lack context.",
        icon: "AlertTriangle",
        color: "#ef4444",
    },
    {
        title: "Solution",
        content: "An AI-powered platform that automatically converts lectures into comprehensive summaries, flashcards, and study guides — personalized to each student's learning style.",
        icon: "Lightbulb",
        color: "#8b5cf6",
    },
    {
        title: "Market Opportunity",
        content: "The global EdTech market is projected to reach $400B by 2028. AI education tools are growing at 56% YoY. Over 200M college students worldwide need better study tools.",
        icon: "TrendingUp",
        color: "#3b82f6",
    },
    {
        title: "Product",
        content: "Upload or record lectures → AI transcribes and identifies key concepts → Generates structured summaries, flashcards, and quizzes → Integrates with university LMS platforms.",
        icon: "Layers",
        color: "#10b981",
    },
    {
        title: "Business Model",
        content: "Freemium SaaS: Free tier (5 lectures/mo), Pro ($9.99/mo), Team ($29.99/mo). Target 15% free-to-paid conversion. Projected ARR: $2.4M by Year 2.",
        icon: "DollarSign",
        color: "#f59e0b",
    },
    {
        title: "Competition",
        content: "No direct competitor offers real-time lecture processing + LMS integration + AI quiz generation in one platform. Closest competitors focus on generic note-taking.",
        icon: "Shield",
        color: "#06b6d4",
    },
    {
        title: "Go-To-Market Strategy",
        content: "Phase 1: University partnerships (10 schools). Phase 2: Student influencer marketing on TikTok/Instagram. Phase 3: Product Hunt launch + PR. Target 10K users in 6 months.",
        icon: "Rocket",
        color: "#ec4899",
    },
];

export const analysisSteps = [
    { label: "Collecting market signals", duration: 1500 },
    { label: "Detecting competitors", duration: 1200 },
    { label: "Analyzing search trends", duration: 1800 },
    { label: "Scanning customer discussions", duration: 1400 },
    { label: "Generating market insights", duration: 1600 },
    { label: "Building startup blueprint", duration: 2000 },
];

export const exampleIdeas = [
    "AI platform that helps students summarize lectures automatically",
    "Smart meal planning app using AI nutrition analysis",
    "AI-powered code review tool for small dev teams",
    "Virtual interior design assistant using AR",
    "AI fitness coach with real-time form correction",
];
