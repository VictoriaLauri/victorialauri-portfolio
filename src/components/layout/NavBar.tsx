import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import logo from '@/assets/logos/logo_transparent.png'

export interface NavItem {
  /** Display label for the link */
  label: string
  /** URL path for the link */
  href: string
  /** Whether this link is currently active */
  isActive?: boolean
}

export interface NavBarProps {
  /** Navigation items to display */
  navItems?: NavItem[]
  /** Additional CSS classes */
  className?: string
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]

/**
 * Responsive navigation bar with logo, name, and nav links.
 * Includes accessible hamburger menu for mobile viewports.
 *
 * @example
 * <NavBar />
 *
 * @example
 * <NavBar navItems={[{ label: 'Home', href: '/', isActive: true }]} />
 */
function NavBar({ navItems = defaultNavItems, className }: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen, closeMobileMenu])

  // Focus first link when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen && firstLinkRef.current) {
      firstLinkRef.current.focus()
    }
  }, [isMobileMenuOpen])

  // Trap focus within mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !mobileMenuRef.current) return

      const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <header className={cn('navbar sticky top-0 z-50', className)}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo and Name */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          aria-label="Victoria Lauri - Home"
        >
          <img
            src={logo}
            alt=""
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            aria-hidden="true"
          />
          <span className="text-lg font-semibold tracking-tight text-coral sm:text-xl">
            Victoria Lauri
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  'inline-flex min-h-[44px] items-center px-3 py-2 text-base font-medium transition-colors',
                  'text-jet hover:text-coral',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral',
                  item.isActive && 'text-coral'
                )}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={toggleMobileMenu}
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded md:hidden',
            'text-jet hover:bg-silver/20 hover:text-coral',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral',
            'transition-colors'
          )}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {/* Hamburger / Close Icon */}
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-[60px] z-40 bg-jet/50 backdrop-blur-sm transition-opacity md:hidden',
          isMobileMenuOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        )}
        aria-hidden="true"
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={cn(
          'fixed right-0 top-[60px] z-50 h-[calc(100vh-60px)] w-72 bg-white shadow-xl md:hidden',
          'transform transition-transform duration-200 ease-out motion-reduce:transition-none',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <nav className="flex h-full flex-col p-4" aria-label="Mobile navigation">
          <ul className="space-y-1" role="list">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    'flex min-h-[48px] items-center rounded px-4 py-3 text-base font-medium transition-colors',
                    'text-jet hover:bg-coral-light hover:text-jet',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral',
                    item.isActive && 'bg-coral-light text-jet'
                  )}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

NavBar.displayName = 'NavBar'

export { NavBar }
