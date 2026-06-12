import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Page } from '../App'

interface NavProps {
  page: Page
  navigate: (p: Page) => void
}

const links: { id: Page; label: string }[] = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact',  label: 'Contact' },
]

export default function Nav({ page, navigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // close menu on page resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const go = (p: Page) => { navigate(p); setMenuOpen(false) }

  return (
    <>
      <nav>
        {/* Logo */}
        <a className="nav-logo" href="/" onClick={e => { e.preventDefault(); go('home') }}>
          <svg width="34" height="34" viewBox="0 0 54 54">
            <ellipse cx="27" cy="27" rx="24" ry="8" fill="none" stroke="#4fc3f7" strokeWidth="2" />
            <ellipse cx="27" cy="27" rx="24" ry="8" fill="none" stroke="#2ecc71" strokeWidth="2" transform="rotate(60 27 27)" />
            <ellipse cx="27" cy="27" rx="24" ry="8" fill="none" stroke="#f0a500" strokeWidth="2" transform="rotate(120 27 27)" />
            <circle cx="27" cy="27" r="5" fill="#f0a500" />
            <circle cx="27" cy="27" r="2.5" fill="#fff5e0" />
          </svg>
          <div className="nav-brand">
            <div className="nav-brand-name">Crea<span>bility</span> Solutions</div>
            <div className="nav-sanskrit">सुकृत्सुपाणिः</div>
          </div>
        </a>

        {/* Desktop navigation links */}
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <a
                href={l.id === 'home' ? '/' : `/${l.id}`}
                className={page === l.id ? 'active' : ''}
                onClick={e => { e.preventDefault(); go(l.id) }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — hidden on mobile via CSS */}
        <motion.button
          className="nav-cta"
          onClick={() => go('contact')}
          whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(79,195,247,0.38)' }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          Get In Touch
        </motion.button>

        {/* Hamburger — visible on mobile only */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dimmed backdrop */}
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.nav
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0, 0.16, 1] }}
            >
              <ul className="mobile-menu-links">
                {links.map(l => (
                  <li key={l.id}>
                    <a
                      href={l.id === 'home' ? '/' : `/${l.id}`}
                      className={page === l.id ? 'active' : ''}
                      onClick={e => { e.preventDefault(); go(l.id) }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
