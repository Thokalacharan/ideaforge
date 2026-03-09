"use client";

import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
    PolarAngleAxis,
} from "recharts";

interface OpportunityRadialChartProps {
    score: number;
    label?: string;
}

export function OpportunityRadialChart({ score, label = "Score" }: OpportunityRadialChartProps) {
    const data = [{ name: label, value: score, fill: "url(#radialGradient)" }];

    return (
        <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    barSize={12}
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                >
                    <defs>
                        <linearGradient id="radialGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        dataKey="value"
                        cornerRadius={10}
                        background={{ fill: "var(--color-surface-tertiary)" }}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold gradient-text">{score}</span>
                <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
            </div>
        </div>
    );
}
