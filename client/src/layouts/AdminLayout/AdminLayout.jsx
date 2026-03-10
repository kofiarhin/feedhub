import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div className="admin-layout app-container">
    <aside>
      <h3>Admin</h3>
      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/menu">Menu</Link>
        <Link to="/admin/store">Store</Link>
      </nav>
    </aside>
    <section><Outlet /></section>
  </div>
);

export default AdminLayout;
