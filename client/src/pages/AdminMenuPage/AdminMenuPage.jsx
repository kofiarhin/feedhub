import { useSelector } from 'react-redux';
import { useStoreMenu } from '../../hooks/useStoreMenu';
import MenuItemForm from '../../components/MenuItemForm/MenuItemForm';
import { useCreateMenuItem } from '../../hooks/useCreateMenuItem';
import { useDeleteMenuItem } from '../../hooks/useDeleteMenuItem';
import { useToggleMenuAvailability } from '../../hooks/useToggleMenuAvailability';

const AdminMenuPage = () => {
  const storeId = useSelector((state) => state.auth.user?.storeId);
  const { data = [] } = useStoreMenu(storeId);
  const createItem = useCreateMenuItem();
  const deleteItem = useDeleteMenuItem();
  const toggleItem = useToggleMenuAvailability();

  return (
    <section className="app-stack">
      <h1>Menu Management</h1>
      <MenuItemForm onSubmit={(payload) => createItem.mutate({ ...payload, storeId })} isLoading={createItem.isPending} />
      {data.map((item) => (
        <article key={item._id || item.id} className="card">
          <h3>{item.name}</h3>
          <p>{item.price}</p>
          <button type="button" onClick={() => toggleItem.mutate({ menuItemId: item._id || item.id, storeId })}>Toggle availability</button>
          <button type="button" onClick={() => deleteItem.mutate({ menuItemId: item._id || item.id, storeId })}>Delete</button>
        </article>
      ))}
    </section>
  );
};

export default AdminMenuPage;
