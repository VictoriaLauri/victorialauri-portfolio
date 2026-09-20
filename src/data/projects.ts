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
    liveUrl: 'https://slmortgages.co.uk/',
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
    subtitle: 'Personal developer portfolio built with React and TypeScript',
    shortDescription:
      'This very site — project case studies, a live tech-news feed pulled from TLDR, and a validated contact form, deployed on Netlify.',
    overview: {
      what: 'A personal portfolio built with React, TypeScript, and Tailwind CSS. Includes project case-study pages with image galleries, a tech-news feed scraped from TLDR.tech through a Netlify serverless function, and a contact form with client-side validation and test coverage.',
      why: 'To have a working example of my own code rather than just a list of claims, and to get hands-on with a small serverless backend (Netlify Functions) alongside the usual frontend work.',
      who: 'Recruiters, potential clients, and other developers who want to see actual working code rather than a CV.',
    },
    role: 'Sole developer and designer, from design through build to deployment.',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'React Router', category: 'frontend' },
      { name: 'SWR', category: 'frontend' },
      { name: 'Vite', category: 'tools' },
      { name: 'Netlify Functions', category: 'backend' },
      { name: 'Vitest', category: 'testing' },
      { name: 'Netlify', category: 'deployment' },
    ],
    images: ['portfolio_01.jpg', 'portfolio_02.jpg'],
    videoDemo: undefined,
    githubUrl: 'https://github.com/VictoriaLauri/victorialauri-portfolio',
    liveUrl: 'https://victorialauri.com',
    features: [
      'Project case studies, each with an image gallery',
      'Live tech-news feed pulled from TLDR.tech via a Netlify serverless function, with sponsor posts filtered out',
      'Contact form with client-side validation, covered by tests',
      'Keyboard skip link, plus eslint-plugin-jsx-a11y wired into the lint step',
    ],
    challenges: [
      {
        challenge:
          'TLDR.tech redesigned their site, which broke the regex-based scraper the news feed depended on overnight.',
        solution:
          'Rewrote the scraper against the new page structure — parsing the rendered <article> blocks on each newsletter edition page and filtering out sponsor entries by matching the "(Sponsor)" suffix in the title, instead of depending on a specific framework\'s hydration data.',
      },
      {
        challenge:
          'Showing a preview image per news article without scraping and embedding every image up front.',
        solution:
          'Built a second Netlify function, /api/resolve-image, that resolves an article\'s image lazily per card, with a category-based fallback if resolution fails.',
      },
    ],
    learnings: [
      'Scraping a third-party site is inherently fragile — matching on stable semantic structure is more resilient than depending on markup that can change without notice',
      'Working with Netlify Functions and the standard Fetch Request/Response API for serverless endpoints',
      'Writing tests for form-validation logic with Vitest and Testing Library',
    ],
    accessibility:
      'A skip-to-content link, semantic HTML, and eslint-plugin-jsx-a11y wired into the lint step to catch common accessibility mistakes during development. No dedicated accessibility audit has been done beyond that.',
    businessReasoning:
      'A portfolio is the most direct proof of ability — the code linked from every project here is code a visitor can actually read. It also gave me a reason to build and maintain a small serverless backend, not just a static frontend.',
    futureImprovements: [
      'Finish the Events page (currently a placeholder)',
      'Add a dark mode toggle',
      'Add a blog/writing section',
      'Expand test coverage beyond the contact form',
    ],
    featured: true,
    completedDate: '2026-09-20',
  },

  // ============================================
  // 3. WeatherWatch
  // ============================================
  {
    id: 'proj-weatherwatch',
    slug: 'weatherwatch',
    title: 'WeatherWatch',
    subtitle: 'Team project: movie recommendations based on your local weather',
    shortDescription:
      'A full-stack app (React, Express, MySQL) that suggests movies based on the weather at your location plus your age and a decade preference. Weather is an input here, not the output — this isn\'t a forecast dashboard.',
    overview: {
      what: 'A full-stack web app built with a five-person team. Users register and log in (JWT-protected), grant location access, and get movie recommendations pulled from TMDB and matched against the current weather at their location, their age, and a preferred decade.',
      why: 'A group project to practice shipping a full stack end-to-end: authentication, a relational database, a third-party API integration, and tests on both sides.',
      who: 'Built as a learning project rather than for real users — realistically, the audience was our cohort and assessors.',
    },
    role: 'One of five contributors (65 of the project\'s roughly 250 commits). I built the TMDB integration and the weather-to-movie matching logic (genre mapping, age-certification filtering, and expanding the recommendation pool to around 1,000 titles), the shuffle/re-suggest feature, the JWT auth wiring on the frontend (context/provider, token persistence), and the backend Jest tests for the weather service.',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'Express', category: 'backend' },
      { name: 'MySQL', category: 'database' },
      { name: 'JWT', category: 'backend' },
      { name: 'TMDB API', category: 'backend' },
      { name: 'OpenWeather API', category: 'backend' },
      { name: 'Jest', category: 'testing' },
    ],
    images: [
      'weatherwatch_01.jpg',
      'weatherwatch_02.jpg',
      'weatherwatch_03.jpg',
      'weatherwatch_04.jpg',
    ],
    videoDemo: undefined,
    githubUrl: 'https://github.com/VictoriaLauri/weather-watch-app',
    features: [
      'JWT-based registration and login, with bcrypt-hashed passwords',
      'Movie recommendations from the TMDB API, filtered by weather condition, age certification, and a chosen decade',
      'Shuffle/reroll button that pulls a different suggestion from a pool of roughly 1,000 titles',
      'Profile management (update username, email, password)',
      'Automatic geolocation to fetch local weather via the OpenWeather API',
    ],
    challenges: [
      {
        challenge:
          'Keeping a database schema and API contracts consistent across a five-person team while the folder structure was still being reorganized mid-project.',
        solution:
          'Helped restructure the repo into separate client/server folders and cleaned up file-casing inconsistencies that were causing import errors on different teammates\' machines.',
      },
      {
        challenge:
          'Matching TMDB\'s genre IDs and age-certification data to a "weather mood" without just returning the same handful of popular films every time.',
        solution:
          'Built a genre-mapping utility and age-certification filter, then expanded the shuffle pool to around 1,000 titles so repeat requests actually varied.',
      },
    ],
    learnings: [
      'Working inside someone else\'s in-progress code in a live team repo — a lot of the work was integration and cleanup, not just new features',
      'Structuring a JWT auth flow on the frontend with React context: provider, token persistence, protected routes',
      'Writing backend tests with Jest and Supertest against Express routes, including configuring Jest for ES modules',
    ],
    accessibility:
      'No dedicated accessibility work was done on this project — it was built under bootcamp time pressure, with the focus on getting the full stack working end-to-end.',
    businessReasoning:
      'Not built for a real business — it\'s included because it\'s the most "full-stack" project here: a relational database, password hashing, JWT auth, and a third-party API integration, built and shipped with a team rather than solo.',
    futureImprovements: [
      'Deploy it somewhere it can actually be tried live (currently local-only)',
      'Add frontend tests beyond the first one',
      'Cache TMDB/weather responses instead of calling on every request',
      'Let users save favorite recommendations',
    ],
    featured: true,
    completedDate: '2025-06-05',
  },

  // ============================================
  // 4. EASE (Educational Accessibility Support Environment)
  // ============================================
  {
    id: 'proj-ease',
    slug: 'ease',
    title: 'EASE',
    subtitle: 'Hackathon team project: a smart-home dashboard for laundry appliances',
    shortDescription:
      'A mobile-first React dashboard for washer/dryer/iron/steamer, built with a team in 48 hours for the WIT HuddleHive hackathon — we were finalists. I built the "What\'s Next" view and the scripted chatbot demo.',
    overview: {
      what: 'A smart-home dashboard concept for laundry appliances, with a mobile-style bottom nav, an onboarding flow, and a chat panel ("Ease AI"). QR-code scanning is wired into the UI as a way to "connect" a machine, though it only logs the scan result — there\'s no real device behind it.',
      why: 'Built in about 48 hours for the WIT HuddleHive hackathon (June 2025) with a small team. The brief was to pitch and demo a smart-home product concept, not to ship production software.',
      who: 'A hackathon judging panel — and hypothetically, someone who owns app-connected laundry appliances.',
    },
    role: 'One of three teammates on this hackathon build (this repo is my fork of the team\'s original). I built the "What\'s Next" view and the scripted chatbot experience that\'s stitched into the dashboard; the onboarding flow, main dashboard, and QR scanner integration came from my teammates.',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'Vite', category: 'tools' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Flowbite React', category: 'frontend' },
      { name: 'Heroicons', category: 'frontend' },
    ],
    images: ['ease_01.jpg', 'ease_02.jpg', 'ease_03.jpg'],
    videoDemo: undefined,
    githubUrl: 'https://github.com/VictoriaLauri/ease-app',
    liveUrl: undefined,
    features: [
      'Onboarding flow that asks about laundry habits and accessibility needs, used to personalize later screens',
      '"What\'s Next" view showing laundry suggestions based on the (hardcoded) onboarding answers — the view I built',
      'Scripted chat demo ("Ease AI"): a pre-written conversation played back with a typing-indicator animation to show what an AI laundry assistant could feel like. It does not call a real AI model.',
      'QR-scanner UI for "connecting" a machine — the scan result is only logged to the console',
    ],
    challenges: [
      {
        challenge:
          'Making a hardcoded, no-backend feature feel like a real product interaction within a 48-hour build.',
        solution:
          'Wrote the chatbot as a scripted, timed sequence of messages with a fake typing indicator and a simulated user reply, rather than pretending to integrate an AI model we didn\'t have time to build.',
      },
      {
        challenge:
          'Wiring a new view and a chat modal into an app whose navigation state (dashboard/profile/machine view) was already built by teammates.',
        solution:
          'Added the chat as an overlay modal triggered from a floating action button, reusing the existing view-state pattern instead of introducing a separate router.',
      },
    ],
    learnings: [
      'Working inside someone else\'s fast-moving hackathon branch under real time pressure',
      'Faking a convincing interaction — timing, a typing indicator, a scripted reply — is a legitimate way to demo a concept fast without a real backend',
      'Managing multi-view, "app-like" UI with plain React state instead of a router',
    ],
    accessibility:
      'The onboarding flow asks whether the user needs help with reading, hearing, or seeing — but that answer isn\'t used anywhere; it\'s just captured and shown on the profile page. No real accessibility adaptation, ARIA work, or testing was done, given the 48-hour build window.',
    businessReasoning:
      'Not a real product — a 48-hour hackathon concept that made the finals. Included here because it\'s a good example of scoping fast: staging a chatbot instead of building one, hardcoding a "smart" suggestion instead of a recommendation engine, and still landing on a demo that reads as a coherent product.',
    futureImprovements: [
      'Wire the onboarding answers into the dashboard and suggestions they\'re meant to inform',
      'Replace the scripted chatbot with a real API call',
      'Connect the QR scanner to an actual device or a mocked device state',
      'Persist onboarding data instead of losing it on refresh',
    ],
    featured: false,
    completedDate: '2025-07-10',
  },

  // ============================================
  // 5. Maths Game
  // ============================================
  {
    id: 'proj-maths-game',
    slug: 'maths-game',
    title: 'Maths Game',
    subtitle: 'A times-tables practice game built for one specific child',
    shortDescription:
      'A plain HTML/CSS/JavaScript game built for a child with neurodiversity, to help him practice times tables without a mouse, animations, or anything else fighting for his attention.',
    overview: {
      what: 'A single-page, no-framework times-tables quiz: 15 multiplication questions using random numbers 0–12, answered entirely from the keyboard. Feedback appears after each answer, a star/cross icon tracks progress, and a summary screen shows the final score with an encouraging message.',
      why: 'Built specifically to help a child with neurodiversity prepare for a Year 4 times-tables assessment. He has difficulty using a mouse or trackpad, gets distracted by animation, and struggles with apps that are too complex to use independently — the design is a direct response to those constraints, not a general EdTech brief.',
      who: 'One specific child — the project README still frames it that way, with a linked video of him trying the app for the first time.',
    },
    role: 'Solo developer — my own idea, built for someone I know personally.',
    techStack: [
      { name: 'HTML5', category: 'frontend' },
      { name: 'CSS3', category: 'frontend' },
      { name: 'JavaScript', category: 'frontend' },
      { name: 'Font Awesome', category: 'frontend' },
      { name: 'Netlify', category: 'deployment' },
    ],
    images: ['maths_game_01.jpg', 'maths_game_02.jpg', 'maths_game_03.jpg'],
    videoDemo: undefined,
    githubUrl: 'https://github.com/VictoriaLauri/times-tables-game',
    liveUrl: 'https://times-tables-game-alex.netlify.app/',
    features: [
      '15 multiplication questions per round, using two random numbers from 0–12',
      'Fully keyboard-driven — answering and restarting both happen via Enter, so a mouse is never required',
      'Per-question feedback text and a star/cross icon tracker after each answer',
      'End-of-round summary with an accuracy percentage and a tiered encouragement message',
    ],
    challenges: [
      {
        challenge:
          'The player needed to complete the game entirely without a mouse or trackpad, and without being distracted mid-question.',
        solution:
          'Kept interaction to a single focused input field with a global Enter-key handler and auto-focus after every question, and left out any animation beyond the icon feedback — nothing to click, nothing moving to pull attention away from the number itself.',
      },
      {
        challenge:
          'Making a repetitive drill feel encouraging rather than discouraging for a child prone to frustration.',
        solution:
          'Wrote tiered end-of-game messages based on accuracy, so even a lower score gets a genuinely positive response instead of a flat pass/fail result.',
      },
    ],
    learnings: [
      'Designing for one real, specific user with concrete constraints is a clarifying exercise compared to designing for a generic audience',
      'How much accessibility comes "for free" just from avoiding unnecessary interaction — no drag, no timed animation, no mouse-only controls',
      'Vanilla DOM manipulation without a framework: event handling, focus management, timed feedback with setTimeout',
    ],
    accessibility:
      'No ARIA was added and there\'s no framework, but the design itself is the accessibility feature: everything is reachable and operable from a single keyboard input, there\'s no time pressure on individual questions, and there are no animations to distract or overwhelm.',
    businessReasoning:
      'Not built as a market-ready product — it\'s here because it\'s a real example of building for someone\'s actual, specific need rather than a hypothetical user persona, with accessibility choices that came from genuine constraints rather than a checklist.',
    futureImprovements: [
      'Add other operations (addition, subtraction, division) — it\'s multiplication-only right now',
      'Persist scores between sessions so progress can be seen over time',
      'Make the number range configurable instead of hardcoded to 0–12',
    ],
    featured: false,
    completedDate: '2025-01-14',
  },

  // ============================================
  // 6. MindMaze
  // ============================================
  {
    id: 'proj-mindmaze',
    slug: 'mindmaze',
    title: 'MindMaze',
    subtitle: 'A general-knowledge trivia quiz, built in vanilla JavaScript',
    shortDescription:
      'A single-category, multiple-choice trivia quiz — no framework, no backend. Answer 7 random questions pulled from a JSON question bank, with a running star/cross score counter.',
    overview: {
      what: 'A browser-based trivia quiz built with plain HTML, CSS, and JavaScript. Players enter a name, answer 7 randomly-selected general-knowledge questions (shuffled from a JSON file with a Fisher–Yates shuffle), get instant right/wrong feedback via alert(), and see a final score with the option to restart.',
      why: 'A small solo project to practice vanilla JS DOM manipulation, array shuffling, and working with a local JSON file as a question bank, without reaching for a framework.',
      who: 'Anyone up for a quick trivia round — this was a practice project rather than something built for a specific audience.',
    },
    role: 'Solo developer, sole author.',
    techStack: [
      { name: 'HTML5', category: 'frontend' },
      { name: 'CSS3', category: 'frontend' },
      { name: 'JavaScript', category: 'frontend' },
      { name: 'Netlify', category: 'deployment' },
    ],
    images: [
      'mindmaze_02.jpg', // NOTE: mindmaze_01.jpg is missing - add it!
      'mindmaze_03.jpg',
      'mindmaze_04.jpg',
      'mindmaze_05.jpg',
      'mindmaze_06.jpg',
    ],
    videoDemo: undefined,
    githubUrl: 'https://github.com/VictoriaLauri/mind-maze-quiz-app',
    liveUrl: 'https://mind-maze-quiz.netlify.app/',
    features: [
      'Name entry, persisted in localStorage so it survives a refresh mid-session',
      '7 questions randomly selected and shuffled from a JSON bank of general-knowledge trivia',
      'Instant feedback per answer via alert(), plus a star/cross icon tracker across the round',
      'Restart flow that clears state and returns to the name screen',
    ],
    challenges: [
      {
        challenge:
          'Selecting a different, non-repeating subset of questions each time from a fixed question bank.',
        solution:
          'Implemented a Fisher–Yates shuffle over the full question array and sliced the first 7, rather than picking randomly with replacement.',
      },
      {
        challenge:
          'Loading and rendering questions from an external JSON file without a bundler or framework.',
        solution:
          'Used a plain fetch() call against questions.json and rebuilt the DOM for each question by hand (radio inputs generated per option) rather than relying on any templating.',
      },
    ],
    learnings: [
      'Reaching for the Fisher–Yates shuffle algorithm instead of a naive Math.random() sort',
      'Managing multi-step UI state (name entry → instructions → quiz → summary) by toggling element visibility directly, without a framework',
      'Where alert()-based feedback breaks down as a UX pattern — it blocks the whole page and isn\'t how I\'d build feedback today',
    ],
    accessibility:
      'Uses native radio inputs and buttons, so keyboard access and labelling come from standard HTML rather than custom ARIA work. The alert()-based feedback is intrusive and not an accessible pattern — it\'s one of the first things I\'d change.',
    businessReasoning:
      'A practice project, not a product — included because it\'s a clean, small example of plain JavaScript fundamentals (array algorithms, DOM building, async data loading) without a framework doing the work for me.',
    futureImprovements: [
      'Add a timer for each question',
      'Expand the question bank with more categories',
      'Add a leaderboard for high scores',
      'Replace alert()-based feedback with inline UI',
    ],
    featured: false,
    completedDate: '2025-02-05',
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
