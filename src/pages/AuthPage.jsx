import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, signup, currentUser } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If user is already logged in, redirect to home
    if (currentUser) {
      navigate('/profile');
    }
  }, [currentUser, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        // Perform login using the useAuth login method
        await login(email, password);
        toast.success('Login successful! Welcome!');
        navigate('/profile');
      } else {
        // Perform signup using the useAuth signup method
        if (password !== confirmPassword) {
          setError('Passwords do not match!');
          setIsLoading(false);
          return;
        }
        await signup(name, email, password);  // Pass user for signup
        toast.success('Account created successfully!');
        navigate('/profile');
      }
    } catch (error) {
      setError(error.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };
  
  return (
    <>
      <Navbar />
      
      <div className="container py-5 mt-5 min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow">
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Create Account'}</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  {!isLogin && (
                    <>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    </>
                  )}
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-dark py-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {isLogin ? 'Logging in...' : 'Signing up...'}
                        </>
                      ) : (
                        isLogin ? 'Login' : 'Create Account'
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="text-center mt-4">
                  <button 
                    type="button" 
                    className="btn btn-link text-dark p-0"
                    onClick={toggleForm}
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
