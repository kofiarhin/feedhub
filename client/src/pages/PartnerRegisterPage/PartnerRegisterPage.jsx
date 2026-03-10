import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '../../features/auth/authSelectors';
import { useAuthMutations } from '../../hooks/useAuthMutations';
import './component.styles.scss';

const PartnerRegisterPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const { registerPartner } = useAuthMutations();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    storeName: '',
    description: '',
    address: '',
    phone: '',
    cuisineType: '',
    openingHours: '',
    logo: ''
  });

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/'} replace />;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await registerPartner.mutateAsync({
      name: form.name,
      email: form.email,
      password: form.password,
      store: {
        name: form.storeName,
        description: form.description,
        address: form.address,
        phone: form.phone,
        cuisineType: form.cuisineType,
        openingHours: form.openingHours,
        logo: form.logo || undefined
      }
    });

    navigate('/admin');
  };

  return (
    <section className="partner-register-page app-stack">
      <h1>Register Restaurant</h1>
      <form className="app-stack" onSubmit={onSubmit}>
        <h2>Admin Account</h2>
        <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <h2>Restaurant Info</h2>
        <input required placeholder="Restaurant name" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
        <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input required placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input required placeholder="Cuisine type" value={form.cuisineType} onChange={(e) => setForm({ ...form, cuisineType: e.target.value })} />
        <input required placeholder="Opening hours" value={form.openingHours} onChange={(e) => setForm({ ...form, openingHours: e.target.value })} />
        <input placeholder="Logo URL (optional)" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} />

        {registerPartner.isError ? <p>{registerPartner.error.message}</p> : null}
        <button type="submit" disabled={registerPartner.isPending}>{registerPartner.isPending ? 'Registering...' : 'Create Partner Account'}</button>
      </form>
    </section>
  );
};

export default PartnerRegisterPage;
