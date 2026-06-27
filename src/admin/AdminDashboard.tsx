import { useState } from 'react'
import { clearToken } from './auth'
import ServicesManager from './ServicesManager'
import FoundersManager from './FoundersManager'
import SocialLinksManager from './SocialLinksManager'

// ─── Types ────────────────────────────────────────────────
export type AdminSection =
  | 'overview'
  | 'services'
  | 'founders'
  | 'social'
  | 'page-home'
  | 'page-about'
  | 'page-contact'

interface NavItem { key: AdminSection; label: string; icon: React.ReactNode }
interface Props   { onLogout: () => void }

// ─── SVG icon helpers (keeps JSX clean) ───────────────────
const Icon = {
  overview: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  founders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  social: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  services: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <circle cx="3" cy="6" r="1.5"/><circle cx="3" cy="12" r="1.5"/><circle cx="3" cy="18" r="1.5"/>
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
}

const NAV: NavItem[] = [
  { key: 'overview',     label: 'Overview',      icon: Icon.overview  },
  { key: 'services',     label: 'Services',      icon: Icon.services  },
  { key: 'founders',     label: 'Founders/Team', icon: Icon.founders  },
  { key: 'social',       label: 'Social Links',  icon: Icon.social    },
  { key: 'page-home',    label: 'Home Page',     icon: Icon.home      },
  { key: 'page-about',   label: 'About Page',    icon: Icon.about     },
  { key: 'page-contact', label: 'Contact Page',  icon: Icon.contact   },
]

// ─── Dashboard root ────────────────────────────────────────
export default function AdminDashboard({ onLogout }: Props) {
  const [section,    setSection]    = useState<AdminSection>('overview')
  const [expanded,   setExpanded]   = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleLogout() {
    clearToken()
    onLogout()
  }

  function navigate(s: AdminSection) {
    setSection(s)
    setMobileOpen(false)
  }

  const showLabels = expanded || mobileOpen
  const currentNav = NAV.find(n => n.key === section)

  return (
    <div className={`ad-root${expanded ? '' : ' ad-root--collapsed'}${mobileOpen ? ' ad-root--mobile-open' : ''}`}>

      {/* Mobile backdrop */}
      <div className="ad-mobile-overlay" onClick={() => setMobileOpen(false)} />

      {/* ── Sidebar ────────────────────────────────────── */}
      <aside className="ad-sidebar">

        <div className="ad-sidebar-head">
          <div className="ad-logo">
            <div className="ad-logo-mark">C</div>
            {showLabels && (
              <div className="ad-logo-text">
                <span className="ad-logo-name">Creability</span>
                <span className="ad-logo-sub">Admin</span>
              </div>
            )}
          </div>
          <button
            className="ad-toggle"
            onClick={() => setExpanded(e => !e)}
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {expanded ? Icon.chevronLeft : Icon.chevronRight}
          </button>
          <button
            className="ad-sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="ad-nav">
          {NAV.map(item => (
            <button
              key={item.key}
              className={`ad-nav-btn${section === item.key ? ' ad-nav-btn--active' : ''}`}
              onClick={() => navigate(item.key)}
              title={!showLabels ? item.label : undefined}
            >
              <span className="ad-nav-icon">{item.icon}</span>
              {showLabels && <span className="ad-nav-label">{item.label}</span>}
              {showLabels && section === item.key && <span className="ad-nav-pip" />}
            </button>
          ))}
        </div>

        <div className="ad-sidebar-foot">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="ad-foot-btn"
            title={!showLabels ? 'View live site' : undefined}
          >
            <span className="ad-nav-icon">{Icon.external}</span>
            {showLabels && <span>View Site</span>}
          </a>
          <button
            className="ad-foot-btn ad-foot-btn--danger"
            onClick={handleLogout}
            title={!showLabels ? 'Log out' : undefined}
          >
            <span className="ad-nav-icon">{Icon.logout}</span>
            {showLabels && <span>Log Out</span>}
          </button>
        </div>

      </aside>

      {/* ── Main content ───────────────────────────────── */}
      <main className="ad-main">

        <header className="ad-topbar">
          <div className="ad-topbar-left" style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className="ad-hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div>
              <h1 className="ad-topbar-title">{currentNav?.label}</h1>
              <p className="ad-topbar-crumb">creabilitysolutions.com · Admin</p>
            </div>
          </div>
          <div className="ad-topbar-right">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="ad-topbar-site-btn"
            >
              {Icon.external}
              <span>Live Site</span>
            </a>
            <div className="ad-avatar" aria-label="Admin user">K</div>
          </div>
        </header>

        <div className="ad-body">
          {section === 'overview'     && <OverviewSection onNavigate={setSection} />}
          {section === 'services'     && <ServicesManager />}
          {section === 'founders'     && <FoundersManager />}
          {section === 'social'       && <SocialLinksManager />}
          {section === 'page-home'    && <ComingSoon title="Home Page Editor" desc="Edit hero headline, swap the background media, and update the intro and stats sections." />}
          {section === 'page-about'   && <ComingSoon title="About Page Editor" desc="Edit company story, mission text, and update team photos or facility images." />}
          {section === 'page-contact' && <ComingSoon title="Contact Page Editor" desc="Update phone, email, address, and manage contact form settings." />}
        </div>

      </main>
    </div>
  )
}

// ─── Overview section ──────────────────────────────────────
function OverviewSection({ onNavigate }: { onNavigate: (s: AdminSection) => void }) {

  const stats = [
    { label: 'Verticals',     value: '1',  detail: 'Maths Park',     color: '#4fc3f7' },
    { label: 'Services',      value: '6',  detail: 'All active',     color: '#2ecc71' },
    { label: 'Gallery Items', value: '—',  detail: 'Upload images',  color: '#f0a500' },
    { label: 'Managed Pages', value: '4',  detail: 'Home·About·Services·Contact', color: '#a78bfa' },
  ]

  const quickActions: { icon: React.ReactNode; label: string; desc: string; nav: AdminSection }[] = [
    { icon: Icon.services,  label: 'Add a Service',        desc: 'Maths Park, Science Park…',        nav: 'services'     },
    { icon: Icon.founders,  label: 'Edit Team',            desc: 'Add or update founders',           nav: 'founders'     },
    { icon: Icon.social,    label: 'Social Links',         desc: 'Facebook, Instagram, etc.',        nav: 'social'       },
    { icon: Icon.home,      label: 'Update Hero Text',     desc: 'Change homepage messaging',        nav: 'page-home'    },
  ]

  const archStatus = [
    { label: 'React SPA (Vite + TypeScript)', status: 'live', note: 'Deployed on Hostinger'          },
    { label: 'SPA Routing (.htaccess)',        status: 'live', note: 'No 404 on refresh'              },
    { label: 'PHP/MySQL API',                  status: 'live', note: 'Running on Hostinger'           },
    { label: 'JWT Authentication',             status: 'live', note: 'Admin login active'             },
    { label: 'Media Upload + Image Crop',      status: 'live', note: 'Upload from phone or PC'        },
    { label: 'Services, Founders, Social',     status: 'live', note: 'Run /api/_migrate.php once'     },
  ]

  return (
    <div className="ov-root">

      {/* Stats */}
      <div className="ov-stats">
        {stats.map(s => (
          <div className="ov-stat" key={s.label} style={{'--stat-color': s.color} as React.CSSProperties}>
            <div className="ov-stat-value">{s.value}</div>
            <div className="ov-stat-label">{s.label}</div>
            <div className="ov-stat-detail">{s.detail}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <section className="ov-section">
        <h2 className="ov-section-title">Quick Actions</h2>
        <div className="ov-quick-grid">
          {quickActions.map(q => (
            <button
              key={q.label}
              className="ov-quick-card"
              onClick={() => onNavigate(q.nav)}
            >
              <span className="ov-quick-icon">{q.icon}</span>
              <span className="ov-quick-label">{q.label}</span>
              <span className="ov-quick-desc">{q.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Architecture status */}
      <section className="ov-section">
        <h2 className="ov-section-title">Setup Checklist</h2>
        <div className="ov-arch">
          {archStatus.map(a => (
            <div className="ov-arch-row" key={a.label}>
              <span className={`ov-arch-dot ov-arch-dot--${a.status}`} />
              <span className="ov-arch-name">{a.label}</span>
              <span className="ov-arch-note">{a.note}</span>
            </div>
          ))}
        </div>
        <div className="ov-arch-legend">
          <span><span className="ov-arch-dot ov-arch-dot--live" style={{display:'inline-block',marginRight:6,verticalAlign:'middle'}} />Live</span>
          <span><span className="ov-arch-dot ov-arch-dot--pending" style={{display:'inline-block',marginRight:6,verticalAlign:'middle'}} />Pending backend setup</span>
        </div>
      </section>

    </div>
  )
}

// ─── Coming-soon placeholder ───────────────────────────────
function ComingSoon({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="cs-root">
      <div className="cs-card">
        <div className="cs-ring">
          <svg viewBox="0 0 48 48" fill="none" stroke="#4fc3f7" strokeWidth="1.5">
            <circle cx="24" cy="24" r="20" strokeOpacity=".25"/>
            <path d="M24 14v10l6 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="cs-title">{title}</h2>
        <p  className="cs-desc">{desc}</p>
        <span className="cs-badge">Phase 2 · Coming Next</span>
      </div>
    </div>
  )
}
