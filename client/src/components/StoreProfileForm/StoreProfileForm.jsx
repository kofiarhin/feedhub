import { useState } from 'react';
import './store-profile-form.styles.scss';
const StoreProfileForm = ({ initialValues, onSubmit }) => { const [form,setForm]=useState(initialValues); return <form className='store-profile-form' onSubmit={(e)=>{e.preventDefault();onSubmit(form);}}><input value={form.name||''} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder='Store name' required /><input value={form.cuisineType||''} onChange={(e)=>setForm({...form,cuisineType:e.target.value})} placeholder='Cuisine' required /><textarea value={form.description||''} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder='Description' required /><button>Save</button></form>; };
export default StoreProfileForm;
