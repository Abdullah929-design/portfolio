import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Track scroll for navbar style and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      // Detect active section
      const sections = ['home', 'about', 'projects', 'contact']
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsMobileOpen(false) }, [location])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const isHome = location.pathname === '/'

  const handleScrollNav = useCallback((sectionId) => {
    setIsMobileOpen(false)
    if (isHome) {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${sectionId}`)
    }
  }, [isHome, navigate])

  const navLinks = [
    { label: 'Home', action: () => handleScrollNav('home'), id: 'home' },
    { label: 'About', action: () => handleScrollNav('about'), id: 'about' },
    { label: 'Projects', href: '/projects', id: 'projects-page' },
    { label: 'Certificates', href: '/certificates', id: 'certs' },
    { label: 'Contact', action: () => handleScrollNav('contact'), id: 'contact' },
  ]

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : 'navbar--transparent'}`} role="navigation" aria-label="Main navigation">
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="Abdullah Salleh – Home">
            <span className="navbar__logo-ring" aria-hidden="true">
              <span className="navbar__logo-text">AS</span>
            </span>
            <span className="navbar__logo-name">Abdullah<span className="gradient-text"> Salleh</span></span>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar__links" role="list">
            {navLinks.map(link => (
              <li key={link.id}>
                {link.href ? (
                  <Link
                    to={link.href}
                    className={`navbar__link ${location.pathname === link.href ? 'navbar__link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    onClick={link.action}
                    className={`navbar__link navbar__link--btn ${activeSection === link.id && isHome ? 'navbar__link--active' : ''}`}
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
            {user?.email && (
              <li>
                <Link to="/admin/dashboard" className="navbar__link">Dashboard</Link>
              </li>
            )}
          </ul>

          {/* Desktop CTA */}
          <a
            href="https://abdullah929-design.github.io/Resume/"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__cta btn-primary"
          >
            <FileText size={15} />
            Resume
          </a>

          {/* Mobile Toggle */}
          <button
            className={`navbar__toggle ${isMobileOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setIsMobileOpen(v => !v)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${isMobileOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!isMobileOpen}
      >
        <div className="mobile-menu__backdrop" onClick={() => setIsMobileOpen(false)} />
        <nav className="mobile-menu__panel">
          <ul className="mobile-menu__links" role="list">
            {navLinks.map((link, i) => (
              <li key={link.id} style={{ '--delay': `${i * 0.07}s` }}>
                {link.href ? (
                  <Link to={link.href} className="mobile-menu__link" onClick={() => setIsMobileOpen(false)}>
                    {link.label}
                  </Link>
                ) : (
                  <button onClick={link.action} className="mobile-menu__link">
                    {link.label}
                  </button>
                )}
              </li>
            ))}
            {user?.email && (
              <li style={{ '--delay': `${navLinks.length * 0.07}s` }}>
                <Link to="/admin/dashboard" className="mobile-menu__link" onClick={() => setIsMobileOpen(false)}>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <div className="mobile-menu__footer">
            <a href="https://abdullah929-design.github.io/Resume/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <FileText size={15} /> Download Resume
            </a>
            <div className="mobile-menu__socials">
              <a href="https://abdullah929-design.github.io/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
              <a href="https://www.instagram.com/abdullahsallehaqeel/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar