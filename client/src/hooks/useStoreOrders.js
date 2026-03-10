import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

const fetchStoreOrders = async (storeId) => {
  const response = await apiClient.get(`/orders/store/${storeId}`);
  return response.data.data || [];
};

export const useStoreOrders = (storeId) => useQuery({
  queryKey: queryKeys.orders.store(storeId),
  queryFn: () => fetchStoreOrders(storeId),
  enabled: Boolean(storeId),
});
