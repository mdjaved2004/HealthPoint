import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      {/* About Section */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-content">
                <h2>About Our Medical Center</h2>
                <p>
                  Our medical center is committed to providing the highest quality healthcare services
                  to our community. With state-of-the-art facilities and a team of experienced medical
                  professionals, we ensure that every patient receives personalized and compassionate care.
                </p>
                <ul>
                  <li><i className="fas fa-check"></i> Expert Medical Team</li>
                  <li><i className="fas fa-check"></i> Advanced Technology</li>
                  <li><i className="fas fa-check"></i> 24/7 Emergency Services</li>
                  <li><i className="fas fa-check"></i> Patient-Centric Approach</li>
                </ul>
                <Link to="/contact" className="btn mt-30">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="/assets/img/gallery/about1.png" alt="About" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-tittle text-center mb-80">
                <h2>Our Facilities</h2>
                <p>State-of-the-art medical equipment and infrastructure</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="facility-card">
                <i className="flaticon-hospital"></i>
                <h4>Modern Rooms</h4>
                <p>Comfortable and hygienic patient rooms with modern amenities</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="facility-card">
                <i className="flaticon-laboratory"></i>
                <h4>Lab Services</h4>
                <p>Advanced laboratory equipment for accurate diagnosis</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="facility-card">
                <i className="flaticon-x-ray"></i>
                <h4>Imaging Center</h4>
                <p>Latest imaging technology including CT and MRI</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
