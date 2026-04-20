
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { API_BASE_URL } from '../config';

export default function ProductCard({ product }) {
  const { items, setItems, total, setTotal } = useContext(CartContext);

  const handleAddToCart = () => {
    // Check if product already in cart
    const existingItem = items.find(item => item.id === product.id);
    
    let updatedItems;
    if (existingItem) {
      // If exists, increase quantity
      updatedItems = items.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // If new, add with quantity 1 and ensure price is a number
      const productWithNumericPrice = {
        ...product,
        price: parseFloat(product.price),
        quantity: 1
      };
      updatedItems = [...items, productWithNumericPrice];
    }
    
    setItems(updatedItems);
    
    // Recalculate total
    const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  };

  return (
    <article className="product-card">
          <figure >
            <img src={product.image_url} width={170} alt={product.name} />
            <figcaption><strong>{product.name}</strong></figcaption>
          </figure>

          <p className="flavors">{product.flavors}</p>
          <p className="price">${product.price}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>Shop Now</button>
    </article>
  );
}

