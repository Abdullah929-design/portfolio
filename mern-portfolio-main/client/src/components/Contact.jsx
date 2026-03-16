import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import { Mail, MapPin, Github, Instagram, Facebook, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import './Contact.css'

const CONTACT_ITEMS = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'abdullahsallehaqeel123@gmail.com',
    href: 'mailto:abdullahsallehaqeel123@gmail.com',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Location',
    value: 'Lahore, Pakistan',
    href: null,
  },
  {
    icon: <Github size={20} />,
    label: 'GitHub',
    value: 'abdullah929-design',
    href: 'https://github.com/Abdullah929-design',
  },
]

const SOCIALS = [
  { href: 'https://github.com/Abdullah929-design', icon: <Github size={18} />, label: 'GitHub' },
  { href: 'https://www.instagram.com/abdullahsallehaqeel/', icon: <Instagram size={18} />, label: 'Instagram' },
  { href: 'https://www.facebook.com/abdullah.salleh.aqeel', icon: <Facebook size={18} />, label: 'Facebook' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const validate = ({ name, email, message }) => {
  if (!name.trim()) return 'Please enter your name.'
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.'
  if (!message.trim() || message.trim().length < 10) return 'Message must be at least 10 characters.'
  return null
}

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldError, setFieldError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (fieldError) setFieldError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate(formData)
    if (validationError) {
      setFieldError(validationError)
      return
    }
    setStatus('loading')
    setFieldError('')
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData)
      if (res.status === 200 || res.status === 201) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 5000)
      } else {
        throw new Error()
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="section-wrapper">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="contact__inner"
        >
          {/* Header */}
          <motion.div className="contact__header" variants={fadeUp}>
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">
              Let's <span className="gradient-text">Work Together</span>
            </h2>
            <p className="section-subtitle">
              Whether you have a project in mind, an opportunity to discuss, or just want to say hello — my inbox is always open.
            </p>
          </motion.div>

          <div className="contact__grid">
            {/* Left: Info Cards */}
            <motion.div className="contact__info" variants={fadeUp}>
              <div className="contact__info-cards">
                {CONTACT_ITEMS.map((item) => (
                  <motion.div key={item.label} className="contact__info-card glass" variants={fadeUp}>
                    <div className="contact__info-icon">{item.icon}</div>
                    <div className="contact__info-text">
                      <span className="contact__info-label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="contact__info-value contact__info-value--link">
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact__info-value">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Availability Badge */}
              <motion.div className="contact__availability glass" variants={fadeUp}>
                <span className="contact__availability-dot" aria-hidden="true" />
                <div>
                  <p className="contact__availability-title">Available for opportunities</p>
                  <p className="contact__availability-sub">Open to freelance, internship &amp; full-time roles</p>
                </div>
              </motion.div>

              {/* Socials */}
              <motion.div className="contact__socials" variants={fadeUp}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="contact__social-btn glass"
                  >
                    {s.icon}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div className="contact__form-wrapper" variants={fadeUp}>
              <form onSubmit={handleSubmit} className="contact__form glass gradient-border" noValidate>
                <h3 className="contact__form-title">Send a Message</h3>

                {/* Field Error */}
                {fieldError && (
                  <div className="contact__alert contact__alert--error" role="alert">
                    <AlertCircle size={16} />
                    {fieldError}
                  </div>
                )}

                {/* Success */}
                {status === 'success' && (
                  <div className="contact__alert contact__alert--success" role="status">
                    <CheckCircle size={16} />
                    Message sent! I'll get back to you soon.
                  </div>
                )}

                {/* Error */}
                {status === 'error' && (
                  <div className="contact__alert contact__alert--error" role="alert">
                    <AlertCircle size={16} />
                    {errorMsg}
                  </div>
                )}

                <div className="contact__field-row">
                  <div className="contact__field">
                    <label htmlFor="contact-name" className="contact__label">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="contact__input"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-email" className="contact__label">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="contact__input"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-message" className="contact__label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    className="contact__input contact__textarea"
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary contact__submit"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader size={16} className="contact__spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
