import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug } from '@/data'
import { ProjectImageGallery } from '@/components/projects'

/**
 * Project detail page - Individual project showcase
 * Displays comprehensive project information for recruiters/viewers
 */
function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  // 404 state
  if (!project) {
    return (
      <div className='bg-white px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='text-3xl font-bold text-jet'>Project Not Found</h1>
          <p className='mt-4 text-slate'>
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to='/projects'
            className='mt-6 inline-flex items-center gap-2 font-medium text-coral hover:text-coral-dark'
          >
            <svg
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>
            Back to all projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white'>
      {/* Header with Title & Subtitle */}
      <header className='border-b border-silver/30 bg-linear-to-br from-silver/40 via-coral-light/40 to-slate/30'>
        <div className='mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
          {/* Back link */}
          <Link
            to='/projects'
            className='inline-flex items-center gap-2 text-sm font-medium text-slate transition-colors hover:text-coral'
          >
            <svg
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>
            All Projects
          </Link>

          <h1 className='mt-4 text-3xl font-bold tracking-tight text-jet sm:text-4xl lg:text-5xl'>
            {project.title}
          </h1>
          <p className='mt-3 text-lg text-slate sm:text-xl'>{project.subtitle}</p>

          {/* Links */}
          <div className='mt-6 flex flex-wrap items-center gap-4'>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='btn-primary inline-flex items-center gap-2'
              >
                <svg
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                  />
                </svg>
                View Live Site
              </a>
            )}
            <a
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded border border-jet bg-white px-4 py-2 text-sm font-medium text-jet transition-colors hover:bg-jet hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet'
            >
              <svg
                className='h-4 w-4'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                  clipRule='evenodd'
                />
              </svg>
              View Source
            </a>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        {/* Overview Section */}
        <section aria-labelledby='overview-heading'>
          <h2
            id='overview-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            Overview
          </h2>
          <dl className='mt-6 grid gap-6 sm:grid-cols-3'>
            <div className='rounded-md border border-silver/50 bg-white p-4'>
              <dt className='text-sm font-semibold uppercase tracking-wider text-coral'>
                What
              </dt>
              <dd className='mt-2 text-sm text-slate'>{project.overview.what}</dd>
            </div>
            <div className='rounded-md border border-silver/50 bg-white p-4'>
              <dt className='text-sm font-semibold uppercase tracking-wider text-coral'>
                Why
              </dt>
              <dd className='mt-2 text-sm text-slate'>{project.overview.why}</dd>
            </div>
            <div className='rounded-md border border-silver/50 bg-white p-4'>
              <dt className='text-sm font-semibold uppercase tracking-wider text-coral'>
                Who
              </dt>
              <dd className='mt-2 text-sm text-slate'>{project.overview.who}</dd>
            </div>
          </dl>
        </section>

        {/* Role Section */}
        <section className='mt-12' aria-labelledby='role-heading'>
          <h2
            id='role-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            My Role
          </h2>
          <p className='mt-4 text-slate'>{project.role}</p>
        </section>

        {/* Tech Stack Section */}
        <section className='mt-12' aria-labelledby='tech-heading'>
          <h2
            id='tech-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            Tech Stack
          </h2>
          <div className='mt-6 flex flex-wrap gap-2'>
            {project.techStack.map((tech) => (
              <span
                key={tech.name}
                className='inline-flex items-center rounded-full border border-coral/30 bg-coral-light/20 px-3 py-1 text-sm font-medium text-jet'
              >
                {tech.name}
                <span className='ml-1.5 text-xs text-slate'>
                  ({tech.category})
                </span>
              </span>
            ))}
          </div>
        </section>

        {/* Screenshots Section */}
        <section className='mt-12' aria-labelledby='screenshots-heading'>
          <h2
            id='screenshots-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            Screenshots
          </h2>
          <div className='mt-6'>
            <ProjectImageGallery
              images={project.images}
              projectTitle={project.title}
            />
          </div>
          {project.videoDemo && (
            <div className='mt-6'>
              <a
                href={project.videoDemo}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 font-medium text-coral hover:text-coral-dark'
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                Watch Video Demo
              </a>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className='mt-12' aria-labelledby='features-heading'>
          <h2
            id='features-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            Core Features
          </h2>
          <ul className='mt-6 grid gap-3 sm:grid-cols-2'>
            {project.features.map((feature, index) => (
              <li key={index} className='flex items-start gap-3'>
                <svg
                  className='mt-0.5 h-5 w-5 flex-shrink-0 text-coral'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span className='text-slate'>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Challenges Section */}
        <section className='mt-12' aria-labelledby='challenges-heading'>
          <h2
            id='challenges-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            Engineering Challenges & Solutions
          </h2>
          <div className='mt-6 space-y-6'>
            {project.challenges.map((item, index) => (
              <div
                key={index}
                className='rounded-md border border-silver/50 bg-white p-5'
              >
                <h3 className='font-semibold text-jet'>
                  <span className='mr-2 text-coral'>Challenge:</span>
                  {item.challenge}
                </h3>
                <p className='mt-3 text-slate'>
                  <span className='mr-2 font-semibold text-jet'>Solution:</span>
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Learnings Section */}
        <section className='mt-12' aria-labelledby='learnings-heading'>
          <h2
            id='learnings-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            What I Learned
          </h2>
          <ul className='mt-6 space-y-3'>
            {project.learnings.map((learning, index) => (
              <li key={index} className='flex items-start gap-3'>
                <svg
                  className='mt-0.5 h-5 w-5 flex-shrink-0 text-coral'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                  />
                </svg>
                <span className='text-slate'>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Accessibility Section */}
        <section className='mt-12' aria-labelledby='accessibility-heading'>
          <h2
            id='accessibility-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            Accessibility & UX
          </h2>
          <div className='mt-6 rounded-md border-l-4 border-coral bg-coral-light/20 p-5'>
            <p className='text-slate'>{project.accessibility}</p>
          </div>
        </section>

        {/* Business Reasoning Section */}
        <section className='mt-12' aria-labelledby='business-heading'>
          <h2
            id='business-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            Business Reasoning
          </h2>
          <p className='mt-4 text-slate'>{project.businessReasoning}</p>
        </section>

        {/* Future Improvements Section */}
        <section className='mt-12' aria-labelledby='future-heading'>
          <h2
            id='future-heading'
            className='text-2xl font-bold text-jet sm:text-3xl'
          >
            Future Improvements
          </h2>
          <ul className='mt-6 space-y-3'>
            {project.futureImprovements.map((improvement, index) => (
              <li key={index} className='flex items-start gap-3'>
                <svg
                  className='mt-0.5 h-5 w-5 flex-shrink-0 text-slate'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
                <span className='text-slate'>{improvement}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Navigation */}
        <nav
          className='mt-16 flex items-center justify-between border-t border-silver/30 pt-8'
          aria-label='Project navigation'
        >
          <Link
            to='/projects'
            className='inline-flex items-center gap-2 font-medium text-coral transition-colors hover:text-coral-dark'
          >
            <svg
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>
            All Projects
          </Link>
          <Link
            to='/contact'
            className='inline-flex items-center gap-2 rounded border border-jet bg-jet px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-jet/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet'
          >
            Get in Touch
            <span aria-hidden='true'>→</span>
          </Link>
        </nav>
      </main>
    </div>
  )
}

export default ProjectDetailPage
