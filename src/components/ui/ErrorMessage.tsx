import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'
import { Button } from './Button'

export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  /** Error title */
  title?: string
  /** Error description */
  message: string
  /** Optional retry callback - shows retry button when provided */
  onRetry?: () => void
  /** Retry button text */
  retryLabel?: string
  /** Visual variant */
  variant?: 'default' | 'inline'
}

/**
 * Accessible error message component using the design system.
 * Automatically announces to screen readers via role="alert".
 *
 * @example
 * <ErrorMessage message="Failed to load projects" />
 * <ErrorMessage
 *   title="Connection Error"
 *   message="Please check your internet connection"
 *   onRetry={() => refetch()}
 * />
 * <ErrorMessage variant="inline" message="Invalid email format" />
 */
function ErrorMessage({
  className,
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try Again',
  variant = 'default',
  ...props
}: ErrorMessageProps) {
  if (variant === 'inline') {
    return (
      <p
        className={cn('error-message-inline', className)}
        role="alert"
        {...props}
      >
        {message}
      </p>
    )
  }

  return (
    <div
      className={cn('error-message', className)}
      role="alert"
      {...props}
    >
      <svg
        className="error-message-icon"
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
      <h3 className="error-message-title">{title}</h3>
      <p className="error-message-text">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-4">
          {retryLabel}
        </Button>
      )}
    </div>
  )
}

ErrorMessage.displayName = 'ErrorMessage'

export { ErrorMessage }

