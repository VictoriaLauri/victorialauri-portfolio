import { cn } from '@/lib/utils'
import { forwardRef, type HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: 'default' | 'dark' | 'elevated'
  /** Content padding */
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

/**
 * Card container component using the design system.
 * Leverages CSS classes from index.css for consistent styling.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Project Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Description here...</CardContent>
 * </Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = 'default', padding = 'md', children, ...props },
    ref
  ) => {
    const variantClasses = {
      default: 'card',
      dark: 'card card-dark',
      elevated: 'card shadow-lg hover:shadow-xl transition-shadow',
    }

    const paddingClasses = {
      none: 'p-0',
      sm: 'p-4',
      md: '', // Uses default .card padding (1.5rem)
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

/**
 * Card header section - typically contains CardTitle
 */
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props} />
  )
)

CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level for semantic HTML */
  as?: 'h2' | 'h3' | 'h4'
}

/**
 * Card title - renders appropriate heading level
 * Inherits text color from parent (works with both default and dark variants)
 */
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('text-xl font-medium', className)}
      {...props}
    />
  )
)

CardTitle.displayName = 'CardTitle'

/**
 * Card content section
 * Uses slate color on light cards, inherits on dark cards
 */
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-slate', className)} {...props} />
  )
)

CardContent.displayName = 'CardContent'

/**
 * Optional card footer section
 */
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-silver', className)}
      {...props}
    />
  )
)

CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardFooter, CardHeader, CardTitle }
