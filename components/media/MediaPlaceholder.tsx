type MediaPlaceholderProps = {
    alt: string;
    src?: string;
    width?: number;
    height?: number;
    className?: string;
};

export default function MediaPlaceholder({ alt, src = "/images/aba/", width = 1600, height = 1000, className = "" }: MediaPlaceholderProps) {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    const ratio = `${width / divisor}:${height / divisor}`;
    return (
        <div className={`media-placeholder ${className}`.trim()} role="img" aria-label={alt}>
            <div className="media-placeholder__icon" aria-hidden="true">▧</div>
            <p>Image ABA à ajouter</p>
            <small>Chemin : {src}</small>
            <small>Format recommandé : {width} × {height} px</small>
            <small>Ratio recommandé : {ratio}</small>
        </div>
    );
}
