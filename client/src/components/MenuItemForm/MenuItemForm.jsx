import { useState } from 'react';
import './menu-item-form.styles.scss';
const MenuItemForm = ({ initialValues, onSubmit }) => { const [form,setForm]=useState(initialValues); return <form className='menu-item-form' onSubmit={(e)=>{e.preventDefault();onSubmit(form);}}><input value={form.name||''} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder='Name' required /><input type='number' value={form.price||''} onChange={(e)=>setForm({...form,price:Number(e.target.value)})} placeholder='Price' required /><input value={form.category||''} onChange={(e)=>setForm({...form,category:e.target.value})} placeholder='Category' required /><button>Save Item</button></form>; };
export default MenuItemForm;
