"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface TrendLineChartProps {
    data: Array<{ month: string; searches: number; growth: number }>;
}

export function TrendLineChart({ data }: TrendLineChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                    dataKey="month"
                    stroke="var(--color-text-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    yAxisId="left"
                    stroke="#8b5cf6"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: 'Search Volume', angle: -90, position: 'insideLeft', style: { fill: '#8b5cf6', fontSize: 10 } }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#3b82f6"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: 'Growth %', angle: 90, position: 'insideRight', style: { fill: '#3b82f6', fontSize: 10 } }}
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
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="searches"
                    name="Search Volume"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", r: 4 }}
                    activeDot={{ r: 6, fill: "#8b5cf6" }}
                />
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="growth"
                    name="Growth Rate (%)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#3b82f6", r: 3 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
