"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/progress";
import { savedIdeas } from "@/lib/mock-data";
import { Sparkles, Calendar, ArrowRight, Search } from "lucide-react";

export default function SavedIdeasPage() {
    const [ideas] = useState(savedIdeas);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredIdeas = ideas.filter((idea) =>
        idea.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const statusColors: Record<string, "success" | "warning" | "danger" | "info"> = {
        Excellent: "success",
        Promising: "info",
        Moderate: "warning",
        Challenging: "danger",
    };

    if (ideas.length === 0) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-primary-500/10 flex items-center justify-center mb-6">
                        <Sparkles className="w-10 h-10 text-primary-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">No Ideas Yet</h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                        You haven&apos;t analyzed any startup ideas yet.
                    </p>
                    <Link href="/analyzer">
                        <Button size="lg">
                            <Sparkles className="w-5 h-5" />
                            Analyze Your First Idea
                        </Button>
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                        Saved <span className="gradient-text">Ideas</span>
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">
                        {ideas.length} ideas analyzed
                    </p>
                </div>

                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input
                        type="text"
                        placeholder="Search ideas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIdeas.map((idea) => (
                    <Card key={idea.id} hover className="group cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                            <CircularProgress value={idea.score} size={56} strokeWidth={5}>
                                <span className="text-sm font-bold">{idea.score}</span>
                            </CircularProgress>
                            <Badge variant={statusColors[idea.status]} size="md">
                                {idea.status}
                            </Badge>
                        </div>

                        <h3 className="font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                            {idea.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-4">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(idea.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </div>

                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary-500/10 group-hover:text-primary-500">
                                View Report
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
