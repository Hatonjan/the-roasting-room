/**
 * CheckoutPage.jsx
 * 
 * Checkout page with shipping and billing forms
 * Collects customer info for order processing
 */

import '../styles/pages/CheckoutPage.css';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { API_BASE_URL } from '../config';

export default function CheckoutPage() {
  const { items, total } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    sameAsBilling: true,
  });

  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes for shipping form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle input changes for billing form
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.street) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty');
      setLoading(false);
      return;
    }

    try {
      // Prepare order data
      const orderData = {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone || '',
        shipping_address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
        },
        billing_address: formData.sameAsBilling ? {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
        } : {
          street: billingData.street,
          city: billingData.city,
          state: billingData.state,
          zip_code: billingData.zipCode,
          country: billingData.country,
        },
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total_amount: total,
      };

      // TODO: Send to backend when API is ready
      console.log('Order data:', orderData);
      
      // For now, show success and redirect
      alert('Order placed successfully! (Demo mode - no payment processed)');
      navigate('/');
    } catch (err) {
      setError('Error placing order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to cart if empty
  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <h1>Checkout</h1>
          <div className="empty-checkout">
            <p>Your cart is empty</p>
            <p className="empty-checkout-subtitle">Add items before checking out</p>
            <Link to="/products" className="back-to-cart-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-content">
            {/* Left side - Forms */}
            <div className="checkout-forms">
              {error && <div className="error-message">{error}</div>}

              {/* Shipping Information */}
              <section className="form-section">
                <h2>Shipping Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
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
                </div>

                <div className="form-group">
                  <label htmlFor="street">Street Address *</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State/Province *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP/Postal Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Billing Information */}
              <section className="form-section">
                <div className="billing-header">
                  <h2>Billing Information</h2>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="sameAsBilling"
                      checked={formData.sameAsBilling}
                      onChange={handleInputChange}
                    />
                    Same as shipping address
                  </label>
                </div>

                {!formData.sameAsBilling && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="billingFirstName">First Name *</label>
                        <input
                          type="text"
                          id="billingFirstName"
                          name="firstName"
                          value={billingData.firstName}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="billingLastName">Last Name *</label>
                        <input
                          type="text"
                          id="billingLastName"
                          name="lastName"
                          value={billingData.lastName}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="billingStreet">Street Address *</label>
                      <input
                        type="text"
                        id="billingStreet"
                        name="street"
                        value={billingData.street}
                        onChange={handleBillingChange}
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="billingCity">City *</label>
                        <input
                          type="text"
                          id="billingCity"
                          name="city"
                          value={billingData.city}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="billingState">State/Province *</label>
                        <input
                          type="text"
                          id="billingState"
                          name="state"
                          value={billingData.state}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="billingZip">ZIP/Postal Code *</label>
                        <input
                          type="text"
                          id="billingZip"
                          name="zipCode"
                          value={billingData.zipCode}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="billingCountry">Country *</label>
                        <input
                          type="text"
                          id="billingCountry"
                          name="country"
                          value={billingData.country}
                          onChange={handleBillingChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </section>

              {/* Payment Section */}
              <section className="form-section payment-section">
                <h2>Payment Information</h2>
                <div className="payment-notice">
                  <p>Stripe payment integration coming soon.</p>
                  <p className="notice-subtitle">For now, clicking "Place Order" will submit your information.</p>
                </div>
              </section>
            </div>

            {/* Right side - Order Summary */}
            <div className="checkout-summary">
              <div className="summary-header">
                <h3>Order Summary</h3>
              </div>

              <div className="summary-items">
                {items.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="summary-item-image">
                      <img
                        src={`${API_BASE_URL}${item.image_url}`}
                        alt={item.name}
                        width={60}
                      />
                    </div>
                    <div className="summary-item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="summary-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-breakdown">
                <div className="breakdown-row">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="breakdown-row">
                  <span>Shipping:</span>
                  <span className="tbd">TBD</span>
                </div>
                <div className="breakdown-row">
                  <span>Tax:</span>
                  <span className="tbd">TBD</span>
                </div>
              </div>

              <div className="summary-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>

              <Link to="/cart" className="back-to-cart-link">
                ← Back to Cart
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
