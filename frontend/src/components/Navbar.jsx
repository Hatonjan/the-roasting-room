import { Link } from 'react-router-dom' //from react-router-dom for client-side navigation
import heroBanner from '../assets/svg/logo.svg'
import shoppingBag from '../assets/svg/shopping-bag.svg'
import '../styles/components.css'

export default function Navbar() {
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
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/products">Our Beans</Link>
          </li>
          <li>
            <Link to="/booking">Testing Experience</Link>
          </li>
          <li>
            <Link to="/location">Location & Hours</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>

        {/* User Actions */}
        <div className="navbar-actions">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/CartPage">
            <img src={shoppingBag} width={30} alt="Shopping bag icon" />
          </Link>
        </div>

      </nav>
    </header>
  )
}