"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface CompetitorBarChartProps {
    data: Array<{ category: string; count: number; fill: string }>;
}

export function CompetitorBarChart({ data }: CompetitorBarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                    dataKey="category"
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
                <Bar dataKey="count" name="Competitors" radius={[8, 8, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
