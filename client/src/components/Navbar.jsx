import { useAuth } from "../context/AuthContext"
import  {Link} from "react-router-dom"
import { useEffect, useState } from "react"

const Navbar = () => {
  const { user } = useAuth()
  // Theme logic start
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark"
    }
    return "dark"
  });

  // Apply theme to document.body
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-mode")
    } else {
      document.body.classList.remove("light-mode")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    // disable transitions briefly to avoid flash and make the switch feel instant
    document.body.classList.add("theme-switching")
    setTheme(prev => prev === "dark" ? "light" : "dark")
    setTimeout(() => {
      document.body.classList.remove("theme-switching")
    }, 50)
  }
  // Theme logic end

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
              <Link className="nav-link" to="/#about">
                About
              </Link>
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
              <Link className="nav-link" to="/#contact">
                Contact
              </Link>
            </li>
            {
              user && user.email && <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>
            }
          </ul>

          {/* Conditionally show Login button */}
          {!(user && user.email) && (
            <Link to="/admin/login" className="btn btn-sm my-btn ms-3">
              Login
            </Link>
          )}

          {/* Theme toggle button rightmost */}
          <button
            className="theme-toggle ms-2"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? "🌙" : "🌞"} {/* You can use an icon library or SVG if desired */}
          </button>
        </div>
      </div>
    </nav>

  )
}

export default Navbar