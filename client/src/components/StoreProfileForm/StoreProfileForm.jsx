import { useState } from 'react';
import './component.styles.scss';

const StoreProfileForm = ({ initialValues, onSubmit, isLoading }) => {
  const [form, setForm] = useState(initialValues || { name: '', description: '', cuisine: '' });
  return (
    <form className="store-profile-form" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Store name" required />
      <input value={form.cuisine} onChange={(e) => setForm({ ...form, cuisine: e.target.value })} placeholder="Cuisine" />
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
      <button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save store'}</button>
    </form>
  );
};

export default StoreProfileForm;
