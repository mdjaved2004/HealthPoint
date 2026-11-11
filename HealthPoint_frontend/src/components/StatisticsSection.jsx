import React, { useState, useEffect } from 'react';

const Counter = ({ end, duration = 2000, label, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current < end) {
        setCount(Math.ceil(current));
      } else {
        setCount(end);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <div className="single-counter">
      <div className="counter-icon">
        <i className={icon}></i>
      </div>
      <h3><span className="counter-number">{count.toLocaleString()}</span>+</h3>
      <p>{label}</p>
    </div>
  );
};

const StatisticsSection = () => {
  return (
    <section className="statistics-section section-padding" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 mb-30">
            <Counter end={5000} label="Happy Patients" icon="fas fa-smile" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 mb-30">
            <Counter end={150} label="Expert Doctors" icon="fas fa-user-md" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 mb-30">
            <Counter end={50} label="Medical Services" icon="fas fa-heartbeat" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 mb-30">
            <Counter end={25} label="Years Experience" icon="fas fa-award" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
