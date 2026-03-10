import { useEffect, useMemo, useState } from 'react';
import './component.styles.scss';

const TAG_GROUPS = {
  Cuisine: ['pizza', 'burger', 'italian', 'mexican', 'indian', 'chinese'],
  Dietary: ['vegan', 'vegetarian', 'gluten-free', 'halal'],
  'Food types': ['dessert', 'drink', 'starter', 'main'],
};

const createDefaultForm = () => ({
  name: '',
  description: '',
  price: '',
  image: '',
  category: '',
  tags: [],
  available: true,
});

const MenuItemForm = ({ initialValues, onSubmit, isLoading, onCancel, submitLabel = 'Save item' }) => {
  const [form, setForm] = useState(createDefaultForm());

  const normalizedInitialValues = useMemo(() => {
    if (!initialValues) {
      return createDefaultForm();
    }

    return {
      name: initialValues.name || '',
      description: initialValues.description || '',
      price: initialValues.price ?? '',
      image: initialValues.image || '',
      category: initialValues.category || '',
      tags: Array.isArray(initialValues.tags) ? initialValues.tags : [],
      available: initialValues.available !== false,
    };
  }, [initialValues]);

  useEffect(() => {
    setForm(normalizedInitialValues);
  }, [normalizedInitialValues]);

  const handleChange = (field) => (event) => {
    const value = field === 'available' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((item) => item !== tag) : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
    });
  };

  return (
    <form className="menu-item-form" onSubmit={handleSubmit}>
      <label className="menu-item-form-label">
        Name
        <input value={form.name} onChange={handleChange('name')} placeholder="Item name" required />
      </label>

      <label className="menu-item-form-label">
        Description
        <textarea value={form.description} onChange={handleChange('description')} placeholder="Description" required />
      </label>

      <label className="menu-item-form-label">
        Price
        <input type="number" min="0" step="0.01" value={form.price} onChange={handleChange('price')} placeholder="Price" required />
      </label>

      <label className="menu-item-form-label">
        Image URL
        <input type="url" value={form.image} onChange={handleChange('image')} placeholder="https://example.com/item.jpg" />
      </label>

      <label className="menu-item-form-label">
        Category
        <input value={form.category} onChange={handleChange('category')} placeholder="Category" required />
      </label>

      <fieldset className="menu-item-form-tags">
        <legend>Tags</legend>
        {Object.entries(TAG_GROUPS).map(([group, options]) => (
          <div key={group} className="menu-item-form-tag-group">
            <p>{group}</p>
            <div className="menu-item-form-tag-options">
              {options.map((tag) => {
                const checked = form.tags.includes(tag);
                return (
                  <label key={tag} className={`menu-item-form-tag-chip ${checked ? 'is-selected' : ''}`}>
                    <input type="checkbox" checked={checked} onChange={() => handleTagToggle(tag)} />
                    <span>{tag}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </fieldset>

      <label className="menu-item-form-availability">
        <input type="checkbox" checked={form.available} onChange={handleChange('available')} />
        <span>{form.available ? 'Available' : 'Unavailable'}</span>
      </label>

      <div className="menu-item-form-actions">
        <button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : submitLabel}</button>
        {onCancel ? <button type="button" onClick={onCancel}>Cancel edit</button> : null}
      </div>
    </form>
  );
};

export default MenuItemForm;
