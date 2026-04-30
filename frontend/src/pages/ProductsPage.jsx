import '../styles/pages/ProductsPage.css'
import ProductCard from "../components/ProductCard";
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getProducts } from '../services/api';
import { CacheContext } from '../context/CacheContext';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cache, prefetchProducts } = useContext(CacheContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Check if data is already cached
        if (cache.products) {
          setProducts(cache.products);
          setLoading(false);
          return;
        }

        // Fetch fresh data
        const data = await prefetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="products-page">
      <h1>Our Beans</h1>

      {loading && <p className="loading">Loading products...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && products.length > 0 && (
        <section className="products-grid">
          {products.map((product) => (

            <ProductCard key={product.id} product={product} />
          
          ))}
        </section>
      )}

      {!loading && products.length === 0 && (
        <p className='no-available'>No products available</p>
      )}

      <section className="cta-section">
            <div className='cta-message'>
                <h2>Ready to get started?</h2>
                <h3>Contact us</h3>
            </div>

            <div className='cta-buttons'>
                <Link to='/booking' className='store-tasting'>In store Tasting</Link>
                <Link to='/location' className='contact-us'>Contact us</Link>
            </div>
        </section>
    </main>
  );
}
 