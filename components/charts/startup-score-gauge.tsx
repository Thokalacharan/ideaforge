"use client";

import { CircularProgress } from "@/components/ui/progress";

interface StartupScoreGaugeProps {
    score: number;
    breakdown: {
        marketDemand: number;
        competition: number;
        feasibility: number;
        innovation: number;
        monetization: number;
    };
}

export function StartupScoreGauge({ score, breakdown }: StartupScoreGaugeProps) {
    const metrics = [
        { label: "Market Demand", value: breakdown.marketDemand, color: "#8b5cf6" },
        { label: "Competition", value: breakdown.competition, color: "#3b82f6" },
        { label: "Feasibility", value: breakdown.feasibility, color: "#10b981" },
        { label: "Innovation", value: breakdown.innovation, color: "#f59e0b" },
        { label: "Monetization", value: breakdown.monetization, color: "#ec4899" },
    ];

    return (
        <div className="flex flex-col items-center gap-6">
            <CircularProgress value={score} size={160} strokeWidth={10}>
                <div className="text-center">
                    <div className="text-4xl font-bold gradient-text">{score}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">out of 100</div>
                </div>
            </CircularProgress>

            <div className="w-full space-y-3">
                {metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center gap-3">
                        <span className="text-sm text-[var(--color-text-secondary)] w-32 shrink-0">
                            {metric.label}
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-[var(--color-surface-tertiary)] overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700 ease-out"
                                style={{
                                    width: `${metric.value}%`,
                                    backgroundColor: metric.color,
                                }}
                            />
                        </div>
                        <span className="text-sm font-medium text-[var(--color-text-primary)] w-8 text-right">
                            {metric.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
