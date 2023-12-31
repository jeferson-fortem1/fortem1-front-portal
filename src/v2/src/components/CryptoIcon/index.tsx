import cx from 'classnames';
import * as React from 'react';

export interface CryptoIconProps {
    code: string;
    className?: string;
    children?: React.ReactNode;
}

const findIcon = (code: string): string => {
  try {
    // return require(`../../../node_modules/cryptocurrency-icons/128/color/${code.toLowerCase()}.png`);
    return null;
  } catch (err){
    // return require(`../../../node_modules/cryptocurrency-icons/128/color/${code.toLowerCase()}.png`);
    return null;
  }
};

export const CryptoIcon: React.FunctionComponent<CryptoIconProps> = props => {
    const { code, className = '', children } = props;

    return (
        <span className={cx('cr-crypto-icon', className)}>
          <img src={findIcon(code)} alt="crypto-icon"/> {children}
        </span>
    );
};
