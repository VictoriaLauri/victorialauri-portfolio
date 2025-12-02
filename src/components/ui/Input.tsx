import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string
  /** Error message - triggers error styling and aria-invalid */
  error?: string
  /** Helper text displayed below the input */
  helperText?: string
}

/**
 * Accessible input component using the design system.
 * Leverages CSS classes from index.css for consistent styling.
 *
 * @example
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * <Input label="Name" error="Name is required" required />
 * <Input label="Bio" helperText="Max 200 characters" />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    // Generate stable ID from label if not provided
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const errorId = inputId ? `${inputId}-error` : undefined
    const helperId = inputId ? `${inputId}-helper` : undefined

    // Build aria-describedby based on what's present
    const describedBy = [
      error && errorId,
      helperText && !error && helperId,
    ]
      .filter(Boolean)
      .join(' ') || undefined

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
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

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={cn('input', error && 'input-error', className)}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-sm text-coral"
            role="alert"
          >
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

Input.displayName = 'Input'

export { Input }

