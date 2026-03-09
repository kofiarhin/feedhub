import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import { queryKeys } from '../api/queryKeys';

export const useAuthMutations = () => {
  const sync = useMutation({ mutationFn: async () => (await apiClient.post('/api/auth/sync')).data.data });
  const logout = useMutation({ mutationFn: async () => (await apiClient.post('/api/auth/logout')).data.data });
  return { sync, logout };
};

export const useCurrentUser = () => useQuery({ queryKey: queryKeys.currentUser, queryFn: async () => (await apiClient.get('/api/auth/me')).data.data });
export const useStores = (params) => useQuery({ queryKey: queryKeys.stores(params), queryFn: async () => (await apiClient.get('/api/stores', { params })).data.data });
export const useStore = (id) => useQuery({ queryKey: queryKeys.store(id), queryFn: async () => (await apiClient.get(`/api/stores/${id}`)).data.data, enabled: !!id });
export const useStoreMenu = (id, params) => useQuery({ queryKey: queryKeys.storeMenu(id, params), queryFn: async () => (await apiClient.get(`/api/stores/${id}/menu`, { params })).data.data, enabled: !!id });

export const useCreateStore = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async (payload) => (await apiClient.post('/api/stores', payload)).data.data, onSuccess: () => qc.invalidateQueries({ queryKey: ['stores'] }) });
};
export const useUpdateStore = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async ({ id, payload }) => (await apiClient.put(`/api/stores/${id}`, payload)).data.data, onSuccess: (_, vars) => { qc.invalidateQueries({ queryKey: queryKeys.store(vars.id) }); qc.invalidateQueries({ queryKey: ['stores'] }); } });
};
export const useCreateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async (payload) => (await apiClient.post('/api/menu', payload)).data.data, onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['store-menu', vars.storeId] }) });
};
export const useUpdateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async ({ id, payload }) => (await apiClient.put(`/api/menu/${id}`, payload)).data.data, onSuccess: (data) => qc.invalidateQueries({ queryKey: ['store-menu', data.storeId] }) });
};
export const useDeleteMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async ({ id }) => (await apiClient.delete(`/api/menu/${id}`)).data.data, onSuccess: () => qc.invalidateQueries({ queryKey: ['store-menu'] }) });
};
export const useToggleMenuAvailability = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async (id) => (await apiClient.patch(`/api/menu/${id}/toggle-availability`)).data.data, onSuccess: () => qc.invalidateQueries({ queryKey: ['store-menu'] }) });
};
export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async (payload) => (await apiClient.post('/api/orders', payload)).data.data, onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.myOrders }); qc.invalidateQueries({ queryKey: ['store-orders'] }); } });
};
export const useMyOrders = () => useQuery({ queryKey: queryKeys.myOrders, queryFn: async () => (await apiClient.get('/api/orders/my')).data.data });
export const useStoreOrders = (storeId) => useQuery({ queryKey: queryKeys.storeOrders(storeId), queryFn: async () => (await apiClient.get(`/api/orders/store/${storeId}`)).data.data, enabled: !!storeId });
export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async ({ id, status }) => (await apiClient.patch(`/api/orders/${id}/status`, { status })).data.data, onSuccess: (data) => qc.invalidateQueries({ queryKey: queryKeys.storeOrders(data.storeId) }) });
};
