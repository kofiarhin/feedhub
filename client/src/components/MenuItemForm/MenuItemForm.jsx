import { useEffect, useMemo, useState } from "react";
import "./component.styles.scss";

const TAG_GROUPS = {
  Cuisine: ["pizza", "burger", "italian", "mexican", "indian", "chinese"],
  Dietary: ["vegan", "vegetarian", "gluten-free", "halal"],
  "Food types": ["dessert", "drink", "starter", "main"],
};

const CATEGORY_OPTIONS = ["Starters", "Main Dishes", "Drinks", "Desserts"];

const createDefaultForm = () => ({
  name: "Classic Burger",
  description:
    "Juicy grilled beef burger with lettuce, tomato, and house sauce.",
  price: "20",
  image:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop",
  category: "Main Dishes",
  tags: ["burger", "dessert"],
  available: true,
});

const MenuItemForm = ({
  initialValues,
  onSubmit,
  isLoading,
  onCancel,
  submitLabel = "Save item",
}) => {
  const [form, setForm] = useState(createDefaultForm());

  const normalizedInitialValues = useMemo(() => {
    if (!initialValues) {
      return createDefaultForm();
    }

    return {
      name: initialValues.name || "Classic Burger",
      description:
        initialValues.description ||
        "Juicy grilled beef burger with lettuce, tomato, and house sauce.",
      price: initialValues.price ?? "20",
      image:
        initialValues.image ||
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop",
      category: initialValues.category || "Main Dishes",
      tags:
        Array.isArray(initialValues.tags) && initialValues.tags.length
          ? initialValues.tags
          : ["burger", "dessert"],
      available: initialValues.available !== false,
    };
  }, [initialValues]);

  useEffect(() => {
    setForm(normalizedInitialValues);
  }, [normalizedInitialValues]);

  const handleChange = (field) => (event) => {
    const value =
      field === "available" ? event.target.checked : event.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagToggle = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((item) => item !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("FORM SUBMIT FIRED", form);

    onSubmit({
      ...form,
      price: Number(form.price),
    });
  };

  return (
    <form className="menu-item-form" onSubmit={handleSubmit} noValidate>
      <label className="menu-item-form-label">
        Name
        <input
          value={form.name}
          onChange={handleChange("name")}
          placeholder="Item name"
          required
        />
      </label>

      <label className="menu-item-form-label">
        Description
        <textarea
          value={form.description}
          onChange={handleChange("description")}
          placeholder="Description"
          required
        />
      </label>

      <label className="menu-item-form-label">
        Price
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange("price")}
          placeholder="Price"
          required
        />
      </label>

      <label className="menu-item-form-label">
        Image URL
        <input
          type="url"
          value={form.image}
          onChange={handleChange("image")}
          placeholder="https://example.com/item.jpg"
        />
      </label>

      <label className="menu-item-form-label">
        Category
        <select
          value={form.category}
          onChange={handleChange("category")}
          required
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
                  <label
                    key={tag}
                    className={`menu-item-form-tag-chip ${
                      checked ? "is-selected" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleTagToggle(tag)}
                    />
                    <span>{tag}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </fieldset>

      <label className="menu-item-form-availability">
        <input
          type="checkbox"
          checked={form.available}
          onChange={handleChange("available")}
        />
        <span>{form.available ? "Available" : "Unavailable"}</span>
      </label>

      <div className="menu-item-form-actions">
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : submitLabel}
        </button>

        {onCancel ? (
          <button type="button" onClick={onCancel}>
            Cancel edit
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default MenuItemForm;
