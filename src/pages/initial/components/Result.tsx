import { api } from '@/constants';
import { usePost } from '@/hooks';
import { createBem } from '@/utils';
import { useModel } from '@@/exports';
import { LoadingOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import clsx from 'classnames';
import { useEffect } from 'react';

const [ bem ] = createBem('initial');
export default () => {
  const [ initial, setInitial ] = useModel('initial');
  const { runAsync, code, message } = usePost(api.initialize, { manual: true });
  const run = async () => {
    const { code } = await runAsync({ password: initial.password });
    if (code === 200) {
      setInitial({
        ...initial,
        open_refresh_token: false,
        drive_refresh_token: false,
      });
    }
  };
  useEffect(() => {
    if (initial.open_refresh_token && initial.drive_refresh_token) {
      run();
    }
  }, [ initial ]);
  const getStatus = (): any => {
    if (code === 200) {
      return {
        status: 'success',
        title: '提交成功',
        subTitle: '数据初始化一般需要3-5分钟才能执行完成, 请耐心等待',
      };
    }
    if (code == null) {
      return {
        icon: <LoadingOutlined />,
        title: '正在处理中',
        subTitle: '请耐心等待',
      };
    }
    return { status: 'error', title: '提交失败', subTitle: message };
  };
  const s = getStatus();
  return (
    <div className={clsx(bem('content', [ 'no-pad' ]))}>
      <Result
        {...s}
        extra={[
          <Button
            type='primary'
            key='console'
            onClick={() => history.push('/')}
          >
            去管理
          </Button>,
          <Button onClick={() => setInitial({ current: 0 })} key='buy'>
            重新设置
          </Button>,
        ]}
      />
    </div>
  );
};
