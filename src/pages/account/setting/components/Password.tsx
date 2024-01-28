import { api } from '@/constants';
import { usePut } from '@/hooks';
import { createBem, rule } from '@/utils';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Layout, message } from 'antd';
import classNames from 'classnames';

const [ bem ] = createBem('account-setting');
export default () => {
  const { loading, runAsync } = usePut(api.password, {
    manual: true,
    tip: 'all',
  });
  const onFinish = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('两次密码不一致');
      return false;
    }
    await runAsync(values);
    return true;
  };
  return (
    <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
      <div className={classNames(bem('title'))}>修改密码</div>
      <div className={classNames(bem('password-wrapper'))}>
        <ProForm onFinish={onFinish} loading={loading} layout='horizontal'>
          <ProFormText.Password
            {...rule('原密码')}
            width='md'
            name='password'
          />
          <ProFormText.Password
            {...rule('新密码')}
            width='md'
            name='newPassword'
          />
          <ProFormText.Password
            {...rule('新密码')}
            placeholder='请再次输入新密码'
            width='md'
            name='confirmPassword'
          />
        </ProForm>
      </div>
    </Layout.Content>
  );
};
