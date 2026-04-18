import '../styles/pages/BookingPage.css'
import coffeeTesting from '../assets/img/coffee-testing.png'
import { useState } from 'react'

export default function BookingPage() {
  // State frm fields
  const [formData, setFormData] =  useState({
    name: '',
    email: '',
    phone_number: '',
    date: '',
    seats: 1
  }); 

  // State form feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const{name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/bookings/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      
      if(!response.ok) throw new Error('booking failed')

      setSuccess(true)
      setFormData({ name: '', email: '', phone_number: '', date: '', seats: 1 })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="booking-page">
      <section className='booking-hero'>
        <h1>Roasting Room Tasting Experience</h1>
        <h2>Go Beyond the Brew: A Journey from Bean to Cup</h2>

        <div className='booking-message'>
          <img src={coffeeTesting} width="600" alt="Two people preparing a table for a coffee testing experience"/>
          
          <div className='booking-about'>
            <p>
              Join us for our signature Tasting Experience, a 90-minute immersive class designed for coffee lovers of all levels. This isn't just a tasting; it's a journey from bean to cup, led by one of our professional baristas.
            </p>
            <p>
              You'll explore the fundamentals of "cupping"—the professional method of tasting coffee—and learn to identify nuanced tasting notes just like our roasters do. We will guide you through 3-4 of our exclusive single-origin roasts, each prepared with a different brewing method (like Pour-Over, French Press, and AeroPress) to highlight its unique profile.
            </p>
            <p>
              You'll leave with a new appreciation for the craft, a more developed palate, and a complimentary 4oz bag of your favorite coffee from the tasting.
            </p>

            <div className='key-details'>
              <h3><strong>Key Details:</strong></h3>
              <ul>
                <li><strong>Duration:</strong> 90 Minutes</li>
                <li><strong>Class Size:</strong> 2-6 people</li>
                <li><strong>Includes:</strong> Guided tasting of 3-4 coffees, brewing demonstrations, and a 4oz bag of coffee to take home.</li>
                <li><strong>Price:</strong> $45 per person</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <section className='booking-form'>
        <h2>Book Your Tasting Experience</h2>

        {error && <p className='error'>{error}</p>}
        {success && <p className=''>Booking Confirmed!</p>}

        <div className='form-grid'>
          <div>{/*white space*/}</div>
          <form onSubmit={handleSubmit} className='booking-form'>
            
            <input 
            type="text" 
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            required
            />
            
            <input 
            type="email" 
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
            />
            
            <input 
            type="tel" 
            name='phone_number'
            placeholder='Phone (optional)'
            value={formData.phone_number}
            onChange={handleChange}
            required
            />
            
            <input 
            type="datetime-local" 
            name='date'
            placeholder='Date'
            value={formData.date}
            onChange={handleChange}
            required
            />
            
            <select 
              name="seats" 
              value={formData.seats}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n =>(
                <option key={n} value={n}>{n} seats</option>              
              ))}
            </select>

            <button type='submit' disable={loading}>
              {loading ? 'Booking...' : 'Book now'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}