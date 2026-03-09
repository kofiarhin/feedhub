import { Link } from 'react-router-dom';
import { useStores } from '../../hooks/useApiHooks';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './home-page.styles.scss';

const HomePage = () => { const { data, isLoading } = useStores({ limit: 3 }); if (isLoading) return <LoadingSpinner />; return <div className='home-page'><h1>Order from your favorite restaurants</h1><Link to='/restaurants'>Browse Restaurants</Link><div className='home-grid'>{data?.slice(0,3).map((store)=><RestaurantCard key={store._id} store={store} />)}</div></div>; };
export default HomePage;
