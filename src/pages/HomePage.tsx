import { Link } from 'react-router-dom'

/**
 * Home page - Landing page for the portfolio
 * Features: Hero, Services, Featured Projects, CTAs
 */
function HomePage() {
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
            {/* Project Placeholder 1 */}
            <article className='group overflow-hidden rounded-md border border-silver/50 bg-white shadow-sm transition-all hover:border-coral/30 hover:shadow-lg'>
              <div className='aspect-[16/10] bg-linear-to-br from-slate/10 via-silver/20 to-coral-light/30'>
                <div className='flex h-full items-center justify-center'>
                  <span className='text-sm font-medium text-slate/60'>
                    Project Image
                  </span>
                </div>
              </div>
              <div className='p-5'>
                <h3 className='text-lg font-semibold text-jet transition-colors group-hover:text-coral'>
                  Project Title
                </h3>
                <p className='mt-2 line-clamp-2 text-sm text-slate'>
                  Brief project description goes here. This showcases the main
                  purpose and tech stack used.
                </p>
                <div className='mt-4 flex flex-wrap gap-1.5'>
                  <span className='text-xs font-medium text-coral'>React</span>
                  <span className='text-coral/40'>·</span>
                  <span className='text-xs font-medium text-coral'>
                    TypeScript
                  </span>
                  <span className='text-coral/40'>·</span>
                  <span className='text-xs font-medium text-coral'>
                    Node.js
                  </span>
                </div>
              </div>
            </article>

            {/* Project Placeholder 2 */}
            <article className='group overflow-hidden rounded-md border border-silver/50 bg-white shadow-sm transition-all hover:border-coral/30 hover:shadow-lg'>
              <div className='aspect-[16/10] bg-linear-to-br from-coral-light/20 via-silver/20 to-slate/10'>
                <div className='flex h-full items-center justify-center'>
                  <span className='text-sm font-medium text-slate/60'>
                    Project Image
                  </span>
                </div>
              </div>
              <div className='p-5'>
                <h3 className='text-lg font-semibold text-jet transition-colors group-hover:text-coral'>
                  Project Title
                </h3>
                <p className='mt-2 line-clamp-2 text-sm text-slate'>
                  Brief project description goes here. This showcases the main
                  purpose and tech stack used.
                </p>
                <div className='mt-4 flex flex-wrap gap-1.5'>
                  <span className='text-xs font-medium text-coral'>
                    Next.js
                  </span>
                  <span className='text-coral/40'>·</span>
                  <span className='text-xs font-medium text-coral'>
                    PostgreSQL
                  </span>
                </div>
              </div>
            </article>

            {/* Project Placeholder 3 */}
            <article className='group overflow-hidden rounded-md border border-silver/50 bg-white shadow-sm transition-all hover:border-coral/30 hover:shadow-lg sm:col-span-2 lg:col-span-1'>
              <div className='aspect-[16/10] bg-linear-to-br from-silver/20 via-coral-light/20 to-slate/10'>
                <div className='flex h-full items-center justify-center'>
                  <span className='text-sm font-medium text-slate/60'>
                    Project Image
                  </span>
                </div>
              </div>
              <div className='p-5'>
                <h3 className='text-lg font-semibold text-jet transition-colors group-hover:text-coral'>
                  Project Title
                </h3>
                <p className='mt-2 line-clamp-2 text-sm text-slate'>
                  Brief project description goes here. This showcases the main
                  purpose and tech stack used.
                </p>
                <div className='mt-4 flex flex-wrap gap-1.5'>
                  <span className='text-xs font-medium text-coral'>Python</span>
                  <span className='text-coral/40'>·</span>
                  <span className='text-xs font-medium text-coral'>API</span>
                  <span className='text-coral/40'>·</span>
                  <span className='text-xs font-medium text-coral'>React</span>
                </div>
              </div>
            </article>
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
              className='inline-flex items-center gap-2 rounded border border-jet bg-jet px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-jet/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet'
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
