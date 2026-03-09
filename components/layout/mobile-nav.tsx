"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Sparkles,
    BarChart3,
    Bookmark,
    Map,
} from "lucide-react";

const mobileNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Analyzer", href: "/analyzer", icon: Sparkles },
    { label: "Insights", href: "/insights", icon: BarChart3 },
    { label: "Blueprint", href: "/blueprint", icon: Map },
    { label: "Saved", href: "/saved", icon: Bookmark },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)]/90 backdrop-blur-xl border-t border-[var(--color-border)] px-2 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-around">
                {mobileNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-0.5 py-2 px-3 text-[10px] font-medium transition-colors ${isActive
                                    ? "text-primary-500"
                                    : "text-[var(--color-text-muted)]"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-primary-500" : ""}`} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
