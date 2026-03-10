import './component.styles.scss';

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => (
  <div className="quantity-control">
    <button type="button" onClick={onDecrease}>-</button>
    <span>{quantity}</span>
    <button type="button" onClick={onIncrease}>+</button>
  </div>
);

export default QuantityControl;
