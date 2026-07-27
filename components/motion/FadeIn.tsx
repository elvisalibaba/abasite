"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type FadeInProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

export default function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay }} className={className}>
            {children}
        </motion.div>
    );
}
