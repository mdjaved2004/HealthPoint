import React from 'react';
import { Link } from 'react-router-dom';

const Department = () => {
  const departments = [
    { id: 1, name: 'Cardiology', description: 'Heart and cardiovascular health care', image: '/assets/img/gallery/gallery1.png' },
    { id: 2, name: 'Neurology', description: 'Brain and nervous system care', image: '/assets/img/gallery/gallery2.png' },
    { id: 3, name: 'Orthopedics', description: 'Bone and joint care', image: '/assets/img/gallery/gallery3.png' },
    { id: 4, name: 'Pediatrics', description: 'Children and infant care', image: '/assets/img/gallery/gallery4.png' },
    { id: 5, name: 'General Surgery', description: 'Surgical procedures', image: '/assets/img/gallery/gallery5.png' },
    { id: 6, name: 'Dermatology', description: 'Skin care specialists', image: '/assets/img/gallery/gallery6.png' },
  ];

  return (
    <>
      {/* Departments Section */}
      <section className="department-section section-padding">
        <div className="container">
          <div className="row">
            {departments.map((dept) => (
              <div key={dept.id} className="col-lg-4 col-md-6 mb-30">
                <div className="department-card">
                  <div className="department-image mb-20">
                    <img src={dept.image} alt={dept.name} className="img-fluid" />
                  </div>
                  <h4>{dept.name}</h4>
                  <p>{dept.description}</p>
                  <Link to={`/department`} className="btn btn-sm">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Department;
