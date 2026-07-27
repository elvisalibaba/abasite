"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedSectionProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

export default function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
