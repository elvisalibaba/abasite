import Image from "next/image";
import Link from "next/link";

type LogoABAProps = {
    href?: string;
    className?: string;
    variant?: "dark" | "light";
    priority?: boolean;
    size?: "sm" | "md" | "lg";
};

const sizeMap = {
    sm: { width: 132, height: 48 },
    md: { width: 180, height: 66 },
    lg: { width: 240, height: 88 }
} as const;

export default function LogoABA({
    href = "/",
    className = "",
    variant = "dark",
    priority = false,
    size = "md"
}: LogoABAProps) {
    const dims = sizeMap[size];
    const content = (
        <div className={`logo-aba ${variant} ${className}`.trim()}>
            <Image
                src="/image.png"
                alt="Logo Africa Business Agency"
                width={dims.width}
                height={dims.height}
                priority={priority}
                sizes="(max-width: 768px) 140px, 220px"
                className="logo-aba-image"
            />
        </div>
    );

    return href ? <Link href={href} aria-label="Africa Business Agency - accueil" className="logo-link">{content}</Link> : content;
}
