import './component.styles.scss';

const SearchBar = ({ value, onChange, placeholder = 'Search restaurants or dishes' }) => (
  <input className="search-bar" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
);

export default SearchBar;
