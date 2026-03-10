import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDashboardPage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <section className="app-stack">
      <h1>Admin Dashboard</h1>
      <p>Welcome back, {user?.name || "Admin"}.</p>

      <div className="app-grid">
        <Link to="/admin/orders" className="card">
          <h3>Orders</h3>
          <p>Manage incoming orders.</p>
        </Link>

        <Link to="/admin/menu" className="card">
          <h3>Menu</h3>
          <p>Manage your menu items.</p>
        </Link>

        <Link to="/admin/store" className="card">
          <h3>Store</h3>
          <p>Update store profile.</p>
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
