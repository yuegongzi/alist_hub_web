import { api } from '@/constants';
import { useGet, usePut } from '@/hooks';
import { createBem, toObject } from '@/utils';
import { Layout, List, Switch, Typography } from 'antd';
import classNames from 'classnames';

const [ bem ] = createBem('account-setting');

export default () => {
  const { runAsync, data } = useGet(api.security, {
    tip: 'error',
    initialData: [],
  });
  const put = usePut(api.security, { tip: 'all', manual: true });
  const update = async (value: any) => {
    await put.runAsync(value);
    await runAsync();
  };
  const obj = toObject(data);
  return (
    <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
      <div className={classNames(bem('title'))}>安全设置</div>

      <List itemLayout='horizontal'>
        <List.Item>
          <List.Item.Meta title='禁用Guest' description='禁用Guest账户登录' />
          <Switch
            checked={obj.guest}
            onChange={(checked) =>
              update({
                label: 'guest',
                value: checked,
              })
            }
            loading={put.loading}
          />
        </List.Item>
        {/*<List.Item>*/}
        {/*  <List.Item.Meta*/}
        {/*    title='强制登录'*/}
        {/*    description='必须登录才能访问AList'*/}
        {/*  />*/}
        {/*  <Switch checked={obj.auth} loading={put.loading}*/}
        {/*          onChange={(checked)=>update({*/}
        {/*            label:'auth',value: checked })}*/}
        {/*  />*/}
        {/*</List.Item>*/}
        <List.Item>
          <List.Item.Meta title='阿里云盘' description='显示我的阿里云盘' />
          <Switch
            checked={obj.ali}
            loading={put.loading}
            onChange={(checked) =>
              update({
                label: 'ali',
                value: checked,
              })
            }
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title='订阅加密'
            description={
              <Typography.Text type='secondary' copyable={{ text: '暂未开放' }}>
                TVBox订阅增加随机密钥
              </Typography.Text>
            }
          />
          <Switch
            checked={obj.tvbox}
            loading={put.loading}
            onChange={(checked) =>
              update({
                label: 'tvbox',
                value: checked,
              })
            }
          />
        </List.Item>
      </List>
    </Layout.Content>
  );
};
