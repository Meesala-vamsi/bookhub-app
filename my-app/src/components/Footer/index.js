import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logos-container">
      <FaGoogle className="footer-logos" />
      <FaTwitter className="footer-logos" />
      <FaInstagram className="footer-logos" />
      <FaYoutube className="footer-logos" />
    </div>
    <p className="contact-text">Contact us</p>
  </div>
)

export default Footer
