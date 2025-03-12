import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-4">Trojan Record Shop</h5>
            <p className="mb-4">Discover the magic of vinyl records in our carefully curated collection. From classics to modern hits, we have something for every music lover.</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4">Shop</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/records" className="text-white text-decoration-none">All Records</Link></li>
              <li className="mb-2"><Link to="/records?genre=rock" className="text-white text-decoration-none">Rock</Link></li>
              <li className="mb-2"><Link to="/records?genre=jazz" className="text-white text-decoration-none">Jazz</Link></li>
              <li className="mb-2"><Link to="/records?genre=indie" className="text-white text-decoration-none">Indie</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4">Info</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Shipping Policy</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">Returns</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none">FAQ</a></li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-4">Newsletter</h5>
            <p>Subscribe to our newsletter for the latest releases and exclusive offers.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Your email" aria-label="Your email" />
              <button className="btn btn-outline-light" type="button">Subscribe</button>
            </div>
          </div>
        </div>
        
        <hr className="my-4 bg-light" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">&copy; {currentYear} Trojan Record Shop. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div className="d-flex justify-content-md-end justify-content-center gap-3">
              <a href="#" className="text-white text-decoration-none small">Privacy Policy</a>
              <a href="#" className="text-white text-decoration-none small">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;