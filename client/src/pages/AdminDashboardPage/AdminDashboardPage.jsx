import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../features/auth/authSlice';
const AdminDashboardPage = () => { const user=useSelector(selectAuthUser); return <div><h2>Admin Dashboard</h2><p>Welcome {user?.name}</p></div>; };
export default AdminDashboardPage;
