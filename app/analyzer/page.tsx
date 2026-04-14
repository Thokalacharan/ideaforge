"use client";
import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, ArrowRight, CheckCircle, Loader2, AlertTriangle, Target, Users, Shield, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar, CircularProgress } from "@/components/ui/progress";
import { analysisSteps, exampleIdeas } from "@/lib/mock-data";


type AnalysisState = "idle" | "analyzing" | "complete" | "error";

interface Competitor {
    name: string;
    tagline: string;
    positioning: string;
    url?: string;
}

interface AnalysisResult {
    startupScore: number;
    customerDiscussionsSummary: string;
    marketInsights: string;
    targetAudience: string[];
    competitorsAnalysis: Competitor[];
    risks: string[];
    suggestions: string[];
    rawMetrics?: any;
    rawDiscussions?: any;
}

export default function AnalyzerPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [idea, setIdea] = useState(searchParams.get("idea") || "");
    const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [apiResult, setApiResult] = useState<AnalysisResult | null>(null);
    const [apiError, setApiError] = useState<string>("");

    const startAnalysis = useCallback(async () => {
        if (!idea.trim()) return;
        setAnalysisState("analyzing");
        setCurrentStep(0);
        setProgress(0);
        setApiResult(null);
        setApiError("");

        try {
            // Start API call
            const res = await fetch("/api/analyze-idea", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idea }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to analyze idea");
            }

            setApiResult(data);

            try {
                // Save so dashboard can use it
                localStorage.setItem('ideaforge_last_analysis', JSON.stringify({ idea, ...data }));
            } catch (e) {
                console.error("Failed to save to localStorage", e);
            }
        } catch (err: any) {
            setApiError(err.message);
            setAnalysisState("error");
        }
    }, [idea]);

    // Fake progress animation while waiting for API
    useEffect(() => {
        if (analysisState !== "analyzing") return;

        const progressIncrement = 100 / analysisSteps.length;

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                // Only progress to 95% while waiting for API to finish
                const maxAllowed = Math.min((currentStep + 1) * progressIncrement, 95);
                if (prev >= maxAllowed) return maxAllowed;
                return prev + 0.5;
            });
        }, 50);

        const stepTimer = setInterval(() => {
            setCurrentStep((prev) => {
                // Prevent moving to the last step until API is done
                if (prev < analysisSteps.length - 2) return prev + 1;
                return prev;
            });
        }, 2500);

        return () => {
            clearInterval(progressTimer);
            clearInterval(stepTimer);
        };
    }, [analysisState, currentStep]);

    // Handle completion when API finishes
    useEffect(() => {
        if (analysisState === "analyzing" && apiResult) {
            setCurrentStep(analysisSteps.length - 1);
            setProgress(100);

            // Short delay to let the user see the 100% complete state before showing results
            const timeout = setTimeout(() => {
                setAnalysisState("complete");
            }, 800);

            return () => clearTimeout(timeout);
        }
    }, [analysisState, apiResult]);

    if (analysisState === "analyzing" || (analysisState === "complete" && !apiResult)) {
        return (
            <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center px-4">
                <div className="max-w-lg w-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center animate-pulse-glow">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">IDEAFORGE AI</span>
                    </div>

                    {/* Analysis card */}
                    <Card className="p-8" glow>
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-semibold mb-2">
                                Analyzing Your Idea
                            </h2>
                            <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                                &quot;{idea}&quot;
                            </p>
                        </div>

                        {/* Progress */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[var(--color-text-secondary)]">Progress</span>
                                <span className="font-medium gradient-text">{Math.round(progress)}%</span>
                            </div>
                            <ProgressBar value={progress} size="lg" gradient />
                        </div>

                        {/* Steps */}
                        <div className="space-y-3">
                            {analysisSteps.map((step, i) => {
                                const isComplete = i < currentStep;
                                const isActive = i === currentStep;

                                return (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isActive
                                            ? "bg-primary-500/10 border border-primary-500/20"
                                            : isComplete
                                                ? "bg-[var(--color-surface-secondary)]"
                                                : "opacity-40"
                                            }`}
                                    >
                                        {isComplete ? (
                                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                        ) : isActive ? (
                                            <Loader2 className="w-5 h-5 text-primary-500 animate-spin shrink-0" />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full border-2 border-[var(--color-border)] shrink-0" />
                                        )}
                                        <span className={`text-sm ${isActive ? "font-medium text-primary-500" : ""}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    if (analysisState === "complete" && apiResult) {
        return (
            <div className="min-h-screen bg-[var(--color-surface-secondary)] py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Analysis Complete</h1>
                            <p className="text-[var(--color-text-secondary)]">AI Consultation Report for your idea.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={() => setAnalysisState("idle")}>
                                Analyze Another
                            </Button>
                            <Button onClick={() => router.push("/dashboard")}>
                                Full Dashboard <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>

                    <Card padding="lg" glow className="mb-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                        <h2 className="text-xl font-medium italic text-[var(--color-text-secondary)] border-l-4 border-primary-500 pl-4 py-1">
                            &quot;{idea}&quot;
                        </h2>
                    </Card>

                    {/* Core Score && Opportunity */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="flex flex-col items-center justify-center text-center p-8">
                            <CircularProgress value={apiResult.startupScore} size={140} strokeWidth={12}>
                                <span className="text-4xl font-bold gradient-text">{apiResult.startupScore}</span>
                            </CircularProgress>
                            <h3 className="mt-4 font-semibold text-lg">Viability Score</h3>
                            <p className="text-sm text-[var(--color-text-muted)] mt-1">out of 100</p>
                        </Card>

                        <Card className="md:col-span-2">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                                    <Target className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Market Opportunity</h3>
                                    <p className="text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                                        {apiResult.marketInsights}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Arrays Data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Target Audience */}
                        <Card>
                            <div className="flex items-center gap-3 mb-5 border-b border-[var(--color-border)] pb-4">
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                    <Users className="w-5 h-5 text-blue-500" />
                                </div>
                                <h3 className="font-semibold text-lg">Target Audience</h3>
                            </div>
                            <ul className="space-y-3">
                                {apiResult.targetAudience.map((customer, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span className="text-sm text-[var(--color-text-secondary)]">{customer}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Competitors */}
                        <Card>
                            <div className="flex items-center gap-3 mb-5 border-b border-[var(--color-border)] pb-4">
                                <div className="p-2 rounded-lg bg-amber-500/10">
                                    <Shield className="w-5 h-5 text-amber-500" />
                                </div>
                                <h3 className="font-semibold text-lg">Competitor Landscape</h3>
                            </div>
                            <ul className="space-y-4">
                                {apiResult.competitorsAnalysis.map((comp, i) => (
                                    <li key={i} className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                                        <div className="flex items-center justify-between">
                                            <div className="font-medium text-sm">{comp.name}</div>
                                            <div className="text-xs px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-500 font-medium">
                                                {comp.positioning}
                                            </div>
                                        </div>
                                        <div className="text-xs text-[var(--color-text-secondary)]">
                                            {comp.tagline}
                                        </div>
                                        {comp.url && (
                                            <a href={comp.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mt-1 w-fit">
                                                View on Product Hunt
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Risks */}
                        <Card>
                            <div className="flex items-center gap-3 mb-5 border-b border-[var(--color-border)] pb-4">
                                <div className="p-2 rounded-lg bg-red-500/10">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                </div>
                                <h3 className="font-semibold text-lg">Key Risks</h3>
                            </div>
                            <ul className="space-y-3">
                                {apiResult.risks.map((risk, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span className="text-sm text-[var(--color-text-secondary)]">{risk}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Suggestions */}
                        <Card>
                            <div className="flex items-center gap-3 mb-5 border-b border-[var(--color-border)] pb-4">
                                <div className="p-2 rounded-lg bg-emerald-500/10">
                                    <Lightbulb className="w-5 h-5 text-emerald-500" />
                                </div>
                                <h3 className="font-semibold text-lg">Strategic Suggestions</h3>
                            </div>
                            <ul className="space-y-3">
                                {apiResult.suggestions.map((suggestion, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-emerald-500 mt-1">•</span>
                                        <span className="text-sm text-[var(--color-text-secondary)]">{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    if (analysisState === "error") {
        return (
            <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center px-4">
                <Card className="max-w-md w-full p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Analysis Failed</h2>
                    <p className="text-[var(--color-text-secondary)] mb-6 text-sm">
                        {apiError || "Something went wrong while analyzing market signals."}
                    </p>
                    <Button onClick={() => setAnalysisState("idle")} className="w-full">
                        Try Again
                    </Button>
                </Card>
            </div>
        );
    }

    // Idle state — input form
    return (
        <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full py-16">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold gradient-text">IDEAFORGE AI</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3">
                    Analyze Your <span className="gradient-text">Startup Idea</span>
                </h1>
                <p className="text-center text-[var(--color-text-secondary)] mb-10">
                    Describe your idea and let our AI validate it with real market signals.
                </p>

                <Card className="p-8" hover>
                    <textarea
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="AI platform that helps students find internships automatically"
                        className="w-full px-4 py-4 text-lg bg-[var(--color-surface-secondary)] rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none transition-all"
                        rows={4}
                    />

                    <Button size="lg" className="w-full mt-6" onClick={startAnalysis} disabled={!idea.trim()}>
                        <Sparkles className="w-5 h-5" />
                        Analyze Idea
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Card>

                {/* Example ideas */}
                <div className="mt-8">
                    <p className="text-sm text-[var(--color-text-muted)] text-center mb-3">Try an example idea:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {exampleIdeas.map((example, i) => (
                            <button
                                key={i}
                                onClick={() => setIdea(example)}
                                className="px-3 py-1.5 rounded-lg text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)] hover:border-primary-500/50 hover:text-primary-500 transition-all cursor-pointer"
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

