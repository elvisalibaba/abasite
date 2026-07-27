"use client";

import { animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const animation = animate(0, value, { duration: 1, ease: "easeOut", onUpdate: latest => setCount(Math.round(latest)) });
        return animation.stop;
    }, [value]);

    return <span>{count}{suffix}</span>;
}
