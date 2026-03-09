"use client";

interface ProgressBarProps {
    value: number;
    max?: number;
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
    gradient?: boolean;
    className?: string;
}

export function ProgressBar({
    value,
    max = 100,
    size = "md",
    showLabel = false,
    gradient = true,
    className = "",
}: ProgressBarProps) {
    const percent = Math.min(100, (value / max) * 100);

    const sizes = {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
    };

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[var(--color-text-secondary)]">{value}%</span>
                </div>
            )}
            <div className={`w-full ${sizes[size]} rounded-full bg-[var(--color-surface-tertiary)] overflow-hidden`}>
                <div
                    className={`${sizes[size]} rounded-full transition-all duration-700 ease-out ${gradient ? "gradient-bg" : "bg-primary-500"
                        }`}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

interface CircularProgressProps {
    value: number;
    size?: number;
    strokeWidth?: number;
    children?: React.ReactNode;
}

export function CircularProgress({
    value,
    size = 120,
    strokeWidth = 8,
    children,
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="var(--color-surface-tertiary)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-1000 ease-out"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">{children}</div>
        </div>
    );
}
