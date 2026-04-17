export default function LocationPage() {
  return (
    <main className="Location-page">
      <h2>Location Page</h2>
      <p>The address and a embedded google maps will go here</p>
    </main>
  );
}

export default function ContactForm() {
  return (
    <form name="contact" method="POST" netlify>
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <textarea name="message"></textarea>
      <button type="submit">Send</button>
    </form>
  )
}