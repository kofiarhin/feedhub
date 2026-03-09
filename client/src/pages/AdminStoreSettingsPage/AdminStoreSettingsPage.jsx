import { useState } from 'react';
import StoreProfileForm from '../../components/StoreProfileForm/StoreProfileForm';
import { useCreateStore, useUpdateStore } from '../../hooks/useApiHooks';
const AdminStoreSettingsPage = () => { const [storeId,setStoreId]=useState(''); const create=useCreateStore(); const update=useUpdateStore(); return <div><input value={storeId} onChange={(e)=>setStoreId(e.target.value)} placeholder='Store Id for update' /><StoreProfileForm initialValues={{name:'',description:'',address:'',phone:'',cuisineType:'',openingHours:'',logo:''}} onSubmit={(payload)=>storeId?update.mutate({id:storeId,payload}):create.mutate(payload)} /></div>; };
export default AdminStoreSettingsPage;
