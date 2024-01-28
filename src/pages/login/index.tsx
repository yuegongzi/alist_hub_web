import logo from '@/assets/logo.jpg';
import { Footer } from '@/components';
import { api } from '@/constants';
import { useForm, usePost } from '@/hooks';
import { createBem, getQuery, isValidUrl, rule } from '@/utils';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button } from 'antd';
import { default as classNames, default as clsx } from 'classnames';
import './index.less';

const fieldProps: any = {
  size: 'large',
  style: {
    borderRadius: 0,
  },
};
const [ bem ] = createBem('login');
export default () => {
  const { redirect } = getQuery();
  const [ form, { submit } ] = useForm();
  const { loading, runAsync } = usePost(api.login, {
    manual: true,
    tip: 'all',
  });
  const onFinish = async (values: any) => {
    const { data, code } = await runAsync(values);
    if (code === 200) {
      localStorage.setItem('token', data.token);
      if (isValidUrl(redirect)) {
        location.href = redirect;
      } else {
        history.push('/');
      }
    }
  };
  return (
    <div className={classNames(bem())}>
      <div className={classNames(bem('layout'))}>
        <div className={classNames(bem('layer'))}>
          <h1 className={classNames(bem('title'))}>AList Hub Login </h1>
          <div className={classNames(bem('content'))}>
            <div className={clsx(bem('logo'))}>
              <img src={logo} alt='' />
            </div>
            <ProForm formRef={form} onFinish={onFinish} submitter={false}>
              <ProFormText
                fieldProps={fieldProps}
                {...rule('账号')}
                name='username'
              />
              <ProFormText.Password
                fieldProps={fieldProps}
                {...rule('密码')}
                name='password'
              />
            </ProForm>
            <div className={classNames(bem('button'))}>
              <Button
                disabled={loading}
                onClick={submit}
                loading={loading}
                size='large'
                style={{ borderRadius: 0 }}
                type='primary'
                block
              >
                提交
              </Button>
            </div>
          </div>
          <div className={classNames(bem('copyright'))}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
