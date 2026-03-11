import { Navigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuthMutations } from '../../hooks/useAuthMutations';
import { useAuthPageRedirect } from '../../hooks/useAuthPageRedirect';
import AuthShell from '../../components/AuthShell/AuthShell';
import AuthCard from '../../components/AuthCard/AuthCard';
import AuthBenefitsPanel from '../../components/AuthBenefitsPanel/AuthBenefitsPanel';
import AuthModeToggle from '../../components/AuthModeToggle/AuthModeToggle';
import FormField from '../../components/FormField/FormField';
import FormError from '../../components/FormError/FormError';
import PasswordField from '../../components/PasswordField/PasswordField';
import './component.styles.scss';

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirectTo = useAuthPageRedirect('customer');
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { loginCustomer, registerCustomer } = useAuthMutations();

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  const setMode = (nextMode) => {
    setErrors({});
    setSearchParams(nextMode === 'login' ? {} : { mode: 'register' });
  };

  const validate = (data) => {
    const nextErrors = {};
    Object.entries(data).forEach(([field, value]) => {
      if (!value.trim()) {
        nextErrors[field] = 'This field is required';
      }
    });
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = mode === 'login' ? loginForm : registerForm;
    const nextErrors = validate(payload);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    if (mode === 'login') {
      await loginCustomer.mutateAsync(payload);
      return;
    }

    await registerCustomer.mutateAsync(payload);
  };

  const isPending = loginCustomer.isPending || registerCustomer.isPending;
  const formError = loginCustomer.error?.message || registerCustomer.error?.message;

  return (
    <AuthShell
      leftContent={(
        <AuthBenefitsPanel
          headline="Your next meal is a few taps away"
          copy="Sign in to browse top restaurants, checkout faster, and keep your order history in one place."
          benefits={['Browse restaurants near you', 'Quick and secure checkout', 'Save and reorder your favorites']}
        />
      )}
    >
      <AuthCard title={mode === 'login' ? 'Sign in to FeedHub' : 'Create your FeedHub account'} subtitle="Food delivery built for busy days and better cravings.">
        <AuthModeToggle mode={mode} onChange={setMode} />
        <form className="auth-page-form" onSubmit={handleSubmit}>
          {mode === 'register' ? (
            <FormField id="name" label="Full name" error={errors.name}>
              <input id="name" value={registerForm.name} onChange={(event) => setRegisterForm((prev) => ({ ...prev, name: event.target.value }))} />
            </FormField>
          ) : null}
          <FormField id="email" label="Email" error={errors.email}>
            <input id="email" type="email" value={mode === 'login' ? loginForm.email : registerForm.email} onChange={(event) => (mode === 'login' ? setLoginForm((prev) => ({ ...prev, email: event.target.value })) : setRegisterForm((prev) => ({ ...prev, email: event.target.value })))} />
          </FormField>
          <FormField id="password" label="Password" error={errors.password}>
            <PasswordField id="password" value={mode === 'login' ? loginForm.password : registerForm.password} onChange={(event) => (mode === 'login' ? setLoginForm((prev) => ({ ...prev, password: event.target.value })) : setRegisterForm((prev) => ({ ...prev, password: event.target.value })))} />
          </FormField>
          <FormError message={formError} />
          <button type="submit" className="auth-page-submit" disabled={isPending}>
            {mode === 'login' ? (isPending ? 'Signing in...' : 'Sign In') : isPending ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </AuthCard>
    </AuthShell>
  );
};

export default AuthPage;
