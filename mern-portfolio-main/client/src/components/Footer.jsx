import { Github, Instagram, Facebook, Twitter, Heart } from 'lucide-react'
import './Footer.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { href: 'https://abdullah929-design.github.io/', icon: <Github size={18} />, label: 'GitHub' },
  { href: 'https://www.instagram.com/abdullahsallehaqeel/', icon: <Instagram size={18} />, label: 'Instagram' },
  { href: 'https://www.facebook.com/abdullah.salleh.aqeel', icon: <Facebook size={18} />, label: 'Facebook' },
  { href: 'https://twitter.com', icon: <Twitter size={18} />, label: 'Twitter' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__top-line" aria-hidden="true" />
      <div className="section-wrapper">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-ring">
                <span className="footer__logo-text">AS</span>
              </span>
              <span className="footer__logo-name">
                Abdullah<span className="gradient-text"> Salleh</span>
              </span>
            </div>
            <p className="footer__brand-desc">
              Full Stack Developer &amp; ML Enthusiast. Building scalable web apps with the MERN stack and exploring the frontiers of AI.
            </p>
            <div className="footer__socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer__social-btn"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__nav">
            <h4 className="footer__nav-title">Quick Links</h4>
            <ul className="footer__nav-list" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__nav-link"
                    onClick={link.href.startsWith('#') ? (e) => {
                      e.preventDefault()
                      const el = document.getElementById(link.href.slice(1))
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    } : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="footer__status">
            <h4 className="footer__nav-title">Current Status</h4>
            <div className="footer__status-card glass">
              <span className="footer__status-dot" aria-hidden="true" />
              <div>
                <p className="footer__status-title">Open to Work</p>
                <p className="footer__status-sub">Freelance · Internship · Full-time</p>
              </div>
            </div>
            <a
              href="https://github.com/Abdullah929-design"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary footer__resume-btn"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} Abdullah Salleh. All rights reserved.
          </p>
          <p className="footer__made">
            Made with <Heart size={14} className="footer__heart" aria-label="love" /> using React &amp; Express
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
