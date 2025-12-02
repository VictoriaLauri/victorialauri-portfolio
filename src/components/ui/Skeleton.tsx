import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: 'rectangular' | 'circular' | 'text'
  /** Width - accepts any valid CSS value */
  width?: string | number
  /** Height - accepts any valid CSS value */
  height?: string | number
}

/**
 * Accessible skeleton loader using the design system.
 * Respects prefers-reduced-motion for the pulse animation.
 *
 * @example
 * <Skeleton width={200} height={20} />
 * <Skeleton variant="circular" width={48} height={48} />
 * <Skeleton variant="text" />
 */
function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    rectangular: 'skeleton',
    circular: 'skeleton skeleton-circular',
    text: 'skeleton skeleton-text',
  }

  return (
    <div
      className={cn(variantClasses[variant], className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  )
}

Skeleton.displayName = 'Skeleton'

/**
 * Pre-built skeleton for card layouts.
 * Matches the Card component structure.
 */
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('card', className)}>
      <Skeleton className="mb-4 h-40 w-full rounded-lg" />
      <Skeleton variant="text" className="mb-2 h-6 w-3/4" />
      <Skeleton variant="text" className="mb-4 h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-2/3" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

SkeletonCard.displayName = 'SkeletonCard'

/**
 * Pre-built skeleton for text blocks.
 * Last line is shorter for natural appearance.
 */
function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  )
}

SkeletonText.displayName = 'SkeletonText'

/**
 * Pre-built skeleton for avatar/profile images.
 */
function SkeletonAvatar({
  size = 48,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  )
}

SkeletonAvatar.displayName = 'SkeletonAvatar'

export { Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar }

