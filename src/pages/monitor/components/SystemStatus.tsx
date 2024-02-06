import { api } from '@/constants';
import { useGet, usePost, usePut } from '@/hooks';
import { bytesToGB, getValue, isEmpty } from '@/utils';
import {
  PlayCircleOutlined,
  PoweroffOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Progress, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

interface SystemStatusProps {
  systemName: string;
  startupTime: string;
  appVersion: string;
}

const SystemStatus: React.FC<SystemStatusProps> = ({
  systemName,
  startupTime,
  appVersion,
}) => {
  const [ statusTagColor, setStatusTagColor ] = useState<'green' | 'red'>(
    'green'
  );
  const { code, runAsync } = useGet(api.ping, { pollingInterval: 3000 });
  const { data } = useGet(api.user_info);
  const startUp = usePost(api.alist + '/start', { manual: true, tip: 'all' });
  const stop = usePost(api.alist + '/stop', { manual: true, tip: 'all' });
  const update = usePut(api.alist, { manual: true, tip: 'all' });
  const onStartUp = async () => {
    await startUp.runAsync();
    await runAsync();
  };
  const onStop = async () => {
    await stop.runAsync();
    await runAsync();
  };
  const onUpdateApp = async () => {
    await update.runAsync();
  };
  useEffect(() => {
    setStatusTagColor(code === 200 ? 'green' : 'red');
  }, [ code ]);
  const avatar = getValue(data, 'driveInfo.avatar', '');
  const total_size = getValue(data, 'spaceInfo.total_size', 1);
  const used_size = getValue(data, 'spaceInfo.used_size', 1);
  const resourceAuthStatus = !isEmpty(
    getValue(data, 'driveInfo.resource_drive_id')
  );
  const backupAuthStatus = !isEmpty(
    getValue(data, 'driveInfo.backup_drive_id')
  );
  return (
    <Card title='应用信息'>
      <Space direction='vertical' size='middle'>
        <Flex>
          <Space>
            {isEmpty(avatar) ? (
              <Avatar
                style={{ backgroundColor: '#f56a00' }}
                icon={<UserOutlined color='#f8f8f8' />}
              />
            ) : (
              <Avatar src={avatar} />
            )}
            <div> {getValue(data, 'driveInfo.user_name')}</div>
          </Space>
        </Flex>
        <div>
          <strong>阿里云盘: </strong>
          <Progress percent={(used_size / total_size) * 100} showInfo={false} />
          <div>
            <span>总容量: {bytesToGB(total_size)} GB</span>
            <span style={{ marginLeft: 16 }}>
              已使用: {bytesToGB(used_size)} GB
            </span>
          </div>
        </div>
        <div>
          <strong>资源盘: </strong>
          <Tag color={resourceAuthStatus ? 'green' : 'red'}>已授权</Tag>
        </div>
        <div>
          <strong>备份盘: </strong>
          <Tag color={backupAuthStatus ? 'green' : 'red'}>已授权</Tag>
        </div>
      </Space>
      <Space direction='vertical' size='middle' style={{ marginLeft: '200px' }}>
        <div>
          <strong>系统名称: </strong>
          {systemName}
        </div>
        <div>
          <strong>运行时间: </strong>
          {startupTime}
        </div>
        <div>
          <strong>应用状态: </strong>
          <Tag color={statusTagColor}>{code === 200 ? '运行中' : '已停止'}</Tag>
        </div>
        <div>
          <strong>小雅版本: </strong>
          {appVersion}
        </div>
        <Space size='large'>
          <Button
            type='primary'
            icon={<PlayCircleOutlined />}
            onClick={onStartUp}
            disabled={code === 200}
          >
            启动
          </Button>
          <Button
            danger
            icon={<PoweroffOutlined />}
            onClick={onStop}
            disabled={code !== 200}
          >
            停止
          </Button>
          <Button icon={<ReloadOutlined />} onClick={onUpdateApp}>
            更新
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default SystemStatus;
