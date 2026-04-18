import { Link } from 'react-router-dom'
import '../styles/pages/HomePage.css'
import heroVideo from '../assets/video/hero-video.mp4'
import aboutImage from '../assets/img/about-img.png'
import { featuredProducts } from '../data/homePageData'



export default function HomePage() {
  return (
    <main className="home-page">
        <section className="hero">
            <video className='hero-video' autoPlay muted playsInline loop>
                <source src={heroVideo} type="video/mp4"/>
            </video>
            <div className='hero-message'>
                <h1>Roasting Room</h1>
                <h2>From Beans To Brew</h2>
                <button onClick={() => {
                    document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
                    }}>
                    Explore Our Shop
                </button>
            </div>
        </section>

        <section id="about" className="about">
            <h2>About Us</h2>
            
            <article className='aboutContainer'>
                <figure>
                    <img src={aboutImage} className='aboutImg' alt="A coffee shop seen with a roasting machine in the background" />
                </figure>
                <div className='about-message'>
                    <h3>Our Craft, Your Cup</h3>
                    <p>
                        The Roasting Room is more than just a coffee shop, it's a 
                        celebration of the entire coffee journey. We built this space 
                        to bring the craft of small-batch roasting right here to our 
                        neighborhood. We believe in quality, transparency, and that 
                        perfect moment when you find your new favorite brew.
                    </p>

                    <h4><strong>What makes us unique:</strong></h4>
                    <ul>
                        <li>
                        In-House Roasting: Every bean we serve is roasted on-site 
                        in our state of the art roaster. 
                        </li>
                        <li>
                            Single-Origin Sourcing: We meticulously source unique, 
                            single-origin beans from the world's best farms.
                        </li>
                        <li>
                            Barista-Led Tastings: Go beyond the cup and book an 
                            experience to learn the art and science behind every sip.
                        </li>
                    </ul>
                </div>
            </article>
        </section>
        
        <section className="featured-products">
            <h2>Our Feature Roasts</h2>
                <ul className='featured-grid'>
                    {featuredProducts.map((product) => (
                        <li key={product.id}>
                        <h3>{product.name}</h3>
                            <figure>
                                <img src={product.imgPath} width="350" alt={product.altText} />
                                <figcaption>{product.taste}</figcaption>
                            </figure>
                            <p>{product.description}</p>
                        </li>
                    ))} 
                </ul>
        </section>
        
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
