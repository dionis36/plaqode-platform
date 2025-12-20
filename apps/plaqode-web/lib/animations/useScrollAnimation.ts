"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollAnimation() {
    // We can return a ref to scope animations, or helper functions
    // A simple approach is to export a hook that takes a ref and animation type
    // But to be flexible like the source js functions:

    const fadeInUp = (element: HTMLElement | null, delay = 0) => {
        if (!element) return;
        gsap.from(element, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: delay,
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true,
            }
        });
    };

    const fadeInStagger = (elements: HTMLElement[], delay = 0, stagger = 0.1) => {
        if (!elements || elements.length === 0) return;
        gsap.from(elements, {
            opacity: 0,
            y: 30, // Adding slight Y movement for better effect
            duration: 0.8,
            ease: "power2.out",
            stagger: stagger,
            delay: delay,
            scrollTrigger: {
                trigger: elements[0], // Trigger based on first element or parent container if we had it
                start: "top 90%",
                toggleActions: "play none none none",
                once: true,
            }
        });
    };

    return { fadeInUp, fadeInStagger };
}
