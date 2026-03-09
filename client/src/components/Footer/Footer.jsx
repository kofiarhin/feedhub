import { Link } from 'react-router-dom';
import './footer.styles.scss';

const Footer = () => <footer className='footer'><Link to='/about'>About</Link><Link to='/contact'>Contact</Link><Link to='/help'>Help</Link><Link to='/terms'>Terms</Link><Link to='/privacy'>Privacy</Link></footer>;
export default Footer;
