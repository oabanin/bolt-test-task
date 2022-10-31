import { FC, memo } from 'react';

interface Ilabel {
  children: string;
  name: string;
}

const Label: FC<Ilabel> = ({ children, name }) => {
  return (
    <label className="font-weight-bold" htmlFor={name}>
      {children}
    </label>
  );
};

export default memo(Label);
