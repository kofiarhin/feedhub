import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

const fetchStore = async (storeId) => {
  const response = await apiClient.get(`/stores/${storeId}`);
  return response.data.data || response.data;
};

export const useStore = (storeId) => useQuery({
  queryKey: queryKeys.stores.detail(storeId),
  queryFn: () => fetchStore(storeId),
  enabled: Boolean(storeId),
});
