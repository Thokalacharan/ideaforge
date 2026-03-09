"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Sparkles,
    TrendingUp,
    Shield,
    Map,
    ArrowRight,
    Zap,
    BarChart3,
    Brain,
    Sun,
    Moon,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";
import { exampleIdeas } from "@/lib/mock-data";

export default function LandingPage() {
    const [idea, setIdea] = useState("");
    const { theme, toggleTheme } = useTheme();

    const features = [
        {
            icon: TrendingUp,
            title: "Market Validation",
            description:
                "Analyze demand using search trends, community signals, and real market data to gauge viability.",
            color: "#8b5cf6",
        },
        {
            icon: Shield,
            title: "Competitor Analysis",
            description:
                "Discover startups already working in the space. Understand their positioning and market gaps.",
            color: "#3b82f6",
        },
        {
            icon: Map,
            title: "AI Startup Blueprint",
            description:
                "Generate a complete MVP roadmap with target audience, tech stack, and growth strategy.",
            color: "#10b981",
        },
    ];

    const steps = [
        {
            step: "01",
            title: "Enter your startup idea",
            description: "Describe your concept in a few sentences. Be as specific or broad as you like.",
            icon: Brain,
        },
        {
            step: "02",
            title: "AI gathers market signals",
            description: "Our AI engine analyzes search trends, competitors, community discussions, and market gaps.",
            icon: BarChart3,
        },
        {
            step: "03",
            title: "Receive your report",
            description: "Get a complete startup validation report and actionable blueprint to guide your next steps.",
            icon: Zap,
        },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-surface)]">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">IDEAFORGE AI</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-[var(--color-text-secondary)]" />
                            ) : (
                                <Moon className="w-5 h-5 text-[var(--color-text-secondary)]" />
                            )}
                        </button>
                        <Link href="/dashboard">
                            <Button variant="secondary" size="sm">
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/analyzer">
                            <Button size="sm">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl" />
                </div>

                <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium mb-8 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Startup Validation Platform
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight animate-slide-up">
                        Validate Your Startup
                        <br />
                        <span className="gradient-text">Idea in Seconds</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                        AI-powered startup validation using real market signals, competitor intelligence, and demand insights.
                    </p>

                    {/* Input Box */}
                    <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] card-shadow p-2">
                            <textarea
                                value={idea}
                                onChange={(e) => setIdea(e.target.value)}
                                placeholder="AI platform that helps students summarize lectures automatically"
                                className="w-full px-4 py-4 text-base bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none resize-none"
                                rows={2}
                            />
                            <div className="flex justify-end px-2 pb-2">
                                <Link href={`/analyzer?idea=${encodeURIComponent(idea)}`}>
                                    <Button size="lg" className="gap-2">
                                        <Sparkles className="w-5 h-5" />
                                        Analyze Idea
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Example ideas */}
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {exampleIdeas.slice(0, 3).map((example, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIdea(example)}
                                    className="px-3 py-1.5 rounded-lg text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)] hover:border-primary-500/50 hover:text-primary-500 transition-all cursor-pointer"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-[var(--color-surface-secondary)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Everything you need to <span className="gradient-text">validate ideas</span>
                        </h2>
                        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                            Our AI engine analyzes multiple data signals to give you a comprehensive startup validation report.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] card-shadow transition-all duration-300 hover:-translate-y-2 hover:card-shadow-hover"
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${feature.color}15` }}
                                >
                                    <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            How it <span className="gradient-text">works</span>
                        </h2>
                        <p className="text-[var(--color-text-secondary)]">Three simple steps to validate your startup idea.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="relative text-center">
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary-500/30 to-transparent" />
                                )}
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl gradient-bg mb-6 shadow-lg">
                                    <step.icon className="w-10 h-10 text-white" />
                                </div>
                                <div className="text-xs font-bold text-primary-500 mb-2">STEP {step.step}</div>
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[var(--color-surface-secondary)]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="rounded-3xl gradient-bg p-12 sm:p-16 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/5" />
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to validate your idea?
                            </h2>
                            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                                Join thousands of founders using AI to make smarter startup decisions.
                            </p>
                            <Link href="/analyzer">
                                <Button
                                    variant="secondary"
                                    size="xl"
                                    className="bg-white text-primary-700 hover:bg-white/90 shadow-lg"
                                >
                                    Start Validating Ideas
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-[var(--color-border)]">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[var(--color-text-muted)]">
                    © 2026 IDEAFORGE AI. Built for founders, by founders.
                </div>
            </footer>
        </div>
    );
}
