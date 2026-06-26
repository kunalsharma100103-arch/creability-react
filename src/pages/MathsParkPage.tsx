import { motion } from 'framer-motion'
import type { Page } from '../App'
import MathsGallery from '../components/MathsGallery'

interface MathsParkPageProps {
  navigate: (p: Page) => void
}

export default function MathsParkPage({ navigate }: MathsParkPageProps) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="services-hero">
        <div className="services-hero-bg" />
        <div className="services-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="hero-eyebrow" style={{ marginBottom: '24px' }}><span>✦ Explore Real Installations</span></div>
            <h1>Maths Park<br /><span>Gallery</span></h1>
            <p>Discover real Science & Maths Parks from schools across India. Each photo showcases hands-on learning stations that bring mathematics to life.</p>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <MathsGallery />

      {/* ── BACK BUTTON ── */}
      <section style={{ background: 'var(--off)', padding: '60px 6vw', textAlign: 'center' }}>
        <motion.button
          onClick={() => navigate('services')}
          style={{
            padding: '14px 32px',
            borderRadius: '30px',
            border: 'none',
            background: 'linear-gradient(135deg, var(--blue), #0288d1)',
            color: '#fff',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
          whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(79,195,247,.38)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          ← Back to Services
        </motion.button>
      </section>
    </>
  )
}
