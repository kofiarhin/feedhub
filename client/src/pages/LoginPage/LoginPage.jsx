import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthMutations } from '../../hooks/useAuthMutations';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuthMutations();

  const submit = async (event) => {
    event.preventDefault();
    await login.mutateAsync(form);
    navigate('/');
  };

  return (
    <section>
      <h1>Login</h1>
      <form className="app-stack" onSubmit={submit}>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="Email" />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Password" />
        {login.isError && <p>{login.error.message}</p>}
        <button type="submit" disabled={login.isPending}>{login.isPending ? 'Logging in...' : 'Login'}</button>
      </form>
    </section>
  );
};

export default LoginPage;
