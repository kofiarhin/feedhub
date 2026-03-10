import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '../../features/cart/cartSelectors';
import { selectAuthToken, selectAuthUser } from '../../features/auth/authSelectors';
import { logout } from '../../features/auth/authSlice';
import './component.styles.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const token = useSelector(selectAuthToken);
  const user = useSelector(selectAuthUser);

  const handleLogout = () => {
    const redirectPath = user?.role === 'admin' ? '/admin/login' : '/login';
    dispatch(logout());
    sessionStorage.clear();
    navigate(redirectPath, { replace: true });
  };

  return (
    <header className="header">
      <Link to="/" className="header-brand">FeedHub</Link>
      <nav className="header-nav">
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        {token && (
          <button type="button" className="header-logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
