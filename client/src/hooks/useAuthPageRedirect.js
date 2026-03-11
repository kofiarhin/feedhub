import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '../features/auth/authSelectors';

export const useAuthPageRedirect = (scope = 'customer') => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  return useMemo(() => {
    if (!isAuthenticated) {
      return null;
    }

    if (user?.role === 'admin') {
      return '/admin';
    }

    return scope === 'partner' ? '/' : '/';
  }, [isAuthenticated, scope, user?.role]);
};
