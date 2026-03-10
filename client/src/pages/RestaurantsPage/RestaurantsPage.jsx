import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryChips from '../../components/CategoryChips/CategoryChips';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useStores } from '../../hooks/useStores';

const RestaurantsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { data, isLoading, isError, error } = useStores({ q: search, category: category === 'All' ? undefined : category });

  return (
    <section>
      <h1>Restaurants</h1>
      <SearchBar value={search} onChange={setSearch} />
      <CategoryChips categories={['All', 'Fast Food', 'Italian', 'Indian', 'Healthy']} value={category} onChange={setCategory} />
      {isLoading && <LoadingSpinner />}
      {isError && <EmptyState title="Error" description={error.message} />}
      <div className="app-grid">{data?.map((store) => <RestaurantCard key={store._id || store.id} store={store} />)}</div>
    </section>
  );
};

export default RestaurantsPage;
