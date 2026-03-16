import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Certificates.css'
import certificatesData from '../data/certificatesData'

const Certificates = () => {
  // Load certificates from separate data file
  const [certificates, setCertificates] = useState(certificatesData)

  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const openGallery = (certificate) => {
    setSelectedCertificate(certificate)
  }

  const closeGallery = () => {
    setSelectedCertificate(null)
  }

  const goToPrevious = () => {
    const currentIndex = certificates.findIndex(cert => cert.id === selectedCertificate.id)
    if (currentIndex > 0) {
      setSelectedCertificate(certificates[currentIndex - 1])
    }
  }

  const goToNext = () => {
    const currentIndex = certificates.findIndex(cert => cert.id === selectedCertificate.id)
    if (currentIndex < certificates.length - 1) {
      setSelectedCertificate(certificates[currentIndex + 1])
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-5">
        <section className="certificates-section">
          <div className="text-center mb-5">
            <h1 className="fw-light display-5">My Certificates</h1>
            <p className="lead text-body-secondary">
              Professional certifications and achievements
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="certificates-grid">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="certificate-card"
                onClick={() => openGallery(certificate)}
              >
                <div className="certificate-image-wrapper">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className={`certificate-image ${certificate.class ? certificate.class : ''}`}
                  />
                  <div className="certificate-overlay">
                    <button className="view-btn">
                      <i className="bi bi-search"></i> View
                    </button>
                  </div>
                </div>
                <div className="certificate-info">
                  <h5 className="certificate-title">{certificate.title}</h5>
                  <p className="certificate-issuer">{certificate.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Gallery Modal */}
      {selectedCertificate && (
        <div className="gallery-modal" onClick={closeGallery}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-close-btn" onClick={closeGallery}>
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="gallery-main">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="gallery-image"
              />
            </div>

            <div className="gallery-info">
              <h3>{selectedCertificate.title}</h3>
              <p className="gallery-issuer">Issued by: {selectedCertificate.issuer}</p>
            </div>

            {/* Navigation buttons */}
            <button
              className="gallery-nav-btn gallery-prev-btn"
              onClick={goToPrevious}
              disabled={certificates.findIndex(cert => cert.id === selectedCertificate.id) === 0}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              className="gallery-nav-btn gallery-next-btn"
              onClick={goToNext}
              disabled={certificates.findIndex(cert => cert.id === selectedCertificate.id) === certificates.length - 1}
            >
              <i className="bi bi-chevron-right"></i>
            </button>

            {/* Indicators */}
            <div className="gallery-indicators">
              {certificates.map((cert, index) => (
                <button
                  key={cert.id}
                  className={`gallery-indicator ${cert.id === selectedCertificate.id ? 'active' : ''}`}
                  onClick={() => setSelectedCertificate(cert)}
                  aria-label={`Go to certificate ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Certificates
