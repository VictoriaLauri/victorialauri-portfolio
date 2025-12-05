import { ProjectCard } from '@/components/projects'
import { getAllProjects, getProjectCoverImage } from '@/data'

// Vite glob import for all project images
// This creates a map of filename -> module with default export (image URL)
const projectImages = import.meta.glob<{ default: string }>(
  '@/assets/images/projects/*.jpg',
  { eager: true }
)

/**
 * Get the resolved image URL for a project cover
 */
function getImageUrl(filename: string): string | undefined {
  // Find the matching image in the glob results
  const key = Object.keys(projectImages).find((path) => path.endsWith(filename))
  return key ? projectImages[key].default : undefined
}

/**
 * Projects page - Portfolio of work and projects
 * Displays all projects in a responsive grid, newest first
 */
function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className='bg-white'>
      {/* Header */}
      <section className='border-b border-silver/30 bg-linear-to-br from-silver/40 via-coral-light/40 to-slate/30'>
        <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
          <h1 className='text-3xl font-bold tracking-tight text-jet sm:text-4xl lg:text-5xl'>
            Projects
          </h1>
          <p className='mt-3 max-w-2xl text-base text-slate sm:text-lg'>
            A collection of my work: web apps, full-stack apps, interactive
            tools and early career projects. Projects demonstrate different
            learning outcomes, problem-solving approaches and technical skills.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section
        className='py-10 sm:py-12 lg:py-16'
        aria-labelledby='projects-grid-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h2 id='projects-grid-heading' className='sr-only'>
            All Projects
          </h2>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {projects.map((project) => {
              const coverFilename = getProjectCoverImage(project)
              const coverUrl = getImageUrl(coverFilename)

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  coverImage={coverUrl}
                />
              )
            })}
          </div>

          {/* Empty state (shouldn't show with data, but good to have) */}
          {projects.length === 0 && (
            <div className='rounded-md border border-silver/50 bg-silver/10 p-8 text-center'>
              <p className='text-slate'>No projects to display yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className='border-t border-silver/30 bg-white py-6 sm:py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <p className='text-sm font-semibold text-jet'>
                Interested in working together?
              </p>
              <p className='mt-0.5 text-sm text-slate'>
                I'm available for freelance projects and collaborative
                opportunities.
              </p>
            </div>
            <a
              href='/contact'
              className='inline-flex items-center gap-2 rounded border border-coral bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-jet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet'
            >
              Get in touch
              <span aria-hidden='true'>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
