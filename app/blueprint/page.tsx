"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blueprintData } from "@/lib/mock-data";
import {
    Users,
    Layers,
    Code,
    DollarSign,
    Rocket,
    CheckCircle,
    Target,
    Zap,
    ArrowRight,
} from "lucide-react";

export default function BlueprintPage() {
    const [audience, setAudience] = useState(blueprintData.targetAudience.map(t => t.persona));
    const [features, setFeatures] = useState(blueprintData.mvpFeatures);
    const [techStack, setTechStack] = useState(blueprintData.techStack);
    const [growth, setGrowth] = useState(blueprintData.growthStrategy.marketingChannels);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('ideaforge_last_analysis');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.targetAudience) setAudience(parsed.targetAudience);
                if (parsed.mvpFeatures) setFeatures(parsed.mvpFeatures);
                if (parsed.recommendedTechStack) setTechStack(parsed.recommendedTechStack);
                if (parsed.growthStrategy) setGrowth(parsed.growthStrategy);
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                    Startup <span className="gradient-text">Blueprint</span>
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                    AI-generated startup plan for your idea
                </p>
            </div>

            <div className="space-y-6">
                {/* Target Audience */}
                <Card hover>
                    <CardHeader
                        title="Target Audience"
                        subtitle="Customer personas identified by AI"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-purple-500" />
                            </div>
                        }
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {audience.map((persona, i) => (
                            <div
                                key={i}
                                className="p-5 rounded-2xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)] flex items-center gap-3"
                            >
                                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-bold shrink-0">
                                    {String(persona).charAt(0)}
                                </div>
                                <div className="text-sm font-medium leading-relaxed">
                                    {persona}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* MVP Feature List */}
                <Card hover>
                    <CardHeader
                        title="MVP Feature List"
                        subtitle="Core features for version 1.0"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Layers className="w-5 h-5 text-blue-500" />
                            </div>
                        }
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {features.map((feat: any, i: number) => (
                            <div
                                key={i}
                                className="flex flex-col p-4 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)] gap-2"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className={`w-5 h-5 shrink-0 ${feat.priority === "High" ? "text-emerald-500" : feat.priority === "Medium" ? "text-blue-500" : "text-amber-500"
                                            }`} />
                                        <span className="text-sm font-bold">{feat.feature}</span>
                                    </div>
                                    <Badge variant={feat.priority === "High" ? "success" : feat.priority === "Medium" ? "info" : "warning"} size="sm">
                                        {feat.priority}
                                    </Badge>
                                </div>
                                <div className="text-xs text-[var(--color-text-secondary)] pl-8">
                                    {feat.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Tech Stack */}
                <Card hover>
                    <CardHeader
                        title="Recommended Tech Stack"
                        subtitle="Optimized for rapid development and scalability"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                <Code className="w-5 h-5 text-cyan-500" />
                            </div>
                        }
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(techStack).map(([category, tools]) => (
                            <div key={category} className="p-4 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
                                <h4 className="text-sm font-semibold capitalize mb-3 text-primary-500">{category}</h4>
                                <div className="space-y-2">
                                    {tools.map((tool, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                                            <div className="w-1.5 h-1.5 rounded-full gradient-bg shrink-0" />
                                            {tool}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Monetization Strategy */}
                <Card hover>
                    <CardHeader
                        title="Monetization Strategy"
                        subtitle="Freemium SaaS pricing model"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-amber-500" />
                            </div>
                        }
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {blueprintData.monetization.tiers.map((tier, i) => (
                            <div
                                key={i}
                                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${i === 1
                                    ? "gradient-border border-0 shadow-lg relative"
                                    : "border-[var(--color-border)] bg-[var(--color-surface-secondary)]"
                                    }`}
                            >
                                {i === 1 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <Badge variant="purple" size="md">Popular</Badge>
                                    </div>
                                )}
                                <h4 className="text-lg font-semibold mb-1">{tier.name}</h4>
                                <div className="text-3xl font-bold gradient-text mb-4">{tier.price}</div>
                                <ul className="space-y-2">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Growth Strategy */}
                <Card hover>
                    <CardHeader
                        title="Growth Strategy"
                        subtitle="Launch plan and marketing channels"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                                <Rocket className="w-5 h-5 text-pink-500" />
                            </div>
                        }
                    />

                    <div className="grid grid-cols-1 gap-3">
                        {growth.map((step: string, i: number) => (
                            <div key={i} className="flex gap-3 items-start p-4 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)] transition-colors">
                                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white shrink-0 text-sm font-bold">
                                    {i + 1}
                                </div>
                                <div className="text-sm font-medium text-[var(--color-text-secondary)] leading-relaxed mt-1">
                                    {step}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
