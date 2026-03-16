import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectsSection from '../components/Projects'

const ProjectsPage = () => {
  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <Navbar />
      <main id="main-content" style={{ paddingTop: '72px' }}>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  )
}

export default ProjectsPage
