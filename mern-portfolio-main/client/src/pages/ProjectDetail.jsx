import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import projectsData from '../data/projectsData'
import './ProjectDetail.css'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projectsData.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="project-detail__notfound">
          <h1>Project not found</h1>
          <Link to="/projects" className="btn-primary">Back to Projects</Link>
        </main>
        <Footer />
      </>
    )
  }

  // Previous / Next navigation
  const currentIndex = projectsData.findIndex((p) => p.id === id)
  const prev = projectsData[currentIndex - 1] || null
  const next = projectsData[currentIndex + 1] || null

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="project-detail">

        {/* Background orbs */}
        <div className="project-detail__bg" aria-hidden="true">
          <div className="project-detail__orb project-detail__orb--1" />
          <div className="project-detail__orb project-detail__orb--2" />
        </div>

        <div className="section-wrapper project-detail__inner">

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button onClick={() => navigate(-1)} className="project-detail__back">
              <ArrowLeft size={16} />
              Back
            </button>
          </motion.div>

          {/* Hero image */}
          <motion.div
            className="project-detail__hero-img glass gradient-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="project-detail__img"
            />
          </motion.div>

          <div className="project-detail__grid">

            {/* Left: main info */}
            <motion.div
              className="project-detail__main"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <span className="project-detail__category section-label">{project.category}</span>
              <h1 className="project-detail__title">{project.title}</h1>
              <p className="project-detail__desc">{project.description}</p>

              {/* Features */}
              {project.features?.length > 0 && (
                <div className="project-detail__features">
                  <h3 className="project-detail__section-heading">Key Features</h3>
                  <ul className="project-detail__feature-list">
                    {project.features.map((f) => (
                      <li key={f} className="project-detail__feature-item">
                        <CheckCircle size={16} className="project-detail__check" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="project-detail__ctas">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github size={16} />
                    View Source
                  </a>
                )}
              </div>
            </motion.div>

            {/* Right: tech stack sidebar */}
            <motion.aside
              className="project-detail__sidebar"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <div className="project-detail__sidebar-card glass">
                <h3 className="project-detail__section-heading">Tech Stack</h3>
                <div className="project-detail__tech-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-detail__sidebar-card glass">
                <h3 className="project-detail__section-heading">Links</h3>
                <div className="project-detail__links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-detail__link">
                      <Github size={16} />
                      GitHub Repository
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-detail__link project-detail__link--live">
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {!project.liveUrl && !project.githubUrl && (
                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>No public links available</p>
                  )}
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Prev / Next navigation */}
          <motion.div
            className="project-detail__nav"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {prev ? (
              <Link to={`/projects/${prev.id}`} className="project-detail__nav-btn glass">
                <ArrowLeft size={16} />
                <div>
                  <span className="project-detail__nav-label">Previous</span>
                  <span className="project-detail__nav-title">{prev.title}</span>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link to={`/projects/${next.id}`} className="project-detail__nav-btn project-detail__nav-btn--next glass">
                <div>
                  <span className="project-detail__nav-label">Next</span>
                  <span className="project-detail__nav-title">{next.title}</span>
                </div>
                <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              </Link>
            ) : <div />}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ProjectDetail
