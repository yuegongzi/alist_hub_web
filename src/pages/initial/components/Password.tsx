import { useForm } from '@/hooks';
import { createBem, rule, wait } from '@/utils';
import { useModel } from '@@/exports';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import clsx from 'classnames';
import { useState } from 'react';

const [ bem ] = createBem('initial');
export default () => {
  const [ initial, setInitial ] = useModel('initial');
  const [ loading, setLoading ] = useState(false);
  const [ ref, { submit } ] = useForm();
  const _checkPassword = async (values: any) => {
    setLoading(true);
    await wait(500);
    if (values.password == values.confirmPassword) {
      setLoading(false);
      setInitial({
        ...initial,
        current: initial.current + 1,
        password: values.password,
      });
      return true;
    }
    message.error('两次输入密码不一致');
    setLoading(false);
    return false;
  };

  return (
    <div>
      <div className={clsx(bem('content', { password: true }))}>
        <ProForm
          formRef={ref}
          layout='horizontal'
          submitter={false}
          onFinish={_checkPassword}
        >
          <ProFormText.Password
            name='password'
            {...rule('密码')}
            tooltip='请输入带符号、大小写字母、数字的密码'
            placeholder='请输入密码'
          />
          <ProFormText.Password
            name='confirmPassword'
            {...rule('确认')}
            tooltip='请再次输入刚才输入的密码'
            placeholder='请在输入一遍上面的密码'
          />
        </ProForm>
        <Button loading={loading} onClick={submit} type='primary'>
          下一步
        </Button>
      </div>
    </div>
  );
};
