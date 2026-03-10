import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '../../features/auth/authSelectors';
import { useAuthMutations } from '../../hooks/useAuthMutations';

const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const [form, setForm] = useState({ email: '', password: '' });
  const { loginCustomer } = useAuthMutations();

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/'} replace />;
  }

  const submit = async (event) => {
    event.preventDefault();
    await loginCustomer.mutateAsync(form);
    navigate('/');
  };

  return (
    <section>
      <h1>Customer Login</h1>
      <form className="app-stack" onSubmit={submit}>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="Email" />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Password" />
        {loginCustomer.isError && <p>{loginCustomer.error.message}</p>}
        <button type="submit" disabled={loginCustomer.isPending}>{loginCustomer.isPending ? 'Logging in...' : 'Login'}</button>
      </form>
    </section>
  );
};

export default LoginPage;
