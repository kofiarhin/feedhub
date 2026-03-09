import { useState } from 'react';
import MenuItemForm from '../../components/MenuItemForm/MenuItemForm';
import { useCreateMenuItem, useDeleteMenuItem, useStoreMenu, useToggleMenuAvailability } from '../../hooks/useApiHooks';
const AdminMenuPage = () => { const [storeId,setStoreId]=useState(''); const {data}=useStoreMenu(storeId,{}); const create=useCreateMenuItem(); const del=useDeleteMenuItem(); const toggle=useToggleMenuAvailability(); return <div><input value={storeId} onChange={(e)=>setStoreId(e.target.value)} placeholder='Store Id' /><MenuItemForm initialValues={{storeId,name:'',price:0,category:'Main Dishes',description:'',tags:[]}} onSubmit={(payload)=>create.mutate({...payload,storeId})} />{data?.map((item)=><div key={item._id}>{item.name}<button onClick={()=>toggle.mutate(item._id)}>Toggle</button><button onClick={()=>del.mutate({id:item._id})}>Delete</button></div>)}</div>; };
export default AdminMenuPage;
