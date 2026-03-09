import QuantityControl from '../QuantityControl/QuantityControl';
import './cart-item.styles.scss';
const CartItem = ({ item, onUpdate, onRemove }) => <div className='cart-item'><h4>{item.name}</h4><p>${item.price}</p><QuantityControl quantity={item.quantity} onChange={(q)=>onUpdate(item.itemId,q)} /><button onClick={()=>onRemove(item.itemId)}>Remove</button></div>;
export default CartItem;
