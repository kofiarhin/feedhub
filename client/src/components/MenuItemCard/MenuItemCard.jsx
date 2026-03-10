import { formatCurrency } from '../../utils/currency';
import './component.styles.scss';

const MenuItemCard = ({ item, onAdd }) => {
  const isAvailable = item.available === true;

  return (
    <article className="menu-item-card">
      <div>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <strong>{formatCurrency(item.price)}</strong>
      </div>
      <div>
        <span
          className={`menu-item-card__badge ${isAvailable ? 'menu-item-card__badge--available' : 'menu-item-card__badge--unavailable'}`}
        >
          {isAvailable ? 'Available' : 'Unavailable'}
        </span>
        <button type="button" onClick={onAdd} disabled={!item.available}>Add</button>
      </div>
    </article>
  );
};

export default MenuItemCard;
