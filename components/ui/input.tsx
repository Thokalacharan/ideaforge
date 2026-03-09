"use client";

import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`w-full px-4 py-3 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 ${className}`}
                {...props}
            />
            {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        </div>
    );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function TextArea({ label, error, className = "", id, ...props }: TextAreaProps) {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                >
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className={`w-full px-4 py-3 rounded-xl bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 resize-none ${className}`}
                {...props}
            />
            {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        </div>
    );
}
