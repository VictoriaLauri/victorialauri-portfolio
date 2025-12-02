export default function App() {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-white p-8">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-4xl font-bold text-jet">Design System</h1>
            <p className="mt-2 text-lg text-slate">
              WCAG AA Compliant Color Palette
            </p>
          </header>

          {/* Color Palette */}
          <section aria-labelledby="colors-heading">
            <h2 id="colors-heading" className="mb-6 text-2xl font-bold text-jet">
              Color Palette
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-jet" />
                <p className="text-sm font-medium text-jet">Jet Black</p>
                <p className="text-xs text-slate">#2d3142</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-slate" />
                <p className="text-sm font-medium text-jet">Blue Slate</p>
                <p className="text-xs text-slate">#4f5d75</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-coral" />
                <p className="text-sm font-medium text-jet">Coral</p>
                <p className="text-xs text-slate">#c74f4d</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-coral-light" />
                <p className="text-sm font-medium text-jet">Light Coral</p>
                <p className="text-xs text-slate">#ebc4c1</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-silver" />
                <p className="text-sm font-medium text-jet">Silver</p>
                <p className="text-xs text-slate">#b2bdc7</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg border border-silver bg-white" />
                <p className="text-sm font-medium text-jet">White</p>
                <p className="text-xs text-slate">#ffffff</p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section aria-labelledby="buttons-heading">
            <h2
              id="buttons-heading"
              className="mb-6 text-2xl font-bold text-jet"
            >
              Buttons
            </h2>

            <div className="space-y-8">
              {/* Primary Buttons */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-jet">
                  Primary (Coral + White text – 4.51:1 ✓)
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <button type="button" className="btn-primary btn-sm">
                    Small
                  </button>
                  <button type="button" className="btn-primary">
                    Default Size
                  </button>
                  <button type="button" className="btn-primary btn-lg">
                    Large
                  </button>
                  <button type="button" className="btn-primary" disabled>
                    Disabled
                  </button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-jet">
                  Secondary (Blue Slate + White text – 6.65:1 ✓)
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <button type="button" className="btn-secondary btn-sm">
                    Small
                  </button>
                  <button type="button" className="btn-secondary">
                    Default Size
                  </button>
                  <button type="button" className="btn-secondary btn-lg">
                    Large
                  </button>
                  <button type="button" className="btn-secondary" disabled>
                    Disabled
                  </button>
                </div>
              </div>

              {/* Outline Buttons */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-jet">
                  Outline (Jet Black – 12.8:1 ✓✓)
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <button type="button" className="btn-outline btn-sm">
                    Small
                  </button>
                  <button type="button" className="btn-outline">
                    Default Size
                  </button>
                  <button type="button" className="btn-outline btn-lg">
                    Large
                  </button>
                  <button type="button" className="btn-outline" disabled>
                    Disabled
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Text & Links */}
          <section aria-labelledby="text-heading">
            <h2 id="text-heading" className="mb-6 text-2xl font-bold text-jet">
              Typography & Links
            </h2>
            <div className="space-y-4">
              <p className="text-jet">
                <strong>Body text (Jet on White – 12.8:1):</strong> This is the
                primary text color for maximum readability.
              </p>
              <p className="text-slate">
                <strong>Secondary text (Blue Slate – 6.65:1):</strong> Use for
                supporting content and metadata.
              </p>
              <p>
                <a href="#" className="text-link">
                  This is an accessible link
                </a>{' '}
                – Blue Slate underlined for clear identification.
              </p>
            </div>
          </section>

          {/* Form Inputs */}
          <section aria-labelledby="inputs-heading">
            <h2 id="inputs-heading" className="mb-6 text-2xl font-bold text-jet">
              Form Inputs
            </h2>
            <div className="max-w-md space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block font-medium text-jet">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-medium text-jet"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input"
                  placeholder="hello@example.com"
                />
              </div>
            </div>
          </section>

          {/* Badges */}
          <section aria-labelledby="badges-heading">
            <h2 id="badges-heading" className="mb-6 text-2xl font-bold text-jet">
              Badges
            </h2>
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary">Primary Badge</span>
              <span className="badge badge-secondary">Secondary Badge</span>
              <span className="badge badge-muted">Muted Badge</span>
            </div>
          </section>

          {/* Cards */}
          <section aria-labelledby="cards-heading">
            <h2 id="cards-heading" className="mb-6 text-2xl font-bold text-jet">
              Cards
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="card">
                <h3 className="text-lg font-bold text-jet">Light Card</h3>
                <p className="mt-2 text-slate">
                  Standard card with silver border and subtle shadow.
                </p>
                <button type="button" className="btn-primary mt-4">
                  Action
                </button>
              </div>
              <div className="rounded-xl bg-coral-light p-6">
                <h3 className="text-lg font-bold text-jet">Coral Card</h3>
                <p className="mt-2 text-jet">
                  Jet text on light coral (8.09:1 ✓✓✓)
                </p>
                <button type="button" className="btn-primary mt-4">
                  Action
                </button>
              </div>
              <div className="card card-dark">
                <h3 className="text-lg font-bold text-white">Dark Card</h3>
                <p className="mt-2 text-silver">
                  Silver text on jet (6.74:1 ✓)
                </p>
                <button type="button" className="btn-primary mt-4">
                  Action
                </button>
              </div>
            </div>
          </section>

          {/* Contrast Reference */}
          <section
            aria-labelledby="contrast-heading"
            className="rounded-lg bg-jet p-6"
          >
            <h2
              id="contrast-heading"
              className="mb-4 text-2xl font-bold text-white"
            >
              WCAG AA Contrast Reference
            </h2>
            <ul className="space-y-2 text-silver">
              <li>✅ Jet on White: 12.8:1 (AAA)</li>
              <li>✅ White on Jet: 12.8:1 (AAA)</li>
              <li>✅ Blue Slate on White: 6.65:1 (AA)</li>
              <li>✅ White on Blue Slate: 6.65:1 (AA)</li>
              <li>✅ White on Coral: 4.51:1 (AA)</li>
              <li>✅ Jet on Light Coral: 8.09:1 (AAA)</li>
              <li>✅ Silver on Jet: 6.74:1 (AA)</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
