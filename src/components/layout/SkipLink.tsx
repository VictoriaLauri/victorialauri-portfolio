import { cn } from '@/lib/utils'

export interface SkipLinkProps {
  /** Target element ID to skip to (without #) */
  targetId?: string
  /** Link text for screen readers */
  children?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Accessible skip link for keyboard users.
 * Hidden until focused, then slides into view.
 * Required for WCAG 2.4.1 (Bypass Blocks).
 *
 * @example
 * // In your root layout:
 * <SkipLink />
 * <Header />
 * <main id="main-content">...</main>
 *
 * @example
 * // Custom target:
 * <SkipLink targetId="projects" children="Skip to projects" />
 */
function SkipLink({
  targetId = 'main-content',
  children = 'Skip to main content',
  className,
}: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className={cn('skip-link', className)}>
      {children}
    </a>
  )
}

SkipLink.displayName = 'SkipLink'

export { SkipLink }

