import './category-chips.styles.scss';
const CategoryChips = ({ options, value, onChange }) => <div className='category-chips'>{options.map((option) => <button key={option} className={value===option?'chip-active':'chip'} onClick={() => onChange(option)}>{option}</button>)}</div>;
export default CategoryChips;
