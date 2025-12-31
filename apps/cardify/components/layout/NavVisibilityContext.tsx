"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NavVisibilityContextType {
    isVisible: boolean;
    setVisible: (visible: boolean) => void;
}

const NavVisibilityContext = createContext<NavVisibilityContextType | undefined>(undefined);

export function NavVisibilityProvider({ children }: { children: ReactNode }) {
    const [isVisible, setVisible] = useState(true);

    return (
        <NavVisibilityContext.Provider value={{ isVisible, setVisible }}>
            {children}
        </NavVisibilityContext.Provider>
    );
}

export function useNavVisibility() {
    const context = useContext(NavVisibilityContext);
    if (!context) {
        throw new Error("useNavVisibility must be used within a NavVisibilityProvider");
    }
    return context;
}
