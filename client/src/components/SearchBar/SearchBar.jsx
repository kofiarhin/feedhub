import './search-bar.styles.scss';
const SearchBar = ({ value, onChange, placeholder = 'Search' }) => <input className='search-bar' value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />;
export default SearchBar;
