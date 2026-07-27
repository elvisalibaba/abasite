"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type StaggerItemProps = {
    children: ReactNode;
    className?: string;
};

export default function StaggerItem({ children, className = "" }: StaggerItemProps) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.35 }} className={className}>
            {children}
        </motion.div>
    );
}
