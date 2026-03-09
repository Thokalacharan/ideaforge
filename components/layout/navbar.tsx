"use client";

import { Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-30 h-16 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)] px-4 md:px-6 flex items-center justify-between gap-4">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 md:hidden">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">IF</span>
                </div>
                <span className="text-base font-bold gradient-text">IDEAFORGE</span>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input
                        type="text"
                        placeholder="Search ideas, reports, insights..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    />
                </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    ) : (
                        <Moon className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    )}
                </button>

                <button className="relative p-2 rounded-xl hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer">
                    <Bell className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
                </button>

                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-semibold ml-1 cursor-pointer">
                    JD
                </div>
            </div>
        </header>
    );
}
