import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '../../features/cart/cartSelectors';
import { selectAuthToken, selectAuthUser } from '../../features/auth/authSelectors';
import { logout } from '../../features/auth/authSlice';
import './component.styles.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
        { to: '/cart', label: `Cart (${cartCount})` },
      ];
    }

    if (isAdmin) {
      return [
        { to: '/', label: 'Home' },
        { to: '/restaurants', label: 'Restaurants' },
        { to: '/admin', label: 'Admin Dashboard' },
        { to: '/admin/orders', label: 'Admin Orders' },
        { to: '/admin/menu', label: 'Admin Menu' },
        { to: '/admin/store', label: 'Admin Store' },
      ];
    }

    return [
      { to: '/', label: 'Home' },
      { to: '/restaurants', label: 'Restaurants' },
      { to: '/orders', label: 'My Orders' },
      { to: '/cart', label: `Cart (${cartCount})` },
    ];
  }, [cartCount, isAdmin, token]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }

    document.body.style.overflow = '';

    return undefined;
  }, [mobileOpen]);

  const handleLogout = () => {
    const redirectPath = isAdmin ? '/admin/login' : '/login';
    dispatch(logout());
    sessionStorage.clear();
    setMobileOpen(false);
    navigate(redirectPath, { replace: true });
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="header-container">
      <div className="header-inner app-container">
        <Link to="/" className="header-brand" onClick={closeMobileMenu}>FeedHub</Link>

        <nav className="header-nav-desktop" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'header-link header-link-active' : 'header-link')}
            >
              {item.label}
            </NavLink>
          ))}

          {!token && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'header-action-link header-action-link-active' : 'header-action-link')}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? 'header-cta header-cta-active' : 'header-cta')}
              >
                Register
              </NavLink>
              <NavLink to="/admin/login" className="header-admin-link">Admin Login</NavLink>
            </>
          )}

          {token && (
            <button type="button" className="header-logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>

        <button
          type="button"
          className="header-menu-toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={mobileOpen ? 'header-overlay header-overlay-open' : 'header-overlay'} onClick={closeMobileMenu} />

      <aside className={mobileOpen ? 'header-drawer header-drawer-open' : 'header-drawer'} aria-label="Mobile navigation">
        <div className="header-drawer-top">
          <span className="header-drawer-title">Menu</span>
          <button type="button" className="header-drawer-close" aria-label="Close menu" onClick={closeMobileMenu}>
            ✕
          </button>
        </div>

        <nav className="header-drawer-nav" aria-label="Mobile primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) => (isActive ? 'header-drawer-link header-drawer-link-active' : 'header-drawer-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {!token && (
          <div className="header-drawer-auth">
            <NavLink to="/login" className="header-drawer-login" onClick={closeMobileMenu}>
              Login
            </NavLink>
            <NavLink to="/register" className="header-drawer-register" onClick={closeMobileMenu}>
              Register
            </NavLink>
            <NavLink to="/admin/login" className="header-drawer-admin" onClick={closeMobileMenu}>
              Admin Login
            </NavLink>
          </div>
        )}

        {token && (
          <button type="button" className="header-drawer-logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </aside>
    </header>
  );
};

export default Header;
