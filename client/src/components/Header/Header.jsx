import { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const navItems = useMemo(() => {
    if (!token) {
      return [
        { to: '/', label: 'Home' },
        { to: '/restaurants', label: 'Restaurants' },
        { to: '/cart', label: `Cart (${cartCount})` }
      ];
    }

    if (isAdmin) {
      return [
        { to: '/', label: 'Home' },
        { to: '/restaurants', label: 'Restaurants' },
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/orders', label: 'Orders' },
        { to: '/admin/menu', label: 'Menu' },
        { to: '/admin/store', label: 'Store' }
      ];
    }

    return [
      { to: '/', label: 'Home' },
      { to: '/restaurants', label: 'Restaurants' },
      { to: '/cart', label: `Cart (${cartCount})` },
      { to: '/orders', label: 'My Orders' }
    ];
  }, [cartCount, isAdmin, token]);

  const handleLogout = () => {
    const redirectPath = isAdmin ? '/partner/login' : '/login';
    dispatch(logout());
    sessionStorage.clear();
    setMobileOpen(false);
    navigate(redirectPath, { replace: true });
  };

  return (
    <header className="header-container">
      <div className="header-inner app-container">
        <Link to="/" className="header-brand">FeedHub</Link>
        <nav className="header-nav-desktop" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'header-link header-link-active' : 'header-link')}>
              {item.label}
            </NavLink>
          ))}

          {!token && (
            <>
              <NavLink to="/login" className="header-action-link">Login</NavLink>
              <NavLink to="/register" className="header-cta">Sign Up</NavLink>
              <NavLink to="/partner/register" className="header-admin-link">Register Restaurant</NavLink>
              <NavLink to="/partner/login" className="header-admin-link">Restaurant Login</NavLink>
            </>
          )}

          {token ? <button type="button" className="header-logout-button" onClick={handleLogout}>Logout</button> : null}
        </nav>

        <button type="button" className="header-menu-toggle" onClick={() => setMobileOpen((prev) => !prev)}>
          <span /><span /><span />
        </button>
      </div>

      <aside className={mobileOpen ? 'header-drawer header-drawer-open' : 'header-drawer'}>
        <nav className="header-drawer-nav" aria-label="Mobile primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="header-drawer-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
        {!token && (
          <div className="header-drawer-auth">
            <NavLink to="/login" className="header-drawer-login" onClick={() => setMobileOpen(false)}>Login</NavLink>
            <NavLink to="/register" className="header-drawer-register" onClick={() => setMobileOpen(false)}>Sign Up</NavLink>
            <NavLink to="/partner/register" className="header-drawer-admin" onClick={() => setMobileOpen(false)}>Register Restaurant</NavLink>
            <NavLink to="/partner/login" className="header-drawer-admin" onClick={() => setMobileOpen(false)}>Restaurant Login</NavLink>
          </div>
        )}
        {token ? <button type="button" className="header-drawer-logout" onClick={handleLogout}>Logout</button> : null}
      </aside>
    </header>
  );
};

export default Header;
