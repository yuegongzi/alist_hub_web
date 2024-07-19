import type { ListItemProps } from './ListItem';

export const Drive: ListItemProps[] = [
  {
    title: 'PikPak网盘',
    description: '未绑定PikPak网盘',
    type: 'PikPakShare',
    keyName: 'username',
    icon: 'alist-pik-pak',
    items: [
      {
        type: 'text',
        label: '用户名',
        name: 'username',
      },
      {
        type: 'text',
        label: '用户名',
        name: 'password',
      },
    ],
  },
  {
    title: 'Quark网盘',
    description: '未绑定Quark网盘',
    type: 'QuarkShare',
    keyName: 'cookie',
    icon: 'alist-quark',
    items: [
      {
        type: 'textArea',
        label: 'Cookie',
        name: 'cookie',
      },
    ],
  },
  {
    title: 'UC网盘',
    description: '未绑定UC网盘',
    type: 'UCShare',
    keyName: 'cookie',
    icon: 'alist-uc',
    items: [
      {
        type: 'textArea',
        label: 'Cookie',
        name: 'cookie',
      },
    ],
  },
  {
    title: '115网盘',
    description: '未绑定115网盘',
    type: '115 Share',
    keyName: 'cookie',
    icon: 'alist-drive115',
    items: [
      {
        type: 'textArea',
        label: 'Cookie',
        name: 'cookie',
      },
    ],
  },
];
