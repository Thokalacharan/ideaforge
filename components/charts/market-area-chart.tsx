"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface MarketAreaChartProps {
    data: Array<{ month: string; saturation: number; opportunity: number }>;
}

export function MarketAreaChart({ data }: MarketAreaChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="saturationGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="opportunityGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                    dataKey="month"
                    stroke="var(--color-text-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="var(--color-text-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "12px",
                        boxShadow: "var(--shadow-card-hover)",
                    }}
                    labelStyle={{ color: "var(--color-text-primary)" }}
                />
                <Area
                    type="monotone"
                    dataKey="saturation"
                    name="Saturation (%)"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#saturationGrad)"
                />
                <Area
                    type="monotone"
                    dataKey="opportunity"
                    name="Opportunity (%)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#opportunityGrad)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
