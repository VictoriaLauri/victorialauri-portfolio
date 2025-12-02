import { Outlet, useLocation } from 'react-router-dom'
import { SkipLink } from './SkipLink'
import { NavBar, type NavItem } from './NavBar'

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]

/**
 * Root layout component that wraps all pages.
 * Provides consistent navigation, skip link, and main content area.
 */
function RootLayout() {
  const location = useLocation()

  // Mark current route as active in nav
  const navItemsWithActive = navItems.map((item) => ({
    ...item,
    isActive: location.pathname === item.href,
  }))

  return (
    <>
      <SkipLink />
      <NavBar navItems={navItemsWithActive} />

      <main id="main-content" className="min-h-screen bg-white">
        <Outlet />
      </main>

      <footer className="border-t border-silver/30 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Victoria Lauri. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

RootLayout.displayName = 'RootLayout'

export { RootLayout }

