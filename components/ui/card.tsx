import { type ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
    children,
    className = "",
    hover = false,
    glow = false,
    padding = "md",
}: CardProps) {
    const paddings = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    };

    return (
        <div
            className={`
        rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] card-shadow
        ${hover ? "transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover" : ""}
        ${glow ? "glow-shadow" : ""}
        ${paddings[padding]}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    title: string;
    subtitle?: string;
    action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
    return (
        <div className="flex items-start justify-between mb-4">
            <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
                {subtitle && (
                    <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{subtitle}</p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
