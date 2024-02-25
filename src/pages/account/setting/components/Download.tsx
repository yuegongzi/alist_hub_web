import { api } from '@/constants';
import { useGet, usePut } from '@/hooks';
import { createBem, rule } from '@/utils';
import { GlobalOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Layout, List } from 'antd';
import classNames from 'classnames';

const [ bem ] = createBem('account-setting');

const formLayout = {
  width: 520,
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

export default () => {
  const { data = {}, runAsync: get } = useGet(api.aria2);
  const { runAsync } = usePut(api.aria2, { tip: 'all', manual: true });
  const onFinish = async (values: any) => {
    const { code } = await runAsync(values);
    if (code === 200) {
      await get();
      return true;
    }
    return false;
  };
  return (
    <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
      <div className={classNames(bem('title'))}>下载设置</div>
      <List itemLayout='horizontal'>
        <List.Item>
          <List.Item.Meta
            avatar={<GlobalOutlined />}
            title='Aria2地址'
            description={data.url ? `已设置 (${data.url})` : '未设置'}
          />
          <ModalForm
            initialValues={data}
            onFinish={onFinish}
            trigger={
              <Button type='link' key='site' color='primary'>
                修改
              </Button>
            }
            modalProps={{ closable: false }}
            title='修改Aria2地址'
            {...formLayout}
            layout='horizontal'
          >
            <ProFormText name='url' {...rule('Aria2地址')} />
            <ProFormText name='secretKey' {...rule('SecretKey', false)} />
          </ModalForm>
        </List.Item>
      </List>
    </Layout.Content>
  );
};
