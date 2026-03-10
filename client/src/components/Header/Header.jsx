import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../features/cart/cartSelectors';
import { selectAuthUser } from '../../features/auth/authSelectors';
import './component.styles.scss';

const Header = () => {
  const cartCount = useSelector(selectCartCount);
  const user = useSelector(selectAuthUser);

  return (
    <header className="header">
      <Link to="/" className="header-brand">FeedHub</Link>
      <nav className="header-nav">
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
      </nav>
    </header>
  );
};

export default Header;
