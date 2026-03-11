import { useState } from 'react';
import './component.styles.scss';

const PasswordField = ({ id, value, onChange, placeholder }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input id={id} type={visible ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder} />
      <button type="button" onClick={() => setVisible((prev) => !prev)}>
        {visible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default PasswordField;
