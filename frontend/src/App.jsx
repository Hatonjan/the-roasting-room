import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from 'react-ga4'
import AuthContextProvider from './context/AuthContext'
import CartContextProvider from './context/CartContext'
import CacheContextProvider from './context/CacheContext'
import StripeProvider from './context/StripeProvider';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ProductsPage from './pages/ProductsPage'
import BookingPage from './pages/BookingPage'
import LocationPage from './pages/LocationPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import './App.css'
import './index.css'
import './styles/components.css'

// Initialize Google Analytics
ReactGA.initialize('G-0ZGVDM014B')

// Component to track page views
function PageTracker() {
  const location = useLocation()
  
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname, title: document.title })
  }, [location])

  return null
}

function App() {
  return (
    <HelmetProvider>
      <StripeProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <CacheContextProvider>
              <Router>
                <PageTracker />
              <div className="app">
                <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/location" element={<LocationPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/order/:orderId" element={<OrderDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
            </CacheContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </StripeProvider>
    </HelmetProvider>
  )
}

export default App
