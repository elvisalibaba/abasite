type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    description?: string;
    centered?: boolean;
};

export default function SectionHeading({ eyebrow, title, description, centered = false }: SectionHeadingProps) {
    return (
        <div className={`section-heading ${centered ? "centered" : "split-heading"}`}>
            <div>
                <div className="eyebrow dark">{eyebrow}</div>
                <h2>{title}</h2>
            </div>
            {description ? <p>{description}</p> : null}
        </div>
    );
}
