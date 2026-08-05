import type { ReactNode } from "react";

type CardPreviewProps = {
  side: "Recto" | "Verso";
  description: string;
  children: ReactNode;
};

export default function CardPreview({ side, description, children }: CardPreviewProps) {
  return (
    <article className="card-preview-item">
      <div className="card-label"><span>{side}</span><small>{description}</small></div>
      <div className="card-preview card-preview--portrait">{children}</div>
    </article>
  );
}
