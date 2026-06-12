import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'

const spring = { type: 'spring' as const, stiffness: 280, damping: 22 }

const mvvItems = [
  { icon: '🎯', bg: 'rgba(79,195,247,.15)', title: 'Our Mission', desc: 'Make experiential learning accessible to every school' },
  { icon: '👁️', bg: 'rgba(240,165,0,.15)', title: 'Our Vision', desc: 'A future where every child is a curious, confident learner' },
  { icon: '💎', bg: 'rgba(46,204,113,.15)', title: 'Our Values', desc: 'Quality, innovation, and genuine care for education' },
]

const teamMembers = [
  { initials: 'AS', name: 'Arnav Sharma', role: 'Founder & Designated Partner', desc: 'Visionary behind Creability Solutions, driving innovation in school education.', color: 'var(--blue)' },
  { initials: 'DY', name: 'Devesh Yadav', role: 'Founder & Designated Partner', desc: 'Co-founder leading operations and school partnerships across India.', color: 'var(--green)' },
]

export default function About() {
  return (
    <>
      {/* ── ABOUT HERO ── */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="hero-eyebrow" style={{ marginBottom: '24px' }}><span>✦ Our Story</span></div>
            <h1>About <span>Creability</span><br />Solutions</h1>
            <p>We are a passionate team dedicated to reshaping how science and mathematics are experienced in schools across India — one park, one kit, one workshop at a time.</p>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT BODY ── */}
      <section className="about-body">
        <Reveal className="about-text">
          <div className="section-eyebrow">Who We Are</div>
          <h2 className="section-title">More Than a Company.<br /><span>A Movement.</span></h2>
          <p className="about-p">Creability Solutions was founded with a single belief — that every child deserves to experience the wonder of science and mathematics, not just read about it. We work directly with schools to design, build, and maintain immersive learning parks and provide the tools educators need to inspire.</p>
          <p className="about-p">From Science Parks filled with working experiments to Maths Parks that make numbers visual and GK Parks that open windows to the world — we craft environments where learning becomes an adventure.</p>
          <div className="highlight-box">
            <p>"Our tagline — <strong>Crafting Experiences, Inspiring Learners</strong> — is not just words. It is the promise we deliver every single day in every school we serve."</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ background: 'linear-gradient(135deg,var(--navy),var(--navy2))', borderRadius: '20px', padding: '40px', color: '#fff' }}>
            <div style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '28px', color: 'var(--gold)', marginBottom: '16px', textAlign: 'center' }}>सुकृत्सुपाणिः</div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.65)', lineHeight: 1.9, textAlign: 'center', marginBottom: '28px' }}>
              Our Sanskrit motto guides everything we do — a commitment to doing good work with good hands.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mvvItems.map(item => (
                <motion.div
                  key={item.title}
                  style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
                  whileHover={{ x: 5 }}
                  transition={spring}
                >
                  <div style={{ width: '36px', height: '36px', background: item.bg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.55)', marginTop: '3px' }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── TEAM SECTION ── */}
      <section className="team-section">
        <Reveal><div className="section-eyebrow">The Team</div></Reveal>
        <Reveal delay={0.06}>
          <h2 className="section-title">Founders &<br /><span>Designated Partners</span></h2>
        </Reveal>
        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <motion.div
              key={m.name}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -7, boxShadow: '0 16px 40px rgba(79,195,247,.15)', borderColor: '#4fc3f7' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="team-avatar" style={{ color: m.color }}>{m.initials}</div>
              <div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '8px', lineHeight: 1.6 }}>{m.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
