import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import React from 'react';
import './index.less';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => {
  return (
    <Dropdown overlayClassName={classNames('container', cls)} {...restProps} />
  );
};

export default HeaderDropdown;
