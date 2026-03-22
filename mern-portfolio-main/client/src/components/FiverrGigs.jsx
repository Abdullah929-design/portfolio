import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, MessageCircle, Code2, Cpu, Smartphone, Bug, Tag } from 'lucide-react'
import './FiverrGigs.css'

const GIGS = [
  {
    title: 'Custom MERN Stack Website',
    description: 'I will build a custom MERN stack website with React, NodeJS and MongoDB.',
    link: 'https://www.fiverr.com/s/Egz5Y5Y',
    icon: <Code2 size={24} />,
  },
  {
    title: 'LLM Fine-tuning (LoRA/QLoRA)',
    description: 'I will fine tune LLM models using LoRA, QLoRA or full SFT.',
    link: 'https://www.fiverr.com/s/Ld5zPzA',
    icon: <Cpu size={24} />,
  },
  {
    title: 'Flutter Mobile App Development',
    description: 'I will build a Flutter mobile app for Android and iOS.',
    link: 'https://www.fiverr.com/s/dDyBLE8',
    icon: <Smartphone size={24} />,
  },
  {
    title: 'Bug Fixing & Web Optimization',
    description: 'I will fix bugs in your React, NodeJS, and JavaScript web applications.',
    link: 'https://www.fiverr.com/s/BRV3oPG',
    icon: <Bug size={24} />,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

const FiverrGigs = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="fiverr-gigs" id="services" ref={ref}>
      <div className="section-wrapper">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="fiverr-gigs__inner"
        >
          {/* Header */}
          <motion.div className="fiverr-gigs__header" variants={fadeUp}>
            <span className="section-label fiverr-label">Professional Services</span>
            <h2 className="section-title">
              Hire Me On <span className="fiverr-text">Fiverr</span>
            </h2>
            <p className="section-subtitle">
              Choose from my top-rated professional services and get your project delivered with excellence.
            </p>
          </motion.div>

          {/* Negotiable Price Tag */}
          <motion.div className="fiverr-gigs__promo glass" variants={fadeUp}>
            <div className="promo-content">
              <Tag className="promo-icon" size={20} />
              <p>Prices are all <strong>negotiable</strong>. Click for details or DM me!</p>
            </div>
            <a href="tel:03324838836" className="promo-cta">
              <MessageCircle size={18} />
              03324838836
            </a>
          </motion.div>

          <div className="fiverr-gigs__grid">
            {GIGS.map((gig, index) => (
              <motion.a
                key={index}
                href={gig.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gig-card glass"
                variants={fadeUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="gig-icon-wrapper">
                  {gig.icon}
                </div>
                <h3 className="gig-title">{gig.title}</h3>
                <p className="gig-description">{gig.description}</p>
                <div className="gig-footer">
                  <span className="gig-link-text">View Gig Details</span>
                  <ExternalLink size={16} />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div className="fiverr-gigs__footer" variants={fadeUp}>
            <p>Direct message for custom orders and special discounts</p>
            <a 
              href="https://www.fiverr.com/s/akDB3ep" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-fiverr"
            >
              See My Full Profile
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FiverrGigs
