
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: currentUser ? currentUser.email : '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect if cart is empty
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number is invalid';
    }
    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Expiry date format should be MM/YY';
    }
    if (!formData.cardCvv.trim()) {
      newErrors.cardCvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
      newErrors.cardCvv = 'CVV is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 2 && validateStep2()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3); // Success step
        clearCart(); // Clear the cart after successful checkout
        window.scrollTo(0, 0);
      }, 2000);
    }
  };
  
  return (
    <>
      <Navbar />
      
      <div className="container py-5 mt-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="mb-4">
              <h1 className="mb-4">Checkout</h1>
              
              {/* Progress Steps */}
              <div className="d-flex justify-content-between mb-5">
                <div className="text-center">
                  <div className={`rounded-circle bg-${step >= 1 ? 'dark' : 'secondary'} text-white d-flex align-items-center justify-content-center mx-auto mb-2`} style={{ width: '35px', height: '35px' }}>
                    {step > 1 ? '✓' : '1'}
                  </div>
                  <div className="small">Shipping</div>
                </div>
                <div className="position-relative flex-grow-1 align-self-center mx-4">
                  <div className="progress" style={{ height: '2px' }}>
                    <div 
                      className={`progress-bar bg-${step >= 2 ? 'dark' : 'secondary'}`} 
                      role="progressbar" 
                      style={{ width: step >= 2 ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`rounded-circle bg-${step >= 2 ? 'dark' : 'secondary'} text-white d-flex align-items-center justify-content-center mx-auto mb-2`} style={{ width: '35px', height: '35px' }}>
                    {step > 2 ? '✓' : '2'}
                  </div>
                  <div className="small">Payment</div>
                </div>
                <div className="position-relative flex-grow-1 align-self-center mx-4">
                  <div className="progress" style={{ height: '2px' }}>
                    <div 
                      className={`progress-bar bg-${step >= 3 ? 'dark' : 'secondary'}`} 
                      role="progressbar" 
                      style={{ width: step >= 3 ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`rounded-circle bg-${step >= 3 ? 'dark' : 'secondary'} text-white d-flex align-items-center justify-content-center mx-auto mb-2`} style={{ width: '35px', height: '35px' }}>
                    {step > 3 ? '✓' : '3'}
                  </div>
                  <div className="small">Confirmation</div>
                </div>
              </div>
              
              {/* Checkout Forms */}
              <div className="card border-0 shadow">
                <div className="card-body p-4">
                  {step === 1 && (
                    <>
                      <h4 className="mb-4">Shipping Information</h4>
                      <form>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                          </div>
                          
                          <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                          </div>
                          
                          <div className="col-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                              type="email" 
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                          </div>
                          
                          <div className="col-12">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                              id="address"
                              name="address"
                              placeholder="1234 Main St"
                              value={formData.address}
                              onChange={handleChange}
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                          </div>
                          
                          <div className="col-md-4">
                            <label htmlFor="city" className="form-label">City</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                            />
                            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                          </div>
                          
                          <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                            />
                            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                          </div>
                          
                          <div className="col-md-4">
                            <label htmlFor="zipCode" className="form-label">Zip Code</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                            />
                            {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between mt-4">
                          <Link to="/cart" className="btn btn-outline-dark">
                            Back to Cart
                          </Link>
                          <button 
                            type="button" 
                            className="btn btn-dark"
                            onClick={nextStep}
                          >
                            Continue to Payment
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                  
                  {step === 2 && (
                    <>
                      <h4 className="mb-4">Payment Information</h4>
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-12">
                            <label htmlFor="cardName" className="form-label">Name on card</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                              id="cardName"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleChange}
                            />
                            {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                            <small className="text-muted">Full name as displayed on card</small>
                          </div>
                          
                          <div className="col-12">
                            <label htmlFor="cardNumber" className="form-label">Card number</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="XXXX XXXX XXXX XXXX"
                              value={formData.cardNumber}
                              onChange={handleChange}
                            />
                            {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                          </div>
                          
                          <div className="col-md-6">
                            <label htmlFor="cardExpiry" className="form-label">Expiry date</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`}
                              id="cardExpiry"
                              name="cardExpiry"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                            />
                            {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
                          </div>
                          
                          <div className="col-md-6">
                            <label htmlFor="cardCvv" className="form-label">CVV</label>
                            <input 
                              type="text" 
                              className={`form-control ${errors.cardCvv ? 'is-invalid' : ''}`}
                              id="cardCvv"
                              name="cardCvv"
                              placeholder="XXX"
                              value={formData.cardCvv}
                              onChange={handleChange}
                            />
                            {errors.cardCvv && <div className="invalid-feedback">{errors.cardCvv}</div>}
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between mt-4">
                          <button 
                            type="button" 
                            className="btn btn-outline-dark"
                            onClick={prevStep}
                          >
                            Back to Shipping
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-dark"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Processing...
                              </>
                            ) : (
                              'Complete Order'
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                  
                  {step === 3 && (
                    <div className="text-center py-5">
                      <div className="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                      </div>
                      <h3 className="mb-3">Thank you for your order!</h3>
                      <p className="mb-4">Your order has been placed and is being processed.</p>
                      <p className="mb-1"><strong>Order Number:</strong> {Math.floor(Math.random() * 10000000)}</p>
                      <p className="mb-4"><strong>Confirmation Email:</strong> {formData.email}</p>
                      
                      <div className="mt-4">
                        <Link to="/" className="btn btn-dark">
                          Return to Home
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {(step === 1 || step === 2) && (
            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <hr />
                  
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between mb-3">
                      <div className="d-flex">
                        <img 
                          src={item.cover} 
                          alt={item.title} 
                          style={{ 
                            width: '50px', 
                            height: '50px', 
                            objectFit: 'cover',
                            marginRight: '15px' 
                          }}
                          className="rounded"
                        />
                        <div>
                          <p className="m-0">{item.title}</p>
                          <small className="text-muted">Qty: {item.quantity}</small>
                        </div>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
