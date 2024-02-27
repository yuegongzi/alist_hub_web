import { api } from '@/constants';
import { useGet } from '@/hooks';
import { SearchOutlined } from '@ant-design/icons';
import { useLocation, useModel } from '@umijs/max';
import { Avatar, Input, List, Modal } from 'antd';
import './index.less';

export default () => {
  const [ state, setState ] = useModel('search');
  const { runAsync, data } = useGet(api.search, {
    manual: true,
    debounceWait: 500,
    initialData: [],
  });
  const location = useLocation();
  const onSearch = async (s: string) => {
    await runAsync({ s });
  };
  const onClick = (item: any) => {
    setState({ path: `${item.parent}/${item.name}`, open: false });
  };
  if (location.pathname !== '/alist') {
    return null;
  }
  return (
    <div>
      <Input
        className='search'
        readOnly
        onClick={() => setState({ ...state, open: true })}
        prefix={<SearchOutlined />}
        placeholder='输入关键词'
        key='2'
      />
      <Modal
        open={state.open}
        title='搜索'
        footer={null}
        onCancel={() => {
          setState({ ...state, open: false });
        }}
      >
        <div className='hub-search'>
          <Input.Search
            size='large'
            onPressEnter={(e) => {
              // @ts-ignore
              onSearch(e.target.value);
            }}
            placeholder='请输入搜索关键词'
            onSearch={onSearch}
          />
          <List
            itemLayout='horizontal'
            dataSource={data}
            renderItem={(item: any, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ backgroundColor: '#f56a00' }}>
                      {item.name[0]}
                    </Avatar>
                  }
                  title={
                    <a href='#' onClick={() => onClick(item)}>
                      {item.name}
                    </a>
                  }
                  description={item.parent}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  );
};
