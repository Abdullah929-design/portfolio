import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, Code2, ArrowRight } from 'lucide-react'
import projectsData from '../data/projectsData'
import './Projects.css'

const FILTERS = ['All', 'Web', 'ML / AI', 'Tools']

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const Projects = ({ limit }) => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  const filtered = projectsData.filter(
    (p) => activeFilter === 'All' || p.category === activeFilter
  )
  const displayed = limit ? filtered.slice(0, limit) : filtered

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="projects__header"
        >
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A curated selection of what I've built — from full-stack web apps to ML pipelines.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          role="group"
          aria-label="Filter projects by category"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`projects__filter-btn ${activeFilter === f ? 'projects__filter-btn--active' : ''}`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {displayed.length === 0 ? (
          <div className="projects__empty">
            <Code2 size={48} className="projects__empty-icon" />
            <h3>No projects in this category</h3>
          </div>
        ) : (
          <motion.div className="projects__grid">
            <AnimatePresence mode="popLayout">
              {displayed.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  exit="exit"
                  transition={{ delay: i * 0.07 }}
                  className="project-card glass gradient-border"
                >
                  {/* Image */}
                  <Link to={`/projects/${project.id}`} className="project-card__image-wrapper" tabIndex={-1}>
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="project-card__image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="project-card__image-placeholder">
                        <Code2 size={32} />
                      </div>
                    )}
                    <div className="project-card__category-badge">
                      {project.category}
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="project-card__body">
                    <Link to={`/projects/${project.id}`} className="project-card__title-link">
                      <h3 className="project-card__title">{project.title}</h3>
                    </Link>
                    <p className="project-card__desc">{project.shortDesc}</p>

                    {/* Tech Tags */}
                    {project.technologies?.length > 0 && (
                      <div className="project-card__tags">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span key={tech} className="tech-badge">{tech}</span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="tech-badge">+{project.technologies.length - 5}</span>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="project-card__links">
                      <Link
                        to={`/projects/${project.id}`}
                        className="project-card__link project-card__link--details"
                      >
                        <ArrowRight size={14} />
                        Details
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card__link project-card__link--live"
                        >
                          <ExternalLink size={14} />
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card__link project-card__link--github"
                        >
                          <Github size={14} />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View All CTA */}
        {limit && (
          <motion.div
            className="projects__footer-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/projects" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects