import { api } from '@/constants';
import { useDelete, useGet, usePut } from '@/hooks';
import { request } from '@/services';
import { ExclamationCircleFilled, RedoOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access } from '@umijs/max';
import { Badge, Button, Modal, Switch, Tag } from 'antd';
import { useRef } from 'react';
import Edit from './components/Edit';

export default () => {
  const ref = useRef<ActionType>(null);
  const { run, loading } = useGet(api.storage + '/load', {
    manual: true,
    tip: 'all',
  });
  const update = usePut(api.storage + '/:id', { manual: true, tip: 'all' });
  const remove = useDelete(api.storage + '/:id', { manual: true, tip: 'all' });
  const onChange = async (id: string, v: boolean) => {
    await update.runAsync({ disabled: v }, { id });
    ref.current?.reload();
  };
  const onClick = (id: any) => {
    Modal.confirm({
      title: '确定要删除该项数据?',
      icon: <ExclamationCircleFilled />,
      content: '删除后数据不可恢复',
      onOk: async () => {
        await remove.runAsync({ id });
        ref.current?.reload();
      },
    });
  };
  const columns: ProColumns[] = [
    {
      title: '挂载路径',
      dataIndex: 'mountPath',
    },
    {
      title: '类型',
      dataIndex: 'driver',
      search: false,
      render: (text) => <Tag color='processing'>{text}</Tag>,
    },

    {
      title: '状态',
      dataIndex: 'status',
      sorter: true,
      search: false,
      render: (text) => (
        <Badge text={text} color={text === 'work' ? 'green' : 'red'} />
      ),
    },
    {
      title: '站点',
      dataIndex: 'addition',
      search: false,
      render: (addition: any, { driver }) => {
        return (
          <Access accessible={[ 'AList V3', 'AList V2' ].includes(driver)}>
            {addition.url}
            {addition.root_folder_path}
          </Access>
        );
      },
    },
    {
      title: '禁用',
      dataIndex: 'disabled',
      search: false,
      render: (_, { id, disabled }) => (
        <Switch
          loading={update.loading}
          disabled={update.loading}
          onChange={(v: boolean) => onChange(id, v)}
          value={disabled}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'id',
      search: false,
      render: (id) => (
        <Button onClick={() => onClick(id)} type='link'>
          删除
        </Button>
      ),
    },
  ];
  const _request = async (params: any, sort: any, filter: any) => {
    return await request(
      api.storage,
      params,
      { ...sort, id: 'descend' },
      filter
    );
  };
  const toolBarRender = () => {
    return [
      <Edit key='add' actionRef={ref} />,
      <Button
        disabled={loading}
        loading={loading}
        key='load'
        icon={<RedoOutlined />}
        onClick={() => run()}
      >
        重新加载
      </Button>,
    ];
  };
  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        toolBarRender={toolBarRender}
        scroll={{ x: 'max-content' }}
        pagination={{ defaultPageSize: 10 }}
        rowKey='id'
        columns={columns}
        request={_request}
      />
    </PageContainer>
  );
};
