import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleNavigation = (path, hash = null) => {
    if (isNavigating) return
    
    setIsNavigating(true)
    
    if (hash) {
      navigate(path)
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setIsNavigating(false)
      }, 50)
    } else {
      navigate(path)
      setTimeout(() => setIsNavigating(false), 50)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Portfolio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => handleNavigation("/#about")}
                style={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/certificates">
                Certifications
              </Link>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={() => handleNavigation("/#contact")}
                style={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                Contact
              </button>
            </li>
            {
              user && user.email && <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>
            }


          </ul>

        </div>
      </div>
    </nav>

  )
}

export default Navbar