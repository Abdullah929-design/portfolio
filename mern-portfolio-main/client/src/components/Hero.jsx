import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Instagram, Facebook, ArrowDown, Download } from 'lucide-react'
import './Hero.css'

const ROLES = ['Full Stack Developer', 'MERN Stack Engineer', 'ML Enthusiast', 'Problem Solver']

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex]
    const speed = isDeleting ? 50 : 100

    if (!isDeleting && displayText === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200)
      return
    }
    if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex(i => (i + 1) % ROLES.length)
      return
    }
    timeoutRef.current = setTimeout(() => {
      setDisplayText(prev =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      )
    }, speed)
    return () => clearTimeout(timeoutRef.current)
  }, [displayText, isDeleting, roleIndex])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const socials = [
    { href: 'https://github.com/Abdullah929-design', icon: <Github size={18} />, label: 'GitHub' },
    { href: 'https://www.instagram.com/abdullahsallehaqeel/', icon: <Instagram size={18} />, label: 'Instagram' },
    { href: 'https://www.facebook.com/abdullah.salleh.aqeel', icon: <Facebook size={18} />, label: 'Facebook' },
  ]

  return (
    <section className="hero" id="home" aria-label="Introduction">
      {/* Animated Background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      {/* Floating Social Sidebar */}
      <aside className="hero__socials" aria-label="Social media links">
        {socials.map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="hero__social-link"
          >
            {s.icon}
          </a>
        ))}
        <div className="hero__social-line" aria-hidden="true" />
      </aside>

      {/* Main Content */}
      <div className="hero__content">
        <motion.div
          className="hero__inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Greeting Tag */}
          <motion.div
            className="hero__tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="hero__tag-dot" aria-hidden="true" />
            Available for opportunities
          </motion.div>

          {/* Profile */}
          <motion.div
            className="hero__avatar-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 100 }}
          >
            <div className="hero__avatar-ring" aria-hidden="true" />
            <img
              src="/profile.jfif"
              alt="Abdullah Salleh"
              className="hero__avatar"
              width={120}
              height={120}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">Abdullah Salleh</span>
          </motion.h1>

          {/* Typewriter Role */}
          <motion.div
            className="hero__role"
            aria-live="polite"
            aria-label={`Current role: ${displayText}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="hero__role-text">{displayText}</span>
            <span className="hero__cursor" aria-hidden="true" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            Building <strong>robust web applications</strong> with the MERN stack and exploring
            the frontiers of <strong>machine learning</strong>. BSE student at Comsats University, Lahore.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button onClick={scrollToProjects} className="btn-primary hero__cta-primary">
              View My Work
              <ArrowDown size={16} />
            </button>
            <a
              href="https://github.com/Abdullah929-design"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary hero__cta-secondary"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.5 }}
          >
            {[
              { value: '10+', label: 'Projects Built' },
              { value: '40+', label: 'Certifications' },
              { value: '3+', label: 'Years Coding' },
              { value: '2', label: 'Specializations' },
            ].map(stat => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value gradient-text">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll down</span>
      </div>
    </section>
  )
}

export default Hero