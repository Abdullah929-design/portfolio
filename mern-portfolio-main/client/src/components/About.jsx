import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Zap, Globe, Cpu, Wrench, Mail } from 'lucide-react'
import './About.css'

const SKILLS = {
  'Web Development': ['React', 'Node.js', 'Express', 'MongoDB', 'HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Vite'],
  'Machine Learning': ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'Jupyter', 'Data Science'],
  'Tools & Platforms': ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux', 'Netlify', 'Vercel', 'Figma'],
}

const SKILL_ICONS = {
  'Web Development': <Globe size={14} />,
  'Machine Learning': <Cpu size={14} />,
  'Tools & Platforms': <Wrench size={14} />,
}

const TIMELINE = [
  { year: '2021', title: 'Started Coding Journey', desc: 'Discovered passion for software development' },
  { year: '2022', title: 'BSE at Comsats University', desc: 'Bachelor of Software Engineering, Lahore campus' },
  { year: '2023', title: 'MERN Stack Mastery', desc: 'Built full-stack applications and deepened React expertise' },
  { year: '2024', title: 'IBM Data Science Pro Certificate', desc: '40+ Coursera certifications in Data Science & ML' },
  { year: '2025', title: 'Open to Opportunities', desc: 'Seeking full-time / freelance / internship roles' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="about" id="about" ref={ref}>
      <div className="section-wrapper">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="about__grid"
        >
          {/* Left: Bio */}
          <motion.div className="about__bio" variants={fadeUp}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Passionate developer.<br />
              <span className="gradient-text">Always learning.</span>
            </h2>
            <p className="about__bio-text">
              I'm <strong>Abdullah Salleh</strong>, originally from Lahore, Pakistan, currently pursuing a
              Bachelor of Software Engineering (BSE) at Comsats University. I specialise in building
              robust, scalable web applications using the <strong>MERN stack</strong>, with a growing
              passion for <strong>machine learning</strong> and AI applications.
            </p>
            <p className="about__bio-text">
              I believe great software is built at the intersection of clean code, thoughtful
              design, and relentless curiosity. When I'm not coding, I'm exploring new frameworks,
              completing online courses, or solving algorithmic challenges.
            </p>

            {/* Timeline */}
            <div className="about__timeline">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  className="timeline-item"
                  variants={fadeUp}
                  style={{ '--delay': `${i * 0.1}s` }}
                >
                  <div className="timeline-item__year">{item.year}</div>
                  <div className="timeline-item__dot" aria-hidden="true" />
                  <div className="timeline-item__content">
                    <h4 className="timeline-item__title">{item.title}</h4>
                    <p className="timeline-item__desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Availability Callout */}
            <motion.div className="about__availability glass" variants={fadeUp}>
              <div className="about__availability-dot" aria-hidden="true" />
              <div className="about__availability-body">
                <p className="about__availability-title">
                  <Zap size={14} style={{ display: 'inline', marginRight: '6px', color: '#facc15' }} />
                  Currently open to opportunities
                </p>
                <p className="about__availability-sub">
                  Freelance · Internship · Full-time — <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }} className="about__availability-link">Let's talk <Mail size={12} style={{ display: 'inline' }} /></a>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Skills */}
          <motion.div className="about__skills-col" variants={fadeUp}>
            {/* Skills by category */}
            {Object.entries(SKILLS).map(([category, tags]) => (
              <motion.div key={category} className="skill-group" variants={fadeUp}>
                <h3 className="skill-group__title">
                  <span className="skill-group__icon">{SKILL_ICONS[category]}</span>
                  {category}
                </h3>
                <motion.div className="skill-group__tags" variants={stagger}>
                  {tags.map(tag => (
                    <motion.span key={tag} className="tech-badge" variants={fadeUp}>
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}

            {/* Stat Cards */}
            <div className="about__stat-cards">
              {[
                { value: '10+', label: 'Projects Built', icon: '🚀' },
                { value: '40+', label: 'Certifications', icon: '🏆' },
                { value: '3+', label: 'Years Coding', icon: '⚡' },
                { value: '2', label: 'Specializations', icon: '🎯' },
              ].map(s => (
                <motion.div key={s.label} className="about__stat-card glass" variants={fadeUp}>
                  <span className="about__stat-icon">{s.icon}</span>
                  <span className="about__stat-value gradient-text">{s.value}</span>
                  <span className="about__stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About