import { Session, Storage } from '@/utils';
import {
  DashboardOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Spin } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../header-dropdown';
import './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className='anticon'>{currentUser?.name}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
  menu,
  children,
}) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    Storage.clear();
    Session.clear();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/login' && !redirect) {
      history.replace({
        pathname: '/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s: any) => ({ ...s, currentUser: '' }));
        });
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [ setInitialState ]
  );

  const loading = (
    <span className='ant-pro-action'>
      <Spin
        size='small'
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'setting?activeKey=account',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            key: 'setting?activeKey=site',
            icon: <DashboardOutlined />,
            label: '站点设置',
          },
          {
            key: 'setting?activeKey=password',
            icon: <UserOutlined />,
            label: '修改密码',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
