"use client";

import { ArrowLeft, Home } from "lucide-react";
import { ErrorPage } from "./ErrorPage";

import { useRouter } from "next/navigation";

export interface NotFoundPageProps {
    homeUrl?: string; // Optional override for Home link
}

export function NotFoundPage({ homeUrl = "/" }: NotFoundPageProps) {
    return <div>Test NotFound Page</div>;
}
