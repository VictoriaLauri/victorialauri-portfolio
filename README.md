# Victoria Lauri - Developer Portfolio

A personal portfolio website showcasing projects, skills, and professional journey. Built with modern React and TypeScript, focusing on performance, accessibility (WCAG 2.2 AA), and clean architecture.

## 🚀 Overview

This repository contains the source code for my personal portfolio. It serves as both a showcase of my work and a demonstration of my technical capabilities.

- **Live Site**: [victorialauri.com](https://victorialauri.netlify.app/)
- **Primary Stack**: React, TypeScript, Tailwind CSS, Vite

## ✨ Features

- **Responsive Design**: Fully responsive layout optimized for all device sizes.
- **Project Showcase**: Detailed case studies with gallery support.
- **Accessibility First**: Built to WCAG 2.2 AA standards (semantic HTML, skip links, visible focus, ARIA where needed).
- **Data-Driven Content**: Projects are managed via a structured data file for easy updates.
- **Integrated News**: Tech news feed integration.
- **Dark/Light Theme**: Support for system preferences (future update).

## 🛠 Tech Stack

### Frontend
- **React 19**: Component-based UI library.
- **TypeScript**: Static typing for reliability and developer experience.
- **Tailwind CSS v4**: Utility-first styling with modern CSS features.
- **React Router**: Client-side routing.
- **SWR**: Data fetching hooks.

### Tooling & Quality
- **Vite**: Next-generation frontend tooling.
- **Vitest**: Blazing fast unit test framework.
- **React Testing Library**: Behavioral testing for components.
- **ESLint & Prettier**: Code quality and formatting.

## 📂 Project Data Structure

The portfolio content is managed through a central data file, separating content from presentation. This allows for easy addition and reordering of projects without modifying component code.

### Managing Projects (`src/data/projects.ts`)

All portfolio projects are defined in `src/data/projects.ts`. This file exports an array of `Project` objects.

**To add a new project:**

1. Open `src/data/projects.ts`.
2. Add a new object to the **TOP** of the `projects` array (display order matches array order).
3. Follow the `Project` type structure defined in `src/types/index.ts`.

Example structure:

```typescript
{
  id: 'unique-id',
  slug: 'url-friendly-slug',
  title: 'Project Title',
  subtitle: 'Brief subtitle',
  shortDescription: 'One sentence description for cards.',
  overview: {
    what: '...',
    why: '...',
    who: '...'
  },
  role: 'Your role',
  techStack: [
    { name: 'React', category: 'frontend' },
    // ...
  ],
  images: ['image1.jpg', 'image2.jpg'], // Located in src/assets/images/projects/
  features: ['Feature 1', 'Feature 2'],
  // ... other fields
}
```

### Images
Project images should be placed in `src/assets/images/projects/` and referenced by filename in the `images` array.

## ♿ Accessibility

This project adheres to **WCAG 2.2 AA** guidelines:
- Semantic HTML5 landmarks (`main`, `nav`, `footer`).
- "Skip to content" link for keyboard users.
- Visible focus indicators for all interactive elements.
- Descriptive `alt` text for images.
- Respects `prefers-reduced-motion` settings.

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/victorialauri-portfolio.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Testing

Run the test suite (Vitest):
```bash
npm test
```

### Building for Production

Build the application:
```bash
npm run build
```

Preview the build locally:
```bash
npm run preview
```
