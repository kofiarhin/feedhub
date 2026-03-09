import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, selectCartStoreId } from '../../features/cart/cartSlice';
import { useStore, useStoreMenu } from '../../hooks/useApiHooks';
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard';

const RestaurantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartStoreId = useSelector(selectCartStoreId);
  const { data: store } = useStore(id);
  const { data: menu } = useStoreMenu(id, { available: true });

  const handleAdd = (item) => {
    if (cartStoreId && cartStoreId !== id && !window.confirm('Cart has items from another store. Clear cart?')) return;
    if (cartStoreId && cartStoreId !== id) dispatch(clearCart());
    dispatch(addToCart({ itemId: item._id, name: item.name, price: item.price, storeId: id, storeName: store.name }));
  };

  return <div><h2>{store?.name}</h2><p>{store?.description}</p><div>{menu?.map((item)=><MenuItemCard key={item._id} item={item} onAdd={handleAdd} />)}</div></div>;
};

export default RestaurantPage;
