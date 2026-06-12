import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Page } from '../App'
import Reveal from '../components/Reveal'

gsap.registerPlugin(ScrollTrigger)

interface HomeProps {
  navigate: (p: Page) => void
}

const spring = { type: 'spring' as const, stiffness: 280, damping: 22 }

const cardHover = {
  y: -7,
  boxShadow: '0 18px 44px rgba(79,195,247,.16)',
  borderColor: '#4fc3f7',
}

const whyCards = [
  { icon: '🔬', title: 'Experiential Learning', desc: 'Our parks let students touch, build, and discover — making abstract concepts tangible and unforgettable.' },
  { icon: '📦', title: 'Complete Kits', desc: 'Curated teacher and student kits that are ready to use from day one — no setup headache, maximum impact.' },
  { icon: '🎓', title: 'Expert Workshops', desc: 'Live sessions by trained educators that spark genuine curiosity in both students and teachers alike.' },
]

const approachItems = [
  { icon: '🏫', title: 'School Visits', sub: 'Site assessment & planning' },
  { icon: '🛠️', title: 'Installation', sub: 'End-to-end setup' },
  { icon: '📚', title: 'Training', sub: 'Teachers & staff' },
  { icon: '🤝', title: 'Support', sub: 'Ongoing after-care' },
]

export default function Home({ navigate }: HomeProps) {
  const heroRef    = useRef<HTMLElement>(null)
  const atomRef    = useRef<HTMLDivElement>(null)
  const nucleusRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const atom    = atomRef.current
    const hero    = heroRef.current
    const nucleus = nucleusRef.current
    if (!atom || !hero) return

    const ctx = gsap.context(() => {
      // Entire atom: gentle parallax + barely-perceptible 3° tilt
      gsap.to(atom, {
        y: -28,
        rotation: 3,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 2 },
      })
      // Nucleus drifts at a slightly different rate for depth
      if (nucleus) {
        gsap.to(nucleus, {
          x: 8,
          y: -14,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 2 },
        })
      }
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-bg-grid" />
          <div className="hero-glow1" />
          <div className="hero-glow2" />
        </div>

        {/* Dark vignette keeps text readable over bright nucleus */}
        <div className="hero-vignette" />

        {/* Atom background – no spinning, no SMIL loops, scroll-only movement */}
        <div className="hero-atom" ref={atomRef}>
          <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="hNuc" cx="35%" cy="28%" r="65%">
                <stop offset="0%"   stopColor="#fff4cc" />
                <stop offset="35%"  stopColor="#f5a800" />
                <stop offset="80%"  stopColor="#c07800" />
                <stop offset="100%" stopColor="#7a4500" />
              </radialGradient>
              <radialGradient id="hNucHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#f0a500" stopOpacity="0.30" />
                <stop offset="55%"  stopColor="#f0a500" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#f0a500" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hGreenE" cx="38%" cy="33%" r="65%">
                <stop offset="0%"   stopColor="#ccffdd" />
                <stop offset="100%" stopColor="#00cc55" />
              </radialGradient>
            </defs>

            {/* translate(70,0) → nucleus lands at ~63% from left on 1024 px viewport */}
            <g transform="translate(70, 0)">

              {/* Wide soft halo behind nucleus */}
              <circle cx="250" cy="250" r="210" fill="url(#hNucHalo)" />

              {/* ── Orbit 1 – horizontal, crisp single stroke ── */}
              <ellipse cx="250" cy="250" rx="220" ry="68"
                       fill="none" stroke="rgba(188,214,255,0.58)" strokeWidth="1.3" />

              {/* ── Orbit 2 – 60° ── */}
              <ellipse cx="250" cy="250" rx="220" ry="68"
                       fill="none" stroke="rgba(188,214,255,0.52)" strokeWidth="1.3"
                       transform="rotate(60 250 250)" />

              {/* ── Orbit 3 – 120° ── */}
              <ellipse cx="250" cy="250" rx="220" ry="68"
                       fill="none" stroke="rgba(188,214,255,0.52)" strokeWidth="1.3"
                       transform="rotate(120 250 250)" />

              {/* Green electron – static on orbit 3 at parametric t ≈ −70° */}
              <circle cx="268" cy="347" r="22" fill="#2ecc71" opacity="0.10" />
              <circle cx="268" cy="347" r="12" fill="#2ecc71" opacity="0.28" />
              <circle cx="268" cy="347" r="6"  fill="url(#hGreenE)" />
              <circle cx="265" cy="344" r="2.5" fill="#efffee" opacity="0.88" />

              {/* ── Nucleus – separate GSAP ref for depth parallax ── */}
              <g ref={nucleusRef}>
                <circle cx="250" cy="250" r="90" fill="#f0a500" opacity="0.05" />
                <circle cx="250" cy="250" r="72" fill="#f0a500" opacity="0.09" />
                <circle cx="250" cy="250" r="56" fill="#e69600" opacity="0.14" />
                <circle cx="250" cy="250" r="42" fill="url(#hNuc)" />
                <circle cx="250" cy="250" r="26" fill="#fff4d0" opacity="0.93" />
                <circle cx="250" cy="250" r="13" fill="#f5a000" opacity="0.88" />
                <circle cx="243" cy="243" r="4.5" fill="#d49000" opacity="0.60" />
                <circle cx="258" cy="246" r="4"   fill="#ffffff"  opacity="0.52" />
                <circle cx="247" cy="259" r="3.5" fill="#f0a500"  opacity="0.55" />
                <circle cx="257" cy="258" r="3"   fill="#ffffff"  opacity="0.42" />
                <circle cx="251" cy="250" r="2"   fill="#ffffff"  opacity="0.88" />
              </g>

            </g>
          </svg>
        </div>

        {/* Hero text – z-index: 2 sits above atom */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="hero-eyebrow"><span>✦ Empowering Schools Across India</span></div>
          <h1 className="hero-h1">
            Crafting <span className="line-blue">Experiences,</span><br />
            Inspiring <span className="line-gold">Learners.</span>
          </h1>
          <p className="hero-desc">
            We partner with schools to build hands-on Science, Maths & GK Parks — transforming campuses into living laboratories where curiosity never stops.
          </p>
          <div className="hero-btns">
            <motion.button
              className="btn-primary"
              onClick={() => navigate('services')}
              whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(79,195,247,.38)' }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              Explore Services
            </motion.button>
            <motion.button
              className="btn-outline"
              onClick={() => navigate('contact')}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              Talk to Us
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── WHY SECTION ── */}
      <section className="section">
        <Reveal><div className="section-eyebrow">Why Choose Us</div></Reveal>
        <Reveal delay={0.06}>
          <h2 className="section-title">School Education,<br /><span>Reimagined.</span></h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="section-sub">We don't just supply products — we build complete learning ecosystems tailored to every school's vision.</p>
        </Reveal>

        <div className="why-grid">
          {whyCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="why-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={cardHover}
              transition={{ ...spring, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="why-icon">{card.icon}</div>
              <div className="why-title">{card.title}</div>
              <p className="why-desc">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <div className="testimonial-strip">
        <Reveal>
          <p className="t-quote">
            "Creability Solutions transformed our school campus into a space where children actually want to learn. The Science Park is now every student's favourite place."
          </p>
          <div className="t-attr">— Principal, Government Senior Secondary School</div>
        </Reveal>
      </div>

      {/* ── APPROACH SECTION ── */}
      <section className="section section-alt">
        <div className="approach-grid">
          <div>
            <Reveal><div className="section-eyebrow">Our Approach</div></Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title">Built for Schools.<br /><span>Loved by Students.</span></h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="section-sub">
                From initial consultation to installation and ongoing support — we walk every step with you to ensure the learning environment we create is exactly what your school needs.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <motion.button
                className="btn-primary"
                style={{ marginTop: '32px' }}
                onClick={() => navigate('about')}
                whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(79,195,247,.38)' }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                Learn About Us
              </motion.button>
            </Reveal>
          </div>

          <div className="approach-cards">
            {approachItems.map((item, i) => (
              <motion.div
                key={item.title}
                className="approach-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -7, boxShadow: '0 14px 34px rgba(79,195,247,.14)', borderColor: '#4fc3f7' }}
                transition={{ ...spring, delay: i * 0.07 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="approach-icon">{item.icon}</div>
                <div className="approach-title">{item.title}</div>
                <div className="approach-sub">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
