import { useState } from 'react';
import { useStoreOrders, useUpdateOrderStatus } from '../../hooks/useApiHooks';
const statuses = ['Preparing','Ready','Completed'];
const AdminOrdersPage = () => { const [storeId,setStoreId]=useState(''); const {data}=useStoreOrders(storeId); const update = useUpdateOrderStatus(); return <div><input placeholder='Store Id' value={storeId} onChange={(e)=>setStoreId(e.target.value)} />{data?.map((order)=><div key={order._id}><span>{order.customerName}</span><select defaultValue={order.status} onChange={(e)=>update.mutate({id:order._id,status:e.target.value})}>{statuses.map((s)=><option key={s} value={s}>{s}</option>)}</select></div>)}</div>; };
export default AdminOrdersPage;
