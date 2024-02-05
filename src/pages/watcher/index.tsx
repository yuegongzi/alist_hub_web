import { api } from '@/constants';
import { useDelete } from '@/hooks';
import { request } from '@/services';
import { ExclamationCircleFilled } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal, Tag } from 'antd';
import { useRef } from 'react';
import Edit from './components/Edit';

export default () => {
  const ref = useRef<ActionType>(null);
  const remove = useDelete(api.watcher + '/:id', {
    manual: true,
    tip: 'all',
  });

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
      title: '监听路径',
      dataIndex: 'path',
      search: false,
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: '转存目录',
      dataIndex: 'folderName',
      render: (text) => <Tag color='processing'>{text}</Tag>,
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
      api.watcher,
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
        pagination={false}
        rowKey='id'
        columns={columns}
        request={_request}
      />
    </PageContainer>
  );
};
