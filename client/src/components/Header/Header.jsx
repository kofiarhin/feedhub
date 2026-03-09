import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../features/cart/cartSlice';
import './header.styles.scss';

const Header = () => {
  const count = useSelector(selectCartCount);
  return <header className='header'><Link to='/'>FeedHub</Link><nav className='header-nav'><Link to='/restaurants'>Restaurants</Link><Link to='/orders'>My Orders</Link><Link to='/admin'>Admin</Link><Link to='/cart'>Cart ({count})</Link></nav></header>;
};

export default Header;
