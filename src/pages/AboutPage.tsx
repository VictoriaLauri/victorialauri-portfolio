import { Link } from 'react-router-dom'
import profileImage from '../assets/images/vl_profile_sq.jpg'

/**
 * About page - Personal biography with editorial-style layout
 */
function AboutPage() {
  return (
    <div className='bg-white'>
      {/* Editorial Hero - Asymmetric Split */}
      <section className='relative overflow-hidden pb-16 lg:min-h-[560px] lg:pb-0'>
        {/* Slate panel - horizontal on mobile (bottom half), vertical on desktop (right side) */}
        <div
          className='absolute bottom-0 left-0 right-0 h-[220px] bg-slate sm:h-[240px] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[28%]'
          aria-hidden='true'
        />

        {/* Content container */}
        <div className='relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Text content - left side */}
          <div className='flex flex-col justify-center pt-6 sm:pt-8 lg:min-h-[560px] lg:max-w-[50%] lg:py-12'>
            <p className='text-sm font-medium uppercase tracking-wider text-coral'>
              About Me
            </p>

            <h1 className='mt-3 text-3xl font-bold tracking-tight text-jet sm:text-4xl lg:text-5xl'>
              The developer behind
              <span className='block text-coral'>the code.</span>
            </h1>

            <p className='mt-4 max-w-md text-base leading-relaxed text-slate sm:text-lg'>
              I build tools that simplify complexity, crafting clean
              architecture, intuitive interfaces, and products that feel
              effortless to navigate.
            </p>

            {/* Quick stats */}
            <div className='mt-8 flex gap-8'>
              <div>
                <div className='text-2xl font-bold text-jet sm:text-3xl'>
                  9+
                </div>
                <div className='mt-0.5 text-sm text-slate'>Technologies</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-jet sm:text-3xl'>∞</div>
                <div className='mt-0.5 text-sm text-slate'>Curiosity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image - Centered on slate panel left edge */}
        {/* Position: right-[28%] places right edge of container at slate boundary */}
        {/* translate-x-1/2 shifts it right by half its width, centering on the edge */}
        <div className='relative z-10 mt-12 flex justify-center px-4 pb-6 sm:mt-14 sm:px-6 lg:absolute lg:inset-y-0 lg:right-[28%] lg:mt-0 lg:translate-x-1/2 lg:items-center lg:px-0 lg:pb-0'>
          {/* Main image with solid border frame - inline-block to contain width */}
          <div className='relative inline-block'>
            {/* Coral glow layers for more intensity */}
            <div
              className='absolute -inset-8 bg-coral/25 blur-3xl'
              aria-hidden='true'
            />
            <div
              className='absolute -inset-4 bg-coral/20 blur-xl'
              aria-hidden='true'
            />

            {/* Outer solid border - rounded-lg for consistency with HomePage */}
            <div
              className='absolute -inset-3 rounded-lg border-2 border-coral/50'
              aria-hidden='true'
            />

            {/* Image - reduced height, rounded-md for consistency */}
            <div className='relative h-72 w-56 overflow-hidden rounded-md bg-white shadow-2xl ring-4 ring-white sm:h-[340px] sm:w-64 lg:h-[400px] lg:w-72'>
              <img
                src={profileImage}
                alt='Victoria Lauri'
                className='h-full w-full object-cover'
                loading='eager'
              />
            </div>

            {/* Location badge - rounded matches HomePage button style */}
            <div className='absolute -bottom-3 left-3 rounded bg-jet px-4 py-2 shadow-xl'>
              <span className='text-sm font-medium text-white'>
                London, UK 🇬🇧
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Editorial Pull Quote Style */}
      <section className='relative bg-silver/10 py-20 sm:py-28'>
        <div className='mx-auto max-w-7xl px-6 sm:px-8'>
          <div className='grid gap-12 lg:grid-cols-12 lg:gap-16'>
            {/* Large pull quote */}
            <div className='lg:col-span-5'>
              <blockquote className='relative'>
                <span
                  className='absolute -left-2 -top-4 text-7xl font-black text-coral/20 sm:-left-4 sm:-top-6 sm:text-8xl'
                  aria-hidden='true'
                >
                  "
                </span>
                <p className='relative text-2xl font-medium leading-relaxed text-jet sm:text-3xl'>
                  I strive to write maintainable code, understand the{' '}
                  <em className='text-coral'>why</em> behind features, and
                  design systems that are functional, readable, and scalable.
                </p>
              </blockquote>
            </div>

            {/* Story content */}
            <div className='space-y-6 text-base leading-relaxed text-slate lg:col-span-7 lg:text-lg'>
              <p>
                Before moving into software engineering, I spent over a decade in strategic and high-responsibility roles where clarity, communication, and decision-making mattered. What I eventually realised is that the same principles that drive great businesses also drive great software: simplicity, efficiency, and a deep understanding of the user.
              </p>
              <p>
                These skills now shape how I approach development:{' '}
                <strong className='text-coral'>
                  with precision, empathy for the user, and an ability to
                  translate requirements into practical, well-designed
                  solutions.
                </strong>
              </p>
              <p>
                I focus on understanding the full picture from planning and UI
                structure to API integration and deployment. I'm committed to
                continuous learning and staying current with modern development
                practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack - Clean Typography */}
      <section className='py-12 sm:py-16' aria-labelledby='stack-heading'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h2
            id='stack-heading'
            className='text-xl font-bold text-jet sm:text-2xl'
          >
            Core Stack
          </h2>

          {/* Tech categories as clean rows */}
          <div className='mt-8 space-y-6'>
            {/* Frontend */}
            <div className='flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4'>
              <span className='text-sm font-semibold uppercase tracking-wider text-coral'>
                Frontend
              </span>
              <p className='text-base text-slate sm:text-lg'>
                React · TypeScript · JavaScript · HTML · CSS · Tailwind
              </p>
            </div>

            {/* Backend */}
            <div className='flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4'>
              <span className='text-sm font-semibold uppercase tracking-wider text-coral'>
                Backend
              </span>
              <p className='text-base text-slate sm:text-lg'>
                Node.js · Express · SQL
              </p>
            </div>

            {/* Tools */}
            <div className='flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4'>
              <span className='text-sm font-semibold uppercase tracking-wider text-coral'>
                Tools
              </span>
              <p className='text-base text-slate sm:text-lg'>
                Git · VS Code · Figma · REST APIs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Me - Slate background with coral accents */}
      <section className='bg-jet/90 py-12 sm:py-16'>
        <div className='mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
          <h2 className='text-2xl font-bold text-coral-light sm:text-3xl'>
            What Drives Me
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver sm:text-lg'>
            I'm motivated by environments where learning is encouraged,
            collaboration is valued, and engineering is treated as both a craft
            and a service to the user. I bring{' '}
            <strong className='text-coral-light'>
              maturity, reliability, and a strong work ethic
            </strong>
            , along with the curiosity and hunger to grow as a developer.
          </p>

          {/* Coral dot separator */}
          <div className='mt-8 flex items-center justify-center gap-2'>
            <div className='h-1 w-1 rounded-full bg-coral' />
            <div className='h-1 w-8 rounded-full bg-coral' />
            <div className='h-1 w-1 rounded-full bg-coral' />
          </div>
        </div>
      </section>

      {/* CTA - Compact, light background */}
      <section className='border-t border-silver/30 bg-silver/10 py-8 sm:py-10'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <div className='text-center sm:text-left'>
              <p className='text-base font-semibold text-jet sm:text-lg'>
                Let's build something meaningful together.
              </p>
              <p className='mt-1 text-sm text-slate'>
                 I am open to opportunities and collaborations.
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <Link
                to='/contact'
                className='inline-flex items-center gap-2 rounded bg-coral px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-coral-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral'
              >
                Get in Touch
                <span aria-hidden='true'>→</span>
              </Link>
              <Link
                to='/projects'
                className='inline-flex items-center gap-2 rounded border border-silver/50 bg-white px-5 py-2.5 text-sm font-medium text-jet transition-all hover:border-coral/30 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral'
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
