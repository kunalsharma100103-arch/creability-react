import type { Page } from '../App'

interface FooterProps {
  navigate: (p: Page) => void
}

const pageLinks: [Page, string][] = [
  ['home', 'Home'],
  ['about', 'About Us'],
  ['services', 'Services'],
  ['contact', 'Contact'],
]

const serviceLinks = ['Science Parks', 'Maths Parks', 'GK Parks', 'Workshops']

export default function Footer({ navigate }: FooterProps) {
  const go = (p: Page) => (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand-name">Crea<span>bility</span> Solutions</div>
          <div className="footer-sanskrit">सुकृत्सुपाणिः</div>
          <p className="footer-desc">Transforming school campuses into vibrant, hands-on learning environments across India.</p>
        </div>
        <div className="footer-col">
          <h4>Pages</h4>
          <ul>
            {pageLinks.map(([id, label]) => (
              <li key={id}><a href="#" onClick={go(id)}>{label}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {serviceLinks.map(s => (
              <li key={s}><a href="#" onClick={go('services')}>{s}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2025 Creability Solutions. All rights reserved.</div>
        <div className="footer-tagline">Crafting Experiences, Inspiring Learners.</div>
      </div>
    </footer>
  )
}
