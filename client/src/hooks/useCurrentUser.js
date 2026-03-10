import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';
import { setCurrentUser } from '../features/auth/authSlice';

const fetchCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data.data || response.data;
};

export const useCurrentUser = (enabled = true) => {
  const dispatch = useDispatch();
  const query = useQuery({ queryKey: queryKeys.auth.me, queryFn: fetchCurrentUser, enabled });

  useEffect(() => {
    if (query.data) {
      dispatch(setCurrentUser(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};
