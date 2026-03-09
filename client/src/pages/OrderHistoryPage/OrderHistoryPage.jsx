import { useMyOrders } from '../../hooks/useApiHooks';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
const OrderHistoryPage = () => { const {data,isLoading}=useMyOrders(); if(isLoading) return <div>Loading...</div>; return <div>{data?.map((order)=><div key={order._id}><h4>${order.totalPrice}</h4><StatusBadge status={order.status} /></div>)}</div>; };
export default OrderHistoryPage;
