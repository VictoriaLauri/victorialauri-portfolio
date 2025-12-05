import { Link } from 'react-router-dom'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  /** Image element passed from parent (for Vite dynamic imports) */
  coverImage?: string
}

/**
 * Project card component for the projects grid
 * Displays cover image, title, short description, and tech stack
 */
export function ProjectCard({ project, coverImage }: ProjectCardProps) {
  const displayTech = project.techStack.slice(0, 4) // Show max 4 tech items

  return (
    <article className='group overflow-hidden rounded-md border border-silver/50 bg-white shadow-sm transition-all hover:border-coral/30 hover:shadow-lg focus-within:ring-2 focus-within:ring-coral focus-within:ring-offset-2'>
      <Link
        to={`/projects/${project.slug}`}
        className='block focus:outline-none'
        aria-labelledby={`project-title-${project.id}`}
      >
        {/* Cover Image */}
        <div className='aspect-[16/10] overflow-hidden bg-linear-to-br from-slate/10 via-silver/20 to-coral-light/30'>
          {coverImage ? (
            <img
              src={coverImage}
              alt={`Screenshot of ${project.title}`}
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
              loading='lazy'
            />
          ) : (
            <div className='flex h-full items-center justify-center'>
              <span className='text-sm font-medium text-slate/60'>
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className='p-5'>
          <h3
            id={`project-title-${project.id}`}
            className='text-lg font-semibold text-jet transition-colors group-hover:text-coral'
          >
            {project.title}
          </h3>
          <p className='mt-2 line-clamp-2 text-sm text-slate'>
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className='mt-4 flex flex-wrap gap-1.5'>
            {displayTech.map((tech, index) => (
              <span key={tech.name}>
                <span className='text-xs font-medium text-coral'>
                  {tech.name}
                </span>
                {index < displayTech.length - 1 && (
                  <span className='text-coral/40'> · </span>
                )}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className='text-xs text-slate'>…</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

