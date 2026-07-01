import { useEffect, useRef, useState } from 'react'

const S = (name) => `./screenshots/${name}`

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand">
          <img src="./app-icon.png" alt="Tinto app icon" />
          Tinto
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#owners">For cafes</a>
          <a href="#download" className="btn btn-primary">Get the app</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container hero-inner">
        <div>
          <span className="eyebrow">☕ Loyalty & discovery for coffee lovers</span>
          <h1>
            Your neighborhood coffee, <em>rewarded</em>.
          </h1>
          <p className="lede">
            Tinto helps you find great local cafes, check in with a quick QR
            scan, and collect stamps toward free coffee — every loyalty card
            you'll ever need, in one app.
          </p>
          <div className="hero-ctas">
            <a href="#download" className="btn btn-crail">Download for iOS</a>
            <a href="#owners" className="btn btn-ghost">I own a cafe</a>
          </div>
          <p className="hero-note">Free for customers. Simple for cafes.</p>
        </div>
        <div className="hero-phones">
          <img
            className="phone phone-main"
            src={S('03-loyalty-card.png')}
            alt="Tinto loyalty card screen with coffee cup stamps"
          />
          <img
            className="phone phone-back"
            src={S('01-explore.png')}
            alt="Tinto explore screen listing local cafes"
          />
        </div>
      </div>
    </header>
  )
}

const FEATURES = [
  {
    icon: '🔍',
    title: 'Discover your next favorite cafe',
    body: 'Browse and search local coffee shops near you. See photos, ratings, and what the community is saying before you go.',
    bullets: ['Search cafes by name', 'Photos and community reviews', 'Cafe details at a glance'],
    img: '01-explore.png',
    alt: 'Explore screen with a searchable list of cafes',
  },
  {
    icon: '📷',
    title: 'Check in with a single scan',
    body: 'Point your camera at the cafe\'s QR code — at the counter or on the wall — and your visit is recorded instantly. No punch cards, no apps-per-cafe.',
    bullets: ['Works with counter or printed codes', 'Instant confirmation', 'Secure, single-use codes'],
    img: '09-checkin-scan.png',
    alt: 'QR scan screen for checking in at a cafe',
    reverse: true,
  },
  {
    icon: '☕',
    title: 'Collect stamps, earn free coffee',
    body: 'Every check-in stamps your loyalty card. Fill the card, then slide to redeem your reward right at the counter — with a little confetti to celebrate.',
    bullets: ['All your loyalty cards in one place', 'Slide-to-redeem rewards', 'Past rewards history'],
    img: '12-checkin-stamp.png',
    alt: 'Loyalty card celebrating a newly earned stamp with confetti',
  },
  {
    icon: '⭐',
    title: 'Share the love',
    body: 'Rate your visits and leave reviews to help fellow coffee lovers find the good stuff. Browse photo galleries uploaded by cafe owners.',
    bullets: ['1–5 star ratings with comments', 'Average rating summaries', 'Cafe photo carousels'],
    img: '04-reviews.png',
    alt: 'Reviews screen with star ratings and comments',
    reverse: true,
  },
]

function Features() {
  return (
    <section id="features">
      <div className="container">
        <Reveal className="section-head">
          <h2>Everything a coffee habit deserves</h2>
          <p>
            From finding a new spot to cashing in a free cup, Tinto keeps the
            whole ritual in your pocket.
          </p>
        </Reveal>
        {FEATURES.map((f) => (
          <Reveal key={f.title}>
            <div className={`feature-row ${f.reverse ? 'reverse' : ''}`}>
              <div className="feature-copy">
                <div className="icon-chip">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
                <ul>
                  {f.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="feature-shot">
                <img src={S(f.img)} alt={f.alt} loading="lazy" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const STEPS = [
  {
    title: 'Scan the code',
    body: 'Open the Check-in tab and scan the cafe\'s QR code.',
    img: '09-checkin-scan.png',
    alt: 'Scanning a cafe QR code',
  },
  {
    title: 'Confirm your visit',
    body: 'Tinto verifies the code and records your check-in securely.',
    img: '10-checkin-confirm.png',
    alt: 'Check-in confirmation screen',
  },
  {
    title: 'Watch stamps add up',
    body: 'Your card fills with every visit. Full card? Slide to redeem.',
    img: '11-checkin-success.png',
    alt: 'Check-in success with stamped loyalty card',
  },
]

function HowItWorks() {
  return (
    <section id="how">
      <div className="container">
        <div className="how" style={{ padding: '64px 40px' }}>
          <Reveal className="section-head">
            <h2>Three taps to free coffee</h2>
            <p>Checking in takes seconds — the reward is the slow part.</p>
          </Reveal>
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.title}>
                <div className="step">
                  <div className="step-num">{i + 1}</div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                  <img src={S(s.img)} alt={s.alt} loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const OWNER_CARDS = [
  {
    title: 'Run your cafes',
    body: 'Add your cafes, keep details fresh, and manage photos — all from the app.',
    img: '05-owner-my-cafes.png',
    alt: 'My Cafes management screen for owners',
  },
  {
    title: 'Launch a loyalty program',
    body: 'Set a stamp goal and reward. Archive or restore programs any time, and track active, redeemable, and redeemed cards.',
    img: '07-owner-loyalty.png',
    alt: 'Loyalty program management screen',
  },
  {
    title: 'Check-ins, your way',
    body: 'Show a rotating code at the counter or print a static QR for the wall — with cooldowns to keep things fair.',
    img: '08-owner-qr-code.png',
    alt: 'Owner QR check-in code screen',
  },
]

function Owners() {
  return (
    <section id="owners">
      <div className="container">
        <div className="owners" style={{ padding: '64px 40px' }}>
          <Reveal className="section-head">
            <span className="eyebrow">For cafe owners</span>
            <h2>Turn first-timers into regulars</h2>
            <p>
              Tinto gives independent cafes a loyalty program that big chains
              would envy — no hardware, no punch cards, set up in minutes.
            </p>
          </Reveal>
          <div className="owner-grid">
            {OWNER_CARDS.map((c) => (
              <Reveal key={c.title}>
                <div className="owner-card">
                  <h4>{c.title}</h4>
                  <p>{c.body}</p>
                  <img src={S(c.img)} alt={c.alt} loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
          <div className="owners-cta">
            <a href="#download" className="btn btn-crail">Get started as an owner</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="cta-final" id="download">
      <div className="container">
        <Reveal>
          <img className="app-icon" src="./app-icon.png" alt="Tinto app icon" />
          <h2>Your next free coffee starts here</h2>
          <p>Download Tinto and start collecting stamps today.</p>
          <a href="#" className="btn btn-primary" style={{ padding: '14px 32px' }}>
             Download on the App Store
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Tinto. Brewed with care.</span>
        <div className="footer-links">
          <a href="/privacy-policy.html">Privacy Policy</a>
          <a href="mailto:support@tinto.app">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Owners />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
