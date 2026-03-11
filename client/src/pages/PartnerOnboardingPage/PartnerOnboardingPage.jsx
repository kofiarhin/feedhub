import { Navigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import AuthShell from '../../components/AuthShell/AuthShell';
import AuthBenefitsPanel from '../../components/AuthBenefitsPanel/AuthBenefitsPanel';
import AuthCard from '../../components/AuthCard/AuthCard';
import FormError from '../../components/FormError/FormError';
import OnboardingStepper from '../../components/OnboardingStepper/OnboardingStepper';
import OnboardingStepAccount from '../../components/OnboardingStepAccount/OnboardingStepAccount';
import OnboardingStepRestaurant from '../../components/OnboardingStepRestaurant/OnboardingStepRestaurant';
import OnboardingStepProfile from '../../components/OnboardingStepProfile/OnboardingStepProfile';
import OnboardingReviewCard from '../../components/OnboardingReviewCard/OnboardingReviewCard';
import StepActions from '../../components/StepActions/StepActions';
import { useAuthMutations } from '../../hooks/useAuthMutations';
import { useAuthPageRedirect } from '../../hooks/useAuthPageRedirect';
import './component.styles.scss';

const storageKey = 'partner-onboarding-draft';
const steps = ['Admin Account', 'Restaurant Basics', 'Restaurant Profile', 'Review'];
const initialState = {
  name: '',
  email: '',
  password: '',
  storeName: '',
  cuisineType: '',
  phone: '',
  address: '',
  description: '',
  openingHours: '',
  logo: ''
};

const PartnerOnboardingPage = () => {
  const redirectTo = useAuthPageRedirect('partner');
  const { registerPartner } = useAuthMutations();
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedDraft = sessionStorage.getItem(storageKey);
    if (savedDraft) {
      const parsed = JSON.parse(savedDraft);
      setValues(parsed.values || initialState);
      setCurrentStep(parsed.currentStep || 0);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify({ currentStep, values }));
  }, [currentStep, values]);

  const requiredByStep = useMemo(() => ([
    ['name', 'email', 'password'],
    ['storeName', 'cuisineType', 'phone', 'address'],
    ['description', 'openingHours'],
    []
  ]), []);

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  const onChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    const nextErrors = {};
    requiredByStep[currentStep].forEach((field) => {
      if (!values[field].trim()) {
        nextErrors[field] = 'This field is required';
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onNext = async (event) => {
    event.preventDefault();

    if (currentStep < 3 && !validateStep()) {
      return;
    }

    if (currentStep === 3) {
      await registerPartner.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
        store: {
          name: values.storeName,
          description: values.description,
          address: values.address,
          phone: values.phone,
          cuisineType: values.cuisineType,
          openingHours: values.openingHours,
          logo: values.logo || undefined
        }
      });
      sessionStorage.removeItem(storageKey);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const onBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <AuthShell
      leftContent={(
        <AuthBenefitsPanel
          headline="Onboard your restaurant in minutes"
          copy="Set up your account, add restaurant details, and launch your digital ordering workflow."
          benefits={['Receive orders online', 'Manage menu updates quickly', 'Track and update order statuses']}
        />
      )}
    >
      <AuthCard title="Restaurant Partner Onboarding" subtitle="Complete each step to create your restaurant workspace.">
        <OnboardingStepper steps={steps} currentStep={currentStep} />
        <form className="partner-onboarding-form" onSubmit={onNext}>
          {currentStep === 0 ? <OnboardingStepAccount values={values} errors={errors} onChange={onChange} /> : null}
          {currentStep === 1 ? <OnboardingStepRestaurant values={values} errors={errors} onChange={onChange} /> : null}
          {currentStep === 2 ? <OnboardingStepProfile values={values} errors={errors} onChange={onChange} /> : null}
          {currentStep === 3 ? <OnboardingReviewCard values={values} /> : null}
          <FormError message={registerPartner.error?.message} />
          <StepActions isFirst={currentStep === 0} onBack={onBack} nextLabel={currentStep === 3 ? 'Create Restaurant' : 'Continue'} isPending={registerPartner.isPending} />
        </form>
      </AuthCard>
    </AuthShell>
  );
};

export default PartnerOnboardingPage;
