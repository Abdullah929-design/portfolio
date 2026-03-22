import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import FiverrGigs from '../components/FiverrGigs'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

const Home = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects limit={3} />
        <Contact />
        <FiverrGigs />
      </main>
      <Footer />
    </>
  )
}

export default Home