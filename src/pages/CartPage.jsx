
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container py-5 mt-5 min-vh-100">
          <h1 className="mb-4">Your Shopping Cart</h1>
          <div className="card border-0 shadow p-5 text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </div>
            <h3>Your cart is empty</h3>
            <p className="text-muted mb-4">Looks like you haven't added any records to your cart yet.</p>
            <Link to="/records" className="btn btn-dark px-4 py-2">
              Browse Records
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="container py-5 mt-5">
        <h1 className="mb-4">Your Shopping Cart</h1>
        
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.cover} 
                                alt={item.title} 
                                style={{ 
                                  width: '60px', 
                                  height: '60px', 
                                  objectFit: 'cover',
                                  marginRight: '15px' 
                                }}
                                className="rounded"
                              />
                              <div>
                                <h6 className="mb-0">{item.title}</h6>
                                <small className="text-muted">{item.artist}</small>
                              </div>
                            </div>
                          </td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>
                            <div className="input-group" style={{ width: '120px' }}>
                              <button 
                                className="btn btn-sm btn-outline-secondary" 
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <input 
                                type="text" 
                                className="form-control form-control-sm text-center" 
                                value={item.quantity}
                                readOnly
                              />
                              <button 
                                className="btn btn-sm btn-outline-secondary" 
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
                  <Link to="/records" className="btn btn-outline-dark">
                    Continue Shopping
                  </Link>
                  <button 
                    className="btn btn-outline-danger mt-2 mt-sm-0"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                
                <div className="d-flex justify-content-between mb-4">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                
                <div className="d-flex justify-content-between fw-bold mb-4">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="btn btn-dark w-100 py-3"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
