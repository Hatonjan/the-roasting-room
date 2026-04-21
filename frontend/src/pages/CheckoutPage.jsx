import '../styles/pages/CheckoutPage.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { API_BASE_URL } from '../config';

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const { items, total, setItems, setTotal } = useContext(CartContext);
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
    console.log('Form submitted, stripe:', !!stripe, 'elements:', !!elements);
    
    // Validate Stripe is loaded
    if (!stripe || !elements) {
      setError('Payment system is not ready. Please refresh the page.');
      console.error('Stripe not loaded');
      return;
    }

    // Validate all required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.street || !formData.city || !formData.state || !formData.zipCode || !formData.country) {
      setError('Please fill in all required fields');
      console.error('Form validation failed');
      return;
    }
    
    console.log('Starting payment process...');
    setLoading(true);
    setError('');

    try {
      // Get payment intent from backend
      const response = await fetch(`${API_BASE_URL}/orders/payment-intent/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
          }
        }
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      // Payment succeeded - create order
      if (result.paymentIntent.status === 'succeeded') {
        const shippingAddressStr = `${formData.street}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`;
        
        const orderData = {
          total: total,
          shipping_address: shippingAddressStr,
          payment_intent: result.paymentIntent.id,
          status: 'paid',
        };

        // Send to backend
        const orderResponse = await fetch(`${API_BASE_URL}/orders/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(orderData)
        });

        if (orderResponse.ok) {
          // Clear cart items
          setItems([]);
          setTotal(0);
          navigate('/profile'); // Redirect to orders
        } else {
          throw new Error('Failed to create order');
        }
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      console.error('Payment error:', err);
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
                        src={item.image_url}
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

              <section className="form-section">
                <h2>Payment Information</h2>
                <div className="card-element-wrapper">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#2e1f07',
                          '::placeholder': {
                            color: '#897d54',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </div>
              </section>

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
