import { useSelector } from 'react-redux';
import StoreProfileForm from '../../components/StoreProfileForm/StoreProfileForm';
import { useStore } from '../../hooks/useStore';
import { useCreateStore } from '../../hooks/useCreateStore';
import { useUpdateStore } from '../../hooks/useUpdateStore';

const AdminStoreSettingsPage = () => {
  const storeId = useSelector((state) => state.auth.user?.storeId);
  const { data } = useStore(storeId);
  const createStore = useCreateStore();
  const updateStore = useUpdateStore();

  const handleSubmit = (payload) => {
    if (!storeId) createStore.mutate(payload);
    else updateStore.mutate({ storeId, payload });
  };

  return (
    <section className="app-stack">
      <h1>Store Settings</h1>
      <StoreProfileForm initialValues={data} onSubmit={handleSubmit} isLoading={createStore.isPending || updateStore.isPending} />
    </section>
  );
};

export default AdminStoreSettingsPage;
