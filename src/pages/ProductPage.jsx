
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { records } from '../utils/data';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [record, setRecord] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate a data fetch with a slight delay
    setTimeout(() => {
      const foundRecord = records.find(r => r.id === parseInt(id));
      setRecord(foundRecord);
      setLoading(false);
    }, 500);
  }, [id]);


  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(record, quantity);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Get similar records by genre ID in database
  const similarRecords = record 
    ? records.filter(r => r.genre === record.genre && r.id !== record.id).slice(0, 4)
    : [];

  return (
    <>
      <Navbar />
      
      <div className="container py-5 mt-5">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : record ? (
          <>
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/records">Records</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{record.title}</li>
              </ol>
            </nav>
            
            <div className="row">
              <div className="col-lg-5 mb-4">
                <div className="card border-0 shadow position-relative overflow-hidden">
                  <img 
                    src={record.cover} 
                    alt={record.title} 
                    className="card-img-top img-fluid"
                    style={{ objectFit: 'cover', height: '400px' }}
                  />
                  <div className="position-absolute top-0 start-0 bg-dark text-white px-3 py-2">
                    {record.genre.charAt(0).toUpperCase() + record.genre.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="col-lg-7">
                <h1 className="display-5 fw-bold mb-2">{record.title}</h1>
                <h5 className="text-muted mb-4">{record.artist}</h5>
                
                <div className="d-flex align-items-center mb-4">
                  <span className="display-6 fw-bold me-3">${record.price.toFixed(2)}</span>
                  <span className="badge bg-success">In Stock</span>
                </div>
                
                <p className="lead mb-4">{record.description}</p>
                
                <div className="d-flex flex-wrap gap-4 mb-4">
                  <div>
                    <small className="text-muted d-block mb-1">Release Year</small>
                    <span className="fs-5">{record.year}</span>
                  </div>
                  <div>
                    <small className="text-muted d-block mb-1">Genre</small>
                    <span className="fs-5">{record.genre.charAt(0).toUpperCase() + record.genre.slice(1)}</span>
                  </div>
                  <div>
                    <small className="text-muted d-block mb-1">Format</small>
                    <span className="fs-5">12" Vinyl</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="input-group" style={{ maxWidth: '200px' }}>
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      className="form-control text-center" 
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button 
                  className="btn btn-dark btn-lg px-5 py-3"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            
            {similarRecords.length > 0 && (
              <div className="mt-5 pt-5 border-top">
                <h3 className="mb-4">You might also like</h3>
                <div className="row g-4">
                  {similarRecords.map(rec => (
                    <div key={rec.id} className="col-md-6 col-lg-3">
                      <div className="card h-100 border-0 shadow-sm">
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                          <img 
                            src={rec.cover} 
                            className="card-img-top" 
                            alt={rec.title}
                            style={{ 
                              height: '100%', 
                              objectFit: 'cover',
                              transition: 'transform 0.5s ease' 
                            }}
                            onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={e => e.target.style.transform = 'scale(1)'}
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{rec.title}</h5>
                          <p className="card-text text-muted">{rec.artist}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold">${rec.price.toFixed(2)}</span>
                            <Link to={`/product/${record.id}`} className="btn btn-sm btn-dark">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center my-5">
            <h2>Record not found</h2>
            <p>We couldn't find the record you're looking for.</p>
            <Link to="/records" className="btn btn-primary">
              Browse Records
            </Link>
          </div>
        )}
      </div>
      
      {/* Notification Toast */}
      <div 
        className={`position-fixed bottom-0 end-0 p-3 ${showNotification ? 'show' : ''}`}
        style={{ zIndex: 1050 }}
      >
        <div 
          className={`toast ${showNotification ? 'fade show' : ''}`}
          role="alert" 
          aria-live="assertive" 
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">TrojanRecord</strong>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowNotification(false)}
            ></button>
          </div>
          <div className="toast-body">
            Added {record?.title} to your cart!
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
