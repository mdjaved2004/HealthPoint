import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './auth/AuthModal';
import UserProfile from './auth/UserProfile';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // Component mounted, auth context will handle authentication state
  }, []);


  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  return (
    <>
      <header>
        <div className="header-area">
          <div className="main-header header-sticky">
            <div className="container-fluid">
              <div className="row align-items-center">
                {/* Logo */}
                <div className="col-xl-2 col-lg-2 col-md-1">
                  <div className="logo">
                    <Link to="/">
                      <img src="/assets/img/logo/logo.png" alt="Medical Center" />
                    </Link>
                  </div>
                </div>

                <div className="col-xl-10 col-lg-10 col-md-10">
                  <div className="menu-main d-flex align-items-center justify-content-end">
                    {/* Main Menu */}
                    <div className="main-menu f-right d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li><Link to="/">Home</Link></li>
                          <li><Link to="/about">About</Link></li>
                          <li><Link to="/doctor">Doctors</Link></li>
                          <li><Link to="/department">Department</Link></li>
                          <li className="position-relative">
                            <Link to="/blog">Blog</Link>
                            <ul className="submenu">
                              <li><Link to="/blog">Blog</Link></li>
                              <li><Link to="/blog/1">Blog Details</Link></li>
                              <li><Link to="/elements">Element</Link></li>
                            </ul>
                          </li>
                          <li><Link to="/contact">Contact</Link></li>
                        </ul>
                      </nav>
                    </div>

                    {/* Header Button */}
                    <div className="header-right-btn f-right d-none d-lg-block ml-30">
                      {isAuthenticated ? (
                        <UserProfile />
                      ) : (
                        <button
                          className="btn header-btn login-register-btn"
                          onClick={handleAuthClick}
                        >
                          <i className=""></i>
                          <span className=''>Login/Register</span>
                        </button>
                      )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="d-lg-none">
                      <button
                        className="btn btn-sm"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      >
                        <i className="fas fa-bars"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="col-12">
                  <div
                    className={`mobile_menu d-block d-lg-none ${
                      mobileMenuOpen ? 'active' : ''
                    }`}
                  >
                    {mobileMenuOpen && (
                      <div className="mobile-nav-content">
                        <nav>
                          <ul className="list-unstyled">
                            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
                            <li><Link to="/doctor" onClick={() => setMobileMenuOpen(false)}>Doctors</Link></li>
                            <li><Link to="/department" onClick={() => setMobileMenuOpen(false)}>Department</Link></li>
                            <li><Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link></li>
                            <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
                            <li className="mobile-auth-btn">
                              {isAuthenticated ? (
                                <button 
                                  className="btn btn-primary" 
                                  onClick={() => {
                                    logout();
                                    setMobileMenuOpen(false);
                                  }}
                                >
                                  <i className="fas fa-sign-out-alt"></i> Logout
                                </button>
                              ) : (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    handleAuthClick();
                                    setMobileMenuOpen(false);
                                  }}
                                >
                                  <i className="fas"></i> Login/Register
                                </button>
                              )}
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab="login"
      />
    </>
  );
};

export default Header;
