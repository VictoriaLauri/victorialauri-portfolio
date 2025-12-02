# Victoria Lauri Portfolio - Implementation Checklist

A quick reference checklist for the complete implementation guide. Check off each item as you complete it.

---

## 📁 Guide Files

- `implementation-guide.md` - Part 1: Setup, Configuration, Folder Structure, UI Components, Layout
- `implementation-guide-part2.md` - Part 2: Data Layer, Core Pages (Home, About, Projects, Contact)
- `implementation-guide-part3.md` - Part 3: API Integration, Dynamic Pages, SEO, Testing, Deployment

---

## Phase 1: Project Setup
- [ ] Create GitHub repository
- [ ] Initialize Vite project with React + TypeScript
- [ ] Connect local repo to GitHub
- [ ] Install dependencies (react-router-dom, swr, clsx, tailwindcss)
- [ ] Initialize Tailwind CSS
- [ ] Verify dev server runs
- [ ] First commit pushed

## Phase 2: Configuration
- [ ] Configure TypeScript (tsconfig.json)
- [ ] Configure Vite (vite.config.ts) with @ alias
- [ ] Configure Tailwind with custom colours
- [ ] Create ESLint configuration
- [ ] Create Prettier configuration
- [ ] Create .env.example
- [ ] Create netlify.toml
- [ ] Update .gitignore

## Phase 3: Folder Structure
- [ ] Create all component folders (ui, layout, home, about, projects, news, events, contact)
- [ ] Create lib folders (api, hooks, utils)
- [ ] Create data, types, pages folders
- [ ] Create public asset folders
- [ ] Create test folders
- [ ] Setup base CSS with Tailwind layers
- [ ] Create TypeScript types (Project, NewsArticle, TechEvent)
- [ ] Create utility functions (cn, formatDate)

## Phase 4: UI Components
- [ ] Button component with variants
- [ ] Card component with subcomponents
- [ ] Badge component
- [ ] Input component with validation
- [ ] Textarea component
- [ ] Skeleton loading components
- [ ] ErrorMessage component
- [ ] Tabs component
- [ ] Create UI index.ts barrel export

## Phase 5: Layout Components
- [ ] SkipLink component
- [ ] Navigation component
- [ ] MobileMenu component with a11y
- [ ] Header component
- [ ] Footer component
- [ ] Layout wrapper component
- [ ] Create layout index.ts

## Phase 6: Data Layer
- [ ] Navigation data
- [ ] Services data
- [ ] Tech stack data
- [ ] Projects data with helpers
- [ ] Create data index.ts

## Phase 7: Core Pages
- [ ] Home page components (Hero, ServicesSection, FeaturedProjects)
- [ ] Home page assembled
- [ ] About page components (Journey, TechStack, SoftSkills)
- [ ] About page assembled
- [ ] Projects page components (ProjectCard, ProjectGrid)
- [ ] Projects page assembled
- [ ] Contact page components (ContactForm, SocialLinks)
- [ ] Contact page assembled
- [ ] NotFoundPage (404)

## Phase 8: API Integration
- [ ] useReducedMotion hook
- [ ] useMediaQuery hook
- [ ] useNews hook with SWR
- [ ] useEvents hook with SWR
- [ ] API utility functions
- [ ] Create hooks and api index files

## Phase 9: Dynamic Pages
- [ ] Project detail components (ProjectHero, ProjectOverview, ChallengesSection)
- [ ] ProjectDetailPage with dynamic routing
- [ ] News components (NewsCard, NewsList, CategoryTabs)
- [ ] NewsPage with tabs
- [ ] Events components (EventCard, EventList, EventFilters)
- [ ] EventsPage with filters
- [ ] Setup React Router in App.tsx
- [ ] Configure lazy loading for pages

## Phase 10: Accessibility & SEO
- [ ] SEO utility function
- [ ] Update index.html meta tags
- [ ] Create robots.txt
- [ ] Create sitemap.xml
- [ ] Verify keyboard navigation
- [ ] Verify screen reader compatibility
- [ ] Verify colour contrast

## Phase 11: Testing
- [ ] Install testing dependencies
- [ ] Configure Vitest
- [ ] Create test setup file
- [ ] Write Button component test
- [ ] Add test scripts to package.json
- [ ] Run tests successfully

## Phase 12: Deployment
- [ ] Build project locally
- [ ] Preview build locally
- [ ] Deploy to Netlify
- [ ] Configure custom domain (optional)
- [ ] Enable Netlify Forms
- [ ] Verify form submissions work

---

## Post-Launch Verification

### Lighthouse Scores (Target: 90+)
- [ ] Performance: ___
- [ ] Accessibility: ___
- [ ] Best Practices: ___
- [ ] SEO: ___

### Functional Testing
- [ ] All navigation links work
- [ ] All project detail pages load
- [ ] Contact form submits successfully
- [ ] News page loads content (or shows graceful error)
- [ ] Events page loads content (or shows graceful error)
- [ ] Mobile navigation works
- [ ] 404 page displays for invalid routes

### Accessibility Testing
- [ ] Tab through entire site
- [ ] Skip link works
- [ ] Focus visible on all interactive elements
- [ ] Screen reader announces content correctly
- [ ] No axe-core violations

### Content Review
- [ ] All placeholder content replaced
- [ ] All images optimized
- [ ] All external links work
- [ ] Social links point to correct profiles
- [ ] Privacy notice is accurate

---

## Git Commit Summary

Here are the recommended commit messages in order:

```bash
# Phase 1
git commit -m "chore: initial Vite + React + TypeScript setup"
git commit -m "chore: install core dependencies (react-router, swr, tailwind)"

# Phase 2
git commit -m "chore: add configuration files (TS, Tailwind, ESLint, Prettier, Netlify)"

# Phase 3
git commit -m "chore: create folder structure and base utility files"

# Phase 4
git commit -m "feat: add reusable UI components (Button, Card, Badge, Input, Textarea, Skeleton, Tabs)"

# Phase 5
git commit -m "feat: add layout components (Header, Footer, Navigation, MobileMenu, Layout)"

# Phase 6
git commit -m "feat: add data layer (navigation, services, tech stack, projects)"

# Phase 7
git commit -m "feat: add core pages (Home, About, Projects, Contact, 404)"

# Phase 8
git commit -m "feat: add API integration hooks (useNews, useEvents) and utilities"

# Phase 9
git commit -m "feat: add dynamic pages (ProjectDetail, News, Events) with routing"

# Phase 10
git commit -m "feat: add SEO meta tags, sitemap, and robots.txt"

# Phase 11
git commit -m "feat: add testing setup with Vitest and React Testing Library"

# Phase 12
git commit -m "chore: deployment configuration complete"
```

---

## Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once

# Git
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub

# Netlify
netlify login        # Login to Netlify CLI
netlify init         # Initialize project
netlify deploy       # Deploy draft
netlify deploy --prod # Deploy to production
```

---

## Estimated Timeline

| Phase | Time Estimate |
|-------|---------------|
| Phase 1-3: Setup | 2-3 hours |
| Phase 4-5: Components | 4-6 hours |
| Phase 6-7: Core Pages | 6-8 hours |
| Phase 8-9: API & Dynamic | 6-8 hours |
| Phase 10-11: A11y, SEO, Testing | 3-4 hours |
| Phase 12: Deployment | 1-2 hours |
| **Total** | **22-31 hours** |

---

Good luck with your build! 🚀

