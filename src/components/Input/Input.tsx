import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  FocusEvent,
  InputHTMLAttributes,
  ReactNode,
  memo,
} from 'react';

import cn from 'classnames';

import HelperText from '../HelperText/HelperText';
import Label from '../Label/Label';

interface IInput
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  helper?: ReactNode;
  label?: string;
  error?: string;
  value: string;
  name: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onBlur(event: FocusEvent<HTMLInputElement>): void;
}

const Input: FC<IInput> = ({
  onBlur,
  onChange,
  value,
  label,
  name,
  helper,
  error,
  className,
  id,
  ...rest
}) => {
  return (
    <div className="form-group">
      {label && <Label name={name}>{label}</Label>}
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn('form-control form-control-lg', { 'is-invalid': Boolean(error) })}
        id={name}
        name={name}
        {...rest}
      />
      <HelperText helper={helper} error={error} />
    </div>
  );
};

export default memo(Input);
