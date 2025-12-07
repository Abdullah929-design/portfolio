import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar';
import About from "../components/About"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Projects from "../components/Projects"


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
      <Navbar />
      <Hero />
      <main className="container mx-auto">
        <About />
        <Contact />

      </main>
      <Footer />
    </>
  )
}

export default Home