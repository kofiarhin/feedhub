import './menu-item-card.styles.scss';
const MenuItemCard = ({ item, onAdd }) => <div className='menu-item-card'><h4>{item.name}</h4><p>{item.description}</p><p>${item.price}</p><button disabled={!item.available} onClick={() => onAdd(item)}>{item.available?'Add to Cart':'Unavailable'}</button></div>;
export default MenuItemCard;
