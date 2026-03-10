import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '../features/auth/authSelectors';

const ProtectedRoute = () => {
  const authenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  if (!authenticated) return <Navigate to="/login" replace />;
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
