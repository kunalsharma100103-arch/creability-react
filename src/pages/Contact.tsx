import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'

const spring = { type: 'spring' as const, stiffness: 280, damping: 22 }

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [school, setSchool] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!name || !school) {
      alert('Please fill in your name and school name.')
      return
    }
    setSending(true)
    try {
      const res = await fetch('https://formspree.io/f/mykaplvw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, school, email, phone, service, message }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        alert('Something went wrong. Please try again.')
        setSending(false)
      }
    } catch {
      alert('Network error. Please try again.')
      setSending(false)
    }
  }

  return (
    <>
      {/* ── CONTACT HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="hero-eyebrow" style={{ marginBottom: '24px' }}><span>✦ Let's Connect</span></div>
            <h1>Get In <span>Touch</span></h1>
            <p>Ready to transform your school? Reach out to us — we'd love to understand your vision and create something extraordinary together.</p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT BODY ── */}
      <section className="contact-body">
        <Reveal>
          <div className="contact-info">
            <h3>Contact Details</h3>

            <div className="contact-info-item">
              <div className="ci-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
              </div>
              <div>
                <div className="ci-label">Call Us</div>
                <div className="ci-val">+91 78519 82735<br />+91 95606 22735</div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="ci-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="ci-label">Email Us</div>
                <div className="ci-val">creabilitysolutions@gmail.com</div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="ci-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="ci-label">Our Team</div>
                <div className="ci-val">Arnav Sharma — Founder<br />Devesh Yadav — Co-Founder</div>
              </div>
            </div>

            <motion.div
              style={{ background: 'linear-gradient(135deg,var(--navy),var(--navy2))', borderRadius: '16px', padding: '24px', marginTop: '8px' }}
              whileHover={{ scale: 1.02 }}
              transition={spring}
            >
              <div style={{ fontSize: '11px', color: 'var(--blue)', letterSpacing: '2px', fontWeight: 700, marginBottom: '10px' }}>WORKING HOURS</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.7)', lineHeight: 1.9 }}>
                Monday – Saturday<br />
                <span style={{ color: '#fff', fontWeight: 600 }}>9:00 AM – 6:00 PM</span>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="contact-form">
            {sent ? (
              <div className="form-success">
                <div className="tick">✅</div>
                <h4>Message Sent!</h4>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3>Send Us a Message</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" placeholder="Principal / Teacher name" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>School Name</label>
                  <input type="text" placeholder="Your school's name" value={school} onChange={e => setSchool(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Interested In</label>
                  <select value={service} onChange={e => setService(e.target.value)}>
                    <option value="">Select a service…</option>
                    <option>Science Park</option>
                    <option>Maths Park</option>
                    <option>GK Park</option>
                    <option>Student Kits</option>
                    <option>Teacher Kits</option>
                    <option>Workshops</option>
                    <option>Multiple Services</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Tell us about your school and what you're looking for…" value={message} onChange={e => setMessage(e.target.value)} />
                </div>
                <motion.button
                  className="form-submit"
                  onClick={handleSubmit}
                  disabled={sending}
                  whileHover={!sending ? { y: -2, boxShadow: '0 8px 25px rgba(79,195,247,.38)' } : {}}
                  whileTap={!sending ? { scale: 0.98 } : {}}
                  transition={spring}
                >
                  {sending ? 'Sending…' : 'Send Message ✦'}
                </motion.button>
              </>
            )}
          </div>
        </Reveal>
      </section>
    </>
  )
}
