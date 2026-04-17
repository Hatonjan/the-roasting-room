import '../styles/pages/BookingPage.css'
import coffeeTesting from '../assets/img/coffee-testing.png'

export default function BookingPage() {
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
                <li>Duration: 90 Minutes</li>
                <li>Class Size: 2-6 people</li>
                <li>Includes: Guided tasting of 3-4 coffees, brewing demonstrations, and a 4oz bag of coffee to take home.</li>
                <li>Price: $45 per person</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <section className='form-section'>
        <h2>Book Your Tasting Experience</h2>
        <form action="" className='booking-form'>

        </form>
      </section>
    </main>
  );
}