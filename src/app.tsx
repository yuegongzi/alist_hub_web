import {
  AvatarDropdown,
  AvatarName,
  Footer,
  MessageWrapper,
  Search,
} from '@/components';
import { ignore_menu } from '@/constants';
import { createNamespace } from '@/utils';
import { UserOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { App } from 'antd';
import React from 'react';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<any> {
  const [ state, { cache } ] = createNamespace('@@initialState', {});
  return cache({
    ...state,
    settings: defaultSettings,
    currentUser: { name: 'admin' },
  });
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    ...initialState.settings,
    menu: {
      locale: false,
    },
    actionsRender: () => [ <Search key='search' /> ],
    avatarProps: {
      icon: <UserOutlined />,
      title: <AvatarName />,
      style: { backgroundColor: '#1890ff' },
      render: (_, avatarChildren) => {
        return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>;
      },
    },
    onCollapse: (collapsed: boolean) => {
      setInitialState({ ...initialState, collapsed });
    },
    footerRender: () => <Footer />,
    menuDataRender: (menuData: MenuDataItem[]) => {
      return menuData.filter(
        (item: MenuDataItem) => !ignore_menu.includes(item.path || '')
      );
    },
  };
};

export function rootContainer(container: React.ReactNode) {
  // Fix axios request to send a message, a warning will appear on the console ,fuck you antd
  return (
    <App>
      <MessageWrapper />
      {container}
    </App>
  );
}
