"use client";

import { ArrowLeft, Home } from "lucide-react";
import { ErrorPage } from "./ErrorPage";

import { useRouter } from "next/navigation";

export interface NotFoundPageProps {
    homeUrl?: string; // Optional override for Home link
}

export function NotFoundPage({ homeUrl = "/" }: NotFoundPageProps) {
    const router = useRouter();

    return (
        <ErrorPage
            code="404"
            title="Page not found"
            description="Sorry, we couldn't find the page you're looking for."
        >
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-white/10 rounded-lg hover:bg-white/20"
            >
                <ArrowLeft className="w-4 h-4" />
                Go Back
            </button>
            <button
                onClick={() => router.push(homeUrl)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black transition-colors duration-200 bg-white rounded-lg hover:bg-gray-200"
            >
                <Home className="w-4 h-4" />
                Go Home
            </button>
        </ErrorPage>
    );
}
