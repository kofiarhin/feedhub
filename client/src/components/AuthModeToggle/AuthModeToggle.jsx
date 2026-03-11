import './component.styles.scss';

const AuthModeToggle = ({ mode, onChange }) => (
  <div className="auth-mode-toggle" role="tablist" aria-label="Auth mode">
    <button type="button" className={mode === 'login' ? 'auth-mode-button auth-mode-button-active' : 'auth-mode-button'} onClick={() => onChange('login')}>
      Sign In
    </button>
    <button type="button" className={mode === 'register' ? 'auth-mode-button auth-mode-button-active' : 'auth-mode-button'} onClick={() => onChange('register')}>
      Create Account
    </button>
  </div>
);

export default AuthModeToggle;
