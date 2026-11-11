import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Footer Area */}
      <div className="footer-area footer-bg footer-padding">
        <div className="container">
          <div className="row d-flex justify-content-between">
            {/* Footer Logo */}
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-footer-caption mb-50">
                <div className="footer-logo mb-20">
                  <img src="/assets/img/logo/logo2_footer.png" alt="Medical Center" style={{ maxWidth: '150px' }} />
                </div>
                <div className="footer-tittle">
                  <h4>About Us</h4>
                  <p>
                    We provide world-class medical services with a team of experienced doctors and
                    state-of-the-art facilities to ensure the best healthcare experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Column 2 */}
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-footer-caption mb-50">
                <div className="footer-tittle">
                  <h4>Quick Links</h4>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/department">Departments</Link></li>
                    <li><Link to="/doctor">Doctors</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Column 3 */}
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-footer-caption mb-50">
                <div className="footer-tittle">
                  <h4>Contact Us</h4>
                  <ul>
                    <li><a href="tel:01654066456">Phone: 01654.066.456</a></li>
                    <li><a href="mailto:info@medicalcenter.com">Email: info@medicalcenter.com</a></li>
                    <li>Address: Your Medical Center Location</li>
                    <li>City, Country ZIP Code</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Column 4 */}
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-footer-caption mb-50">
                <div className="footer-tittle">
                  <h4>Follow Us</h4>
                  <div className="footer-social">
                    <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-8 col-md-7">
              <div className="footer-copy-right">
                <p>
                  Copyright &copy; {currentYear} <a href="#"> Medical Center </a> | All Rights
                  Reserved
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-lg-4 col-md-5">
              <div className="footer-copy-right f-right">
                <p>
                  Privacy Policy | <a href="/contact"> Contact Us </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
