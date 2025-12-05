import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useEffect, useRef, useState, type FormEvent } from 'react'

/**
 * Contact page - Contact form and information
 * Features:
 * - Netlify-compatible contact form
 * - Client-side validation
 * - Security: Rate limiting, Honeypot, Link blocking
 * - Direct contact links (Email, LinkedIn)
 * - Accessible form fields
 */
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    // Honeypot field - must stay empty
    botField: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Rate limiting: Time tracking
  // Initialize to 0, set on mount to avoid hydration mismatches
  const startTime = useRef<number>(0)

  useEffect(() => {
    startTime.current = Date.now()
  }, [])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    const { name, email, message, botField } = formData

    // 1. Honeypot check (Bot detection)
    if (botField) {
      // Silently fail or pretend to succeed without sending
      return false
    }

    // 2. Rate limiting (Time-based)
    const timeElapsed = Date.now() - startTime.current
    if (timeElapsed < 2000) {
      // Less than 2 seconds to fill form = likely bot
      return false
    }

    // 3. Name validation: min 2 chars
    if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.'
    }

    // 4. Email validation: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    // 5. Message validation: 10-300 chars + Link blocking
    const messageTrimmed = message.trim()
    const messageLen = messageTrimmed.length

    if (messageLen < 10) {
      newErrors.message = 'Message must be at least 10 characters long.'
    } else if (messageLen > 300) {
      newErrors.message = 'Message cannot exceed 300 characters.'
    } else {
      // Link detection regex
      const linkRegex =
        /(http:\/\/|https:\/\/|www\.|[a-zA-Z0-9]+\.(com|org|net|io|info|biz))/i
      if (linkRegex.test(messageTrimmed)) {
        newErrors.message =
          'For security reasons, messages cannot contain links.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Basic validation check
    const isValid = validate()

    // Even if valid, if bot detection triggered (returning false but no errors set),
    // we prevent default to stop Netlify submission.
    if (!isValid) {
      e.preventDefault()

      // If honeypot caught a bot, we might want to just stop here silently
      if (formData.botField) return

      return
    }

    // If validation passes, we let the form submit naturally to Netlify
    setIsSubmitting(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <div className='bg-white'>
      {/* Header */}
      <section className='border-b border-silver/30 bg-linear-to-br from-silver/40 via-coral-light/40 to-slate/30'>
        <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16'>
          <h1 className='text-3xl font-bold tracking-tight text-jet sm:text-4xl lg:text-5xl'>
            Contact
          </h1>
          <p className='mt-3 max-w-2xl text-base text-slate sm:text-lg'>
            Have a project in mind or want to chat? I'm always open to
            discussing new projects, creative ideas or opportunities to be part
            of your visions.
          </p>
        </div>
      </section>

      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid gap-12 lg:grid-cols-2'>
          {/* Contact Form */}
          <div>
            <h2 className='text-2xl font-bold text-jet'>Send a message</h2>
            <form
              name='contact'
              method='POST'
              data-netlify='true'
              netlify-honeypot='bot-field'
              className='mt-8 space-y-6'
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Hidden input for Netlify form handling */}
              <input type='hidden' name='form-name' value='contact' />

              {/* Honeypot Field - Hidden from users, visible to bots */}
              <p className='hidden'>
                <label>
                  Don’t fill this out if you’re human:
                  <input
                    name='botField'
                    value={formData.botField}
                    onChange={handleChange}
                  />
                </label>
              </p>

              <Input
                label='Name'
                name='name'
                type='text'
                placeholder='Your name'
                required
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                label='Email'
                name='email'
                type='email'
                placeholder='you@example.com'
                required
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Textarea
                label='Message'
                name='message'
                placeholder='Tell me about your project...'
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                helperText={`${formData.message.length}/300 characters`}
              />

              <Button
                type='submit'
                className='w-full sm:w-auto'
                isLoading={isSubmitting}
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Connect Section */}
          <div>
            <h2 className='text-2xl font-bold text-jet'>Connect directly</h2>
            <p className='mt-4 text-base text-slate'>
              Prefer email or social media? You can also reach me through these
              channels.
            </p>

            <div className='mt-8 flex flex-col gap-4'>
              {/* Obfuscated Email Link to prevent static scraping */}
              {(() => {
                const user = 'hello'
                const domain = 'victorialauri.com'
                const email = `${user}@${domain}`

                return (
                  <a
                    href={`mailto:${email}`}
                    className='flex items-center gap-3 rounded-md border border-silver/50 p-4 transition-colors hover:border-coral hover:bg-silver/10'
                  >
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-coral-light/30 text-coral'>
                      <svg
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-medium text-jet'>Email</h3>
                      <p className='select-none text-sm text-slate'>{email}</p>
                    </div>
                  </a>
                )
              })()}

              <a
                href='https://www.linkedin.com/in/victorialauri/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 rounded-md border border-silver/50 p-4 transition-colors hover:border-coral hover:bg-silver/10'
              >
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-coral-light/30 text-coral'>
                  <svg
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-medium text-jet'>LinkedIn</h3>
                  <p className='text-sm text-slate'>Connect on LinkedIn</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
