import { DetailedHTMLProps, FC, FocusEvent, InputHTMLAttributes, ReactNode, memo } from 'react';

import cn from 'classnames';

interface ICheckbox
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  value: string;
  onChange(event: FocusEvent<HTMLInputElement>): void;
}

const Checkbox: FC<ICheckbox> = ({ onChange, value, name, label, error }) => {
  return (
    <div className="custom-control custom-checkbox mb-3 ">
      <input
        onChange={onChange}
        checked={!!value}
        type="checkbox"
        className={cn('custom-control-input', { 'is-invalid': Boolean(error) })}
        id={name}
        name={name}
      />
      {label && (
        <label className="custom-control-label" htmlFor={name}>
          {label}
        </label>
      )}
    </div>
  );
};

export default memo(Checkbox);
