import './component.styles.scss';

const OnboardingReviewCard = ({ values }) => (
  <div className="onboarding-review-card">
    <h3>Admin account</h3>
    <p>{values.name}</p>
    <p>{values.email}</p>
    <h3>Restaurant</h3>
    <p>{values.storeName}</p>
    <p>{values.cuisineType}</p>
    <p>{values.phone}</p>
    <p>{values.address}</p>
    <p>{values.description}</p>
    <p>{values.openingHours}</p>
    {values.logo ? <p>{values.logo}</p> : null}
  </div>
);

export default OnboardingReviewCard;
