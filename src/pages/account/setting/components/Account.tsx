import { api } from '@/constants';
import { useGet, usePost, usePut } from '@/hooks';
import { createBem, rule } from '@/utils';
import { ellipsis } from '@/utils/format';
import {
  AliyunOutlined,
  AntCloudOutlined,
  CloudFilled,
  MessageFilled,
} from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Layout, List } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import AliDrive from './AliDrive';

const [ bem ] = createBem('account-setting');

export default () => {
  const [ state, setState ] = useState({ open: false, type: 'drive' });
  const { runAsync } = usePut(api.account, { manual: true, tip: 'all' });
  const notice = usePost(api.notice, { manual: true, tip: 'all' });
  const { data, refresh } = useGet(api.account);
  const onFinish = async (values: any) => {
    const { code } = await runAsync({ type: 'pikpak', params: values });
    refresh();
    return code === 200;
  };
  const onUpdateNotice = async (values: any) => {
    const { code } = await notice.runAsync(values);
    refresh();
    return code === 200;
  };
  return (
    <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
      <div className={classNames(bem('title'))}>账号绑定</div>
      <List itemLayout='horizontal'>
        <List.Item>
          <List.Item.Meta
            avatar={<AntCloudOutlined />}
            title='阿里云盘'
            description={data.username || '未绑定阿里云盘账户'}
          />
          <Button
            onClick={() => setState({ open: true, type: 'drive' })}
            type='link'
            color='primary'
          >
            修改
          </Button>
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<AliyunOutlined />}
            title='开放平台'
            description={data.username || '未绑定阿里云开放平台'}
          />
          <Button
            onClick={() => setState({ open: true, type: 'openapi' })}
            type='link'
            color='primary'
          >
            修改
          </Button>
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<CloudFilled />}
            title='PikPak'
            description={
              data.pikpak ? ellipsis(data.pikpak, 4) : '未绑定PikPak账户'
            }
          />
          <ModalForm
            onFinish={onFinish}
            modalProps={{ closable: false }}
            width='480px'
            layout='horizontal'
            autoFocusFirstInput
            title='PikPak账户'
            trigger={
              <Button type='link' color='primary'>
                修改
              </Button>
            }
          >
            <ProFormText width='md' {...rule('账号')} name='username' />
            <ProFormText.Password
              width='md'
              {...rule('密码')}
              name='password'
            />
          </ModalForm>
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<MessageFilled />}
            title='PushDeer'
            description={
              data.pushKey ? ellipsis(data.pushKey, 4) : '未绑定PushDeer账户'
            }
          />
          <ModalForm
            onFinish={onUpdateNotice}
            modalProps={{ closable: false }}
            width='480px'
            layout='horizontal'
            autoFocusFirstInput
            title='PushDeer'
            trigger={
              <Button type='link' color='primary'>
                修改
              </Button>
            }
          >
            <ProFormText width='md' {...rule('pushKey')} name='pushKey' />
          </ModalForm>
        </List.Item>
      </List>
      <AliDrive
        {...state}
        setOpen={(value: boolean) => setState({ ...state, open: value })}
      />
    </Layout.Content>
  );
};
