import { useEffect, useState } from 'react';
import './component.styles.scss';

const getInitialState = (values) => ({
  name: values?.name || '',
  description: values?.description || '',
  address: values?.address || '',
  phone: values?.phone || '',
  cuisineType: values?.cuisineType || '',
  openingHours: values?.openingHours || '',
  logo: values?.logo || ''
});

const StoreProfileForm = ({ initialValues, onSubmit, isLoading }) => {
  const [form, setForm] = useState(getInitialState(initialValues));

  useEffect(() => {
    setForm(getInitialState(initialValues));
  }, [initialValues]);

  return (
    <form className="store-profile-form" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Store name" required />
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" required />
      <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" required />
      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" required />
      <input value={form.cuisineType} onChange={(e) => setForm({ ...form, cuisineType: e.target.value })} placeholder="Cuisine type" required />
      <input value={form.openingHours} onChange={(e) => setForm({ ...form, openingHours: e.target.value })} placeholder="Opening hours" required />
      <input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} placeholder="Logo URL" />
      <button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save store'}</button>
    </form>
  );
};

export default StoreProfileForm;
