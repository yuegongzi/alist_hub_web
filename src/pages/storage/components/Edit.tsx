import { api, Drive } from '@/constants';
import { usePost, useForm } from '@/hooks';
import { rule, extractAliShare, extractQuark, getValue } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Access } from '@umijs/max';
import { Button } from 'antd';
import type { RefObject } from 'react';
import { Fragment } from 'react';

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
    label: '夸克分享',
    value: 'QuarkShare',
  },
  {
    label: 'PikPak',
    value: 'PikPakShare',
  },
  {
    label: '115网盘',
    value: '115 Share',
  },
  {
    label: 'UC网盘',
    value: 'UCShare',
  },
  {
    label: 'AList V3',
    value: 'AList V3',
  },
  {
    label: 'AList V2',
    value: 'AList V2',
  },
  {
    label: 'WebDav',
    value: 'WebDav',
  },
];

export default (props: { actionRef: RefObject<ActionType> }) => {
  const { actionRef } = props;
  const [ ref, { set } ] = useForm();
  const { runAsync } = usePost(api.storage, { manual: true, tip: 'all' });
  const onFinish = async (values: any) => {
    const { code } = await runAsync(values);
    if (code === 200) {
      actionRef?.current?.reload();
      return true;
    }
    return false;
  };
  const onChange = (e: any) => {
    const [ share_id, root_folder_id ] = extractAliShare(e.target.value);
    if (share_id && root_folder_id) {
      set({
        addition: {
          share_id,
          root_folder_id,
        },
      });
    } else {
      const { root_folder_id, share_id } = extractQuark(e.target.value);
      if (root_folder_id && share_id) {
        set({
          addition: {
            share_id,
            root_folder_id,
          },
        });
      }
    }
  };
  return (
    <ModalForm
      onFinish={onFinish}
      formRef={ref}
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
          const formItems = getValue(Drive, driver, []);
          return (
            <div>
              {formItems.map((item: any, index: number) => (
                <Fragment key={index}>
                  <Access accessible={item.type === 'text'}>
                    <ProFormText
                      name={[ 'addition', item.name ]}
                      {...rule(item.label, item.required)}
                    />
                  </Access>
                  <Access accessible={item.type === 'textArea'}>
                    <ProFormTextArea
                      name={[ 'addition', item.name ]}
                      {...rule(item.label, item.required)}
                    />
                  </Access>
                </Fragment>
              ))}
              <Access
                accessible={[ 'AliyundriveShare2Open', 'QuarkShare' ].includes(
                  driver
                )}
              >
                <ProFormTextArea
                  fieldProps={{ onChange }}
                  {...rule('自动识别', false)}
                />
              </Access>
            </div>
          );
        }}
      </ProFormDependency>
    </ModalForm>
  );
};
