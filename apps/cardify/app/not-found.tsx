"use client";

import { NotFoundPage } from "@plaqode-platform/ui";
import { env } from '@/lib/env';
import { useNavVisibility } from "@/components/layout/NavVisibilityContext";
import { useEffect } from "react";

export default function NotFound() {
    const { setVisible } = useNavVisibility();

    useEffect(() => {
        setVisible(false);
        return () => setVisible(true);
    }, [setVisible]);



    return <NotFoundPage homeUrl={env.NEXT_PUBLIC_PLATFORM_URL} />;
}
