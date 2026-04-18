import '../styles/pages/LocationPage.css'

export default function LocationPage() {
  return (
    <main className="location-page">
      <h1>Visit The Roasting Room</h1>
      
      <section className="location-info">

        <div className='hours-info'>
          <h3>Hours</h3>
          <ul>
            <li>Monday - Friday: 7:00 AM - 6:00 PM</li>
            <li>Saturday: 8:00 AM - 7:00 PM</li>
            <li>Sunday: 8:00 AM - 5:00 PM</li>
          </ul>
        </div>

        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429158.4382536561!2d-117.43741371334865!3d32.82405591368828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9530fad921e4b%3A0xd3a21fdfd15df79!2sSan%20Diego%2C%20CA!5e0!3m2!1sen!2sus!4v1776397627785!5m2!1sen!2sus" 
          width="600" 
          height="450" 
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="The Roasting Room Location">
        </iframe>
        
        <div className="address-info">
          <p>123 Coffee Street<br/>San Diego, CA 92101</p>
          <p><strong>Phone:</strong> (619) 555-ROAST</p>
          <p><strong>Email:</strong> hello@roastingroom.com</p>
        </div>
      </section>

      <div className='contact-section'>
        <h3>Feel free to reach out if you have any questions</h3>
        
        <form name="contact" method="POST" className='contact-form' netlify>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />

          <label htmlFor="message">Message</label>
          <textarea name="message"></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
