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

  const desktopLinks = useMemo(() => {
    if (!token) {
      return [
        { to: '/restaurants', label: 'Restaurants' },
        { to: '/cart', label: `Cart (${cartCount})` }
      ];
    }

    if (isAdmin) {
      return [
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/orders', label: 'Orders' },
        { to: '/admin/menu', label: 'Menu' },
        { to: '/admin/store', label: 'Store' }
      ];
    }

    return [
      { to: '/restaurants', label: 'Restaurants' },
      { to: '/cart', label: `Cart (${cartCount})` },
      { to: '/orders', label: 'My Orders' }
    ];
  }, [cartCount, isAdmin, token]);

  const guestActions = [
    { to: '/auth?mode=login', label: 'Sign In', className: 'header-secondary-action' },
    { to: '/auth?mode=register', label: 'Get Started', className: 'header-primary-action' },
    { to: '/partner', label: 'For Restaurants', className: 'header-partner-entry' }
  ];

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
    navigate(isAdmin ? '/partner/auth' : '/auth?mode=login', { replace: true });
  };

  const mobileLinks = !token
    ? [
      { to: '/restaurants', label: 'Restaurants' },
      { to: '/cart', label: `Cart (${cartCount})` },
      ...guestActions
    ]
    : [
      ...desktopLinks,
      { action: handleLogout, label: 'Logout' }
    ];

  return (
    <header className="header-container">
      <div className="header-inner app-container">
        <Link to="/" className="header-brand">FeedHub</Link>
        <nav className="header-nav-desktop" aria-label="Primary">
          {desktopLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className="header-link">{item.label}</NavLink>
          ))}
          {!token ? guestActions.map((item) => (
            <NavLink key={item.to} to={item.to} className={item.className}>{item.label}</NavLink>
          )) : <button type="button" className="header-logout-button" onClick={handleLogout}>Logout</button>}
        </nav>
        <button type="button" className="header-menu-toggle" onClick={() => setMobileOpen((prev) => !prev)}>
          <span /><span /><span />
        </button>
      </div>

      <aside className={mobileOpen ? 'header-drawer header-drawer-open' : 'header-drawer'}>
        <nav className="header-drawer-nav" aria-label="Mobile primary">
          {mobileLinks.map((item) => (
            item.action ? (
              <button key={item.label} type="button" className="header-drawer-button" onClick={item.action}>{item.label}</button>
            ) : (
              <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="header-drawer-link">{item.label}</NavLink>
            )
          ))}
        </nav>
      </aside>
    </header>
  );
};

export default Header;
