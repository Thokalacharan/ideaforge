"use client";

import { useState, useEffect } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendLineChart } from "@/components/charts/trend-line-chart";
import { CompetitorBarChart } from "@/components/charts/competitor-bar-chart";
import { MarketAreaChart } from "@/components/charts/market-area-chart";
import { OpportunityRadialChart } from "@/components/charts/opportunity-radial-chart";
import {
    searchTrendData,
    competitorDensityData,
    marketSaturationData,
    marketOpportunity,
} from "@/lib/mock-data";
import { TrendingUp, BarChart3, Layers, Target } from "lucide-react";

export default function InsightsPage() {
    const [trendData, setTrendData] = useState(searchTrendData);
    const [compDensity, setCompDensity] = useState(competitorDensityData);
    const [marketSat, setMarketSat] = useState(marketSaturationData);
    const [opportunityScore, setOpportunityScore] = useState(marketOpportunity.score);
    const [ideaTitle, setIdeaTitle] = useState("Startup Idea");
    const [growthLabel, setGrowthLabel] = useState("Growing");

    useEffect(() => {
        try {
            const stored = localStorage.getItem('ideaforge_last_analysis');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.idea) setIdeaTitle(parsed.idea);
                if (parsed.startupScore) setOpportunityScore(parsed.startupScore);

                if (parsed.rawMetrics) {
                    const demand = parsed.rawMetrics.search_demand || 50;
                    const growth = parsed.rawMetrics.trend_growth || 10;
                    setGrowthLabel((growth > 0 ? "+" : "") + Math.round(growth) + "%");

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

                    const compCount = parsed.rawMetrics.competitors_count || 15;
                    const total = Math.max(5, compCount);
                    setCompDensity([
                        { category: "Direct", count: Math.ceil(total * 0.2), fill: "#8b5cf6" },
                        { category: "Indirect", count: Math.ceil(total * 0.4), fill: "#3b82f6" },
                        { category: "Potential", count: Math.ceil(total * 0.3), fill: "#06b6d4" },
                        { category: "Adjacent", count: Math.ceil(total * 0.1), fill: "#10b981" },
                    ]);
                }

                const score = parsed.startupScore || 50;
                const satLevel = 100 - score;
                setMarketSat(Array.from({ length: 12 }).map((_, i) => ({
                    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
                    saturation: Math.round(Math.max(0, Math.min(100, satLevel + Math.sin(i) * 8))),
                    opportunity: Math.round(Math.max(0, Math.min(100, score - Math.sin(i) * 8)))
                })));
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                    Market <span className="gradient-text">Insights</span>
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                    Real-time market signal analysis for "{ideaTitle}"
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Search Demand Trends */}
                <Card hover className="lg:col-span-2">
                    <CardHeader
                        title="Search Demand & Growth"
                        subtitle="Detailed search volume vs growth percentage over 12 months"
                        action={
                            <div className="flex items-center gap-2">
                                <Badge variant="success">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    {growthLabel}
                                </Badge>
                            </div>
                        }
                    />
                    <TrendLineChart data={trendData} />
                    <div className="mt-4 flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-0.5 bg-[#8b5cf6] rounded" /> Search Volume
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-0.5 bg-[#3b82f6] rounded border-dashed" /> Growth Rate
                        </div>
                    </div>
                </Card>

                {/* Competitor Density */}
                <Card hover>
                    <CardHeader
                        title="Competitor Market Share"
                        subtitle="Distribution of competitors by brand presence"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-blue-500" />
                            </div>
                        }
                    />
                    <CompetitorBarChart data={compDensity} />
                </Card>

                {/* Opportunity Score */}
                <Card hover>
                    <CardHeader
                        title="Opportunity Score"
                        subtitle="Overall market opportunity rating"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Target className="w-5 h-5 text-purple-500" />
                            </div>
                        }
                    />
                    <OpportunityRadialChart score={opportunityScore} label="Opportunity" />
                </Card>

                {/* Market Saturation */}
                <Card hover className="lg:col-span-2">
                    <CardHeader
                        title="Market Saturation vs Opportunity"
                        subtitle="Dynamic gap indexing between current saturation and future scalability"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                <Layers className="w-5 h-5 text-cyan-500" />
                            </div>
                        }
                    />
                    <MarketAreaChart data={marketSat} />
                    <div className="mt-4 flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-[#8b5cf6]/30" /> Saturation
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-[#3b82f6]/30" /> Opportunity
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
