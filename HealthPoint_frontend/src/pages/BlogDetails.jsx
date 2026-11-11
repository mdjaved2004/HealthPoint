import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-area pt-200 pb-200">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Blog Details</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li>Details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Blog Details Section */}
      <section className="blog-details section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-content">
                <h2>Blog Post {id}</h2>
                <div className="blog-meta">
                  <span className="blog-date">January 16, 2024</span>
                  <span className="blog-author">By Admin</span>
                </div>
                <img src="/assets/img/blog/single_blog_1.png" alt="Blog" className="img-fluid mb-30" />
                <p>
                  This is the detailed content of the blog post. You can add more detailed information here
                  about the topic. Update this content based on your actual blog posts.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="blog-sidebar">
                <div className="widget widget-search mb-30">
                  <input type="text" placeholder="Search..." className="form-control" />
                </div>

                <div className="widget widget-categories mb-30">
                  <h4>Categories</h4>
                  <ul>
                    <li><a href="#">Health Tips</a></li>
                    <li><a href="#">Wellness</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Lifestyle</a></li>
                  </ul>
                </div>

                <div className="widget widget-recent-posts">
                  <h4>Recent Posts</h4>
                  <ul>
                    <li><a href="#">Tips for Healthy Heart</a></li>
                    <li><a href="#">Mental Health Awareness</a></li>
                    <li><a href="#">Exercise and Fitness</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
