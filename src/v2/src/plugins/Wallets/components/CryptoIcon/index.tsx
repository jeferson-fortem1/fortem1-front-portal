import cx from 'classnames';
import * as React from 'react';

export interface CryptoIconProps {
    code: string;
    className?: string;
    children?: React.ReactNode;
}

const findIcon = (code: string): string => {
  try {
    return require(`../../../../../node_modules/cryptocurrency-icons/128/color/${code.split('/')[0]}.png`);
  } catch (err){
    return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
  }
};

export const CryptoIcon: React.FunctionComponent<CryptoIconProps> = props => {
    const { code, className = '', children } = props;

    return (
        <span className={cx('cr-crypto-icon', className)}>
          <img width="60px" height="60px" src={findIcon(code)} alt="crypto-icon"/> {children}
        </span>
    );
};
