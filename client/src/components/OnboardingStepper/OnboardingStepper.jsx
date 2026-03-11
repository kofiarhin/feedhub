import './component.styles.scss';

const OnboardingStepper = ({ steps, currentStep }) => (
  <ol className="onboarding-stepper">
    {steps.map((step, index) => (
      <li key={step} className={index === currentStep ? 'onboarding-step onboarding-step-active' : index < currentStep ? 'onboarding-step onboarding-step-complete' : 'onboarding-step'}>
        <span>{index + 1}</span>
        <p>{step}</p>
      </li>
    ))}
  </ol>
);

export default OnboardingStepper;
