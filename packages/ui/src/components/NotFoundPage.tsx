"use client";

import { ArrowLeft, Home } from "lucide-react";
import { ErrorPage } from "./ErrorPage";

export interface NotFoundPageProps {
    homeUrl?: string; // Optional override for Home link
}

export function NotFoundPage({ homeUrl = "/" }: NotFoundPageProps) {
    return (
        <ErrorPage
            code="404"
            title="Page not found"
            description="The page you are looking for doesn't exist or has been moved."
        >
            <a
                href={homeUrl}
                className="bg-white text-black px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-white/90 transition-colors"
            >
                <Home size={16} />
                Go Home
            </a>

            <button
                onClick={() => window.history.back()}
                className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
                <ArrowLeft size={16} />
                Go Back
            </button>
        </ErrorPage>
    );
}
