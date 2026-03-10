import { Link } from 'react-router-dom';

const GuestOrderConfirmationPage = () => (
  <section className="app-stack">
    <h1>Order Confirmed</h1>
    <p>Your order has been placed successfully. Keep your phone available for delivery updates.</p>
    <Link to="/restaurants">Continue browsing restaurants</Link>
  </section>
);

export default GuestOrderConfirmationPage;
