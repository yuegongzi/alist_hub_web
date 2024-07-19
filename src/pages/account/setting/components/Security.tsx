import { api } from '@/constants';
import { useGet, usePost, usePut, useSetting } from '@/hooks';
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
  const user = usePost(api.user, { tip: 'all', manual: true });
  const [ value, run, loading ] = useSetting('allow_indexed');
  const update = async (value: any) => {
    await put.runAsync(value);
    await runAsync();
  };
  const onChange = async (checked: boolean) => {
    await user.runAsync({
      id: 2,
      username: 'guest',
      role: 1,
      disabled: checked,
    });
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
            onChange={onChange}
            loading={user.loading}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta title='阿里云盘' description='显示我的阿里云盘' />
          <Switch
            checked={!obj.ali}
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
            title='允许挂载'
            description='是否允许站点被挂载(建议关闭)'
          />
          <Switch
            checked={value === 'true'}
            loading={loading}
            onChange={async (checked) => {
              await run(`${checked ? 'true' : 'false'}`);
            }}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title='TVBox订阅'
            description={
              <Typography.Text
                type='secondary'
                copyable={{ text: `${location.origin}/tvbox/my.json` }}
              >
                复制
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
