"use client";

import { type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { MobileNav } from "./mobile-nav";

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-[var(--color-surface-secondary)]">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
                    {children}
                </main>
            </div>
            <MobileNav />
        </div>
    );
}
