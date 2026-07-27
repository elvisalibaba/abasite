"use client";

import Image from "next/image";
import { useState } from "react";
import MediaPlaceholder from "./MediaPlaceholder";

type SafeImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    className?: string;
};

export default function SafeImage({
    src,
    alt,
    width = 1600,
    height = 1000,
    fill = false,
    priority = false,
    sizes = "(max-width: 768px) 100vw, 50vw",
    className = ""
}: SafeImageProps) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return <MediaPlaceholder alt={alt} src={src} width={width} height={height} className={className} />;
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            priority={priority}
            sizes={sizes}
            className={className}
            onError={() => setHasError(true)}
        />
    );
}
