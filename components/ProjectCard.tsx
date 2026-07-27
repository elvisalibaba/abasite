import Link from "next/link";
import { ArrowRight } from "./Icons";
import type { Project } from "@/lib/site-data";
import SafeImage from "./media/SafeImage";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-list-card">
      <div className={`project-list-visual ${project.accent}`}>
        <SafeImage src={project.image} alt={`Projet ABA — ${project.title}`} width={1200} height={900} sizes="(max-width: 1050px) 100vw, 45vw" />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="project-list-body">
        <div className="project-list-meta">
          <span>{project.category}</span>
          <small>{project.status}</small>
        </div>
        <div className="project-facts"><span>{project.year}</span><span>{project.technology}</span></div>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <div className="project-tags">
          {project.services.map((service) => <span key={service}>{service}</span>)}
        </div>
        <Link className="text-link" href={`/projets/${project.slug}`}>
          Découvrir le projet <ArrowRight />
        </Link>
      </div>
    </article>
  );
}
