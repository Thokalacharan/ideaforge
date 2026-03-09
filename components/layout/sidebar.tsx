"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Sparkles,
    BarChart3,
    Map,
    Bookmark,
    Settings,
    ChevronLeft,
    ChevronRight,
    Presentation,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Idea Analyzer", href: "/analyzer", icon: Sparkles },
    { label: "Market Insights", href: "/insights", icon: BarChart3 },
    { label: "Startup Blueprint", href: "/blueprint", icon: Map },
    { label: "Pitch Deck", href: "/pitch-deck", icon: Presentation },
    { label: "Saved Ideas", href: "/saved", icon: Bookmark },
    { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={`hidden md:flex flex-col h-screen sticky top-0 bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[260px]"
                }`}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-[var(--color-border)]">
                <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <span className="text-lg font-bold gradient-text whitespace-nowrap">IDEAFORGE AI</span>
                )}
            </div>

            {/* Nav Items */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                    ? "gradient-bg text-white shadow-md"
                                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
                            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Button */}
            <div className="p-3 border-t border-[var(--color-border)]">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-secondary)] transition-all cursor-pointer"
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    {!collapsed && <span>Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
