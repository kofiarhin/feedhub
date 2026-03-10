import { Link } from 'react-router-dom';
import './component.styles.scss';

const RestaurantCard = ({ store }) => (
  <article className="restaurant-card">
    <h3>{store.name}</h3>
    <p>{store.cuisineType || 'Mixed cuisine'}</p>
    <Link to={`/restaurants/${store._id || store.id}`}>View menu</Link>
  </article>
);

export default RestaurantCard;
