import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogs = [
    { id: 1, title: 'Tips for Healthy Heart', category: 'Health', image: '/assets/img/gallery/blog1.png' },
    { id: 2, title: 'Mental Health Awareness', category: 'Mental Health', image: '/assets/img/gallery/blog2.png' },
    { id: 3, title: 'Exercise and Fitness', category: 'Wellness', image: '/assets/img/gallery/blog3.png' },
  ];

  return (
    <>
      {/* Blog Section */}
      <section className="blog-section section-padding">
        <div className="container">
          <div className="row">
            {blogs.map((blog) => (
              <div key={blog.id} className="col-lg-4 col-md-6 mb-30">
                <div className="blog-card">
                  <div className="blog-image">
                    <img src={blog.image} alt={blog.title} className="img-fluid" />
                  </div>
                  <div className="blog-content">
                    <span className="blog-category">{blog.category}</span>
                    <h4><Link to={`/blog/${blog.id}`}>{blog.title}</Link></h4>
                    <p>Discover useful health tips and information from our medical professionals...</p>
                    <Link to={`/blog/${blog.id}`} className="btn btn-sm">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
