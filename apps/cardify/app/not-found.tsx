"use client";

import { NotFoundPage } from "@plaqode-platform/ui";
import { useNavVisibility } from "@/components/layout/NavVisibilityContext";
import { useEffect } from "react";

export default function NotFound() {
    const { setVisible } = useNavVisibility();

    useEffect(() => {
        setVisible(false);
        return () => setVisible(true);
    }, [setVisible]);

    return <NotFoundPage homeUrl={process.env.NEXT_PUBLIC_PLATFORM_URL || 'http://localhost:3000'} />;
}
