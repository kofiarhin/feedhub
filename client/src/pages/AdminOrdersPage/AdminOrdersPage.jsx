import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useStoreOrders } from '../../hooks/useStoreOrders';
import { useUpdateOrderStatus } from '../../hooks/useUpdateOrderStatus';
import StatusBadge from '../../components/StatusBadge/StatusBadge';

const STATUS_OPTIONS = ['Pending', 'Preparing', 'Ready', 'Completed'];

const AdminOrdersPage = () => {
  const storeId = useSelector((state) => state.auth.user?.storeId);
  const [statusFilter, setStatusFilter] = useState('all');
  const { data = [] } = useStoreOrders(storeId);
  const updateStatus = useUpdateOrderStatus();
  const filtered = statusFilter === 'all' ? data : data.filter((order) => order.status === statusFilter);

  return (
    <section className="app-stack">
      <h1>Store Orders</h1>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All</option>
        {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
      {filtered.map((order) => (
        <article key={order._id || order.id} className="card">
          <p>#{order._id || order.id}</p>
          <StatusBadge status={order.status} />
          <select value={order.status} onChange={(e) => updateStatus.mutate({ orderId: order._id || order.id, status: e.target.value, storeId })}>
            {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </article>
      ))}
    </section>
  );
};

export default AdminOrdersPage;
