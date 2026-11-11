import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch testimonials from API
    fetch('/api/testimonials')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setTestimonials(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err);
        // Set empty testimonials on error instead of blocking
        setTestimonials([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <section className="testimonial-section section-padding bg-light">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-tittle text-center mb-80">
              <h2>What Our Patients Say</h2>
              <p>Real testimonials from satisfied patients</p>
            </div>
          </div>
        </div>

        <div className="row">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-lg-4 col-md-6 mb-30">
              <div className="testimonial-card">
                <div className="testimonial-header mb-20">
                  <div className="testimonial-avatar">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="rounded-circle"
                      style={{ width: '60px', height: '60px' }}
                    />
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p className="position">{testimonial.position}</p>
                  </div>
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
