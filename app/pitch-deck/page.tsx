"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pitchDeckSlides } from "@/lib/mock-data";
import {
    AlertTriangle,
    Lightbulb,
    TrendingUp,
    Layers,
    DollarSign,
    Shield,
    Rocket,
    Download,
    Presentation,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    AlertTriangle,
    Lightbulb,
    TrendingUp,
    Layers,
    DollarSign,
    Shield,
    Rocket,
};

export default function PitchDeckPage() {
    const [slides, setSlides] = useState(pitchDeckSlides);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('ideaforge_last_analysis');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.pitchDeck && Array.isArray(parsed.pitchDeck)) {
                    const mapped = parsed.pitchDeck.map((s: any, i: number) => ({
                        title: s.title,
                        content: s.content,
                        icon: ["AlertTriangle", "Lightbulb", "TrendingUp", "Layers", "Shield", "DollarSign", "Rocket", "Rocket", "Rocket"][i] || "Lightbulb",
                        color: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#f43f5e", "#0ea5e9", "#0ea5e9", "#0ea5e9"][i] || "#3b82f6"
                    }));
                    setSlides(mapped);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                        Pitch Deck <span className="gradient-text">Generator</span>
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">
                        AI-generated startup pitch deck outline
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </Button>
                    <Button size="sm">
                        <Presentation className="w-4 h-4" />
                        Present
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {slides.map((slide, i) => {
                    const Icon = iconMap[slide.icon] || Lightbulb;

                    return (
                        <Card key={i} hover className="group">
                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Slide number + icon */}
                                <div className="flex sm:flex-col items-center gap-4 sm:gap-3">
                                    <div className="text-sm font-bold text-[var(--color-text-muted)]">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: `${slide.color}15` }}
                                    >
                                        <Icon className="w-7 h-7" style={{ color: slide.color }} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-xl font-semibold">{slide.title}</h3>
                                        <Badge variant="purple" size="sm">Slide {i + 1}</Badge>
                                    </div>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">
                                        {slide.content}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </DashboardLayout>
    );
}
