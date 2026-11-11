import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send to backend or email service
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <>
      {/* Contact Form Section */}
      <section className="contact-section section-padding">
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-lg-4 mb-30">
              <div className="contact-info">
                <h4>Get In Touch</h4>
                <div className="info-item mb-20">
                  <h5><i className="fas fa-map-marker-alt"></i> Address</h5>
                  <p>123 Medical Center Street, City, Country ZIP Code</p>
                </div>
                <div className="info-item mb-20">
                  <h5><i className="fas fa-phone"></i> Phone</h5>
                  <p><a href="tel:01654066456">+1 654-066-456</a></p>
                </div>
                <div className="info-item mb-20">
                  <h5><i className="fas fa-envelope"></i> Email</h5>
                  <p><a href="mailto:info@medicalcenter.com">info@medicalcenter.com</a></p>
                </div>
                <div className="info-item">
                  <h5><i className="fas fa-clock"></i> Hours</h5>
                  <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p>Sat: 9:00 AM - 3:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form">
                <h4>Send us a Message</h4>
                {submitStatus === 'success' && (
                  <div className="alert alert-success mb-20">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="alert alert-danger mb-20">
                    Something went wrong. Please try again.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-20">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-20">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-20">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-20">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 mb-20">
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        className="form-control"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (optional) */}
      <section className="map-section">
        <div className="container-fluid p-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d-122.4!3d37.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzcuMzArNDQuMzAwRU4gMTIysDI4JzQ4LjAwIlc!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Medical Center Location"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;
