import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import EmptyState from '../../components/EmptyState/EmptyState';
import { removeItem, updateQuantity, selectCart, selectCartSubtotal } from '../../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const subtotal = useSelector(selectCartSubtotal);
  if (!cart.items.length) return <EmptyState text='Your cart is empty' />;
  return <div><h2>Cart ({cart.storeName})</h2>{cart.items.map((item)=><CartItem key={item.itemId} item={item} onUpdate={(id,q)=>dispatch(updateQuantity({itemId:id,quantity:q}))} onRemove={(id)=>dispatch(removeItem(id))} />)}<h3>Total: ${subtotal.toFixed(2)}</h3><Link to='/checkout'>Checkout</Link></div>;
};
export default CartPage;
