'use client'

import { useTiltEffect } from '@/hooks/useTiltEffect'
import type { Project } from '@/lib/constants'

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useTiltEffect(8)

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      className="cursor-pointer rounded-xl border border-border bg-card p-5 transition-colors will-change-transform hover:border-accent/30"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Category badge */}
      <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
        {project.category}
      </span>

      <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
      <p className="mb-4 line-clamp-2 text-sm text-muted">
        {project.description}
      </p>

      {project.metrics && (
        <p className="mb-3 font-mono text-sm text-accent">{project.metrics}</p>
      )}

      {/* Tech tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-background px-2 py-0.5 text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            GitHub &rarr;
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Live Demo &rarr;
          </a>
        )}
      </div>
    </div>
  )
}
