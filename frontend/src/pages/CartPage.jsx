import '../styles/pages/CartPage.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { API_BASE_URL } from '../config';

export default function CartPage() {
  const { items, setItems, total, setTotal } = useContext(CartContext);

  // Update quantity
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  // Calculate total price
  const calculateTotal = (cartItems) => {
    const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  };

  // Empty cart message
  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <p className="empty-cart-subtitle">Add some delicious coffee to get started!</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Cart with items
  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          {/* Cart Items List */}
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    width={100}
                  />
                </div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="item-flavors">{item.flavors}</p>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  <p className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Remove from cart"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-section">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>TBD</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>TBD</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
