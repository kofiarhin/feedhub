import QuantityControl from '../QuantityControl/QuantityControl';
import { formatCurrency } from '../../utils/currency';
import './component.styles.scss';

const CartItem = ({ item, onDecrease, onIncrease, onRemove }) => (
  <div className="cart-item">
    <div>
      <h4>{item.name}</h4>
      <p>{formatCurrency(item.price)}</p>
    </div>
    <QuantityControl quantity={item.quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
    <button type="button" onClick={onRemove}>Remove</button>
  </div>
);

export default CartItem;
