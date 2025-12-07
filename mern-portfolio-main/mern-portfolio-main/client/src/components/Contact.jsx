import { useState } from 'react';
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/api/contact`, formData);

      if (response.status === 201) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('An error occurred.');
      console.log(error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 3000); 
    }
  };

  return (
    <section id="contact" className="px-4 py-5 contact-section-fix">
      <div className="container">
        <div className="row g-lg-5 align-items-stretch">
          <div className="col-lg-6 text-start mb-4 mb-lg-0 d-flex flex-column justify-content-center">
            <h1 className="display-5 fw-bold mb-3">Contact Me</h1>
            <p className="lead fs-4 mb-0">
              Feel free to reach out with any questions, feedback, or opportunities.
            </p>
          </div>
          <div className="col-lg-6 d-flex align-items-center">
            <form onSubmit={handleSubmit} className="w-100 p-4 p-md-5 rounded-4 glass bg-glass-contact border-0 shadow" autoComplete="off">
              {status && <p className="text-success fw-semibold">{status}</p>}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="nameInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="emailInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="messageInput"
                  name="message"
                  placeholder="Your message"
                  style={{ height: '150px' }}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="messageInput">Message</label>
              </div>
              <button disabled={loading} className="w-100 btn btn-lg btn-primary mt-1" type="submit">
                {loading && <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>}
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
