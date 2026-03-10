import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsAuthenticated } from '../features/auth/authSelectors';

const AdminRoute = () => {
  const authenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  if (!authenticated) return <Navigate to="/partner/login" replace />;
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
