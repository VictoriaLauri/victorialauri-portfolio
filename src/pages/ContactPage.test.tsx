import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import ContactPage from './ContactPage'

describe('ContactPage Form Validation', () => {
  // Mock Date.now to control rate limiting tests
  const realDateNow = Date.now.bind(global.Date)
  const START_TIME = 1000

  beforeEach(() => {
    // Reset date mock before each test
    global.Date.now = vi.fn(() => START_TIME)
  })

  afterEach(() => {
    // Restore real Date.now
    global.Date.now = realDateNow
    vi.clearAllMocks()
  })

  test('validates minimum name length', () => {
    render(<ContactPage />)
    const nameInput = screen.getByLabelText(/name/i)
    const submitBtn = screen.getByRole('button', { name: /send message/i })

    // Simulate fast-forwarding time to bypass rate limit
    global.Date.now = vi.fn(() => START_TIME + 5000)

    fireEvent.change(nameInput, { target: { value: 'A' } })
    fireEvent.click(submitBtn)

    expect(
      screen.getByText(/name must be at least 2 characters long/i)
    ).toBeInTheDocument()
  })

  test('validates email format', () => {
    render(<ContactPage />)
    const emailInput = screen.getByLabelText(/email/i)
    const submitBtn = screen.getByRole('button', { name: /send message/i })

    global.Date.now = vi.fn(() => START_TIME + 5000)

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitBtn)

    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument()
  })

  test('validates message length', () => {
    render(<ContactPage />)
    const messageInput = screen.getByLabelText(/message/i)
    const submitBtn = screen.getByRole('button', { name: /send message/i })

    global.Date.now = vi.fn(() => START_TIME + 5000)

    // Too short
    fireEvent.change(messageInput, { target: { value: 'Short' } })
    fireEvent.click(submitBtn)
    expect(
      screen.getByText(/message must be at least 10 characters long/i)
    ).toBeInTheDocument()
  })

  test('blocks messages containing links', () => {
    render(<ContactPage />)
    const messageInput = screen.getByLabelText(/message/i)
    const submitBtn = screen.getByRole('button', { name: /send message/i })

    global.Date.now = vi.fn(() => START_TIME + 5000)

    const linksToTest = [
      'Check out http://example.com',
      'Visit https://site.org',
      'Go to www.google.com',
      'spam.biz is bad',
      'my-site.net/page',
    ]

    linksToTest.forEach((link) => {
      fireEvent.change(messageInput, {
        target: { value: `Here is a link: ${link}` },
      })
      fireEvent.click(submitBtn)
      expect(
        screen.getByText(/messages cannot contain links/i)
      ).toBeInTheDocument()
    })
  })

  test('allows valid submission', () => {
    render(<ContactPage />)
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitBtn = screen.getByRole('button', { name: /send message/i })

    global.Date.now = vi.fn(() => START_TIME + 5000)

    fireEvent.change(nameInput, { target: { value: 'Valid Name' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(messageInput, {
      target: { value: 'This is a valid message with no links.' },
    })

    fireEvent.click(submitBtn)

    // Should verify submitting state or lack of errors
    expect(screen.queryByText(/name must be/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/message must be/i)).not.toBeInTheDocument()
  })

  test('rate limiting blocks fast submissions', () => {
    render(<ContactPage />)
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitBtn = screen.getByRole('button', { name: /send message/i })

    // Time has NOT advanced (simulating instant submission)
    // global.Date.now still returns START_TIME

    fireEvent.change(nameInput, { target: { value: 'Fast Bot' } })
    fireEvent.change(emailInput, { target: { value: 'bot@spam.com' } })
    fireEvent.change(messageInput, {
      target: { value: 'I am typing super fast!' },
    })

    fireEvent.click(submitBtn)

    // We can't easily check internal state in this integration test without mocking the submit handler,
    // but we can verify that the button did NOT show loading state (which implies submission didn't start)
    expect(submitBtn).not.toHaveAttribute('aria-busy', 'true')
  })
})
