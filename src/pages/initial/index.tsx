import { createBem } from '@/utils';
import {
  AntCloudOutlined,
  SecurityScanFilled,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Access } from '@umijs/max';
import { Steps } from 'antd';
import clsx from 'clsx';
import { useModel } from 'umi';
import DriveToken from './components/DriveToken';
import OpenToken from './components/OpenToken';
import Password from './components/Password';
import Result from './components/Result';
import './index.less';

const [ bem ] = createBem('initial');

export default () => {
  const [ state, setState ] = useModel('initial');
  const onChange = (current: number) => {
    setState({ ...state, current });
  };
  const getStatus = (index: number): string => {
    if (state.current > index) {
      return 'finish';
    }
    if (state.current < index) {
      return 'wait';
    }
    return 'process';
  };
  const pool: any[] = [ getStatus(0), getStatus(1), getStatus(2), getStatus(3) ];
  return (
    <div className={clsx(bem())}>
      <ProCard>
        <div className={clsx(bem('layout'))}>
          <Steps
            onChange={onChange}
            items={[
              {
                title: '默认密码',
                description: '管理员账户密码',
                status: pool[0],
                icon: <UserOutlined />,
              },
              {
                title: '阿里云盘',
                description: '注册阿里云盘',
                status: pool[1],
                icon: <AntCloudOutlined />,
              },
              {
                title: '平台授权',
                description: '阿里云盘平台授权',
                status: pool[2],
                icon: <SecurityScanFilled />,
              },
              {
                title: '提交结果',
                status: pool[3],
                icon: <SmileOutlined />,
              },
            ]}
          />

          <Access accessible={state.current == 0}>
            <Password />
          </Access>
          <Access accessible={state.current == 1}>
            <DriveToken />
          </Access>
          <Access accessible={state.current == 2}>
            <OpenToken />
          </Access>
          <Access accessible={state.current == 3}>
            <Result />
          </Access>
        </div>
      </ProCard>
    </div>
  );
};
