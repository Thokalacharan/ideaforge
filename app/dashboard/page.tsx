"use client";

import { useState, useEffect } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StartupScoreGauge } from "@/components/charts/startup-score-gauge";
import { TrendLineChart } from "@/components/charts/trend-line-chart";
import { CircularProgress } from "@/components/ui/progress";
import {
    startupScore,
    searchTrendData,
    competitors,
    customerDiscussions,
    marketOpportunity,
    successPredictor,
} from "@/lib/mock-data";
import {
    TrendingUp,
    MessageSquare,
    Lightbulb,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    AlertCircle,
    Star,
} from "lucide-react";

export default function DashboardPage() {
    const [realCompetitors, setRealCompetitors] = useState(competitors);
    const [ideaName, setIdeaName] = useState("AI Lecture Summarizer for Students");
    const [realScore, setRealScore] = useState(startupScore.overall);
    const [trendGrowth, setTrendGrowth] = useState("+56%");
    const [discCount, setDiscCount] = useState(customerDiscussions.totalDiscussions);
    const [discussions, setDiscussions] = useState(customerDiscussions.commonComplaints);
    const [featureReqs, setFeatureReqs] = useState(customerDiscussions.featureRequests);
    const [opportunityInsight, setOpportunityInsight] = useState("Detected gaps and opportunities. Read suggestions for more info.");

    // Dynamic states replacing mock data
    const [scoreBreakdown, setScoreBreakdown] = useState(startupScore.breakdown);
    const [trendData, setTrendData] = useState(searchTrendData);
    const [oppScore, setOppScore] = useState(marketOpportunity.score);
    const [oppList, setOppList] = useState(marketOpportunity.opportunities);
    const [predictor, setPredictor] = useState(successPredictor);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('ideaforge_last_analysis');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.idea) {
                    setIdeaName(parsed.idea);
                }

                if (parsed.competitorsAnalysis && Array.isArray(parsed.competitorsAnalysis)) {
                    const colors = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
                    const mapped = parsed.competitorsAnalysis.map((c: any, index: number) => ({
                        name: c.name || "Unknown",
                        description: c.tagline || "Competitor in the space",
                        positioning: c.positioning || "Competitor",
                        logo: c.name ? c.name.substring(0, 2).toUpperCase() : "NA",
                        color: colors[index % colors.length]
                    }));
                    setRealCompetitors(mapped);
                }

                if (parsed.startupScore) {
                    const base = parsed.startupScore;
                    setRealScore(base);

                    setScoreBreakdown({
                        marketDemand: Math.min(100, base + 5),
                        competition: Math.min(100, Math.max(0, 100 - base + 20)),
                        feasibility: Math.min(100, Math.max(0, base - 5)),
                        innovation: Math.min(100, base + 12),
                        monetization: Math.min(100, base - 2),
                    });

                    setOppScore(Math.min(100, base + 8));
                    setPredictor({
                        probability: Math.max(5, base - 6),
                        breakdown: {
                            marketDemand: Math.min(100, base + 7),
                            competitionLevel: Math.max(10, 100 - base + 10),
                            executionDifficulty: Math.max(20, 110 - base),
                            innovationStrength: Math.min(100, base + 15)
                        }
                    });
                }

                if (parsed.rawMetrics) {
                    const demand = parsed.rawMetrics.search_demand || 50;
                    const growth = parsed.rawMetrics.trend_growth || 10;
                    setTrendGrowth((growth > 0 ? "+" : "") + Math.round(growth) + "%");

                    const volumeBase = demand * 150; // Scale 0-100 to realistic search volumes
                    const startRaw = growth === -100 ? 0 : volumeBase / (1 + growth / 100);
                    const start = Math.max(0, startRaw);
                    const step = (volumeBase - start) / 11;

                    const generatedTrendData = Array.from({ length: 12 }).map((_, i) => ({
                        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
                        searches: Math.round(start + step * i),
                        growth: Math.round(growth > 0 ? (growth / 11) * i : (growth / 11) * (11 - i))
                    }));
                    setTrendData(generatedTrendData);
                }

                if (parsed.rawDiscussions && Array.isArray(parsed.rawDiscussions)) {
                    setDiscCount(parsed.rawDiscussions.reduce((acc: number, d: any) => acc + (d.comments || 0), 0) || parsed.rawDiscussions.length * 5);
                    const complaints = parsed.rawDiscussions.slice(0, 3).map((d: any) => d.title);
                    const requests = parsed.rawDiscussions.slice(3, 6).map((d: any) => d.title);
                    if (complaints.length > 0) setDiscussions(complaints);
                    if (requests.length > 0) setFeatureReqs(requests);
                }

                if (parsed.marketInsights) {
                    setOpportunityInsight(parsed.marketInsights);
                }

                if (parsed.marketGaps && Array.isArray(parsed.marketGaps)) {
                    setOppList(parsed.marketGaps.map((gap: any) => ({
                        title: gap.title,
                        description: gap.description,
                        impact: gap.impact as "High" | "Medium" | "Low"
                    })));
                } else if (parsed.suggestions && Array.isArray(parsed.suggestions)) {
                    const mappedOpps = parsed.suggestions.slice(0, 3).map((s: string, i: number) => ({
                        title: i === 0 ? "Primary Recommendation" : i === 1 ? "Market Strategy" : "Growth Tactic",
                        description: s,
                        impact: (i === 0 ? "High" : i === 1 ? "High" : "Medium") as "High" | "Medium" | "Low"
                    }));
                    if (mappedOpps.length > 0) {
                        setOppList(mappedOpps);
                    }
                }
            }
        } catch (e) {
            console.error("Failed to read from localStorage", e);
        }
    }, []);

    const predictorMetrics = [
        { label: "Market Demand", value: predictor.breakdown.marketDemand, color: "#8b5cf6" },
        { label: "Competition Level", value: predictor.breakdown.competitionLevel, color: "#3b82f6" },
        { label: "Execution Difficulty", value: predictor.breakdown.executionDifficulty, color: "#f59e0b" },
        { label: "Innovation Strength", value: predictor.breakdown.innovationStrength, color: "#10b981" },
    ];

    return (
        <DashboardLayout>
            {/* Page header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">Startup Dashboard</h1>
                <p className="text-[var(--color-text-secondary)]">
                    {ideaName} — Full analysis report
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Startup Score */}
                <div className="lg:col-span-4">
                    <Card hover className="h-full">
                        <CardHeader title="Startup Score" subtitle="Overall viability assessment" />
                        <StartupScoreGauge score={realScore} breakdown={scoreBreakdown} />
                    </Card>
                </div>

                {/* Market Demand */}
                <div className="lg:col-span-8">
                    <Card hover className="h-full">
                        <CardHeader
                            title="Market Demand"
                            subtitle="Search trend growth over 12 months"
                            action={
                                <Badge variant="success">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    {trendGrowth} YoY
                                </Badge>
                            }
                        />
                        <TrendLineChart data={trendData} />
                    </Card>
                </div>

                {/* Competitor Analysis */}
                <div className="lg:col-span-6">
                    <Card hover>
                        <CardHeader title="Competitor Analysis" subtitle="Top competitors in the space" />
                        <div className="space-y-4">
                            {realCompetitors.map((comp, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-surface-secondary)] hover:bg-[var(--color-surface-tertiary)] transition-colors"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                                        style={{ backgroundColor: comp.color }}
                                    >
                                        {comp.logo}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm">{comp.name}</div>
                                        <div className="text-xs text-[var(--color-text-muted)] truncate">
                                            {comp.description}
                                        </div>
                                    </div>
                                    <Badge variant="purple" size="sm">
                                        {comp.positioning}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Customer Discussions */}
                <div className="lg:col-span-6">
                    <Card hover>
                        <CardHeader
                            title="Customer Discussions"
                            subtitle="Insights from community feedback"
                            action={
                                <Badge variant="info">
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    {discCount} discussions
                                </Badge>
                            }
                        />

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-red-500 mb-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Common Complaints
                                </div>
                                <div className="space-y-2">
                                    {discussions.slice(0, 3).map((complaint: string, i: number) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] p-2 rounded-lg bg-red-500/5"
                                        >
                                            <ArrowDownRight className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                            {complaint}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-emerald-500 mb-2">
                                    <Star className="w-4 h-4" />
                                    Feature Requests
                                </div>
                                <div className="space-y-2">
                                    {featureReqs.slice(0, 3).map((req: string, i: number) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] p-2 rounded-lg bg-emerald-500/5"
                                        >
                                            <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            {req}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Market Opportunity */}
                <div className="lg:col-span-5">
                    <Card hover>
                        <CardHeader title="Market Opportunity Detector" subtitle="Detected gaps and opportunities" />

                        <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                            {opportunityInsight}
                        </div>

                        <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10">
                            <div className="text-4xl font-bold gradient-text">{oppScore}</div>
                            <div>
                                <div className="text-sm font-medium">Opportunity Score</div>
                                <div className="text-xs text-[var(--color-text-muted)]">out of 100</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {oppList.map((opp, i) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-xl border border-[var(--color-border)] hover:border-primary-500/30 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <Lightbulb className="w-4 h-4 text-amber-500" />
                                            <span className="text-sm font-medium">{opp.title}</span>
                                        </div>
                                        <Badge
                                            variant={opp.impact === "High" ? "success" : "warning"}
                                            size="sm"
                                        >
                                            {opp.impact}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-[var(--color-text-muted)] ml-6">{opp.description}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Success Predictor */}
                <div className="lg:col-span-7">
                    <Card hover>
                        <CardHeader
                            title="Startup Success Predictor"
                            subtitle="AI-predicted probability of success"
                            action={
                                <Badge variant="success">
                                    <Target className="w-3 h-3 mr-1" />
                                    Above Average
                                </Badge>
                            }
                        />

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <CircularProgress value={predictor.probability} size={160} strokeWidth={10}>
                                <div className="text-center">
                                    <div className="text-4xl font-bold gradient-text">{predictor.probability}%</div>
                                    <div className="text-xs text-[var(--color-text-muted)]">Success Rate</div>
                                </div>
                            </CircularProgress>

                            <div className="flex-1 w-full space-y-4">
                                {predictorMetrics.map((metric) => (
                                    <div key={metric.label}>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-[var(--color-text-secondary)]">{metric.label}</span>
                                            <span className="font-medium">{metric.value}%</span>
                                        </div>
                                        <div className="h-2.5 rounded-full bg-[var(--color-surface-tertiary)] overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
