import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext'
import CartContextProvider from './context/CartContext'
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

function App() {
  return (
    <StripeProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <Router>
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
        </CartContextProvider>
      </AuthContextProvider>
    </StripeProvider>
  )
}

export default App
