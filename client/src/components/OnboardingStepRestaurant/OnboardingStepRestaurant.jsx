import FormField from '../FormField/FormField';
import './component.styles.scss';

const OnboardingStepRestaurant = ({ values, errors, onChange }) => (
  <>
    <FormField id="storeName" label="Restaurant name" error={errors.storeName}>
      <input id="storeName" value={values.storeName} onChange={(event) => onChange('storeName', event.target.value)} />
    </FormField>
    <FormField id="cuisineType" label="Cuisine type" error={errors.cuisineType}>
      <input id="cuisineType" value={values.cuisineType} onChange={(event) => onChange('cuisineType', event.target.value)} />
    </FormField>
    <FormField id="phone" label="Phone" error={errors.phone}>
      <input id="phone" value={values.phone} onChange={(event) => onChange('phone', event.target.value)} />
    </FormField>
    <FormField id="address" label="Address" error={errors.address}>
      <input id="address" value={values.address} onChange={(event) => onChange('address', event.target.value)} />
    </FormField>
  </>
);

export default OnboardingStepRestaurant;
