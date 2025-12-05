import { ProjectCard } from '@/components/projects'
import { getAllProjects, getProjectCoverImage } from '@/data'
import { Link } from 'react-router-dom'

// Vite glob import for project images
const projectImages = import.meta.glob<{ default: string }>(
  '@/assets/images/projects/*.jpg',
  { eager: true }
)

function getImageUrl(filename: string): string | undefined {
  const key = Object.keys(projectImages).find((path) => path.endsWith(filename))
  return key ? projectImages[key].default : undefined
}

/**
 * Home page - Landing page for the portfolio
 * Features: Hero, Services, Featured Projects, CTAs
 */
function HomePage() {
  // Get first 3 projects (they appear in array order, so these are the "featured" ones)
  const featuredProjects = getAllProjects().slice(0, 3)
  return (
    <div>
      {/* Hero Section */}
      <section
        className='relative bg-linear-to-br from-silver/40 
      via-coral-light/40 to-slate/30 border-b border-silver/40'
      >
        <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
          <div className='max-w-2xl'>
            <p className='text-sm font-medium uppercase tracking-wider text-coral'>
              Full-Stack Developer
            </p>
            <h1 className='mt-2 text-3xl font-bold tracking-tight text-jet sm:text-4xl lg:text-5xl'>
              Victoria Lauri
            </h1>
            <p className='mt-3 text-base text-slate sm:text-lg lg:mt-4'>
              Building accessible, modern web applications with React,
              TypeScript, and Node.js. Empowering minds of all kinds through
              tech.
            </p>

            {/* CTAs */}
            <div className='mt-5 flex items-center gap-4 sm:mt-6'>
              <Link to='/projects' className='btn-primary'>
                View Projects
              </Link>
              <div className='flex items-center gap-4'>
                <a
                  href='https://github.com/VictoriaLauri'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-jet transition-colors hover:text-coral'
                  aria-label='GitHub'
                >
                  <svg
                    className='h-7 w-7'
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
                </a>
                <a
                  href='https://www.linkedin.com/in/victorialauri/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-jet transition-colors hover:text-coral'
                  aria-label='LinkedIn'
                >
                  <svg
                    className='h-6 w-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className='bg-white py-8 sm:py-10'
        aria-labelledby='services-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h2
            id='services-heading'
            className='text-xl font-bold text-jet sm:text-2xl'
          >
            What I Do
          </h2>

          <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {/* Service Card 1 - Frontend */}
            <article className='group rounded-md border border-silver/50 bg-white p-4 transition-all hover:border-coral/30 hover:shadow-sm'>
              <div className='mb-2 flex h-9 w-9 items-center justify-center rounded bg-coral-light/50 text-coral'>
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
                    d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h3 className='text-base font-semibold text-jet'>
                Frontend Development
              </h3>
              <p className='mt-1 text-sm text-slate'>
                Responsive, accessible interfaces built with React, TypeScript,
                and modern CSS.
              </p>
            </article>

            {/* Service Card 2 - Full-Stack */}
            <article className='group rounded-md border border-silver/50 bg-white p-4 transition-all hover:border-coral/30 hover:shadow-sm'>
              <div className='mb-2 flex h-9 w-9 items-center justify-center rounded bg-coral-light/50 text-coral'>
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
                    d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
                  />
                </svg>
              </div>
              <h3 className='text-base font-semibold text-jet'>
                Full-Stack Solutions
              </h3>
              <p className='mt-1 text-sm text-slate'>
                End-to-end development with Node.js, Express, and SQL databases.
              </p>
            </article>

            {/* Service Card 3 - Web Apps */}
            <article className='group rounded-md border border-silver/50 bg-white p-4 transition-all hover:border-coral/30 hover:shadow-sm sm:col-span-2 lg:col-span-1'>
              <div className='mb-2 flex h-9 w-9 items-center justify-center rounded bg-coral-light/50 text-coral'>
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
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-base font-semibold text-jet'>
                Web Applications
              </h3>
              <p className='mt-1 text-sm text-slate'>
                Custom web apps from MVP to production with clean, scalable
                architecture.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section
        className='border-y border-silver/30 bg-white py-4'
        aria-label='Tech stack'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate'>
            <span className='text-xs font-semibold uppercase tracking-wider'>
              Stack:
            </span>
            {[
              'JavaScript',
              'TypeScript',
              'React',
              'Node.js',
              'SQL',
              'Tailwind',
              'Git',
            ].map((tech, i, arr) => (
              <span key={tech}>
                {tech}
                {i < arr.length - 1 && (
                  <span className='ml-4 text-silver'>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section
        className='bg-white py-10 sm:py-12 lg:py-16'
        aria-labelledby='projects-heading'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end'>
            <div>
              <h2
                id='projects-heading'
                className='text-2xl font-bold text-jet sm:text-3xl'
              >
                Featured Projects
              </h2>
              <p className='mt-2 text-base text-slate'>
                A selection of recent work
              </p>
            </div>
            <Link
              to='/projects'
              className='inline-flex items-center gap-2 font-medium text-coral transition-colors hover:text-coral-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral'
            >
              View all projects
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
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </Link>
          </div>

          {/* Project Cards */}
          <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {featuredProjects.map((project, index) => {
              const coverFilename = getProjectCoverImage(project)
              const coverUrl = getImageUrl(coverFilename)

              return (
                <div
                  key={project.id}
                  className={index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
                >
                  <ProjectCard project={project} coverImage={coverUrl} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='border-t border-silver/30 bg-white py-6 sm:py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <div>
              <p className='text-sm font-semibold text-jet'>
                Have a project in mind?
              </p>
              <p className='mt-0.5 text-sm text-slate'>
                Available for freelance work and collaborations.
              </p>
            </div>
            <Link
              to='/contact'
              className='inline-flex items-center gap-2 rounded border border-coral bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-jet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet'
            >
              Get in touch
              <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
