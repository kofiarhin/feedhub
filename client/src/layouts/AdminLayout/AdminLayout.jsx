import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../features/auth/authSelectors';
import { logout } from '../../features/auth/authSlice';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);

  const handleAdminLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-layout app-container">
      <aside>
        <h3>Admin</h3>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/menu">Menu</Link>
          <Link to="/admin/store">Store</Link>
        </nav>
        {user && (
          <button type="button" onClick={handleAdminLogout}>
            Logout
          </button>
        )}
      </aside>
      <section><Outlet /></section>
    </div>
  );
};

export default AdminLayout;
