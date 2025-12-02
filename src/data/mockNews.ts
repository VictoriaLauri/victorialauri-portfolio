import type { NewsResponse } from '@/types'

/**
 * Mock news data for development and testing
 * This data simulates the response from the news API
 */
export const mockNewsData: NewsResponse = {
  sections: [
    {
      title: 'Headlines',
      items: [
        {
          id: 'mock-1',
          title:
            'React 19 Released: What You Need to Know About the Latest Features',
          url: 'https://react.dev/blog/2024/04/25/react-19',
          source: 'react.dev',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
        },
        {
          id: 'mock-2',
          title:
            'TypeScript 5.4 Brings New Type Inference Improvements and Performance Boosts',
          url: 'https://devblogs.microsoft.com/typescript/',
          source: 'microsoft.com',
          image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
        },
        {
          id: 'mock-3',
          title:
            'CSS Container Queries Are Now Supported in All Major Browsers',
          url: 'https://web.dev/articles/cq-stable',
          source: 'web.dev',
          image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=250&fit=crop',
        },
      ],
    },
    {
      title: 'Articles',
      items: [
        {
          id: 'mock-4',
          title:
            'Building Accessible Web Applications: A Comprehensive Guide to WCAG 2.2',
          url: 'https://www.a11yproject.com/',
          source: 'a11yproject.com',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
        },
        {
          id: 'mock-5',
          title: 'The Future of JavaScript: ECMAScript 2024 Features Preview',
          url: 'https://tc39.es/ecma262/',
          source: 'tc39.es',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
        },
        {
          id: 'mock-6',
          title:
            'Tailwind CSS v4.0 Alpha: A Complete Rewrite with Lightning Fast Builds',
          url: 'https://tailwindcss.com/blog',
          source: 'tailwindcss.com',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
        },
        {
          id: 'mock-7',
          title:
            'Web Components in 2024: Why More Teams Are Adopting Them',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_components',
          source: 'mozilla.org',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
        },
        {
          id: 'mock-8',
          title:
            'Node.js v22: Native TypeScript Support and Performance Improvements',
          url: 'https://nodejs.org/en/blog',
          source: 'nodejs.org',
          image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop',
        },
      ],
    },
  ],
}

/**
 * Mock news data by category for different tabs
 */
export const mockNewsByCategory: Record<string, NewsResponse> = {
  webdev: mockNewsData,
  tech: {
    sections: [
      {
        title: 'Tech Headlines',
        items: [
          {
            id: 'tech-1',
            title: 'Apple Announces New M4 Chips with Advanced AI Capabilities',
            url: 'https://www.apple.com/newsroom/',
            source: 'apple.com',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop',
          },
          {
            id: 'tech-2',
            title: 'Google DeepMind Achieves Breakthrough in Protein Structure Prediction',
            url: 'https://deepmind.google/',
            source: 'deepmind.google',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
          },
          {
            id: 'tech-3',
            title: 'Microsoft Copilot Gets Major Update with New Coding Features',
            url: 'https://blogs.microsoft.com/',
            source: 'microsoft.com',
            image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=250&fit=crop',
          },
        ],
      },
    ],
  },
  ai: {
    sections: [
      {
        title: 'AI Headlines',
        items: [
          {
            id: 'ai-1',
            title: 'Claude 3.5 Sonnet Sets New Benchmarks in AI Reasoning',
            url: 'https://www.anthropic.com/',
            source: 'anthropic.com',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
          },
          {
            id: 'ai-2',
            title: 'OpenAI Introduces GPT-5 with Multimodal Capabilities',
            url: 'https://openai.com/blog/',
            source: 'openai.com',
            image: 'https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=400&h=250&fit=crop',
          },
          {
            id: 'ai-3',
            title: 'Hugging Face Releases Open-Source Alternative to GPT-4',
            url: 'https://huggingface.co/blog',
            source: 'huggingface.co',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop',
          },
        ],
      },
    ],
  },
  product: {
    sections: [
      {
        title: 'Product Headlines',
        items: [
          {
            id: 'product-1',
            title: 'How to Build Products Users Actually Want: A PM Guide',
            url: 'https://www.productboard.com/blog/',
            source: 'productboard.com',
            image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=250&fit=crop',
          },
          {
            id: 'product-2',
            title: 'The Art of Product Discovery: Finding Product-Market Fit',
            url: 'https://www.intercom.com/blog/',
            source: 'intercom.com',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
          },
          {
            id: 'product-3',
            title: 'Building a Product Roadmap That Actually Works',
            url: 'https://www.atlassian.com/agile/',
            source: 'atlassian.com',
            image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=250&fit=crop',
          },
        ],
      },
    ],
  },
  devops: {
    sections: [
      {
        title: 'DevOps Headlines',
        items: [
          {
            id: 'devops-1',
            title: 'Kubernetes 1.30 Brings Enhanced Security Features',
            url: 'https://kubernetes.io/blog/',
            source: 'kubernetes.io',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop',
          },
          {
            id: 'devops-2',
            title: 'GitHub Actions: New Workflow Features for Faster CI/CD',
            url: 'https://github.blog/',
            source: 'github.blog',
            image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=250&fit=crop',
          },
          {
            id: 'devops-3',
            title: 'Docker Desktop 5.0: Container Development Reimagined',
            url: 'https://www.docker.com/blog/',
            source: 'docker.com',
            image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop',
          },
        ],
      },
    ],
  },
  security: {
    sections: [
      {
        title: 'Security Headlines',
        items: [
          {
            id: 'security-1',
            title: 'Critical Vulnerability Found in Popular npm Package',
            url: 'https://www.cisa.gov/news',
            source: 'cisa.gov',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
          },
          {
            id: 'security-2',
            title: 'Zero Trust Architecture: Best Practices for 2024',
            url: 'https://www.sans.org/blog/',
            source: 'sans.org',
            image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=250&fit=crop',
          },
          {
            id: 'security-3',
            title: 'How to Secure Your REST APIs: A Complete Guide',
            url: 'https://owasp.org/',
            source: 'owasp.org',
            image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop',
          },
        ],
      },
    ],
  },
  design: {
    sections: [
      {
        title: 'Design Headlines',
        items: [
          {
            id: 'design-1',
            title: 'Figma Introduces AI-Powered Design Tools',
            url: 'https://www.figma.com/blog/',
            source: 'figma.com',
            image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop',
          },
          {
            id: 'design-2',
            title: 'Design Systems: Building for Scale and Consistency',
            url: 'https://www.designsystems.com/',
            source: 'designsystems.com',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
          },
          {
            id: 'design-3',
            title: 'Motion Design Trends That Will Dominate in 2024',
            url: 'https://www.smashingmagazine.com/',
            source: 'smashingmagazine.com',
            image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop',
          },
        ],
      },
    ],
  },
}

