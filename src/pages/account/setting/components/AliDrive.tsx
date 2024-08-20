import { api } from '@/constants';
import { useGet, usePut } from '@/hooks';
import { createBem } from '@/utils';
import { RedoOutlined } from '@ant-design/icons';
import { Access } from '@umijs/max';
import { Button, Flex, Image, Modal, QRCode } from 'antd';
import clsx from 'classnames';
import { useState } from 'react';

const [ bem ] = createBem('account-setting');
export default (props: {
  open: boolean;
  close: () => void;
  refresh: () => void;
}) => {
  const { open, close } = props;
  const [ type, setType ] = useState('drive');
  const drive = useGet(api.aliyun_drive, { ready: open && type == 'drive' });
  const openapi = useGet(api.aliyun_openapi, {
    ready: open && type == 'openapi',
  });
  const account = usePut(api.ali, { manual: true, tip: 'all' });
  const refresh = async () => {
    if (type == 'drive') {
      drive.refresh();
    } else {
      openapi.refresh();
    }
  };
  const onSubmit = async () => {
    const params =
      type === 'drive'
        ? { ck: drive.data?.ck, t: `${drive.data?.t}` }
        : { url: `${openapi.data}/status` };
    const { code } = await account.runAsync({ type, params });
    if (code === 200 && type === 'openapi') {
      close();
      props.refresh();
    } else {
      setType('openapi');
    }
  };
  return (
    <Modal
      width='420px'
      title='阿里云盘授权'
      onOk={onSubmit}
      open={open}
      okText={type === 'drive' ? '下一步' : '确认'}
      onCancel={close}
    >
      <Flex justify='center'>
        <div className={clsx(bem('note'))}>使用阿里云盘手机端扫码</div>
      </Flex>
      <Flex className={clsx(bem('qr'))} justify='center'>
        <Access accessible={type === 'drive'}>
          <QRCode size={200} value={drive.data?.codeContent} />
        </Access>
        <Access accessible={type === 'openapi'}>
          <Image
            width={200}
            src={openapi.data || ''}
            alt='暂无图片'
            preview={false}
          />
        </Access>
      </Flex>
      <Flex justify='center'>
        <Button type='link' onClick={refresh} icon={<RedoOutlined />}>
          刷新二维码
        </Button>
      </Flex>
    </Modal>
  );
};
