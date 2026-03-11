import FormField from '../FormField/FormField';
import './component.styles.scss';

const OnboardingStepProfile = ({ values, errors, onChange }) => (
  <>
    <FormField id="description" label="Description" error={errors.description}>
      <textarea id="description" value={values.description} onChange={(event) => onChange('description', event.target.value)} />
    </FormField>
    <FormField id="openingHours" label="Opening hours" error={errors.openingHours}>
      <input id="openingHours" value={values.openingHours} onChange={(event) => onChange('openingHours', event.target.value)} />
    </FormField>
    <FormField id="logo" label="Logo URL (optional)" error={errors.logo}>
      <input id="logo" value={values.logo} onChange={(event) => onChange('logo', event.target.value)} />
    </FormField>
  </>
);

export default OnboardingStepProfile;
