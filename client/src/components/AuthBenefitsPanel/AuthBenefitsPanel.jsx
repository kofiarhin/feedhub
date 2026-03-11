import './component.styles.scss';

const AuthBenefitsPanel = ({ headline, copy, benefits }) => (
  <div className="auth-benefits-panel">
    <p className="auth-benefits-eyebrow">FeedHub</p>
    <h2>{headline}</h2>
    <p className="auth-benefits-copy">{copy}</p>
    <ul className="auth-benefits-list">
      {benefits.map((benefit) => (
        <li key={benefit}>{benefit}</li>
      ))}
    </ul>
  </div>
);

export default AuthBenefitsPanel;
