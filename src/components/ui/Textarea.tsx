import { cn } from '@/lib/utils'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above the textarea */
  label?: string
  /** Error message - triggers error styling and aria-invalid */
  error?: string
  /** Helper text displayed below the textarea */
  helperText?: string
  /** Control resize behaviour */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

/**
 * Accessible textarea component using the design system.
 * Leverages CSS classes from index.css for consistent styling.
 *
 * @example
 * <Textarea label="Message" placeholder="Write your message..." rows={4} />
 * <Textarea label="Bio" error="Bio is required" required />
 * <Textarea label="Notes" helperText="Max 500 characters" resize="vertical" />
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, helperText, id, resize = 'vertical', ...props },
    ref
  ) => {
    // Generate stable ID from label if not provided
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const errorId = textareaId ? `${textareaId}-error` : undefined
    const helperId = textareaId ? `${textareaId}-helper` : undefined

    // Build aria-describedby based on what's present
    const describedBy =
      [error && errorId, helperText && !error && helperId]
        .filter(Boolean)
        .join(' ') || undefined

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-jet"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-coral" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={cn(
            'textarea',
            error && 'input-error',
            resizeClasses[resize],
            className
          )}
          {...props}
        />

        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-coral" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-sm text-slate">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }

