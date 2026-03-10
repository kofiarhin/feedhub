import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart } from '../../features/cart/cartSlice';
import { selectCartStoreId } from '../../features/cart/cartSelectors';
import { openCartConflict, closeCartConflict } from '../../features/ui/uiSlice';
import { useStore } from '../../hooks/useStore';
import { useStoreMenu } from '../../hooks/useStoreMenu';
import SearchBar from '../../components/SearchBar/SearchBar';
import MenuItemCard from '../../components/MenuItemCard/MenuItemCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const RestaurantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartStoreId = useSelector(selectCartStoreId);
  const conflict = useSelector((state) => state.ui.cartConflict);
  const [search, setSearch] = useState('');
  const { data: store } = useStore(id);
  const { data: menu, isLoading } = useStoreMenu(id);

  const filtered = useMemo(() => (menu || []).filter((item) => item.name.toLowerCase().includes(search.toLowerCase())), [menu, search]);

  const addToCart = (item) => {
    if (!item.available) {
      return;
    }

    const itemPayload = { id: item._id || item.id, name: item.name, price: item.price, quantity: 1 };
    if (cartStoreId && cartStoreId !== id) {
      dispatch(openCartConflict({ pendingItem: itemPayload, pendingStoreId: id }));
      return;
    }
    dispatch(addItem({ item: itemPayload, storeId: id }));
  };

  const confirmReplaceCart = () => {
    dispatch(clearCart());
    if (conflict.pendingItem) {
      dispatch(addItem({ item: conflict.pendingItem, storeId: conflict.pendingStoreId }));
    }
    dispatch(closeCartConflict());
  };

  return (
    <section>
      <h1>{store?.name || 'Restaurant'}</h1>
      <p>{store?.cuisineType || 'Mixed cuisine'}</p>
      <p>{store?.deliveryEstimate || 'Delivery estimate unavailable'}</p>
      <SearchBar value={search} onChange={setSearch} placeholder="Search menu" />
      {isLoading && <LoadingSpinner />}
      <div className="app-stack">{filtered.map((item) => <MenuItemCard key={item._id || item.id} item={item} onAdd={() => addToCart(item)} />)}</div>
      {conflict.open && (
        <div className="alert-card">
          <p>Your cart has items from another store. Clear cart and continue?</p>
          <button type="button" onClick={confirmReplaceCart}>Clear and add</button>
          <button type="button" onClick={() => dispatch(closeCartConflict())}>Cancel</button>
        </div>
      )}
    </section>
  );
};

export default RestaurantPage;
