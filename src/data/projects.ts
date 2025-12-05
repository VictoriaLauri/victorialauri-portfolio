import type { Project } from '@/types'

/**
 * Project data for portfolio
 *
 * ⚠️  DISPLAY ORDER: Projects appear in the SAME order as this array.
 *     To add a new project, add it at the TOP of the array.
 *     It will automatically appear first in the projects grid.
 */
export const projects: Project[] = [
  // ============================================
  // 1. SL Mortgages
  // ============================================
  {
    id: 'proj-sl-mortgages',
    slug: 'sl-mortgages',
    title: 'SL Mortgages',
    subtitle: 'Professional mortgage broker website with quotation portal',
    shortDescription:
      'A professional, responsive mortgage and protection advisory website featuring a multi-form quotation system and appointment booking.',
    overview: {
      what: 'A paid commission for Svetlana Latiseva Mortgages—a professional business website featuring a multi-form quotation portal, Calendly integration, and full regulatory compliance.',
      why: 'To provide a modern, trustworthy online presence that automates lead generation and streamlines client engagement.',
      who: 'Homebuyers, property investors, and individuals seeking professional mortgage and protection advice.',
    },
    role: 'Solo Developer & Designer. I managed the entire project lifecycle, wearing multiple hats: direct client liaison, translating requirements into documentation, owning the full UI/UX design, and implementing all features independently.',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'Vite', category: 'tools' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'React Router', category: 'frontend' },
      { name: 'Netlify', category: 'deployment' },
    ],
    images: [
      'sl_mortgages_01.jpg',
      'sl_mortgages_02.jpg',
      'sl_mortgages_03.jpg',
      'sl_mortgages_04.jpg',
    ],
    videoDemo: undefined,
    githubUrl: 'https://github.com/VictoriaLauri/slmortgages',
    liveUrl: 'https://sl-mortgages.netlify.app/',
    features: [
      'Multi-form quotation system (Purchase, Sale, Remortgage)',
      'Calendly integration for real-time appointment booking',
      'Live Google Reviews widget with static fallback',
      'Fully FCA & Openwork compliant with required disclaimers',
      'Mobile-first responsive design with animated partner marquee',
      'SEO-optimized architecture with React Helmet',
    ],
    challenges: [
      {
        challenge:
          'Ensuring strict regulatory compliance across a dynamic web application.',
        solution:
          'Implemented consistent FCA & Openwork disclaimers across all routes and forms, ensuring the digital presence meets strict financial industry standards.',
      },
      {
        challenge:
          'Streamlining complex client intake processes without overwhelming users.',
        solution:
          'Developed a segmented quotation portal that breaks down complex financial data collection into manageable, user-friendly steps using Netlify Forms.',
      },
    ],
    learnings: [
      'Integrating third-party scheduling and review widgets while maintaining performance',
      'Implementing strict accessibility (WCAG 2.2 AA) in financial web products',
      'Translating complex business and regulatory requirements into technical solutions',
    ],
    accessibility:
      'Built to WCAG 2.2 AA standards with semantic HTML, keyboard navigation, visible focus states, and sufficient color contrast. Forms include proper labels and error handling for screen reader users.',
    businessReasoning:
      'Demonstrates the ability to deliver a business-critical tool that handles real client data, regulatory requirements, and third-party integrations—key aspects of professional full-stack development.',
    futureImprovements: [
      'Implement client portal for secure document upload',
      'Add blog section for mortgage market updates',
      'Enhance analytics for conversion tracking',
      'Create email automation workflows for new leads',
    ],
    featured: true,
    completedDate: '2024-09-10',
  },

  // ============================================
  // 2. Portfolio Website
  // ============================================
  {
    id: 'proj-portfolio',
    slug: 'portfolio',
    title: 'Portfolio Website',
    subtitle: 'Personal developer portfolio built with modern React',
    shortDescription:
      'This very website! A showcase of my work, skills, and professional journey as a developer.',
    overview: {
      what: 'A personal portfolio website showcasing projects, skills, and providing ways to connect with me professionally.',
      why: 'To have a polished, accessible online presence that demonstrates my capabilities through its own implementation.',
      who: 'Recruiters, potential clients, and fellow developers interested in my work.',
    },
    role: 'Designer and developer of the entire site, from concept to deployment.',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'React Router', category: 'frontend' },
      { name: 'Vite', category: 'tools' },
      { name: 'Vercel', category: 'deployment' },
    ],
    images: ['portfolio_01.jpg', 'portfolio_02.jpg'],
    videoDemo: undefined,
    githubUrl: 'https://github.com/username/portfolio',
    liveUrl: 'https://victorialauri.dev',
    features: [
      'Responsive design optimized for all devices',
      'Project showcase with detailed case studies',
      'Integrated tech news feed',
      'Contact form with validation',
      'Dark/light theme support',
      'WCAG 2.2 AA compliant throughout',
    ],
    challenges: [
      {
        challenge:
          'Creating a design that stands out while remaining professional and accessible.',
        solution:
          'Developed a custom design system with a cohesive color palette, focusing on typography and whitespace rather than flashy effects.',
      },
      {
        challenge: 'Balancing content richness with fast load times.',
        solution:
          'Implemented lazy loading for images, code splitting for routes, and optimized assets for quick initial paint.',
      },
    ],
    learnings: [
      'The importance of content strategy alongside technical implementation',
      'Iterating on design based on feedback',
      'SEO best practices for developer portfolios',
    ],
    accessibility:
      'Skip link for keyboard users, semantic HTML throughout, proper heading hierarchy, visible focus states, sufficient color contrast, and respects user motion preferences.',
    businessReasoning:
      'A portfolio is the most direct demonstration of skills. Every aspect—design, code quality, accessibility, performance—reflects professional standards.',
    futureImprovements: [
      'Add blog section for technical writing',
      'Implement dark mode toggle',
      'Add animation polish with Framer Motion',
      'Create RSS feed for projects/blog',
    ],
    featured: true,
    completedDate: '2024-12-01',
  },

  // ============================================
  // 3. WeatherWatch
  // ============================================
  {
    id: 'proj-weatherwatch',
    slug: 'weatherwatch',
    title: 'WeatherWatch',
    subtitle: 'Real-time weather dashboard with location-based forecasts',
    shortDescription:
      'A responsive weather application providing real-time forecasts, interactive maps, and severe weather alerts for any location worldwide.',
    overview: {
      what: 'A full-featured weather dashboard that displays current conditions, hourly and weekly forecasts, and interactive weather maps.',
      why: 'To create a clean, accessible alternative to cluttered weather apps while practicing API integration and data visualization.',
      who: 'Anyone who wants quick, clear weather information without ads or unnecessary complexity.',
    },
    role: 'Solo developer responsible for design, frontend development, API integration, and deployment.',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'OpenWeather API', category: 'backend' },
      { name: 'Vite', category: 'tools' },
      { name: 'Vercel', category: 'deployment' },
    ],
    images: [
      'weatherwatch_01.jpg',
      'weatherwatch_02.jpg',
      'weatherwatch_03.jpg',
      'weatherwatch_04.jpg',
    ],
    videoDemo: undefined,
    githubUrl: 'https://github.com/username/weatherwatch',
    liveUrl: 'https://weatherwatch-demo.vercel.app',
    features: [
      'Real-time weather data with automatic location detection',
      'Hourly and 7-day forecast views',
      'Interactive weather maps with multiple layers',
      'Severe weather alerts and notifications',
      'Unit conversion (Celsius/Fahrenheit)',
      'Responsive design for all device sizes',
    ],
    challenges: [
      {
        challenge:
          'Handling API rate limits while maintaining real-time data freshness.',
        solution:
          'Implemented intelligent caching with stale-while-revalidate pattern, reducing API calls by 60% while keeping data current.',
      },
      {
        challenge:
          'Displaying complex weather data in an accessible, scannable format.',
        solution:
          'Designed a card-based UI with clear visual hierarchy and semantic HTML, tested with screen readers for full accessibility.',
      },
    ],
    learnings: [
      'Deepened understanding of API caching strategies and rate limit management',
      'Improved skills in data visualization and presenting complex information clearly',
      'Gained experience with geolocation APIs and handling user permissions gracefully',
    ],
    accessibility:
      'Built with semantic HTML, ARIA labels for dynamic content, keyboard navigation throughout, and respects prefers-reduced-motion. All weather icons have descriptive alt text, and color is never the only indicator of weather severity.',
    businessReasoning:
      'Weather apps are universally needed, making this project relatable to any reviewer. It demonstrates API integration, state management, and responsive design—core skills for frontend roles.',
    futureImprovements: [
      'Add weather history and trends visualization',
      'Implement PWA functionality for offline access',
      'Add multiple saved locations with quick switching',
      'Integrate air quality index data',
    ],
    featured: true,
    completedDate: '2024-11-15',
  },

  // ============================================
  // 4. EASE (Educational Accessibility Support Environment)
  // ============================================
  {
    id: 'proj-ease',
    slug: 'ease',
    title: 'EASE',
    subtitle: 'Educational accessibility support environment',
    shortDescription:
      'A learning management platform designed with accessibility at its core, supporting diverse learning needs.',
    overview: {
      what: 'An educational platform providing accessible learning materials, progress tracking, and adaptive content delivery.',
      why: 'To demonstrate that accessibility and good UX go hand-in-hand, creating learning tools that work for everyone.',
      who: 'Educators and learners, particularly those with diverse learning needs or disabilities.',
    },
    role: 'Full-stack developer focusing on accessible UI components, content management, and user authentication.',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Express', category: 'backend' },
      { name: 'MongoDB', category: 'database' },
    ],
    images: ['ease_01.jpg', 'ease_02.jpg', 'ease_03.jpg'],
    videoDemo: undefined,
    githubUrl: 'https://github.com/username/ease',
    liveUrl: undefined,
    features: [
      'Fully accessible content viewer with customizable display',
      'Progress tracking and learning analytics',
      'Multiple content formats: text, audio, video with captions',
      'User preference persistence (font size, contrast, etc.)',
      'Keyboard-navigable throughout',
      'Screen reader optimized with ARIA live regions',
    ],
    challenges: [
      {
        challenge:
          'Creating a truly accessible rich text editor for content creation.',
        solution:
          'Built custom editor components with proper ARIA attributes, keyboard shortcuts, and screen reader announcements for all formatting actions.',
      },
      {
        challenge:
          'Supporting diverse user preferences without overwhelming the interface.',
        solution:
          'Designed a clean preferences panel with sensible defaults, persisting choices to localStorage and applying them globally via CSS custom properties.',
      },
    ],
    learnings: [
      'Deep expertise in WCAG 2.2 guidelines and practical implementation',
      'Importance of testing with actual assistive technology users',
      'Balancing feature richness with interface simplicity',
    ],
    accessibility:
      'This project is accessibility-first by design. Features include: customizable font sizes and spacing, high contrast themes, reduced motion mode, focus-visible indicators, skip links, proper heading hierarchy, and comprehensive keyboard support.',
    businessReasoning:
      'Showcases deep accessibility expertise—increasingly valuable as regulations tighten. Demonstrates ability to build inclusive products that serve wider audiences.',
    futureImprovements: [
      'Add AI-powered content summarization',
      'Implement peer collaboration features',
      'Create mobile companion app',
      'Add gamification elements for engagement',
    ],
    featured: false,
    completedDate: '2024-07-25',
  },

  // ============================================
  // 5. Maths Game
  // ============================================
  {
    id: 'proj-maths-game',
    slug: 'maths-game',
    title: 'Maths Game',
    subtitle: 'Fun arithmetic practice for young learners',
    shortDescription:
      'An engaging educational game helping children practice arithmetic through timed challenges and rewards.',
    overview: {
      what: 'A child-friendly maths practice game with multiple difficulty levels, covering addition, subtraction, multiplication, and division.',
      why: 'To make maths practice enjoyable for children while giving parents/teachers a tool to track progress.',
      who: 'Primary school children (ages 5-11) and their parents/teachers.',
    },
    role: 'Solo developer creating game mechanics, child-friendly UI, and progress tracking system.',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'JavaScript', category: 'frontend' },
      { name: 'CSS Modules', category: 'frontend' },
      { name: 'LocalStorage API', category: 'tools' },
      { name: 'Netlify', category: 'deployment' },
    ],
    images: ['maths_game_01.jpg', 'maths_game_02.jpg', 'maths_game_03.jpg'],
    videoDemo: undefined,
    githubUrl: 'https://github.com/username/maths-game',
    liveUrl: 'https://maths-game-demo.netlify.app',
    features: [
      'Four operation types with adjustable difficulty',
      'Timed challenge mode with high scores',
      'Practice mode without time pressure',
      'Visual feedback with animations and sounds',
      'Progress tracking across sessions',
      'Parent/teacher dashboard view',
    ],
    challenges: [
      {
        challenge:
          'Generating appropriate maths problems for each difficulty level.',
        solution:
          'Created a question generator with configurable ranges and rules (e.g., no negative results for subtraction at lower levels).',
      },
      {
        challenge:
          'Making the UI engaging for children without being distracting.',
        solution:
          'Used playful colors and celebratory animations for correct answers, but kept the actual question area clean and focused.',
      },
    ],
    learnings: [
      'Designing for young users with different attention spans and abilities',
      'Balancing educational value with entertainment',
      'Importance of positive reinforcement in learning applications',
    ],
    accessibility:
      'Large touch targets for younger users, clear visual feedback, optional sound effects (with mute), keyboard support for desktop use, and high contrast text on all backgrounds.',
    businessReasoning:
      'EdTech is a growing sector. This project shows ability to design for specific user groups and consider pedagogy alongside technical implementation.',
    futureImprovements: [
      'Add multiplayer race mode',
      'Implement adaptive difficulty based on performance',
      'Create printable worksheets from missed questions',
      'Add more visual representations (number lines, blocks)',
    ],
    featured: false,
    completedDate: '2024-05-15',
  },

  // ============================================
  // 6. MindMaze
  // ============================================
  {
    id: 'proj-mindmaze',
    slug: 'mindmaze',
    title: 'MindMaze',
    subtitle: 'Interactive puzzle game for cognitive training',
    shortDescription:
      'A brain-training web application featuring multiple puzzle types designed to improve memory, logic, and problem-solving skills.',
    overview: {
      what: 'A gamified cognitive training platform with various puzzle types including pattern recognition, memory games, and logic challenges.',
      why: 'To explore game development principles while creating an engaging tool that makes mental exercise fun and trackable.',
      who: 'Anyone interested in brain training, from students to seniors wanting to keep their minds sharp.',
    },
    role: 'Full-stack developer handling game logic, UI/UX design, progress tracking system, and database integration.',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Framer Motion', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Jest', category: 'testing' },
    ],
    images: [
      'mindmaze_02.jpg', // NOTE: mindmaze_01.jpg is missing - add it!
      'mindmaze_03.jpg',
      'mindmaze_04.jpg',
      'mindmaze_05.jpg',
      'mindmaze_06.jpg',
    ],
    videoDemo: undefined,
    githubUrl: 'https://github.com/username/mindmaze',
    liveUrl: 'https://mindmaze-demo.vercel.app',
    features: [
      'Multiple puzzle categories: memory, logic, pattern, speed',
      'Adaptive difficulty that adjusts to player performance',
      'Progress tracking with statistics and graphs',
      'Daily challenges and streak rewards',
      'Smooth animations for engaging feedback',
      'Accessible design with keyboard-only play support',
    ],
    challenges: [
      {
        challenge:
          'Creating an adaptive difficulty system that feels fair and engaging.',
        solution:
          'Developed an algorithm that tracks recent performance across multiple metrics, adjusting difficulty gradually to maintain flow state.',
      },
      {
        challenge: 'Ensuring puzzles are fully playable via keyboard alone.',
        solution:
          'Designed all game interactions with keyboard-first approach, adding clear focus indicators and logical tab order throughout.',
      },
    ],
    learnings: [
      'Game design principles including flow state, feedback loops, and reward systems',
      'Complex state management for multi-step game logic',
      'Animation performance optimization for smooth 60fps gameplay',
    ],
    accessibility:
      'All puzzles playable via keyboard with clear focus states. Screen reader announcements for game events. High contrast mode available. Timing-based puzzles include extended time option. No flashing content that could trigger seizures.',
    businessReasoning:
      'Demonstrates complex state management, animation skills, and thoughtful UX—key differentiators for frontend roles. The gamification aspect shows creativity beyond typical CRUD apps.',
    futureImprovements: [
      'Add multiplayer competitive modes',
      'Implement spaced repetition for memory puzzles',
      'Create mobile app version with React Native',
      'Add social features: leaderboards, friend challenges',
    ],
    featured: false,
    completedDate: '2024-10-20',
  },
]

/**
 * Get featured projects for homepage display
 * Returns featured projects in array order
 */
export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((p) => p.featured).slice(0, limit)
}

/**
 * Get all projects in display order (same as array order)
 * To change order, rearrange items in the projects array above
 */
export function getAllProjects(): Project[] {
  return projects
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/**
 * Get the cover image path for a project (first image in array)
 */
export function getProjectCoverImage(project: Project): string {
  return project.images[0] || ''
}

/**
 * Build the full image import path for a project image
 * Usage: const imagePath = getProjectImagePath('weatherwatch_01.jpg')
 */
export function getProjectImagePath(filename: string): string {
  return `/src/assets/images/projects/${filename}`
}
