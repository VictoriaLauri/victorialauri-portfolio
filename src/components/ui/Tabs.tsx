import { cn } from '@/lib/utils'
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type KeyboardEvent,
} from 'react'

// ============================================
// Context
// ============================================
interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

// ============================================
// Tabs (Root)
// ============================================
export interface TabsProps {
  /** The default active tab value */
  defaultValue: string
  /** Tab content */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Accessible tabs component using the design system.
 * Supports keyboard navigation (Arrow keys, Home, End).
 *
 * @example
 * <Tabs defaultValue="skills">
 *   <TabsList aria-label="Profile sections">
 *     <TabsTrigger value="skills">Skills</TabsTrigger>
 *     <TabsTrigger value="experience">Experience</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="skills">Skills content...</TabsContent>
 *   <TabsContent value="experience">Experience content...</TabsContent>
 * </Tabs>
 */
function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

Tabs.displayName = 'Tabs'

// ============================================
// TabsList
// ============================================
export interface TabsListProps {
  /** Tab triggers */
  children: ReactNode
  /** Accessible label for the tab list */
  'aria-label': string
  /** Additional CSS classes */
  className?: string
}

/**
 * Container for tab triggers with keyboard navigation.
 */
function TabsList({
  children,
  className,
  'aria-label': ariaLabel,
}: TabsListProps) {
  const listRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]:not([disabled])'
    )
    if (!tabs?.length) return

    const currentIndex = Array.from(tabs).findIndex(
      (tab) => tab === document.activeElement
    )
    if (currentIndex === -1) return

    let nextIndex: number | null = null

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % tabs.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = tabs.length - 1
        break
    }

    if (nextIndex !== null) {
      event.preventDefault()
      tabs[nextIndex].focus()
      tabs[nextIndex].click()
    }
  }, [])

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn('tabs-list', className)}
    >
      {children}
    </div>
  )
}

TabsList.displayName = 'TabsList'

// ============================================
// TabsTrigger
// ============================================
export interface TabsTriggerProps {
  /** Unique value to identify this tab */
  value: string
  /** Tab label */
  children: ReactNode
  /** Disable this tab */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Individual tab trigger button.
 */
function TabsTrigger({
  value,
  children,
  disabled = false,
  className,
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext()
  const isActive = activeTab === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={cn(
        'tabs-trigger',
        isActive && 'tabs-trigger-active',
        className
      )}
    >
      {children}
    </button>
  )
}

TabsTrigger.displayName = 'TabsTrigger'

// ============================================
// TabsContent
// ============================================
export interface TabsContentProps {
  /** Value matching a TabsTrigger */
  value: string
  /** Panel content */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Content panel for a tab.
 */
function TabsContent({ value, children, className }: TabsContentProps) {
  const { activeTab } = useTabsContext()

  if (activeTab !== value) return null

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={cn('tabs-content', className)}
    >
      {children}
    </div>
  )
}

TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }

