import React, { FC, ReactNode, memo, useState } from 'react';

import cn from 'classnames';

import HelperText from '../HelperText/HelperText';
import Label from '../Label/Label';
import './Select.scss';

interface ISelect {
  helper?: ReactNode;
  label?: string;
  error?: string;
  value: string;
  name: string;
  onChange(name: string, value: string): void;
  options: Array<{ label: string; value: string }>;
}

const Select: FC<ISelect> = ({
  name,
  value: selected,
  label,
  helper,
  error,
  options = [],
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="form-group position-relative">
      {label && <Label name={name}>{label}</Label>}
      <button
        onClick={() => setOpen((state) => !state)}
        className={cn('btn-select', { 'is-invalid': !!error })}
        type="button"
      >
        {selected}
        <i className="bi bi-chevron-down" />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} className="dropdown-overlay" />
          <div className="dropdown-menu show">
            {options.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => {
                  if (value !== selected) {
                    onChange(name, value);
                  }
                  setOpen(false);
                }}
                className={cn('dropdown-item', { active: value === selected })}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      <HelperText helper={helper} error={error} />
    </div>
  );
};

export default memo(Select);
