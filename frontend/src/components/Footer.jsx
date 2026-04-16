import { Link } from 'react-router-dom'
import footerLogo from '../assets/svg/logo.svg'
import { navLinksFooterLeft, navLinksFooterRight, socialMedia } from '../data/navigation'

export default function Footer() {
  return (
    <footer className="footer">

        <nav className="footer-navigation">
            <ul>
                {/* Navigation to the left of the logo */}
                {navLinksFooterLeft.map((link) => (
                <li key={link.path}>
                    <Link to={link.path}>{link.id}</Link>
                </li>
                ))}

                {/* Website logo */}
                <li>
                    <img src={footerLogo} width="40" alt="Roasting room logo"/>
                </li>

                {/* Navigation to the right of the logo */}
                {navLinksFooterRight.map((link) => (
                    <li key={link.path}>
                        <Link to={link.path}>{link.id}</Link>
                    </li>
                ))}
            </ul>
        </nav>

        <div className='footer-line'></div>

        <div className='social-media'>
            <ul>
                {socialMedia.map((media) => (
                <li key={media.link}>
                    <a href={media.link} target="_blank" rel="noopener noreferrer">
                        <img src={media.icon} width="40" alt={media.altText}/>
                    </a>
                </li>    
                ))}
            </ul>
        </div>

        <p className='copyright'>&copy; Roasting Room All Rights Reserved</p>

    </footer>
  );
}
