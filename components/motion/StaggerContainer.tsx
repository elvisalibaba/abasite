"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type StaggerContainerProps = {
    children: ReactNode;
    className?: string;
};

export default function StaggerContainer({ children, className = "" }: StaggerContainerProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} className={className}>
            {children}
        </motion.div>
    );
}
