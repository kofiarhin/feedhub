import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../features/auth/authSelectors';
import { logout } from '../../features/auth/authSlice';
import './component.styles.scss';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);

  const handleAdminLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate('/partner/login', { replace: true });
  };

  return (
    <div className="admin-layout app-container">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-head">
          <h2>Admin Panel</h2>
          <p>{user?.name ? `Signed in as ${user.name}` : 'Management controls'}</p>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'admin-link admin-link-active' : 'admin-link')}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'admin-link admin-link-active' : 'admin-link')}>
            Orders
          </NavLink>
          <NavLink to="/admin/menu" className={({ isActive }) => (isActive ? 'admin-link admin-link-active' : 'admin-link')}>
            Menu
          </NavLink>
          <NavLink to="/admin/store" className={({ isActive }) => (isActive ? 'admin-link admin-link-active' : 'admin-link')}>
            Store
          </NavLink>
        </nav>

        <button type="button" className="admin-logout-button" onClick={handleAdminLogout}>
          Logout
        </button>
      </aside>

      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
