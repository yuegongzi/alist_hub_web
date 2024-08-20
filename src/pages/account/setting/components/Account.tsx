import { api } from '@/constants';
import { useGet } from '@/hooks';
import { createBem } from '@/utils';
import { AntCloudOutlined } from '@ant-design/icons';
import { Button, Layout, List } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import AliDrive from './AliDrive';
import ListItem from './ListItem';
import { Drive } from '@/pages/account/setting/components/constants';

const [ bem ] = createBem('account-setting');

export default () => {
  const [ open, setOpen ] = useState(false);
  const { data, refresh } = useGet(api.ali);

  return (
    <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
      <div className={classNames(bem('title'))}>账号绑定</div>
      <List itemLayout='horizontal'>
        <List.Item>
          <List.Item.Meta
            avatar={<AntCloudOutlined style={{ fontSize: '24px' }} />}
            title='阿里云盘'
            description={data.username || '未绑定阿里云盘账户'}
          />
          <Button onClick={() => setOpen(!open)} type='link' color='primary'>
            修改
          </Button>
        </List.Item>
        {Drive.map((item, index: number) => (
          <ListItem key={index} {...item} />
        ))}
      </List>
      <AliDrive open={open} refresh={refresh} close={() => setOpen(!open)} />
    </Layout.Content>
  );
};
