"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseSplitTextProps {
    type?: "chars" | "words";
    delay?: number;
}

export function useSplitText<T extends HTMLElement = HTMLElement>({ type = "chars", delay = 0 }: UseSplitTextProps = {}) {
    const elementRef = useRef<T>(null);

    useLayoutEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Save original content to restore on cleanup
        const originalHTML = element.innerHTML;

        // Helper to split text nodes
        const splitTextNode = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || "";
                if (!text.trim()) return;

                let wrappedHTML = "";
                if (type === "chars") {
                    const chars = text.split("").map(char => char === " " ? "&nbsp;" : char);
                    wrappedHTML = chars
                        .map(char => `<span class="split-char inline-block" style="opacity: 0; transform: translateX(150px)">${char}</span>`)
                        .join("");
                } else {
                    const words = text.split(/\s+/).filter(w => w.length > 0);
                    wrappedHTML = words
                        .map(word => `<span class="split-word inline-block mr-[0.3em]" style="opacity: 0; transform: translateY(-100px) rotate(${Math.random() * 160 - 80}deg)">${word}</span>`)
                        .join("");
                }

                const wrapper = document.createElement('span');
                wrapper.innerHTML = wrappedHTML;
                node.parentNode?.insertBefore(wrapper, node);
                node.parentNode?.removeChild(node);
            }
        };

        // Recursive processing (TreeWalker)
        // We need to collect nodes first because modifying DOM invalidates iterator
        const textNodes: Node[] = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
        let node;
        while ((node = walker.nextNode())) {
            if (node.textContent?.trim()) {
                textNodes.push(node);
            }
        }

        textNodes.forEach(splitTextNode);

        // Animate
        const selector = type === "chars" ? ".split-char" : ".split-word";
        const targets = element.querySelectorAll(selector);

        if (type === "chars") {
            gsap.to(targets, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                stagger: 0.04,
                ease: "power4.out",
                delay: delay,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            });
        } else {
            gsap.to(targets, {
                opacity: 1,
                y: 0,
                rotation: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: "back.out(1.7)",
                delay: delay,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            });
        }

        return () => {
            // Restore original HTML on cleanup
            if (element) {
                element.innerHTML = originalHTML;
                // Kill ScrollTriggers if we bound them specifically?
                // GSAP usually handles overwrites but explicit cleanup is good
                // We'd need to store the tween/trigger instance to kill it properly
            }
        };
    }, [type, delay]);

    return elementRef;
}
