import React, { FC, ReactNode, memo } from 'react';

import cn from 'classnames';

interface IHelper {
  error?: string;
  helper?: ReactNode;
}

const HelperText: FC<IHelper> = ({ helper, error }) => {
  return (
    <small className={cn('form-text', { 'text-muted': !error, 'invalid-feedback': !!error })}>
      {error || helper || <>&nbsp;</>}
    </small>
  );
};

export default memo(HelperText);
