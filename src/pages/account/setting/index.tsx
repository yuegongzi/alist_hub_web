import { createBem, getQuery, isEmpty } from '@/utils';
import { Access } from '@umijs/max';
import { Layout, Menu, theme } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Account from './components/Account';
import Notice from './components/Notice';
import Password from './components/Password';
import Security from './components/Security';
import Site from './components/Site';
import './index.less';

const items = [
  {
    key: 'site',
    label: '站点设置',
  },
  {
    key: 'account',
    label: '账号绑定',
  },
  {
    key: 'security',
    label: '安全设置',
  },
  {
    key: 'notice',
    label: '通知设置',
  },

  {
    key: 'password',
    label: '密码修改',
  },
];
const { Sider } = Layout;

const [ bem ] = createBem('account-setting');

export default () => {
  const { activeKey = 'site' } = getQuery();
  const [ key, setKey ] = useState('site');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!isEmpty(activeKey)) {
      setKey(activeKey);
    }
  }, [ activeKey ]);
  return (
    <Layout
      className={classNames(bem())}
      style={{
        padding: '24px 0',
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Sider style={{ background: colorBgContainer }} width={200}>
        <Menu
          mode='inline'
          onSelect={({ key }) => setKey(key)}
          selectedKeys={[ key ]}
          style={{ height: '100%' }}
          items={items}
        />
      </Sider>
      <Access accessible={key === 'password'}>
        <Password />
      </Access>
      <Access accessible={key === 'security'}>
        <Security />
      </Access>
      <Access accessible={key === 'account'}>
        <Account />
      </Access>
      <Access accessible={key === 'site'}>
        <Site />
      </Access>
      <Access accessible={key === 'notice'}>
        <Notice />
      </Access>
    </Layout>
  );
};
