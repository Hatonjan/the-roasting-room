import tiktokIcon from '../assets/img/tik-tok.png'
import instagramIcon from '../assets/img/instagram.png'
import facebookIcon from '../assets/img/facebook.png'

/* Navigation Links */
export const navLinks = [
  { id: 'Home'              , path: '/'         },
  { id: 'Menu'              , path: '/menu'     },
  { id: 'Our Beans'         , path: '/products' },
  { id: 'Tasting Experience', path: '/booking'  },
  { id: 'Location & Hours'  , path: '/location' },
]

/* Footer Navigation - Left Side (Home, Menu, Our Beans) */
export const navLinksFooterLeft = navLinks.slice(0, 3)

/* Footer Navigation - Right Side (Testing Experience, Location & Hours) */
export const navLinksFooterRight = navLinks.slice(3, 5)

/* Social Media Links */
export const socialMedia = [
  { link: 'https://instagram.com', icon: instagramIcon, altText: 'Instagram Icon' },
  { link: 'https://tiktok.com', icon: tiktokIcon, altText: 'TikTok Icon' },
  { link: 'https://facebook.com', icon: facebookIcon, altText: 'Facebook Icon' },
]
