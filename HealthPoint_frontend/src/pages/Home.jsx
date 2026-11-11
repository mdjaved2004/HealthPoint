import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import StatisticsSection from '../components/StatisticsSection';

const Home = () => {
  useEffect(() => {
    // Load external scripts
    const loadScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript('/assets/js/jquery-1.12.4.min.js');
    loadScript('/assets/js/popper.min.js');
    loadScript('/assets/js/bootstrap.min.js');
    loadScript('/assets/js/clipped-bounce.min.js');
    loadScript('/assets/js/gijgo.min.js');
    loadScript('/assets/js/wow.min.js');
    loadScript('/assets/js/waypoints.min.js');
    loadScript('/assets/js/nice-select.min.js');
    loadScript('/assets/js/jquery.counterup.min.js');
    loadScript('/assets/js/jquery.countdown.min.js');
    loadScript('/assets/js/owl.carousel.min.js');
    loadScript('/assets/js/slick.min.js');
    loadScript('/assets/js/jquery.slicknav.min.js');
    loadScript('/assets/js/jquery.nice-select.min.js');
    loadScript('/assets/js/jquery.ajaxchimp.min.js');
    loadScript('/assets/js/jquery.form.js');
    loadScript('/assets/js/jquery.validate.min.js');
    loadScript('/assets/js/mail-script.js');
    loadScript('/assets/js/jquery.magnific-popup.js');
    loadScript('/assets/js/plugins.js');
    loadScript('/assets/js/main.js');
  }, []);

  return (
    <>
      {/* Slider Area Start */}
      <div className="slider-area position-relative">
        <div className="slider-active" style={{ backgroundImage: 'url(/assets/img/hero/h1_hero.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Single Slider */}
          <div className="single-slider slider-height d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-7 col-lg-9 col-md-8 col-sm-9">
                  <div className="hero__caption">
                    <span>Committed to success</span>
                    <h1 className="cd-headline letters scale">
                      We care about your{' '}
                      <strong className="cd-words-wrapper">
                        <b className="is-visible">Health</b>
                        <b>Families</b>
                        <b>Future</b>
                      </strong>
                    </h1>
                    <p>
                      Our medical center is dedicated to providing the highest quality healthcare services
                      to our patients and their families.
                    </p>
                    <Link to="/about" className="btn">
                      About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Slider Area End */}

      {/* Services Section */}
      <section className="our-services section-padding" style={{ backgroundColor: '#0f61ef', paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-tittle text-center mb-80" style={{ color: '#fff' }}>
                <h2 style={{ color: '#fff' }}>Our Services</h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Professional medical services with state-of-the-art facilities</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="single-services" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '8px', color: '#fff' }}>
                <div className="service-icon">
                  <i className="flaticon-stethoscope" style={{ color: '#fff' }}></i>
                </div>
                <h3 style={{ color: '#fff' }}>Medical Checkup</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Comprehensive medical checkups with our experienced doctors</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="single-services" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '8px', color: '#fff' }}>
                <div className="service-icon">
                  <i className="flaticon-pharmacy" style={{ color: '#fff' }}></i>
                </div>
                <h3 style={{ color: '#fff' }}>Pharmacy</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Complete pharmacy services with quality medicines</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="single-services" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '8px', color: '#fff' }}>
                <div className="service-icon">
                  <i className="flaticon-operating-room" style={{ color: '#fff' }}></i>
                </div>
                <h3 style={{ color: '#fff' }}>Surgery</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Advanced surgical procedures with modern equipment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Section */}
      <section className="department-section section-padding" style={{ backgroundColor: '#0f61ef', paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-tittle text-center mb-80" style={{ color: '#fff' }}>
                <h2 style={{ color: '#fff' }}>Our Departments</h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Specialized medical departments for your health needs</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-30">
              <div className="single-department" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '8px', color: '#fff' }}>
                <h4 style={{ color: '#fff' }}><Link to="/department" style={{ color: '#fff', textDecoration: 'none' }}>Cardiology</Link></h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Heart and cardiovascular health specialists</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-30">
              <div className="single-department" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '8px', color: '#fff' }}>
                <h4 style={{ color: '#fff' }}><Link to="/department" style={{ color: '#fff', textDecoration: 'none' }}>Neurology</Link></h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Brain and nervous system specialists</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-30">
              <div className="single-department" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '8px', color: '#fff' }}>
                <h4 style={{ color: '#fff' }}><Link to="/department" style={{ color: '#fff', textDecoration: 'none' }}>Orthopedics</Link></h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Bone and joint care specialists</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-30">
              <div className="single-department" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '8px', color: '#fff' }}>
                <h4 style={{ color: '#fff' }}><Link to="/department" style={{ color: '#fff', textDecoration: 'none' }}>Pediatrics</Link></h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Children's health specialists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-tittle text-center mb-80">
                <h2>Our Doctors</h2>
                <p>Experienced and qualified medical professionals</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-30">
              <div className="single-team">
                <div className="team-image">
                  <img src="/assets/img/gallery/team1.png" alt="Doctor" />
                </div>
                <div className="team-content">
                  <h3>Dr. John Smith</h3>
                  <p>Cardiology</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-30">
              <div className="single-team">
                <div className="team-image">
                  <img src="/assets/img/gallery/team2.png" alt="Doctor" />
                </div>
                <div className="team-content">
                  <h3>Dr. Sarah Johnson</h3>
                  <p>Neurology</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-30">
              <div className="single-team">
                <div className="team-image">
                  <img src="/assets/img/gallery/team3.png" alt="Doctor" />
                </div>
                <div className="team-content">
                  <h3>Dr. Mike Brown</h3>
                  <p>Orthopedics</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-30">
              <div className="single-team">
                <div className="team-image">
                  <img src="/assets/img/gallery/team1.png" alt="Doctor" />
                </div>
                <div className="team-content">
                  <h3>Dr. Emily Davis</h3>
                  <p>Pediatrics</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center mt-30">
              <Link to="/doctor" className="btn">
                View All Doctors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-tittle text-center mb-80">
                <h2>Our Gallery</h2>
                <p>Explore our state-of-the-art facilities and services</p>
              </div>
            </div>
          </div>
          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="col-lg-4 col-md-6 mb-30">
                <div className="gallery-item">
                  <img 
                    src={`/assets/img/gallery/gallery${num}.png`} 
                    alt={`Gallery ${num}`}
                    className="img-fluid"
                    style={{ height: '250px', objectFit: 'cover', width: '100%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <StatisticsSection />

      <Testimonials />

      {/* CTA Section */}
      <section className="appointment-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2>Book Your Appointment Today</h2>
              <p>Get professional medical care from our experienced team of doctors</p>
            </div>
            <div className="col-lg-6 text-end">
              <Link to="/contact" className="btn btn-lg">
                Schedule Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
