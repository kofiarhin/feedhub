import './component.styles.scss';

const AuthShell = ({ leftContent, children }) => (
  <section className="auth-shell">
    <div className="auth-shell-panel">{leftContent}</div>
    <div className="auth-shell-card-wrap">{children}</div>
  </section>
);

export default AuthShell;
