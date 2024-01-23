import { api, fallback } from '@/constants';
import { useGet, usePost } from '@/hooks';
import { createBem } from '@/utils';
import { useModel } from '@@/exports';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Image, Space, Typography } from 'antd';
import clsx from 'clsx';

const [ bem ] = createBem('initial');

export default () => {
  const [ initial, setInitial ] = useModel('initial');
  const { data } = useGet(api.aliyun_openapi, {
    tip: 'error',
    initialData: fallback,
  });
  const { loading, runAsync } = usePost(api.aliyun_openapi, {
    tip: 'error',
    manual: true,
  });
  const onClick = async () => {
    const response = await runAsync({ url: `${data}/status` });
    if (response.code === 200) {
      setInitial({ ...initial, open_refresh_token: response.data });
    }
  };
  return (
    <div className={clsx(bem('content', [ 'flex' ]))}>
      <div className={clsx(bem('token'))}>
        <div className={clsx(bem('qr-wrapper'))}>
          <Image src={data} alt='' width={160} preview={false} />
          <Space
            direction='vertical'
            style={{ margin: '20px 0 ' }}
            size='small'
          >
            <Typography.Text>使用阿里云盘扫码进行授权</Typography.Text>
          </Space>
          <Button
            loading={loading}
            disabled={loading}
            type='dashed'
            icon={<CheckOutlined />}
            onClick={onClick}
          >
            已授权
          </Button>
        </div>
      </div>
      <Space>
        <Button
          onClick={() =>
            setInitial({ ...initial, current: initial.current - 1 })
          }
        >
          上一步
        </Button>
        <Button
          disabled={!initial.open_refresh_token}
          onClick={() =>
            setInitial({ ...initial, current: initial.current + 1 })
          }
          type='primary'
        >
          提交
        </Button>
      </Space>
    </div>
  );
};
