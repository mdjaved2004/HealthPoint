import React from 'react';
import { Link } from 'react-router-dom';

const Elements = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-area pt-200 pb-200">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Elements</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li>Elements</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Elements Section */}
      <section className="elements-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-tittle text-center mb-80">
                <h2>UI Elements</h2>
                <p>Collection of useful UI elements and components</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="row mb-50">
            <div className="col-12">
              <h3>Buttons</h3>
              <div className="element-demo">
                <button className="btn">Primary Button</button>
                <button className="btn btn-secondary ml-10">Secondary Button</button>
                <button className="btn btn-sm ml-10">Small Button</button>
                <button className="btn btn-lg ml-10">Large Button</button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="row mb-50">
            <div className="col-12">
              <h3>Alerts</h3>
              <div className="alert alert-success mb-10">
                <strong>Success!</strong> This is a success message.
              </div>
              <div className="alert alert-warning mb-10">
                <strong>Warning!</strong> This is a warning message.
              </div>
              <div className="alert alert-danger mb-10">
                <strong>Error!</strong> This is an error message.
              </div>
              <div className="alert alert-info">
                <strong>Info!</strong> This is an info message.
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="row mb-50">
            <div className="col-12">
              <h3>Cards</h3>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">This is a simple card example with some text content.</p>
                  <Link to="/" className="btn btn-sm">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">This is another card example with different content.</p>
                  <Link to="/" className="btn btn-sm">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">One more card example to show the repeating pattern.</p>
                  <Link to="/" className="btn btn-sm">Learn More</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="row mb-50">
            <div className="col-12">
              <h3>Badges</h3>
              <span className="badge badge-primary ml-5">Primary</span>
              <span className="badge badge-secondary ml-5">Secondary</span>
              <span className="badge badge-success ml-5">Success</span>
              <span className="badge badge-danger ml-5">Danger</span>
              <span className="badge badge-warning ml-5">Warning</span>
              <span className="badge badge-info ml-5">Info</span>
            </div>
          </div>

          {/* Gallery */}
          <div className="row mb-50">
            <div className="col-12">
              <h3>Gallery</h3>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="col-lg-3 col-md-4 col-sm-6 mb-20">
                <div className="gallery-item">
                  <img 
                    src={`/assets/img/elements/g${num}.jpg`} 
                    alt={`Gallery ${num}`}
                    className="img-fluid"
                    style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="row">
            <div className="col-12">
              <h3>Pagination</h3>
              <nav>
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item active"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Elements;
