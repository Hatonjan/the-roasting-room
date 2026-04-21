import '../styles/pages/ProfilePage.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import { useNavigate, Link } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, token, logout, updateUser, loading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch orders on component load
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // If not logged in, show login prompt
  if (!user && !loading) {
    return (
      <main className="profile-page">
        <div className="profile-container">
          <div className="empty-profile">
            <h2>Please log in to view your profile</h2>
            <Link to="/" className="login-btn">Go Home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        {user && (
          <div className="profile-header">
            <div className="profile-avatar">
              {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
            </div>
            <div className="profile-info">
              <h1>{user.first_name} {user.last_name}</h1>
              <p className="profile-email">{user.email}</p>
              <p className="profile-join">Member since {new Date(user.date_joined).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            Account Information
          </button>
          <button
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          <button
            className={`tab-button ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            Addresses
          </button>
        </div>

        {/* Account Information Tab */}
        {activeTab === 'account' && (
          <div className="tab-content account-tab">
            <section className="profile-section">
              <div className="section-header">
                <h2>Account Information</h2>
                {!isEditing && (
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form className="edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="save-btn"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : user ? (
                <div className="info-display">
                  <div className="info-row">
                    <span className="info-label">First Name:</span>
                    <span className="info-value">{user.first_name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Last Name:</span>
                    <span className="info-value">{user.last_name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{user.phone}</span>
                  </div>
                </div>
              ) : (
                <p>Loading user data...</p>
              )}
            </section>

            {/* Account Security */}
            <section className="profile-section">
              <h2>Account Security</h2>
              <div className="security-option">
                <div className="security-info">
                  <h3>Password</h3>
                  <p>Last changed{}</p>
                </div>
                <button className="change-password-btn">Change Password</button>
              </div>
            </section>

            {/* Logout Section */}
            <section className="profile-section logout-section">
              <h2>Log Out</h2>
              <p className="logout-description">
                You are currently logged in. Click below to log out of your account.
              </p>
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </section>
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === 'orders' && (
          <div className="tab-content orders-tab">
            <section className="profile-section">
              <h2>Order History</h2>
              {loadingOrders ? (
                <p>Loading orders...</p>
              ) : orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-id-date">
                          <h3>Order #{order.id}</h3>
                          <p className="order-date">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="order-status-total">
                          <span className={`order-status ${order.status?.toLowerCase()}`}>
                            {order.status || 'Pending'}
                          </span>
                          <p className="order-total">${order.total_amount}</p>
                        </div>
                      </div>
                      <div className="order-footer">
                        <p className="order-items">{order.items?.length || 0} items</p>
                        <button className="view-details-btn">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-orders">
                  <p>You haven't placed any orders yet.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="tab-content addresses-tab">
            <section className="profile-section">
              <div className="section-header">
                <h2>Saved Addresses</h2>
                <button className="add-address-btn">+ Add Address</button>
              </div>
              <div className="addresses-list">
                <div className="address-card">
                  <div className="address-header">
                    <h3>Home</h3>
                    <span className="default-badge">Default</span>
                  </div>
                  <p className="address-text">123 Main Street</p>
                  <p className="address-text">New York, NY 10001</p>
                  <p className="address-text">United States</p>
                  <div className="address-actions">
                    <button className="edit-address-btn">Edit</button>
                    <button className="delete-address-btn">Delete</button>
                  </div>
                </div>

                <div className="address-card">
                  <div className="address-header">
                    <h3>Work</h3>
                  </div>
                  <p className="address-text">456 Office Boulevard</p>
                  <p className="address-text">San Francisco, CA 94105</p>
                  <p className="address-text">United States</p>
                  <div className="address-actions">
                    <button className="edit-address-btn">Edit</button>
                    <button className="delete-address-btn">Delete</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
