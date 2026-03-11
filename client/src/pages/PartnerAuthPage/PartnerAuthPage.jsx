import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import AuthShell from '../../components/AuthShell/AuthShell';
import AuthBenefitsPanel from '../../components/AuthBenefitsPanel/AuthBenefitsPanel';
import AuthCard from '../../components/AuthCard/AuthCard';
import FormField from '../../components/FormField/FormField';
import PasswordField from '../../components/PasswordField/PasswordField';
import FormError from '../../components/FormError/FormError';
import { useAuthMutations } from '../../hooks/useAuthMutations';
import { useAuthPageRedirect } from '../../hooks/useAuthPageRedirect';
import './component.styles.scss';

const PartnerAuthPage = () => {
  const redirectTo = useAuthPageRedirect('partner');
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { loginPartner } = useAuthMutations();

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required';
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Password is required';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    await loginPartner.mutateAsync(form);
  };

  return (
    <AuthShell
      leftContent={(
        <AuthBenefitsPanel
          headline="Sign in to manage your restaurant"
          copy="Access orders, menu controls, and storefront settings from one partner dashboard."
          benefits={['View and fulfill incoming orders', 'Update menus and item availability', 'Keep business operations moving fast']}
        />
      )}
    >
      <AuthCard title="Restaurant Partner Sign In" subtitle="Use your partner credentials to access your dashboard.">
        <form className="partner-auth-form" onSubmit={onSubmit}>
          <FormField id="partner-email" label="Email" error={errors.email}>
            <input id="partner-email" type="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} />
          </FormField>
          <FormField id="partner-password" label="Password" error={errors.password}>
            <PasswordField id="partner-password" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} />
          </FormField>
          <FormError message={loginPartner.error?.message} />
          <button type="submit" className="partner-auth-submit" disabled={loginPartner.isPending}>
            {loginPartner.isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </AuthCard>
    </AuthShell>
  );
};

export default PartnerAuthPage;
