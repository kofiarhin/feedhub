import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryChips from '../../components/CategoryChips/CategoryChips';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useStores } from '../../hooks/useStores';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { data, isLoading, isError, error } = useStores({ q: search, category: category === 'All' ? undefined : category });

  return (
    <section>
      <h1>Discover food you love</h1>
      <SearchBar value={search} onChange={setSearch} />
      <CategoryChips categories={['All', 'Burgers', 'Pizza', 'Asian', 'Desserts']} value={category} onChange={setCategory} />
      {isLoading && <LoadingSpinner />}
      {isError && <EmptyState title="Failed loading stores" description={error.message} />}
      {!isLoading && !isError && !data?.length && <EmptyState title="No stores found" description="Try another search." />}
      <div className="app-grid">{data?.slice(0, 6).map((store) => <RestaurantCard key={store._id || store.id} store={store} />)}</div>
    </section>
  );
};

export default HomePage;
