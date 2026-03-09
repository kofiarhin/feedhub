import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { setAuthGetter } from '../api/client';
import { queryClient } from '../api/queryClient';
import { store } from './store';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AuthBridge = ({ children }) => {
  const { getToken } = useAuth();
  useEffect(() => { setAuthGetter(getToken); }, [getToken]);
  return children;
};

const AppProvider = ({ children }) => (
  <ClerkProvider publishableKey={publishableKey}>
    <AuthBridge>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    </AuthBridge>
  </ClerkProvider>
);

export default AppProvider;
