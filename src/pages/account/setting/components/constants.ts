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
        required: true,
      },
      {
        type: 'text',
        label: '用户名',
        name: 'password',
        required: true,
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
        required: true,
      },
      {
        type: 'textArea',
        label: '签到链接',
        name: 'signUrl',
        required: false,
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
        required: true,
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
        required: true,
      },
    ],
  },
];
