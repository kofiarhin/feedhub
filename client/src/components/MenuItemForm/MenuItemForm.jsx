import { useState } from 'react';
import './component.styles.scss';

const MenuItemForm = ({ initialValues, onSubmit, isLoading }) => {
  const [form, setForm] = useState(initialValues || { name: '', description: '', price: 0, category: 'General' });
  return (
    <form className="menu-item-form" onSubmit={(event) => { event.preventDefault(); onSubmit({ ...form, price: Number(form.price) }); }}>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Item name" required />
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
      <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" required />
      <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" />
      <button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save item'}</button>
    </form>
  );
};

export default MenuItemForm;
