import { useAuth } from "../context/AuthContext"
import  {Link} from "react-router-dom"
const Navbar = () => {
  const { user } = useAuth()
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

        </div>
      </div>
    </nav>

  )
}

export default Navbar