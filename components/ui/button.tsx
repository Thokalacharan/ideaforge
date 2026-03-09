"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
    size?: "sm" | "md" | "lg" | "xl";
    children: ReactNode;
    isLoading?: boolean;
}

export function Button({
    variant = "primary",
    size = "md",
    children,
    className = "",
    isLoading = false,
    disabled,
    ...props
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

    const variants = {
        primary: "gradient-bg text-white shadow-lg hover:shadow-xl gradient-bg-hover",
        secondary:
            "bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-tertiary)]",
        ghost:
            "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-lg",
        outline:
            "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm gap-1.5",
        md: "px-4 py-2.5 text-sm gap-2",
        lg: "px-6 py-3 text-base gap-2",
        xl: "px-8 py-4 text-lg gap-3",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {children}
        </button>
    );
}
