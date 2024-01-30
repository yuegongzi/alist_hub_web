import { api } from '@/constants';
import { usePost } from '@/hooks';
import { rule } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Access } from '@umijs/max';
import { Button } from 'antd';
import type { RefObject } from 'react';

const formLayout = {
  width: 520,
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const options = [
  {
    label: '阿里云盘',
    value: 'AliyundriveShare2Open',
  },
  {
    label: 'PikPak',
    value: 'PikPakShare',
  },
  {
    label: 'AList V3',
    value: 'AList V3',
  },
  {
    label: 'AList V2',
    value: 'AList V2',
  },
];

export default (props: { actionRef: RefObject<ActionType> }) => {
  const { actionRef } = props;
  const { runAsync } = usePost(api.storage, { manual: true, tip: 'all' });
  const onFinish = async (values: any) => {
    const { code } = await runAsync(values);
    if (code === 200) {
      actionRef?.current?.reload();
      return true;
    }
    return false;
  };
  return (
    <ModalForm
      onFinish={onFinish}
      modalProps={{ maskClosable: false }}
      layout='horizontal'
      title='编辑'
      {...formLayout}
      trigger={
        <Button type='primary' icon={<PlusOutlined />} key='add'>
          新建
        </Button>
      }
    >
      <ProFormSelect name='driver' {...rule('驱动')} options={options} />
      <ProFormText {...rule('挂载路径')} name='mountPath' />
      <ProFormDependency name={[ 'driver' ]}>
        {({ driver }) => {
          return (
            <div>
              <Access accessible={[ 'AList V2', 'AList V3' ].includes(driver)}>
                <ProFormText name={[ 'addition', 'url' ]} {...rule('站点地址')} />
                <ProFormText
                  name={[ 'addition', 'root_folder_path' ]}
                  {...rule('根目录')}
                />
                <ProFormText
                  name={[ 'addition', 'access_token' ]}
                  {...rule('认证Token', false)}
                />
                <ProFormText
                  name={[ 'addition', 'password' ]}
                  {...rule('访问密码', false)}
                />
              </Access>
              <Access
                accessible={[ 'AliyundriveShare2Open', 'PikPakShare' ].includes(
                  driver
                )}
              >
                <ProFormText
                  name={[ 'addition', 'share_id' ]}
                  {...rule('分享ID')}
                />
                <ProFormText
                  name={[ 'addition', 'share_pwd' ]}
                  {...rule('分享密码', false)}
                />
                <ProFormText
                  name={[ 'addition', 'root_folder_id' ]}
                  {...rule('根文件夹ID')}
                />
              </Access>
            </div>
          );
        }}
      </ProFormDependency>
    </ModalForm>
  );
};
