# Victoria Lauri Portfolio - Implementation Guide (Part 2)

*Continuation from Part 1*

---

## Phase 6: Data Layer

### Step 6.1: Create Navigation Data

Create `src/data/navigation.ts`:

```typescript
import type { NavItem } from '@/types'

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]
```

### Step 6.2: Create Services Data

Create `src/data/services.ts`:

```typescript
import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description:
      'Building responsive, accessible user interfaces with React, TypeScript, and modern CSS frameworks. Focused on performance and user experience.',
    icon: 'frontend',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description:
      'End-to-end application development with Node.js backends, RESTful APIs, and database integration. From concept to deployment.',
    icon: 'fullstack',
  },
  {
    id: 'webapps',
    title: 'Web Applications',
    description:
      'Custom web applications tailored to your business needs. MVPs, dashboards, and internal tools built with modern technologies.',
    icon: 'webapps',
  },
]
```

### Step 6.3: Create Tech Stack Data

Create `src/data/techStack.ts`:

```typescript
import type { TechItem } from '@/types'

export const techStack: TechItem[] = [
  // Frontend
  { name: 'JavaScript', icon: 'javascript', category: 'frontend' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { name: 'React', icon: 'react', category: 'frontend' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
  { name: 'HTML5', icon: 'html5', category: 'frontend' },
  { name: 'CSS3', icon: 'css3', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: 'nodejs', category: 'backend' },
  { name: 'Express', icon: 'express', category: 'backend' },
  { name: 'Python', icon: 'python', category: 'backend' },

  // Databases
  { name: 'PostgreSQL', icon: 'postgresql', category: 'databases' },
  { name: 'MongoDB', icon: 'mongodb', category: 'databases' },
  { name: 'MySQL', icon: 'mysql', category: 'databases' },

  // Tools
  { name: 'Git', icon: 'git', category: 'tools' },
  { name: 'GitHub', icon: 'github', category: 'tools' },
  { name: 'VS Code', icon: 'vscode', category: 'tools' },
  { name: 'Figma', icon: 'figma', category: 'tools' },
  { name: 'Netlify', icon: 'netlify', category: 'tools' },
  { name: 'Vercel', icon: 'vercel', category: 'tools' },
]
```

### Step 6.4: Create Projects Data

Create `src/data/projects.ts`:

```typescript
import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    slug: 'portfolio-website',
    title: 'Personal Portfolio',
    shortDescription:
      'A modern, accessible portfolio website built with React, TypeScript, and Tailwind CSS.',
    fullDescription:
      'This portfolio showcases my work as a full-stack developer. Built with accessibility and performance in mind, it features dynamic API integrations, responsive design, and WCAG AA compliance.',
    thumbnail: '/assets/projects/portfolio-thumb.webp',
    heroImage: '/assets/projects/portfolio-hero.webp',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Netlify'],
    features: [
      'Responsive design for all devices',
      'WCAG AA accessibility compliance',
      'Dynamic API integrations (TLDR, Events)',
      'Contact form with Netlify Forms',
      'SEO optimised with meta tags',
    ],
    challenges: [
      {
        challenge: 'Implementing accessible navigation with keyboard support',
        solution:
          'Used proper ARIA attributes, focus management, and tested with screen readers to ensure full keyboard accessibility.',
      },
      {
        challenge: 'Optimising performance for fast load times',
        solution:
          'Implemented lazy loading, code splitting, and image optimisation to achieve 90+ Lighthouse scores.',
      },
    ],
    learnings: [
      'Deep understanding of WCAG accessibility guidelines',
      'Advanced React patterns with TypeScript',
      'API integration with proper error handling',
      'Performance optimisation techniques',
    ],
    githubUrl: 'https://github.com/victorialauri/portfolio',
    liveUrl: 'https://victorialauri.dev',
    featured: true,
    order: 1,
  },
  {
    id: '2',
    slug: 'task-manager',
    title: 'Task Management App',
    shortDescription:
      'A full-stack task management application with user authentication and real-time updates.',
    fullDescription:
      'A comprehensive task management solution featuring user authentication, project organisation, deadline tracking, and team collaboration capabilities.',
    thumbnail: '/assets/projects/taskmanager-thumb.webp',
    heroImage: '/assets/projects/taskmanager-hero.webp',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
    features: [
      'User authentication with JWT',
      'Create, edit, and delete tasks',
      'Project organisation',
      'Due date reminders',
      'Priority levels and status tracking',
    ],
    challenges: [
      {
        challenge: 'Implementing secure user authentication',
        solution:
          'Used JWT tokens with proper expiry, refresh token rotation, and secure password hashing with bcrypt.',
      },
      {
        challenge: 'Managing complex state across the application',
        solution:
          'Implemented React Context for global state and custom hooks for feature-specific state management.',
      },
    ],
    learnings: [
      'Full-stack development workflow',
      'Database design and optimisation',
      'Authentication and security best practices',
      'RESTful API design principles',
    ],
    githubUrl: 'https://github.com/victorialauri/task-manager',
    liveUrl: 'https://tasks.victorialauri.dev',
    featured: true,
    order: 2,
  },
  {
    id: '3',
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    shortDescription:
      'A weather application with location search, forecasts, and interactive maps.',
    fullDescription:
      'An interactive weather dashboard that provides current conditions, 7-day forecasts, and weather maps for any location worldwide.',
    thumbnail: '/assets/projects/weather-thumb.webp',
    heroImage: '/assets/projects/weather-hero.webp',
    techStack: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
    features: [
      'Location search with autocomplete',
      '7-day weather forecast',
      'Interactive temperature charts',
      'Weather condition icons',
      'Geolocation support',
    ],
    challenges: [
      {
        challenge: 'Handling API rate limits',
        solution:
          'Implemented request caching with SWR and debounced search input to minimise API calls.',
      },
    ],
    learnings: [
      'Third-party API integration',
      'Data visualisation with charts',
      'Geolocation API usage',
      'Caching strategies',
    ],
    githubUrl: 'https://github.com/victorialauri/weather-dashboard',
    featured: false,
    order: 3,
  },
]

// Helper function to get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order)
}

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

// Helper function to get all projects sorted by order
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order)
}
```

### Step 6.5: Create Data Index

Create `src/data/index.ts`:

```typescript
export { navigation } from './navigation'
export { services } from './services'
export { techStack } from './techStack'
export {
  projects,
  getFeaturedProjects,
  getProjectBySlug,
  getAllProjects,
} from './projects'
```

### Step 6.6: Commit Data Layer

```bash
git add .
git commit -m "feat: add data layer (navigation, services, tech stack, projects)"
git push
```

---

## Phase 7: Pages - Core

### Step 7.1: Create Home Page Components

Create `src/components/home/Hero.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-neutral-50 py-20 md:py-32">
      {/* Background decoration */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/grid.svg')] bg-center opacity-40"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Greeting */}
          <p className="mb-4 text-lg font-medium text-primary-600">
            Hello, I&apos;m
          </p>

          {/* Name */}
          <h1 className="heading-1 mb-6 text-neutral-900">Victoria Lauri</h1>

          {/* Title */}
          <p className="mb-8 text-xl font-medium text-neutral-700 md:text-2xl">
            Full-Stack Developer
          </p>

          {/* Value proposition */}
          <p className="text-body-lg mx-auto mb-10 max-w-2xl">
            I build accessible, performant web applications that empower
            businesses and delight users. Specialising in React, TypeScript, and
            Node.js.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/projects">View My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
```

**Note:** The `asChild` pattern above won't work with our simple Button. Let's fix the Hero to use proper navigation:

Update `src/components/home/Hero.tsx`:

```tsx
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui'

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-neutral-50 py-20 md:py-32">
      {/* Background decoration */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Greeting */}
          <p className="mb-4 text-lg font-medium text-primary-600">
            Hello, I&apos;m
          </p>

          {/* Name */}
          <h1 className="heading-1 mb-6 text-neutral-900">Victoria Lauri</h1>

          {/* Title */}
          <p className="mb-8 text-xl font-medium text-neutral-700 md:text-2xl">
            Full-Stack Developer
          </p>

          {/* Value proposition */}
          <p className="text-body-lg mx-auto mb-10 max-w-2xl">
            I build accessible, performant web applications that empower
            businesses and delight users. Specialising in React, TypeScript, and
            Node.js.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" onClick={() => navigate('/projects')}>
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
```

Create `src/components/home/ServicesSection.tsx`:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { services } from '@/data'

// Icon components
function FrontendIcon() {
  return (
    <svg
      className="h-8 w-8 text-primary-600"
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
  )
}

function FullstackIcon() {
  return (
    <svg
      className="h-8 w-8 text-primary-600"
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
  )
}

function WebappsIcon() {
  return (
    <svg
      className="h-8 w-8 text-primary-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  )
}

const icons: Record<string, () => JSX.Element> = {
  frontend: FrontendIcon,
  fullstack: FullstackIcon,
  webapps: WebappsIcon,
}

function ServicesSection() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-2 mb-4 text-neutral-900">What I Do</h2>
          <p className="text-body-lg mb-12">
            I specialise in building modern web applications with a focus on
            accessibility, performance, and user experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => {
            const IconComponent = icons[service.icon]
            return (
              <Card key={service.id} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
                    <IconComponent />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>{service.description}</CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { ServicesSection }
```

Create `src/components/home/FeaturedProjects.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from '@/components/ui'
import { getFeaturedProjects } from '@/data'

function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects()

  return (
    <section className="section bg-neutral-50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-2 mb-4 text-neutral-900">Featured Projects</h2>
          <p className="text-body-lg mb-12">
            A selection of recent work showcasing my skills in full-stack
            development.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group focus-visible:outline-none"
            >
              <Card
                variant="elevated"
                padding="none"
                className="h-full overflow-hidden transition-transform group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-primary-500 group-focus-visible:ring-offset-2"
              >
                {/* Thumbnail */}
                <div className="aspect-video overflow-hidden bg-neutral-200">
                  <img
                    src={project.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-neutral-900 group-hover:text-primary-600">
                    {project.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-neutral-600">
                    {project.shortDescription}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge variant="outline">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = '/projects')}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

export { FeaturedProjects }
```

Create `src/components/home/index.ts`:

```typescript
export { Hero } from './Hero'
export { ServicesSection } from './ServicesSection'
export { FeaturedProjects } from './FeaturedProjects'
```

### Step 7.2: Create Home Page

Create `src/pages/HomePage.tsx`:

```tsx
import { Hero, ServicesSection, FeaturedProjects } from '@/components/home'

function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedProjects />
    </>
  )
}

export default HomePage
```

### Step 7.3: Create About Page Components

Create `src/components/about/Journey.tsx`:

```tsx
function Journey() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-1 mb-8 text-center text-neutral-900">
            About Me
          </h1>

          <div className="prose prose-lg mx-auto">
            <p className="text-body-lg mb-6">
              Hi! I&apos;m Victoria, a full-stack developer based in London with
              a passion for building accessible and performant web applications.
            </p>

            <p className="text-body mb-6">
              My journey into tech has been anything but traditional. I started
              with a background in linguistics, where I developed strong
              analytical and problem-solving skills. From there, I transitioned
              into real estate, gaining valuable experience in client
              communication, project management, and attention to detail.
            </p>

            <p className="text-body mb-6">
              These diverse experiences have shaped my approach to software
              development. I bring a unique perspective that combines technical
              skills with strong communication and a deep understanding of user
              needs.
            </p>

            <h2 className="heading-3 mb-4 mt-8 text-neutral-900">My Mission</h2>

            <p className="text-body-lg font-medium text-primary-700">
              &ldquo;Empowering minds of all kinds through tech.&rdquo;
            </p>

            <p className="text-body mt-4">
              I believe technology should be accessible to everyone. That&apos;s
              why I prioritise accessibility in every project I build, ensuring
              that the web remains an inclusive space for all users.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Journey }
```

Create `src/components/about/TechStack.tsx`:

```tsx
import { techStack } from '@/data'

function TechStack() {
  const categories = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'databases', label: 'Databases' },
    { key: 'tools', label: 'Tools' },
  ] as const

  return (
    <section className="section bg-neutral-50">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="heading-2 mb-12 text-center text-neutral-900">
            Tech Stack
          </h2>

          <div className="space-y-12">
            {categories.map((category) => {
              const items = techStack.filter(
                (item) => item.category === category.key
              )
              return (
                <div key={category.key}>
                  <h3 className="heading-3 mb-6 text-neutral-700">
                    {category.label}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm"
                      >
                        <span className="text-base font-medium text-neutral-700">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { TechStack }
```

Create `src/components/about/SoftSkills.tsx`:

```tsx
const softSkills = [
  {
    title: 'Problem Solving',
    description:
      'Analytical approach developed through linguistics and real-world business challenges.',
  },
  {
    title: 'Communication',
    description:
      'Clear, empathetic communication honed through client-facing roles and cross-functional teams.',
  },
  {
    title: 'Attention to Detail',
    description:
      'Meticulous approach to code quality, accessibility, and user experience.',
  },
  {
    title: 'Adaptability',
    description:
      'Quick learner who thrives in dynamic environments and embraces new technologies.',
  },
  {
    title: 'Collaboration',
    description:
      'Team player who values diverse perspectives and inclusive development practices.',
  },
]

function SoftSkills() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="heading-2 mb-12 text-center text-neutral-900">
            Beyond the Code
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {softSkills.map((skill) => (
              <div
                key={skill.title}
                className="rounded-lg border border-neutral-200 p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                  {skill.title}
                </h3>
                <p className="text-neutral-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { SoftSkills }
```

Create `src/components/about/index.ts`:

```typescript
export { Journey } from './Journey'
export { TechStack } from './TechStack'
export { SoftSkills } from './SoftSkills'
```

### Step 7.4: Create About Page

Create `src/pages/AboutPage.tsx`:

```tsx
import { Journey, TechStack, SoftSkills } from '@/components/about'

function AboutPage() {
  return (
    <>
      <Journey />
      <TechStack />
      <SoftSkills />
    </>
  )
}

export default AboutPage
```

### Step 7.5: Create Projects Page Components

Create `src/components/projects/ProjectCard.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { Card, Badge } from '@/components/ui'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group focus-visible:outline-none"
    >
      <Card
        variant="elevated"
        padding="none"
        className="h-full overflow-hidden transition-transform group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-primary-500 group-focus-visible:ring-offset-2"
      >
        {/* Thumbnail */}
        <div className="aspect-video overflow-hidden bg-neutral-200">
          <img
            src={project.thumbnail}
            alt=""
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="mb-2 text-xl font-semibold text-neutral-900 group-hover:text-primary-600">
            {project.title}
          </h2>
          <p className="mb-4 line-clamp-2 text-neutral-600">
            {project.shortDescription}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="default">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="outline">+{project.techStack.length - 4}</Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export { ProjectCard }
```

Create `src/components/projects/ProjectGrid.tsx`:

```tsx
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/types'

interface ProjectGridProps {
  projects: Project[]
}

function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export { ProjectGrid }
```

Create `src/components/projects/index.ts`:

```typescript
export { ProjectCard } from './ProjectCard'
export { ProjectGrid } from './ProjectGrid'
```

### Step 7.6: Create Projects Page

Create `src/pages/ProjectsPage.tsx`:

```tsx
import { ProjectGrid } from '@/components/projects'
import { getAllProjects } from '@/data'

function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="heading-1 mb-4 text-neutral-900">My Projects</h1>
          <p className="text-body-lg mb-12">
            A collection of projects showcasing my skills in full-stack
            development, from web applications to API integrations.
          </p>
        </div>

        <ProjectGrid projects={projects} />
      </div>
    </section>
  )
}

export default ProjectsPage
```

### Step 7.7: Create Contact Page Components

Create `src/components/contact/ContactForm.tsx`:

```tsx
import { useState, type FormEvent } from 'react'
import { Button, Input, Textarea } from '@/components/ui'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function validateForm(): boolean {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Netlify Forms submission
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString(),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ message: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-xl bg-primary-50 p-8 text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-primary-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="mb-2 text-xl font-semibold text-neutral-900">
          Thank you!
        </h3>
        <p className="text-neutral-600">
          Your message has been sent. I&apos;ll get back to you as soon as
          possible.
        </p>
      </div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Honeypot field for spam prevention */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        required
        autoComplete="name"
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
        autoComplete="email"
      />

      <Textarea
        label="Message"
        name="message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        error={errors.message}
        required
        rows={5}
      />

      <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
        Send Message
      </Button>

      <p className="text-center text-sm text-neutral-500">
        Your information will only be used to respond to your inquiry and will
        not be shared with third parties.
      </p>
    </form>
  )
}

export { ContactForm }
```

Create `src/components/contact/SocialLinks.tsx`:

```tsx
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/victorialauri',
    icon: (
      <svg
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/victorialauri',
    icon: (
      <svg
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

function SocialLinks() {
  return (
    <div className="rounded-xl bg-neutral-50 p-8">
      <h3 className="mb-4 text-lg font-semibold text-neutral-900">
        Connect With Me
      </h3>
      <p className="mb-6 text-neutral-600">
        You can also find me on these platforms:
      </p>
      <div className="flex gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-neutral-700 shadow-sm transition-colors hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label={`Visit my ${link.name} profile (opens in new tab)`}
          >
            {link.icon}
            <span className="font-medium">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export { SocialLinks }
```

Create `src/components/contact/index.ts`:

```typescript
export { ContactForm } from './ContactForm'
export { SocialLinks } from './SocialLinks'
```

### Step 7.8: Create Contact Page

Create `src/pages/ContactPage.tsx`:

```tsx
import { ContactForm, SocialLinks } from '@/components/contact'

function ContactPage() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="heading-1 mb-4 text-neutral-900">Get in Touch</h1>
          <p className="text-body-lg mb-12">
            Have a project in mind or want to discuss opportunities? I&apos;d
            love to hear from you.
          </p>
        </div>

        <div className="mx-auto max-w-xl space-y-8">
          <ContactForm />
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}

export default ContactPage
```

### Step 7.9: Create 404 Page

Create `src/pages/NotFoundPage.tsx`:

```tsx
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

function NotFoundPage() {
  return (
    <section className="flex min-h-screen-nav items-center justify-center bg-white">
      <div className="container">
        <div className="mx-auto max-w-md text-center">
          <p className="mb-4 text-6xl font-bold text-primary-600">404</p>
          <h1 className="heading-2 mb-4 text-neutral-900">Page Not Found</h1>
          <p className="text-body-lg mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <Link to="/">
            <Button size="lg">Return Home</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
```

### Step 7.10: Commit Core Pages

```bash
git add .
git commit -m "feat: add core pages (Home, About, Projects, Contact, 404)"
git push
```

---

*Continued in Part 3...*

