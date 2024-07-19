import { api } from '@/constants';
import { usePost } from '@/hooks';
import { request } from '@/services';
import { ExclamationCircleFilled } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access } from '@umijs/max';
import { Badge, Button, Modal, Switch, Tag, Tooltip } from 'antd';
import { useRef } from 'react';
import Edit from './components/Edit';
import { ellipsis } from '@/utils/format';

export default () => {
  const ref = useRef<ActionType>(null);
  const update = usePost(api.alist_storage + '/:status', {
    manual: true,
    tip: 'all',
  });
  const remove = usePost(api.alist_storage + '/delete', {
    manual: true,
    tip: 'all',
  });
  const onChange = async (id: string, v: boolean) => {
    await update.runAsync({}, { status: v ? 'disable' : 'enable', id });
    ref.current?.reload();
  };
  const onClick = (id: any) => {
    Modal.confirm({
      title: '确定要删除该项数据?',
      icon: <ExclamationCircleFilled />,
      content: '删除后数据不可恢复',
      onOk: async () => {
        await remove.runAsync({}, { id });
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
      renderText: (text: string) => (
        <Tooltip title={text}>
          <Badge
            text={ellipsis(text, 8)}
            color={text === 'work' ? 'green' : 'red'}
          />
        </Tooltip>
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
    return [ <Edit key='add' actionRef={ref} /> ];
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
