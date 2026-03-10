import { useMyOrders } from '../../hooks/useMyOrders';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import EmptyState from '../../components/EmptyState/EmptyState';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { formatDateTime } from '../../utils/formatters';

const OrderHistoryPage = () => {
  const { data, isLoading, isError, error } = useMyOrders();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <EmptyState title="Failed to load orders" description={error.message} />;
  if (!data?.length) return <EmptyState title="No orders yet" description="Your placed orders appear here." />;

  return (
    <section className="app-stack">
      <h1>My Orders</h1>
      {data.map((order) => (
        <article className="card" key={order._id || order.id}>
          <p>Order #{order._id || order.id}</p>
          <p>{formatDateTime(order.createdAt)}</p>
          <StatusBadge status={order.status} />
        </article>
      ))}
    </section>
  );
};

export default OrderHistoryPage;
