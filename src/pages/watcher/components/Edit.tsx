import { api } from '@/constants';
import { useGet, usePost } from '@/hooks';
import { getValue, isEmpty, rule } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, TreeSelect } from 'antd';
import type { RefObject } from 'react';
import { useState } from 'react';

const formLayout = {
  width: 520,
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

function toOptions(data: any[]): any[] {
  return data
    .map((item: any) => {
      if (item.driver == 'AliyundriveShare2Open') {
        return {
          label: item.mountPath,
          value: item.id,
        };
      }
      return null;
    })
    .filter((item) => item != null);
}

interface TreeNode {
  title: string;
  value: string;
  children?: TreeNode[];
}

function convertToTreeData(paths: string[]): TreeNode[] {
  const treeData: TreeNode[] = [];

  paths.forEach((path) => {
    const pathParts = path.split('/');
    let currentNode: TreeNode[] = treeData;

    pathParts.forEach((part, index) => {
      if (!isEmpty(part)) {
        const existingNode = currentNode.find((node) => node.title === part);
        if (existingNode) {
          currentNode = existingNode.children || [];
        } else {
          const newNode: TreeNode = {
            title: part,
            value: pathParts.slice(0, index + 1).join('/'),
            children: [],
          };
          currentNode.push(newNode);
          currentNode = newNode.children || [];
        }
      }
    });
  });

  return treeData;
}

export default (props: { actionRef: RefObject<ActionType> }) => {
  const { actionRef } = props;
  const [ path, setPath ] = useState('');
  const [ list, setList ] = useState<string[]>([]);
  const { runAsync } = usePost(api.watcher, { manual: true, tip: 'all' });
  const fs = usePost(api.fs, { manual: true });
  const { data } = useGet(api.storage, {
    initialData: [],
    defaultParams: { pageSize: 100 },
  });
  const onFinish = async (values: any) => {
    const { code } = await runAsync(values);
    if (code === 200) {
      actionRef?.current?.reload();
      return true;
    }
    return false;
  };

  const onLoad = async (e: any) => {
    const { data } = await fs.runAsync({
      path: e.first ? e.value : path + '/' + e.value,
    });
    const content = getValue(data, 'content', []);
    const s = content
      .map((item: any) => {
        if (item.is_dir) {
          return e.first ? '/' + item.name : e.value + '/' + item.name;
        }
        return null;
      })
      .filter((item: any) => item != null);
    setList(e.first ? s : list.concat(s));
  };

  const onChange = async (value: any, option: any) => {
    setPath(option.label);
    onLoad({ value: option.label, first: true });
  };

  // 过滤类型为
  const options = toOptions(data);
  const treeData = convertToTreeData(list);
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
      <ProFormSelect
        name='storageId'
        {...rule('挂载点')}
        onChange={onChange}
        options={options}
      />
      <ProForm.Item {...rule('监听路径')} name='path'>
        <TreeSelect treeData={treeData} loadData={onLoad} />
      </ProForm.Item>
      <ProFormText {...rule('转存目录')} name='folderName' />
    </ModalForm>
  );
};
