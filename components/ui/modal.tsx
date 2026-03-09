"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg";
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div
                className={`relative ${sizes[size]} w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl animate-scale-in`}
            >
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5 text-[var(--color-text-muted)]" />
                        </button>
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
