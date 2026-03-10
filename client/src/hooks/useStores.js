import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

const fetchStores = async (params) => {
  const response = await apiClient.get('/stores', { params });
  return response.data.data || [];
};

export const useStores = (params = {}) => useQuery({
  queryKey: [...queryKeys.stores.all, params],
  queryFn: () => fetchStores(params),
});
