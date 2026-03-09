"use client";

import { useState, type ReactNode } from "react";

interface Tab {
    label: string;
    value: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultValue?: string;
}

export function Tabs({ tabs, defaultValue }: TabsProps) {
    const [active, setActive] = useState(defaultValue || tabs[0]?.value);

    return (
        <div>
            <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)] mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActive(tab.value)}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${active === tab.value
                                ? "gradient-bg text-white shadow-md"
                                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="animate-fade-in">
                {tabs.find((t) => t.value === active)?.content}
            </div>
        </div>
    );
}
