import '../styles/pages/OrderDetailsPage.css';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      fetchOrderDetails();
    }
  }, [token, orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const orderData = await response.json();
        setOrder(orderData);
      } else {
        setError('Failed to load order details');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Error loading order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="order-details-page">
        <div className="order-details-container">
          <p>Loading order details...</p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="order-details-page">
        <div className="order-details-container">
          <p className="error-message">{error || 'Order not found'}</p>
          <button className="back-btn" onClick={() => navigate('/profile')}>
            Back to Profile
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="order-details-page">
      <div className="order-details-container">
        {/* Header */}
        <div className="order-details-header">
          <button className="back-btn" onClick={() => navigate('/profile')}>
            ← Back to Orders
          </button>
          <div className="order-details-title">
            <h1>Order #{order.id}</h1>
            <span className={`order-status-badge ${order.status?.toLowerCase()}`}>
              {order.status || 'Pending'}
            </span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary-section">
          <div className="summary-row">
            <span className="label">Order Date:</span>
            <span className="value">
              {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="summary-row">
            <span className="label">Order Total:</span>
            <span className="value total">${parseFloat(order.total).toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Payment Intent ID:</span>
            <span className="value">{order.payment_intent || 'N/A'}</span>
          </div>
        </div>

        {/* Items */}
        <div className="order-items-section">
          <h2>Items Ordered</h2>
          {order.items && order.items.length > 0 ? (
            <div className="items-list">
              {order.items.map(item => (
                <div key={item.id} className="item-row">
                  <div className="item-info">
                    <h3>{item.product?.name || 'Product'}</h3>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    <p className="price-per-unit">
                      ${parseFloat(item.price_at_purchase).toFixed(2)} each
                    </p>
                    <p className="subtotal">
                      ${parseFloat(item.subtotal).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No items in this order</p>
          )}
        </div>

        {/* Shipping Address */}
        <div className="shipping-section">
          <h2>Shipping Address</h2>
          <div className="address-box">
            <p>{order.shipping_address || 'No address provided'}</p>
          </div>
        </div>

        {/* Order Actions */}
        <div className="order-actions">
          {order.status === 'pending' && (
            <button className="cancel-order-btn">Cancel Order</button>
          )}
          <button className="continue-shopping-btn" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
}
