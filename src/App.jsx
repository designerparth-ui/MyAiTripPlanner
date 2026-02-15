const destinations = [
  { city: 'Tokyo', country: 'Japan', budget: '$2,100', days: 7 },
  { city: 'Rome', country: 'Italy', budget: '$1,650', days: 5 },
  { city: 'Bali', country: 'Indonesia', budget: '$1,200', days: 6 },
]

const checklist = [
  'Passport and visa check',
  'Flight and hotel confirmation',
  'Insurance and emergency contacts',
  'Local transport and maps',
]

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="hero__eyebrow">My Trip Planner</p>
        <h1>Plan once, travel smoothly on every device</h1>
        <p className="hero__copy">
          Build your route, budget, and checklist in one place. The layout adapts
          for phone, tablet, and desktop screens.
        </p>
      </header>

      <main className="dashboard">
        <section className="panel panel--form">
          <h2>Quick Plan</h2>
          <form className="trip-form">
            <label>
              Destination
              <input type="text" placeholder="e.g. Barcelona" />
            </label>
            <label>
              Travelers
              <input type="number" min="1" defaultValue="2" />
            </label>
            <label>
              Budget
              <input type="text" placeholder="$1500" />
            </label>
            <label>
              Dates
              <input type="text" placeholder="15 Apr - 22 Apr" />
            </label>
            <button type="button">Create Plan</button>
          </form>
        </section>

        <section className="panel panel--cards">
          <div className="panel__heading">
            <h2>Popular Plans</h2>
            <span>Responsive cards</span>
          </div>
          <div className="cards">
            {destinations.map((item) => (
              <article key={item.city} className="destination">
                <h3>
                  {item.city}, {item.country}
                </h3>
                <p>{item.days} days</p>
                <p>Avg. budget {item.budget}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel panel--checklist">
          <h2>Trip Checklist</h2>
          <ul>
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
