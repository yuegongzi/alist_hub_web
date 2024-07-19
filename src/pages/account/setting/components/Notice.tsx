import { api } from '@/constants';
import { useGet, usePost, usePut } from '@/hooks';
import { createBem, rule } from '@/utils';
import { Button, Layout, List, Switch } from 'antd';
import classNames from 'classnames';
import { ellipsis } from '@/utils/format';
import { ModalForm, ProFormText } from '@ant-design/pro-components';

const [ bem ] = createBem('account-setting');

export default () => {
  const { runAsync, data, code } = useGet(api.notice, {
    tip: 'error',
  });
  const disabled = code !== 200 || data.pushKey === null;
  const put = usePut(api.notice, { tip: 'all', manual: true });
  const post = usePost(api.notice, { tip: 'all', manual: true });
  const update = async (value: any) => {
    await put.runAsync({ ...data, ...value });
    await runAsync();
  };
  const add = async (values: any) => {
    await post.runAsync(values);
    await runAsync();
    return true;
  };
  return (
    <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
      <div className={classNames(bem('title'))}>通知设置</div>
      <List itemLayout='horizontal'>
        <List.Item>
          <List.Item.Meta
            title='PushDeer'
            description={
              data.pushKey ? ellipsis(data.pushKey, 4) : '未绑定PushDeer账户'
            }
          />
          <ModalForm
            onFinish={add}
            modalProps={{ closable: false }}
            width='480px'
            layout='horizontal'
            autoFocusFirstInput
            title='PushDeer'
            trigger={
              <Button type='link' color='primary'>
                修改
              </Button>
            }
          >
            <ProFormText width='md' {...rule('pushKey')} name='pushKey' />
          </ModalForm>
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title='签到通知'
            description='阿里云盘签到成功时通知'
          />
          <Switch
            disabled={disabled}
            checked={data.sign}
            onChange={(sign: boolean) => update({ sign })}
            loading={put.loading}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title='更新通知'
            description='更新小雅数据成功时通知'
          />
          <Switch
            disabled={disabled}
            checked={data.update}
            loading={put.loading}
            onChange={(checked: boolean) => update({ update: checked })}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta title='转存通知' description='转存新资源成功时通知' />
          <Switch
            disabled={disabled}
            checked={data.transfer}
            loading={put.loading}
            onChange={(checked: boolean) => update({ transfer: checked })}
          />
        </List.Item>
      </List>
    </Layout.Content>
  );
};
