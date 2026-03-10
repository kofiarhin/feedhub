import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

const fetchStoreMenu = async (storeId) => {
  const response = await apiClient.get(`/stores/${storeId}/menu`);
  return response.data.data || [];
};

export const useStoreMenu = (storeId) => useQuery({
  queryKey: queryKeys.stores.menu(storeId),
  queryFn: () => fetchStoreMenu(storeId),
  enabled: Boolean(storeId),
});
