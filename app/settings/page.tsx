"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme-provider";
import { Sun, Moon, User, Bell, Lock, Palette } from "lucide-react";

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">Settings</h1>
                <p className="text-[var(--color-text-secondary)]">
                    Manage your account and preferences
                </p>
            </div>

            <div className="max-w-2xl space-y-6">
                {/* Profile */}
                <Card>
                    <CardHeader
                        title="Profile"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary-500" />
                            </div>
                        }
                    />
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-xl font-bold">
                                JD
                            </div>
                            <div>
                                <h3 className="font-semibold">John Doe</h3>
                                <p className="text-sm text-[var(--color-text-muted)]">john@example.com</p>
                            </div>
                        </div>
                        <Input label="Full Name" defaultValue="John Doe" />
                        <Input label="Email" defaultValue="john@example.com" type="email" />
                        <Button size="sm">Save Changes</Button>
                    </div>
                </Card>

                {/* Appearance */}
                <Card>
                    <CardHeader
                        title="Appearance"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <Palette className="w-5 h-5 text-amber-500" />
                            </div>
                        }
                    />
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
                        <div className="flex items-center gap-3">
                            {theme === "dark" ? (
                                <Moon className="w-5 h-5 text-primary-500" />
                            ) : (
                                <Sun className="w-5 h-5 text-amber-500" />
                            )}
                            <div>
                                <div className="font-medium text-sm">Theme</div>
                                <div className="text-xs text-[var(--color-text-muted)]">
                                    Currently using {theme} mode
                                </div>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" onClick={toggleTheme}>
                            Switch to {theme === "light" ? "Dark" : "Light"}
                        </Button>
                    </div>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader
                        title="Notifications"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Bell className="w-5 h-5 text-blue-500" />
                            </div>
                        }
                    />
                    <div className="space-y-3">
                        {["Email notifications", "Analysis complete alerts", "Weekly insights digest"].map(
                            (item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)]"
                                >
                                    <span className="text-sm">{item}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                                        <div className="w-9 h-5 bg-[var(--color-surface-tertiary)] peer-checked:bg-primary-500 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                                    </label>
                                </div>
                            )
                        )}
                    </div>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader
                        title="Security"
                        action={
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-red-500" />
                            </div>
                        }
                    />
                    <div className="space-y-4">
                        <Input label="Current Password" type="password" placeholder="••••••••" />
                        <Input label="New Password" type="password" placeholder="••••••••" />
                        <Button size="sm">Update Password</Button>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
