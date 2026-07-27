"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function MotionButton({ href, children, className = "", variant = "primary" }: { href: string; children: React.ReactNode; className?: string; variant?: "primary" | "secondary" }) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return (
            <Link className={`button ${variant === "secondary" ? "button-secondary" : "button primary"} ${className}`.trim()} href={href}>
                {children}
            </Link>
        );
    }

    return (
        <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -2, scale: 1.01 }}>
            <Link className={`button ${variant === "secondary" ? "button-secondary" : "button primary"} ${className}`.trim()} href={href}>
                {children}
            </Link>
        </motion.div>
    );
}
