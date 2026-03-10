import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthMutations } from '../../hooks/useAuthMutations';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { register } = useAuthMutations();

  const submit = async (event) => {
    event.preventDefault();
    await register.mutateAsync(form);
    navigate('/');
  };

  return (
    <section>
      <h1>Create account</h1>
      <form className="app-stack" onSubmit={submit}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Name" />
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="Email" />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Password" />
        <button type="submit" disabled={register.isPending}>{register.isPending ? 'Creating...' : 'Register'}</button>
      </form>
    </section>
  );
};

export default RegisterPage;
