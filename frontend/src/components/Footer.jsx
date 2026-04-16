import { Link } from 'react-router-dom'
import tiktokIcon from'../assets/img/tik-tok.png'
import instagramIcon from'../assets/img/instagram.png'
import facebookIcon from'../assets/img/facebook.png'
import footerLogo from'../assets/svg/logo.svg'
import '../styles/components.css'

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-navigation">
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
            <img src={footerLogo} width="40" alt="Roasting room logo"/>
          </li>
          <li>
            <Link to="/booking">Testing Experience</Link>
          </li>
          <li>
            <Link to="/location">Location & Hours</Link>
          </li>
      </div>

      <div className='footer-line'></div>

      <div className='social-media'>
        <ul>
            <li>
                <Link to="https://tiktok.com">
                    <img src={instagramIcon} width="40" alt="Instagram icon"/>
                </Link>
            </li>
            <li>
                <Link to="https://tiktok.com">
                    <img src={tiktokIcon} width="40" alt="Tiktok icon"/>
                </Link>
            </li>
            <li>
                <Link to="https://tiktok.com">
                    <img src={facebookIcon} width="40" alt="Facebook icon"/>
                </Link>
            </li>
        </ul>
      </div>

      <p className='copyright'>&copy; Roasting Room All Rights Reserved</p>

    </footer>
  );
}
