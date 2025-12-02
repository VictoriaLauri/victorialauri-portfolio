# Victoria Lauri Portfolio - Implementation Guide

**A Step-by-Step Guide for Junior Developers**

This guide walks you through building the Victoria Lauri portfolio website from scratch. Follow each step in order, and don't skip ahead until you've completed the current step.

---

## Table of Contents

1. [Phase 1: Project Setup](#phase-1-project-setup)
2. [Phase 2: Configuration Files](#phase-2-configuration-files)
3. [Phase 3: Folder Structure & Base Files](#phase-3-folder-structure--base-files)
4. [Phase 4: UI Components](#phase-4-ui-components)
5. [Phase 5: Layout Components](#phase-5-layout-components)
6. [Phase 6: Data Layer](#phase-6-data-layer)
7. [Phase 7: Pages - Core](#phase-7-pages---core)
8. [Phase 8: API Integration](#phase-8-api-integration)
9. [Phase 9: Pages - Dynamic](#phase-9-pages---dynamic)
10. [Phase 10: Accessibility & SEO](#phase-10-accessibility--seo)
11. [Phase 11: Testing](#phase-11-testing)
12. [Phase 12: Deployment](#phase-12-deployment)

---

## Prerequisites

Before starting, ensure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)
- A **GitHub account** - [Sign up](https://github.com/)
- A **Netlify account** - [Sign up](https://netlify.com/)

### Recommended VS Code Extensions

Install these extensions for the best development experience:

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - Tailwind autocomplete
4. **TypeScript Vue Plugin (Volar)** - Better TypeScript support
5. **axe Accessibility Linter** - Accessibility checking

---

## Phase 1: Project Setup

### Step 1.1: Create GitHub Repository

1. Go to [GitHub](https://github.com/) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Configure the repository:
   - **Repository name:** `victorialauri-portfolio`
   - **Description:** `Personal portfolio website showcasing full-stack development work`
   - **Visibility:** Public (recommended for portfolio)
   - **DO NOT** check "Add a README file" (Vite will create one)
   - **DO NOT** add .gitignore (Vite will create one)
4. Click **Create repository**
5. Keep this page open - you'll need the repository URL

### Step 1.2: Create Project with Vite

Open your terminal and navigate to where you want to create the project:

```bash
# Navigate to your development folder
cd ~/Documents/projects  # or wherever you keep your projects

# Create Vite project with React + TypeScript template
npm create vite@latest victorialauri-portfolio -- --template react-ts

# Navigate into the project folder
cd victorialauri-portfolio
```

### Step 1.3: Initialize Git & Connect to GitHub

```bash
# Initialize git (if not already done by Vite)
git init

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/victorialauri-portfolio.git

# Create initial commit
git add .
git commit -m "chore: initial Vite + React + TypeScript setup"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 1.4: Install Core Dependencies

```bash
# Install production dependencies
npm install react-router-dom swr clsx

# Install Tailwind CSS and its dependencies
npm install -D tailwindcss postcss autoprefixer

# Install development dependencies
npm install -D @types/node eslint prettier eslint-config-prettier eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

### Step 1.5: Initialize Tailwind CSS

```bash
# Generate Tailwind configuration files
npx tailwindcss init -p
```

This creates `tailwind.config.js` and `postcss.config.js`.

### Step 1.6: Verify Setup

```bash
# Start the development server
npm run dev
```

Open http://localhost:5173 in your browser. You should see the default Vite + React page.

**Press `Ctrl + C` to stop the server.**

### Step 1.7: Commit Progress

```bash
git add .
git commit -m "chore: install core dependencies (react-router, swr, tailwind)"
git push
```

---

## Phase 2: Configuration Files

### Step 2.1: Configure TypeScript (tsconfig.json)

Replace the contents of `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Step 2.2: Update Vite Configuration (vite.config.ts)

Replace `vite.config.ts` with:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

### Step 2.3: Configure Tailwind (tailwind.config.js)

Replace `tailwind.config.js` with:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### Step 2.4: Create PostCSS Configuration

The `postcss.config.js` should already exist. Verify it contains:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Step 2.5: Create ESLint Configuration

Create a new file `eslint.config.js`:

```javascript
import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...jsxA11y.configs.recommended.rules,
    },
  },
)
```

### Step 2.6: Create Prettier Configuration

Create a new file `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "jsxSingleQuote": false
}
```

### Step 2.7: Create Environment Variables Template

Create a new file `.env.example`:

```bash
# API Endpoints
VITE_TLDR_API_URL=https://your-tldr-backend.com/api
VITE_EVENTS_API_URL=https://api.meetup.com/graphql

# API Keys (DO NOT commit actual values)
VITE_MEETUP_API_KEY=your_meetup_api_key_here
```

Create `.env` (this file should be in `.gitignore`):

```bash
# Copy from .env.example and fill in real values
VITE_TLDR_API_URL=
VITE_EVENTS_API_URL=
VITE_MEETUP_API_KEY=
```

### Step 2.8: Update .gitignore

Make sure `.gitignore` includes:

```
# Logs
logs
*.log
npm-debug.log*

# Dependencies
node_modules
.pnp
.pnp.js

# Build
dist
dist-ssr
*.local

# Environment files
.env
.env.local
.env.*.local

# Editor directories
.vscode/*
!.vscode/extensions.json
.idea

# OS files
.DS_Store
Thumbs.db

# Testing
coverage
```

### Step 2.9: Create Netlify Configuration

Create a new file `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Step 2.10: Commit Configuration

```bash
git add .
git commit -m "chore: add configuration files (TS, Tailwind, ESLint, Prettier, Netlify)"
git push
```

---

## Phase 3: Folder Structure & Base Files

### Step 3.1: Create Folder Structure

Run these commands to create all necessary folders:

```bash
# Create main source folders
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/home
mkdir -p src/components/about
mkdir -p src/components/projects
mkdir -p src/components/news
mkdir -p src/components/events
mkdir -p src/components/contact

# Create other source folders
mkdir -p src/pages
mkdir -p src/lib/api
mkdir -p src/lib/hooks
mkdir -p src/lib/utils
mkdir -p src/data
mkdir -p src/types
mkdir -p src/styles

# Create public asset folders
mkdir -p public/assets/images/tech-icons
mkdir -p public/assets/projects

# Create test folders
mkdir -p tests/components
mkdir -p tests/pages
```

### Step 3.2: Create Base CSS File

Replace `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 9%;
    --primary: 142 76% 36%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;
    --accent: 0 0% 96%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 90%;
    --ring: 142 76% 36%;
    --radius: 0.5rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  /* Focus styles for accessibility */
  :focus-visible {
    @apply outline-none ring-2 ring-primary-500 ring-offset-2;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer components {
  .container {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  .section {
    @apply py-16 md:py-24;
  }

  .heading-1 {
    @apply text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl;
  }

  .heading-2 {
    @apply text-3xl font-bold tracking-tight sm:text-4xl;
  }

  .heading-3 {
    @apply text-2xl font-semibold tracking-tight;
  }

  .text-body {
    @apply text-base text-neutral-600 leading-relaxed;
  }

  .text-body-lg {
    @apply text-lg text-neutral-600 leading-relaxed;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .min-h-screen-nav {
    min-height: calc(100vh - 4rem);
  }
}
```

### Step 3.3: Create Type Definitions

Create `src/types/index.ts`:

```typescript
// Project Types
export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  thumbnail: string
  heroImage: string
  techStack: string[]
  features: string[]
  challenges: ChallengeItem[]
  learnings: string[]
  githubUrl: string
  liveUrl?: string
  featured: boolean
  order: number
}

export interface ChallengeItem {
  challenge: string
  solution: string
}

// News Types
export interface NewsArticle {
  id: string
  title: string
  source: string
  summary: string
  url: string
  category: NewsCategory
  publishedAt: string
}

export type NewsCategory = 'webdev' | 'ai' | 'security' | 'devops' | 'general'

// Event Types
export interface TechEvent {
  id: string
  name: string
  description: string
  dateTime: string
  endDateTime?: string
  format: 'online' | 'in-person' | 'hybrid'
  location?: string
  url: string
  organizer: string
}

// Navigation Types
export interface NavItem {
  label: string
  href: string
}

// Service Types
export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

// Tech Stack Types
export interface TechItem {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'tools' | 'databases'
}
```

### Step 3.4: Create Utility Functions

Create `src/lib/utils/cn.ts`:

```typescript
import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function to merge Tailwind CSS classes
 * Uses clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
```

Create `src/lib/utils/formatDate.ts`:

```typescript
/**
 * Format a date string for display
 */
export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(dateString)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-GB', options || defaultOptions)
}

/**
 * Format date and time for events
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Get relative time (e.g., "2 days ago", "in 3 hours")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000)
  const absSeconds = Math.abs(diffInSeconds)

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(absSeconds / interval.seconds)
    if (count >= 1) {
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
      return rtf.format(
        diffInSeconds > 0 ? count : -count,
        interval.label as Intl.RelativeTimeFormatUnit
      )
    }
  }

  return 'just now'
}
```

Create `src/lib/utils/index.ts`:

```typescript
export { cn } from './cn'
export { formatDate, formatDateTime, getRelativeTime } from './formatDate'
```

### Step 3.5: Commit Folder Structure

```bash
git add .
git commit -m "chore: create folder structure and base utility files"
git push
```

---

## Phase 4: UI Components

Now we'll build the reusable UI components. These are the building blocks for the entire application.

### Step 4.1: Create Button Component

Create `src/components/ui/Button.tsx`:

```tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
      outline:
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
      ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
    }

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-5 text-base',
      lg: 'h-13 px-8 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
```

### Step 4.2: Create Card Component

Create `src/components/ui/Card.tsx`:

```tsx
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'rounded-xl bg-white'

    const variants = {
      default: 'shadow-sm',
      elevated: 'shadow-lg hover:shadow-xl transition-shadow',
      outline: 'border border-neutral-200',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header subcomponent
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

// Card Title subcomponent
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold text-neutral-900', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

// Card Content subcomponent
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-neutral-600', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardContent }
```

### Step 4.3: Create Badge Component

Create `src/components/ui/Badge.tsx`:

```tsx
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'

  const variants = {
    default: 'bg-neutral-100 text-neutral-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-neutral-900 text-white',
    outline: 'border border-neutral-300 text-neutral-700',
  }

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}

export { Badge }
```

### Step 4.4: Create Input Component

Create `src/components/ui/Input.tsx`:

```tsx
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn(
            'flex h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-base text-neutral-900 placeholder:text-neutral-400',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
```

### Step 4.5: Create Textarea Component

Create `src/components/ui/Textarea.tsx`:

```tsx
import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          className={cn(
            'flex min-h-[120px] w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50',
            'resize-y',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
```

### Step 4.6: Create Skeleton Component

Create `src/components/ui/Skeleton.tsx`:

```tsx
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-200', className)}
      aria-hidden="true"
    />
  )
}

// Pre-built skeleton variants
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-neutral-200 p-6">
      <Skeleton className="mb-4 h-40 w-full rounded-lg" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonText }
```

### Step 4.7: Create ErrorMessage Component

Create `src/components/ui/ErrorMessage.tsx`:

```tsx
import { Button } from './Button'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

function ErrorMessage({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-8 text-center"
      role="alert"
    >
      <svg
        className="mb-4 h-12 w-12 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h3 className="mb-2 text-lg font-semibold text-red-800">{title}</h3>
      <p className="mb-4 text-red-600">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}

export { ErrorMessage }
```

### Step 4.8: Create Tabs Component

Create `src/components/ui/Tabs.tsx`:

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Context
interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

// Main Tabs component
interface TabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

// TabsList component
interface TabsListProps {
  children: ReactNode
  className?: string
  'aria-label': string
}

function TabsList({ children, className, 'aria-label': ariaLabel }: TabsListProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'flex gap-1 overflow-x-auto rounded-lg bg-neutral-100 p-1',
        className
      )}
    >
      {children}
    </div>
  )
}

// TabsTrigger component
interface TabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
}

function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext()
  const isActive = activeTab === value

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTab(value)}
      className={cn(
        'whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        isActive
          ? 'bg-white text-neutral-900 shadow-sm'
          : 'text-neutral-600 hover:text-neutral-900',
        className
      )}
    >
      {children}
    </button>
  )
}

// TabsContent component
interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

function TabsContent({ value, children, className }: TabsContentProps) {
  const { activeTab } = useTabsContext()

  if (activeTab !== value) return null

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={cn('mt-4 focus-visible:outline-none', className)}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

### Step 4.9: Create UI Components Index

Create `src/components/ui/index.ts`:

```typescript
export { Button, type ButtonProps } from './Button'
export { Card, CardHeader, CardTitle, CardContent, type CardProps } from './Card'
export { Badge, type BadgeProps } from './Badge'
export { Input, type InputProps } from './Input'
export { Textarea, type TextareaProps } from './Textarea'
export { Skeleton, SkeletonCard, SkeletonText } from './Skeleton'
export { ErrorMessage } from './ErrorMessage'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'
```

### Step 4.10: Commit UI Components

```bash
git add .
git commit -m "feat: add reusable UI components (Button, Card, Badge, Input, Textarea, Skeleton, Tabs)"
git push
```

---

## Phase 5: Layout Components

### Step 5.1: Create Skip Link Component

Create `src/components/layout/SkipLink.tsx`:

```tsx
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  )
}

export { SkipLink }
```

### Step 5.2: Create Navigation Component

Create `src/components/layout/Navigation.tsx`:

```tsx
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { navigation } from '@/data/navigation'

interface NavigationProps {
  mobile?: boolean
  onItemClick?: () => void
}

function Navigation({ mobile = false, onItemClick }: NavigationProps) {
  const baseStyles = mobile
    ? 'flex flex-col space-y-1'
    : 'hidden md:flex md:items-center md:space-x-1'

  const linkBaseStyles = mobile
    ? 'block rounded-lg px-4 py-3 text-base font-medium transition-colors'
    : 'rounded-lg px-4 py-2 text-sm font-medium transition-colors'

  return (
    <nav className={baseStyles} aria-label={mobile ? 'Mobile navigation' : 'Main navigation'}>
      {navigation.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          onClick={onItemClick}
          className={({ isActive }) =>
            cn(
              linkBaseStyles,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export { Navigation }
```

### Step 5.3: Create Mobile Menu Component

Create `src/components/layout/MobileMenu.tsx`:

```tsx
import { useEffect, useRef } from 'react'
import { Navigation } from './Navigation'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Handle escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus trap and body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll
      document.body.style.overflow = 'hidden'
      // Focus the close button
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4">
          <span className="text-lg font-semibold text-neutral-900">Menu</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Close menu"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <Navigation mobile onItemClick={onClose} />
        </div>
      </div>
    </>
  )
}

export { MobileMenu }
```

### Step 5.4: Create Header Component

Create `src/components/layout/Header.tsx`:

```tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Victoria Lauri
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  )
}

export { Header }
```

### Step 5.5: Create Footer Component

Create `src/components/layout/Footer.tsx`:

```tsx
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/victorialauri',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Branding */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-lg font-bold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Victoria Lauri
            </Link>
            <p className="mt-1 text-sm text-neutral-600">
              Full-Stack Developer • London, UK
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-label={`Visit my ${link.name} profile`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-neutral-200 pt-8 text-center">
          <p className="text-sm text-neutral-500">
            © {currentYear} Victoria Lauri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
```

### Step 5.6: Create Layout Component

Create `src/components/layout/Layout.tsx`:

```tsx
import { Outlet } from 'react-router-dom'
import { SkipLink } from './SkipLink'
import { Header } from './Header'
import { Footer } from './Footer'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export { Layout }
```

### Step 5.7: Create Layout Index

Create `src/components/layout/index.ts`:

```typescript
export { SkipLink } from './SkipLink'
export { Navigation } from './Navigation'
export { MobileMenu } from './MobileMenu'
export { Header } from './Header'
export { Footer } from './Footer'
export { Layout } from './Layout'
```

### Step 5.8: Commit Layout Components

```bash
git add .
git commit -m "feat: add layout components (Header, Footer, Navigation, MobileMenu, Layout)"
git push
```

---

*Continued in Part 2...*

