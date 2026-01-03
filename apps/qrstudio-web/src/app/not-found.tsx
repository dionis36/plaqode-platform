"use client";

import { NotFoundPage } from "@plaqode-platform/ui";
import { useNavVisibility } from "@/components/layout/NavVisibilityContext";
import { useEffect } from "react";
import { env } from "@/lib/env";

const PLATFORM_URL = env.NEXT_PUBLIC_PLATFORM_URL;

export default function NotFound() {
    const { setVisible } = useNavVisibility();

    useEffect(() => {
        setVisible(false);
        return () => setVisible(true);
    }, [setVisible]);

    return <NotFoundPage homeUrl={PLATFORM_URL} />;
}
