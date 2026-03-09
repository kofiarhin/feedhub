import { Link } from 'react-router-dom';
import './restaurant-card.styles.scss';
const RestaurantCard = ({ store }) => <Link to={`/restaurants/${store._id}`} className='restaurant-card'><img src={store.logo} alt={store.name} /><h3>{store.name}</h3><p>{store.cuisineType}</p><p>{store.deliveryEstimate}</p></Link>;
export default RestaurantCard;
