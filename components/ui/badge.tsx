import { type ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
    size?: "sm" | "md";
}

export function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
    const variants = {
        default: "bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)]",
        success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        danger: "bg-red-500/10 text-red-600 dark:text-red-400",
        info: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    };

    const sizes = {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    );
}
