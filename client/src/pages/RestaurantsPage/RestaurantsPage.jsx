import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryChips from '../../components/CategoryChips/CategoryChips';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useStores } from '../../hooks/useApiHooks';
const categories = ['','Starters','Main Dishes','Drinks','Desserts'];
const RestaurantsPage = () => { const [q,setQ]=useState(''); const [category,setCategory]=useState(''); const {data,isLoading}=useStores({q,category}); if(isLoading) return <div>Loading...</div>; return <div><SearchBar value={q} onChange={setQ} placeholder='Search restaurants or cuisines' /><CategoryChips options={categories} value={category} onChange={setCategory} />{!data?.length?<EmptyState text='No restaurants found' />:<div>{data.map((store)=><RestaurantCard key={store._id} store={store} />)}</div>}</div>; };
export default RestaurantsPage;
