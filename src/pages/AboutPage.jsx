
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import 'animate.css';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="container py-5 mt-5">
        <div className="row">
          <div className="col-lg-8 mx-auto ">
            <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeIn">
              About Trojan Record Shop
            </h1>
            <p className="lead mb-5 animate__animated animate__fadeIn animate__delay-1s">
              We're passionate about vinyl records and dedicated to bringing the authentic sound experience to music lovers worldwide.
            </p>
            
            <div className="mb-5 animate__animated animate__zoomIn animate__delay-2s">
              <img 
                src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=1200&auto=format&fit=crop" 
                alt="Record Store" 
                className="img-fluid rounded shadow-sm mb-4"
              />
              
              <h2 className="mb-3">Our Story</h2>
              <p>
                Trojan Record Shop was founded in 2018 by a group of music enthusiasts who believed in the superior sound quality and tangible experience that vinyl records provide. What started as a small collection in a garage has now grown into one of the most trusted online vinyl record stores.
              </p>
              <p>
                We curate our collection carefully, focusing on both classic albums that have shaped music history and contemporary releases that continue to push boundaries. Our team's deep knowledge and passion for music guides every decision we make.
              </p>
            </div>
            
            <div className="mb-5">
              <h2 className="mb-3">Our Mission</h2>
              <p>
                At Trojan Record, our mission is simple: to preserve and promote the vinyl experience for both longtime collectors and new enthusiasts. We believe that in our digital age, the ritual of playing a vinyl record offers a unique connection to music that can't be replicated by streaming services.
              </p>
              <p>
                We're committed to offering high-quality vinyl at fair prices, with exceptional customer service and a community built around the love of music.
              </p>
            </div>
            
            <div className="row mb-5">
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-vinyl" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"/>
                        <path d="M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg>
                    </div>
                    <h5 className="card-title">Quality Selection</h5>
                    <p className="card-text">We curate only the best vinyl records across all genres for our collection.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 1 1 .001 0H12zm-8 0a2 2 0 1 1 .001 0H4z"/>
                      </svg>
                    </div>
                    <h5 className="card-title">Secure Shipping</h5>
                    <p className="card-text">We ensure your vinyl arrives in perfect condition with our specialized packaging.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-headphones" viewBox="0 0 16 16">
                        <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z"/>
                      </svg>
                    </div>
                    <h5 className="card-title">Expert Advice</h5>
                    <p className="card-text">Our team of music experts is always ready to help with recommendations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-5">
              <h2 className="mb-3">Meet The Team</h2>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="text-center">
                    <img 
                      src="/images/profile_pic.jpg"  
                      alt="Team Member" 
                      className="img-fluid rounded-circle mb-3"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h5>Felipe Mora</h5>
                    <p className="text-muted">Founder & CEO</p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop" 
                      alt="Team Member" 
                      className="img-fluid rounded-circle mb-3"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h5>Diana Delgadillo</h5>
                    <p className="text-muted">Industrial Designer</p>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="text-center">
                    <img 
                      src="/images/kyoto3.jpg"   
                      alt="Team Member" 
                      className="img-fluid rounded-circle mb-3"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h5>Kyoto Mora</h5>
                    <p className="text-muted">Customer Experience</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-5">
              <h2 className="mb-4">Visit Our Store</h2>
              <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  <div className="ratio ratio-4x3">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.936497474373!2d-114.07120895385742!3d51.046598599146416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53717dbecf5f0561%3A0x6406206d15b52f10!2s921%205th%20%20%2C%20Calgary%2C%20AB%20T2P%202X1!5e0!3m2!1sen!2sca!4v1679381778187!5m2!1sen!2sca"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Map"
                    ></iframe>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <h5 className="mb-3">Store Hours</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">Monday - Friday: 10am - 8pm</li>
                    <li className="mb-2">Saturday: 10am - 6pm</li>
                    <li className="mb-4">Sunday: 12pm - 5pm</li>
                  </ul>
                  
                  <h5 className="mb-3">Contact Information</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">921 5th AV SW, Calgary, AB</li>
                    <li className="mb-2">Phone: (403) 123-4567</li>
                    <li>Email: info@trojanrecordshop.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
