import { formatCurrency } from '../../utils/currency';
import StatusBadge from '../StatusBadge/StatusBadge';
import './component.styles.scss';

const MenuItemCard = ({ item, onAdd }) => (
  <article className="menu-item-card">
    <div>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <strong>{formatCurrency(item.price)}</strong>
    </div>
    <div>
      <StatusBadge status={item.isAvailable ? 'Ready' : 'Cancelled'} />
      <button type="button" onClick={onAdd} disabled={!item.isAvailable}>Add</button>
    </div>
  </article>
);

export default MenuItemCard;
