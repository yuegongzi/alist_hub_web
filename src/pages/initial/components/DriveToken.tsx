import { api } from '@/constants';
import { useGet, usePost, useSessionStorageState } from '@/hooks';
import { createBem, getValue, isEmpty, isExpired } from '@/utils';
import { RedoOutlined } from '@ant-design/icons';
import { useInterval } from 'ahooks';
import { Button, Popover, QRCode, Space, Typography } from 'antd';
import clsx from 'clsx';
import { Base64 } from 'js-base64';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

const [ bem ] = createBem('initial');

export default () => {
  const [ status, setStatus ] = useState<any>('loading');
  const [ state, setState ] = useSessionStorageState<any>(location.pathname, {});
  const [ initial, setInitial ] = useModel('initial');
  // eslint-disable-next-line no-undefined
  const [ time, setTime ] = useState<undefined | number>(undefined);
  const verify = usePost(api.aliyun_drive, { manual: true });
  useInterval(async () => {
    const { code, data } = await verify.runAsync({
      ck: state.ck,
      t: `${state.t}`,
    });
    if (code === 200) {
      switch (data.qrCodeStatus) {
        case 'CONFIRMED':
          setStatus('scanned');
          const user = JSON.parse(Base64.decode(data.bizExt));
          const refresh_token = getValue(user, 'pds_login_result.refreshToken');
          const userName = getValue(user, 'pds_login_result.userName');
          setInitial({
            ...initial,
            drive_refresh_token: refresh_token,
            userName,
          });
          // eslint-disable-next-line no-undefined
          setTime(undefined);
          break;
        case 'EXPIRED':
          setStatus('expired');
          // eslint-disable-next-line no-undefined
          setTime(undefined);
          break;
        case 'SCANNED':
          // eslint-disable-next-line no-undefined
          setTime(undefined);
          setStatus('scanned');
      }
    }
  }, time);
  const { runAsync } = useGet(api.aliyun_drive, { manual: true });
  const _getQr = async () => {
    setStatus('loading');
    const { data, code } = await runAsync();
    setState(code === 200 ? data : { t: 0 });
  };
  useEffect(() => {
    if (initial.current == 1) {
      if (isEmpty(initial.drive_refresh_token)) {
        if (isExpired(state.t || 0, 120000)) {
          _getQr();
        } else {
          setStatus('active');
          setTime(2000);
        }
      } else {
        setStatus('scanned');
      }
    }
  }, [ state, initial ]);

  return (
    <div className={clsx(bem('content', [ 'flex' ]))}>
      <div className={clsx(bem('token'))}>
        <div>
          <QRCode
            value={state.codeContent}
            status={status}
            onRefresh={_getQr}
          />
          <div
            className={clsx(bem('space', { hide: isEmpty(initial.userName) }))}
          >
            {initial.userName}{' '}
            {!isEmpty(initial.userName) && (
              <Button
                onClick={() => {
                  setInitial({
                    ...initial,
                    drive_refresh_token: '',
                    userName: '',
                  });
                  _getQr();
                }}
                color='primary'
                type='text'
                icon={<RedoOutlined />}
              />
            )}
          </div>
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
          disabled={!initial.drive_refresh_token}
          onClick={() =>
            setInitial({ ...initial, current: initial.current + 1 })
          }
          type='primary'
        >
          下一步
        </Button>
      </Space>
      <Typography.Paragraph className={clsx(bem('desc'))}>
        <ul>
          <li>
            <Typography.Link href='https://www.alipan.com'>
              注册
            </Typography.Link>{' '}
            阿里云盘
          </li>
          <li>
            <Popover
              overlayInnerStyle={{ padding: 0 }}
              content={
                <QRCode
                  value='https://www.alipan.com/download'
                  bordered={false}
                />
              }
            >
              <Typography.Link href='https://www.alipan.com/download'>
                下载
              </Typography.Link>{' '}
              阿里云盘手机端
            </Popover>
          </li>
          <li>
            扫描<Typography.Text strong>上方</Typography.Text>二维码完成登录获取
          </li>
        </ul>
      </Typography.Paragraph>
    </div>
  );
};
