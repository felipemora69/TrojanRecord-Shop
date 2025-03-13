import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
//import Footer from '../components/Footer';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    } else {
      setIsLoading(false);
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 mt-5 min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 shadow">
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center mb-4">Profile</h2>

                {isLoading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status"></div>
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <strong>Name:</strong> {currentUser.name}
                    </div>
                    <div className="mb-3">
                      <strong>Email:</strong> {currentUser.email}
                    </div>

                    {/* Show user's order history or other personal info */}
                    <h4>Order History</h4>
                    <ul className="list-group">
                      {currentUser.orders && currentUser.orders.length > 0 ? (
                        currentUser.orders.map((order) => (
                          <li className="list-group-item" key={order.id}>
                            Order #{order.id} - {order.date} - Total: {order.total}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item">No orders found.</li>
                      )}
                    </ul>

                    <div className="mt-4 text-center">
                      <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;