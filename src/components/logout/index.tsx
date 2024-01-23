import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './index.less';

export default (props: { collapsed: boolean }) => {
  const { collapsed } = props;
  return (
    <div className='ant-logo-out'>
      <Button type='text' icon={<LogoutOutlined />}>
        {!collapsed ? null : '退出登录'}
      </Button>
    </div>
  );
};
