import { useContext } from 'react';
import { Link } from 'react-router-dom' // from react-router-dom for client-side navigation
import heroBanner from '../assets/svg/logo.svg'
import shoppingBag from '../assets/svg/shopping-bag.svg'
import { navLinks } from '../data/navigation'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { items } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  
  // Calculate total quantity across all items
  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header className="header">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
            <img src={heroBanner} width="40" alt="Website logo"/>
          Roasting Room
        </Link>

        {/* Navigation */}
        <nav className="navbar-container">
            {/* Navigation Links */}
            <ul className="navbar-links">
            {navLinks.map((link) => (
                <li key={link.path}>
                    <Link to={link.path}>{link.id}</Link>
                </li>
            ))}      
            </ul>

            {/* User Actions */}
            <div className="navbar-actions">
            {user ? (
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            ) : (
              <Link to="/login" className="nav-link login-link">
                Login
              </Link>
            )}
            </div>

            <div className="navbar-actions">
            <Link to="/cart" className="cart-icon-container">
                <img src={shoppingBag} width={30} alt="Shopping bag icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            </div>

        </nav>
    </header>
  )
}