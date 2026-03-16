import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectsSection from '../components/Projects'

const Projects = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <ProjectsSection />
      </main>
      <Footer />
    </>
  )
}

export default Projects
