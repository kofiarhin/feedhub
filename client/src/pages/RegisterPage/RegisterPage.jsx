import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '../../features/auth/authSelectors';
import { useAuthMutations } from '../../hooks/useAuthMutations';

const RegisterPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const { registerCustomer } = useAuthMutations();

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/'} replace />;
  }

  const submit = async (event) => {
    event.preventDefault();
    await registerCustomer.mutateAsync(form);
    navigate('/');
  };

  return (
    <section>
      <h1>Customer Sign Up</h1>
      <form className="app-stack" onSubmit={submit}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Name" />
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="Email" />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Password" />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" />
        <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address (optional)" />
        <button type="submit" disabled={registerCustomer.isPending}>{registerCustomer.isPending ? 'Creating...' : 'Create Account'}</button>
      </form>
    </section>
  );
};

export default RegisterPage;
