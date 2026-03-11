import './component.styles.scss';

const AuthCard = ({ title, subtitle, children }) => (
  <div className="auth-card">
    <h1 className="auth-card-title">{title}</h1>
    {subtitle ? <p className="auth-card-subtitle">{subtitle}</p> : null}
    {children}
  </div>
);

export default AuthCard;
