import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import MathsParkPage from './pages/MathsParkPage'
import AdminApp from './admin/AdminApp'

export type Page = 'home' | 'about' | 'services' | 'contact' | 'maths-park-gallery'

const PAGES: Page[] = ['home', 'about', 'services', 'contact', 'maths-park-gallery']

function isAdminPath() {
  return window.location.pathname.startsWith('/admin')
}

function pageFromPath(): Page {
  const seg = window.location.pathname.replace(/^\//, '') as Page
  return PAGES.includes(seg) ? seg : 'home'
}

export default function App() {
  const [adminMode, setAdminMode] = useState(isAdminPath)
  const [page, setPage] = useState<Page>(pageFromPath)

  const navigate = (p: Page) => {
    setPage(p)
    window.history.pushState(null, '', p === 'home' ? '/' : `/${p}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onPop = () => {
      setAdminMode(isAdminPath())
      setPage(pageFromPath())
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (adminMode) return <AdminApp />

  return (
    <>
      <Nav page={page} navigate={navigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          style={{ paddingTop: '68px' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          {page === 'home' && <Home navigate={navigate} />}
          {page === 'about' && <About />}
          {page === 'services' && <Services navigate={navigate} />}
          {page === 'contact' && <Contact />}
          {page === 'maths-park-gallery' && <MathsParkPage navigate={navigate} />}
          {page !== 'maths-park-gallery' && <Footer navigate={navigate} />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
