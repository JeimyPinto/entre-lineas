import { InputHTMLAttributes, ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helpText?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({ label, error, helpText, className = '', checked = false, onChange, ...props }: CheckboxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={`${styles.checkboxWrapper} ${className}`}>
      <label className={styles.labelWrapper}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <span className={styles.checkmark} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
      {error && <span className={styles.errorText}>{error}</span>}
      {helpText && !error && <span className={styles.helpText}>{helpText}</span>}
    </div>
  );
}