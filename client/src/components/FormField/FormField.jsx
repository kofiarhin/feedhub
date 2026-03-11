import './component.styles.scss';

const FormField = ({ id, label, error, children }) => (
  <div className="form-field">
    <label htmlFor={id}>{label}</label>
    {children}
    {error ? <p className="form-field-error">{error}</p> : null}
  </div>
);

export default FormField;
