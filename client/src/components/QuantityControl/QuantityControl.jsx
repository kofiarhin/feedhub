import './quantity-control.styles.scss';
const QuantityControl = ({ quantity, onChange }) => <div className='quantity-control'><button onClick={() => onChange(quantity-1)}>-</button><span>{quantity}</span><button onClick={() => onChange(quantity+1)}>+</button></div>;
export default QuantityControl;
