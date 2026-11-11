import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Doctor from './pages/Doctor';
import Department from './pages/Department';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import Elements from './pages/Elements';
import Profile from './pages/Profile';

// Import styles
import './App.css';

function App() {
  useEffect(() => {
    // Hide preloader after page load
    setTimeout(() => {
      const preloader = document.getElementById('preloader-active');
      if (preloader) {
        preloader.style.display = 'none';
      }
    }, 1500);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          {/* Preloader */}
          <div id="preloader-active">
            <div className="preloader d-flex align-items-center justify-content-center">
              <div className="preloader-inner position-relative">
                <div className="preloader-circle"></div>
                <div className="preloader-img pere-text">
                  <img src="/assets/img/logo/loder.png" alt="Loading..." />
                </div>
              </div>
            </div>
          </div>

          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/department" element={<Department />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/elements" element={<Elements />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
