import { Link } from 'react-router-dom'

/**
 * Home page - Landing page for the portfolio
 * Features: Hero, Services, Featured Projects, CTAs
 */
function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-silver/20 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-jet sm:text-5xl lg:text-6xl">
              Hi, I'm{' '}
              <span className="text-coral">Victoria Lauri</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-xl font-medium text-slate sm:mt-6 sm:text-2xl">
              Full-Stack Developer
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate sm:mt-6">
              Building accessible, modern web applications with React, TypeScript, and Node.js. 
              Empowering minds of all kinds through tech.
            </p>
            
            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
              <Link 
                to="/projects"
                className="btn-primary btn-lg"
              >
                View Projects
              </Link>
              <Link 
                to="/contact"
                className="btn-outline btn-lg"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div 
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-coral/5 blur-3xl"
          aria-hidden="true"
        />
        <div 
          className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-slate/5 blur-3xl"
          aria-hidden="true"
        />
      </section>

      {/* Services Section */}
      <section 
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 
              id="services-heading" 
              className="text-3xl font-bold text-jet sm:text-4xl"
            >
              What I Do
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
              Crafting digital experiences from concept to deployment
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Service Card 1 - Frontend */}
            <article className="group rounded-md border border-silver/50 bg-white p-6 shadow-sm transition-all hover:border-coral/30 hover:shadow-md sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-coral-light text-coral">
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-jet">Frontend Development</h3>
              <p className="mt-3 text-slate">
                Responsive, accessible interfaces built with React, TypeScript, and modern CSS. 
                Focused on performance and user experience.
              </p>
            </article>

            {/* Service Card 2 - Full-Stack */}
            <article className="group rounded-md border border-silver/50 bg-white p-6 shadow-sm transition-all hover:border-coral/30 hover:shadow-md sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-coral-light text-coral">
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-jet">Full-Stack Solutions</h3>
              <p className="mt-3 text-slate">
                End-to-end development with Node.js, Express, and SQL databases. 
                RESTful APIs and seamless data integration.
              </p>
            </article>

            {/* Service Card 3 - Web Apps */}
            <article className="group rounded-md border border-silver/50 bg-white p-6 shadow-sm transition-all hover:border-coral/30 hover:shadow-md sm:p-8 sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-coral-light text-coral">
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-jet">Web Applications</h3>
              <p className="mt-3 text-slate">
                Custom web apps from MVP to production. Clean architecture, 
                scalable code, and modern deployment practices.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Tech Stack Pills */}
      <section 
        className="border-y border-silver/30 bg-gradient-to-r from-white via-silver/10 to-white py-8"
        aria-label="Tech stack"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Tailwind CSS', 'Git'].map((tech) => (
              <span 
                key={tech}
                className="rounded bg-white px-4 py-2 text-sm font-medium text-jet shadow-sm ring-1 ring-silver/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section 
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-labelledby="projects-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 
                id="projects-heading" 
                className="text-3xl font-bold text-jet sm:text-4xl"
              >
                Featured Projects
              </h2>
              <p className="mt-2 text-lg text-slate">
                A selection of recent work
              </p>
            </div>
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 font-medium text-coral transition-colors hover:text-coral-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              View all projects
              <svg 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>

          {/* Project Cards - Placeholder */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project Placeholder 1 */}
            <article className="group overflow-hidden rounded-md border border-silver/50 bg-white shadow-sm transition-all hover:border-coral/30 hover:shadow-lg">
              <div className="aspect-[16/10] bg-gradient-to-br from-slate/10 via-silver/20 to-coral-light/30">
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm font-medium text-slate/60">Project Image</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-jet transition-colors group-hover:text-coral">
                  Project Title
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate">
                  Brief project description goes here. This showcases the main purpose and tech stack used.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge badge-muted">React</span>
                  <span className="badge badge-muted">TypeScript</span>
                  <span className="badge badge-muted">Node.js</span>
                </div>
              </div>
            </article>

            {/* Project Placeholder 2 */}
            <article className="group overflow-hidden rounded-md border border-silver/50 bg-white shadow-sm transition-all hover:border-coral/30 hover:shadow-lg">
              <div className="aspect-[16/10] bg-gradient-to-br from-coral-light/20 via-silver/20 to-slate/10">
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm font-medium text-slate/60">Project Image</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-jet transition-colors group-hover:text-coral">
                  Project Title
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate">
                  Brief project description goes here. This showcases the main purpose and tech stack used.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge badge-muted">Next.js</span>
                  <span className="badge badge-muted">PostgreSQL</span>
                </div>
              </div>
            </article>

            {/* Project Placeholder 3 */}
            <article className="group overflow-hidden rounded-md border border-silver/50 bg-white shadow-sm transition-all hover:border-coral/30 hover:shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="aspect-[16/10] bg-gradient-to-br from-silver/20 via-coral-light/20 to-slate/10">
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm font-medium text-slate/60">Project Image</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-jet transition-colors group-hover:text-coral">
                  Project Title
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate">
                  Brief project description goes here. This showcases the main purpose and tech stack used.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge badge-muted">Python</span>
                  <span className="badge badge-muted">API</span>
                  <span className="badge badge-muted">React</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-jet py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Let's Work Together
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-silver">
            Have a project in mind? I'd love to hear about it. Let's discuss how I can help bring your ideas to life.
          </p>
          <div className="mt-8">
            <Link 
              to="/contact"
              className="btn-primary btn-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
