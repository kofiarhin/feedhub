import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, selectCart, selectCartSubtotal } from '../../features/cart/cartSlice';
import { useCreateOrder } from '../../hooks/useApiHooks';

const CheckoutPage = () => {
  const cart = useSelector(selectCart);
  const subtotal = useSelector(selectCartSubtotal);
  const [form, setForm] = useState({ customerName: '', phone: '', address: '', notes: '', fulfillmentType: 'delivery' });
  const createOrder = useCreateOrder();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await createOrder.mutateAsync({ ...form, storeId: cart.storeId, items: cart.items.map((i) => ({ itemId: i.itemId, quantity: i.quantity })) });
    dispatch(clearCart());
    navigate('/');
  };

  if (!cart.items.length) return <div>Cart is empty</div>;
  return <form onSubmit={submit}><input required placeholder='name' value={form.customerName} onChange={(e)=>setForm({...form,customerName:e.target.value})} /><input required placeholder='phone' value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} /><input required placeholder='address' value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} /><select value={form.fulfillmentType} onChange={(e)=>setForm({...form,fulfillmentType:e.target.value})}><option value='delivery'>Delivery</option><option value='pickup'>Pickup</option></select><p>Total ${subtotal.toFixed(2)} (Cash on Delivery)</p><button disabled={createOrder.isPending}>{createOrder.isPending ? 'Placing...' : 'Place Order'}</button></form>;
};
export default CheckoutPage;
