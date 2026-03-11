import FormField from '../FormField/FormField';
import './component.styles.scss';
import PasswordField from '../PasswordField/PasswordField';

const OnboardingStepAccount = ({ values, errors, onChange }) => (
  <>
    <FormField id="name" label="Full name" error={errors.name}>
      <input id="name" value={values.name} onChange={(event) => onChange('name', event.target.value)} />
    </FormField>
    <FormField id="email" label="Email" error={errors.email}>
      <input id="email" type="email" value={values.email} onChange={(event) => onChange('email', event.target.value)} />
    </FormField>
    <FormField id="password" label="Password" error={errors.password}>
      <PasswordField id="password" value={values.password} onChange={(event) => onChange('password', event.target.value)} />
    </FormField>
  </>
);

export default OnboardingStepAccount;
