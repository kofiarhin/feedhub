import './component.styles.scss';

const CategoryChips = ({ categories = [], value, onChange }) => (
  <div className="category-chips">
    {categories.map((category) => (
      <button
        key={category}
        type="button"
        className={value === category ? 'active' : ''}
        onClick={() => onChange(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryChips;
