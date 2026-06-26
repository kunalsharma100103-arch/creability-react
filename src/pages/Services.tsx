import { motion } from 'framer-motion'
import type { Page } from '../App'
import Reveal from '../components/Reveal'
import {
  ScienceIllustration,
  MathsIllustration,
  GKIllustration,
  StudentIllustration,
  TeacherIllustration,
  WorkshopIllustration,
} from '../components/ServiceIllustrations'

interface ServicesProps {
  navigate?: (p: Page) => void
}

const spring = { type: 'spring' as const, stiffness: 280, damping: 22 }

const services = [
  {
    illustration: <ScienceIllustration />,
    badge: 'Park Installation',
    title: 'Science Parks',
    desc: 'Outdoor and indoor science installations that bring textbook concepts to life. Students interact with working models of physics, chemistry, and biology — building real intuition through hands-on exploration.',
    features: ['Custom-designed for your campus space', 'Durable, weather-resistant installations', 'Curriculum-aligned activity guides', 'Teacher orientation included'],
    visualBg: 'linear-gradient(135deg,#0d1b2a,#162d4a)',
    glowColor: 'rgba(79,195,247,.22)',
    reverse: false,
  },
  {
    illustration: <MathsIllustration />,
    badge: 'Park Installation',
    title: 'Maths Parks',
    desc: 'Turn abstract numbers and formulas into physical experiences. Our Maths Parks feature geometric sculptures, puzzles, and interactive stations that make mathematics intuitive and exciting for every student.',
    features: ['Visual & tactile maths concepts', 'Geometry, algebra & number theory stations', 'Age-appropriate activity levels', 'Ongoing curriculum integration support'],
    visualBg: 'linear-gradient(135deg,#0a2a1a,#1a4a2a)',
    glowColor: 'rgba(46,204,113,.22)',
    reverse: true,
  },
  {
    illustration: <GKIllustration />,
    badge: 'Park Installation',
    title: 'GK Parks',
    desc: "General knowledge parks that open students' eyes to the world — geography, history, culture, and current affairs presented through engaging, interactive displays that inspire global thinking.",
    features: ['Interactive world maps & timelines', 'Cultural & historical displays', 'Regularly updatable content panels', 'Designed for group discussions'],
    visualBg: 'linear-gradient(135deg,#2a1a0a,#4a3010)',
    glowColor: 'rgba(240,165,0,.22)',
    reverse: false,
  },
  {
    illustration: <StudentIllustration />,
    badge: 'Learning Kits',
    title: 'Student Kits',
    desc: 'Comprehensive activity kits that students can use in class or at home — packed with experiments, puzzles, and projects that reinforce classroom learning through joyful discovery.',
    features: ['Grade-wise curated content', 'Safe, durable materials', 'Step-by-step activity guides', 'Aligned to national curriculum'],
    visualBg: 'linear-gradient(135deg,#1a0a2a,#3a1a5a)',
    glowColor: 'rgba(155,89,182,.22)',
    reverse: true,
  },
  {
    illustration: <TeacherIllustration />,
    badge: 'Learning Kits',
    title: 'Teacher Kits',
    desc: 'Everything a teacher needs to deliver engaging, activity-based lessons — demo materials, lesson plans, assessment tools, and reference guides that make innovative teaching simple and effective.',
    features: ['Ready-to-teach lesson plans', 'Demonstration equipment', 'Assessment & progress tools', 'Subject expert support'],
    visualBg: 'linear-gradient(135deg,#0a1a2a,#1a3a4a)',
    glowColor: 'rgba(79,195,247,.22)',
    reverse: false,
  },
  {
    illustration: <WorkshopIllustration />,
    badge: 'Training',
    title: 'Workshops',
    desc: 'Live, interactive workshops for students and teachers conducted by our team of trained educators. From science experiments to mathematical challenges — our sessions light the spark of lifelong curiosity.',
    features: ['Student & teacher programmes', 'Hands-on experiment sessions', "Customised to school's needs", 'Certificate of participation'],
    visualBg: 'linear-gradient(135deg,#0a2a0a,#1a4a1a)',
    glowColor: 'rgba(46,204,113,.22)',
    reverse: true,
  },
]

export default function Services({ navigate }: ServicesProps) {
  return (
    <>
      {/* ── SERVICES HERO ── */}
      <section className="services-hero">
        <div className="services-hero-bg" />
        <div className="services-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="hero-eyebrow" style={{ marginBottom: '24px' }}><span>✦ What We Offer</span></div>
            <h1>Our <span>Services</span></h1>
            <p>Six ways we transform schools into extraordinary learning environments — designed, installed, and supported by our team.</p>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE LIST ── */}
      <div className="services-body">
        {services.map(svc => (
          <Reveal key={svc.title}>
            <motion.div
              className={`service-item${svc.reverse ? ' reverse' : ''}`}
              onClick={() => svc.title === 'Maths Parks' && navigate?.('maths-park-gallery')}
              style={{ cursor: svc.title === 'Maths Parks' ? 'pointer' : 'default' }}
              whileHover={svc.title === 'Maths Parks' ? { scale: 1.02 } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="service-visual"
                style={{ background: svc.visualBg }}
                whileHover={{ scale: 1.03, boxShadow: `0 24px 56px ${svc.glowColor}` }}
                transition={spring}
              >
                <div
                  className="service-visual-glow"
                  style={{ background: `radial-gradient(circle, ${svc.glowColor}, transparent 70%)` }}
                />
                {svc.illustration}
              </motion.div>
              <div>
                <div className="service-badge"><span>{svc.badge}</span></div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.desc}</p>
                <ul className="service-features">
                  {svc.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

    </>
  )
}
