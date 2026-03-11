import './component.styles.scss';

const FormError = ({ message }) => {
  if (!message) {
    return null;
  }

  return <p className="form-error">{message}</p>;
};

export default FormError;
