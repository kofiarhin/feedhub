import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem';
import EmptyState from '../../components/EmptyState/EmptyState';
import { removeItem, updateQuantity } from '../../features/cart/cartSlice';
import { selectCartItems, selectCartSubtotal, selectCartTotal } from '../../features/cart/cartSelectors';
import { formatCurrency } from '../../utils/currency';

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const total = useSelector(selectCartTotal);

  if (!items.length) return <EmptyState title="Your cart is empty" description="Add items to continue." />;

  return (
    <section>
      <h1>Cart</h1>
      <div className="app-stack">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onDecrease={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
            onIncrease={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            onRemove={() => dispatch(removeItem(item.id))}
          />
        ))}
      </div>
      <p>Subtotal: {formatCurrency(subtotal)}</p>
      <p>Total: {formatCurrency(total)}</p>
      <Link to="/checkout" className="button-primary">Proceed to checkout</Link>
    </section>
  );
};

export default CartPage;
