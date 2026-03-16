import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight, Award, ExternalLink } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import certificatesData from '../data/certificatesData'
import '../styles/Certificates.css'

const CATEGORIES = ['All', 'Data Science', 'Web Design', 'Badges']

const getCategory = (cert) => {
  const t = cert.title.toUpperCase()
  if (t.includes('BADGE') || cert.class === 'combined-badges') return 'Badges'
  if (t.includes('WEB')) return 'Web Design'
  return 'Data Science'
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.04 } }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  const filtered = certificatesData.filter(
    (c) => activeCategory === 'All' || getCategory(c) === activeCategory
  )

  const currentIndex = selected ? filtered.findIndex((c) => c.id === selected.id) : -1

  const goPrev = () => currentIndex > 0 && setSelected(filtered[currentIndex - 1])
  const goNext = () => currentIndex < filtered.length - 1 && setSelected(filtered[currentIndex + 1])

  // Keyboard navigation in modal
  const handleKeyDown = (e) => {
    if (!selected) return
    if (e.key === 'ArrowLeft') goPrev()
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'Escape') setSelected(null)
  }

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <Navbar />

      <main id="main-content" className="certs-page" onKeyDown={handleKeyDown} tabIndex={-1}>
        {/* Background orbs */}
        <div className="certs-page__bg" aria-hidden="true">
          <div className="certs-page__orb certs-page__orb--1" />
          <div className="certs-page__orb certs-page__orb--2" />
        </div>

        <div className="section-wrapper certs-page__inner">
          {/* Header */}
          <motion.div
            className="certs-page__header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">
              <Award size={14} />
              Achievements
            </span>
            <h1 className="section-title">
              My <span className="gradient-text">Certificates</span>
            </h1>
            <p className="section-subtitle">
              {certificatesData.length}+ professional certifications in Data Science, Machine Learning &amp; Web Development
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            className="certs-page__filters"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            role="group"
            aria-label="Filter certificates by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`certs-filter-btn ${activeCategory === cat ? 'certs-filter-btn--active' : ''}`}
              >
                {cat}
                <span className="certs-filter-btn__count">
                  {cat === 'All' ? certificatesData.length : certificatesData.filter((c) => getCategory(c) === cat).length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="certs-grid" ref={ref}>
            <AnimatePresence mode="popLayout">
              {filtered.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  className={`cert-card glass gradient-border ${cert.class === 'combined-badges' ? 'cert-card--badge' : ''}`}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  exit="exit"
                  layout
                  onClick={() => setSelected(cert)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${cert.title} certificate`}
                  onKeyDown={(e) => e.key === 'Enter' && setSelected(cert)}
                >
                  <div className="cert-card__img-wrapper">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="cert-card__img"
                      loading="lazy"
                    />
                    <div className="cert-card__overlay">
                      <ExternalLink size={20} />
                      <span>View</span>
                    </div>
                  </div>
                  <div className="cert-card__body">
                    <span className="cert-card__category">{getCategory(cert)}</span>
                    <p className="cert-card__issuer">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="cert-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${selected.title}`}
          >
            <motion.div
              className="cert-modal__content glass"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button className="cert-modal__close" onClick={() => setSelected(null)} aria-label="Close">
                <X size={20} />
              </button>

              {/* Image */}
              <div className="cert-modal__img-wrapper">
                <img src={selected.image} alt={selected.title} className="cert-modal__img" />
              </div>

              {/* Info */}
              <div className="cert-modal__info">
                <span className="cert-modal__category gradient-text">{getCategory(selected)}</span>
                <p className="cert-modal__issuer">Issued by {selected.issuer}</p>
              </div>

              {/* Nav Buttons */}
              <button
                className="cert-modal__nav cert-modal__nav--prev"
                onClick={goPrev}
                disabled={currentIndex === 0}
                aria-label="Previous certificate"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="cert-modal__nav cert-modal__nav--next"
                onClick={goNext}
                disabled={currentIndex === filtered.length - 1}
                aria-label="Next certificate"
              >
                <ChevronRight size={22} />
              </button>

              {/* Counter */}
              <div className="cert-modal__counter">
                {currentIndex + 1} / {filtered.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}

export default Certificates
