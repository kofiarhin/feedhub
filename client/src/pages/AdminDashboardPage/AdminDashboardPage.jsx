import { useSelector } from 'react-redux';

const AdminDashboardPage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <section className="app-stack">
      <h1>Admin Dashboard</h1>
      <p>Welcome back, {user?.name || 'Admin'}.</p>
      <div className="app-grid">
        <div className="card"><h3>Orders</h3><p>Manage incoming orders.</p></div>
        <div className="card"><h3>Menu</h3><p>Manage your menu items.</p></div>
        <div className="card"><h3>Store</h3><p>Update store profile.</p></div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
