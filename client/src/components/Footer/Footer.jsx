import { Link } from 'react-router-dom';
import './component.styles.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/help">Help</Link>
      <Link to="/privacy">Privacy</Link>
      <Link to="/terms">Terms</Link>
    </div>
    <p>© {new Date().getFullYear()} FeedHub</p>
  </footer>
);

export default Footer;
