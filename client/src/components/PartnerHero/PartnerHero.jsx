import { Link } from 'react-router-dom';
import './component.styles.scss';

const PartnerHero = () => (
  <section className="partner-hero">
    <p className="partner-hero-eyebrow">Restaurant partners</p>
    <h1>Grow your restaurant with FeedHub</h1>
    <p>Accept online orders, update your menu in minutes, and keep service moving with real-time order management.</p>
    <div className="partner-hero-actions">
      <Link to="/partner/onboarding" className="partner-hero-primary">Start onboarding</Link>
      <Link to="/partner/auth" className="partner-hero-secondary">Sign in</Link>
    </div>
  </section>
);

export default PartnerHero;
