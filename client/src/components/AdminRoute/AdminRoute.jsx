import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthRole } from '../../features/auth/authSlice';
const AdminRoute = ({ children }) => { const role = useSelector(selectAuthRole); return role === 'admin' ? children : <Navigate to='/' replace />; };
export default AdminRoute;
