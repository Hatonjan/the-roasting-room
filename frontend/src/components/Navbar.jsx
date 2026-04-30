import { useContext, useState } from 'react';
import { Link } from 'react-router-dom' // from react-router-dom for client-side navigation
import heroBanner from '../assets/svg/logo.svg'
import shoppingBag from '../assets/svg/shopping-bag.svg'
import { navLinks } from '../data/navigation'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { CacheContext } from '../context/CacheContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { prefetchProducts } = useContext(CacheContext);
  
  // Calculate total quantity across all items
  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Prefetch products when hovering over "Our Beans" link
  const handleProductsHover = () => {
    prefetchProducts().catch(err => console.error('Prefetch failed:', err))
  }

  return (
    <header className="header">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
            <img src={heroBanner} width="40" alt="Website logo"/>
          Roasting Room
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className="hamburger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation */}
        <nav className={`navbar-container ${isMenuOpen ? 'active' : ''}`}>
            {/* Navigation Links */}
            <ul className="navbar-links">
            {navLinks.map((link) => (
                <li key={link.path}>
                    <Link 
                      to={link.path} 
                      onClick={() => setIsMenuOpen(false)}
                      onMouseEnter={() => link.path === '/products' && handleProductsHover()}
                    >
                      {link.id}
                    </Link>
                </li>
            ))}      
            </ul>

            {/* User Actions */}
            <div className="navbar-actions">
            {user ? (
              <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
            ) : (
              <Link to="/login" className="nav-link login-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
            </div>

            <div className="navbar-actions">
            <Link to="/cart" className="cart-icon-container" onClick={() => setIsMenuOpen(false)}>
                <img src={shoppingBag} width={30} alt="Shopping bag icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            </div>

        </nav>
    </header>
  )
}