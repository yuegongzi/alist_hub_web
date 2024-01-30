import { api } from '@/constants';
import { useGet, usePut, useSetting } from '@/hooks';
import { createBem, rule } from '@/utils';
import {
  BgColorsOutlined,
  GlobalOutlined,
  VerifiedOutlined,
} from '@ant-design/icons';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Badge, Button, ColorPicker, Layout, List } from 'antd';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

const [ bem ] = createBem('account-setting');

const formLayout = {
  width: 520,
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

export default () => {
  const [ color = '#1890ff', setColor ] = useSetting('main_color');
  const { data, runAsync: get } = useGet(api.config);
  const { runAsync } = usePut(api.config, { tip: 'all', manual: true });
  const onChange = debounce((hex: string) => {
    setColor(hex);
  }, 500);
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
      <Badge.Ribbon text='重启AList生效' color='volcano'>
        <div className={classNames(bem('title'))}>站点设置</div>
      </Badge.Ribbon>
      <List itemLayout='horizontal'>
        <List.Item>
          <List.Item.Meta
            avatar={<BgColorsOutlined />}
            title='主题色'
            description='网站主题颜色'
          />
          <ColorPicker value={color} onChange={(_, hex) => onChange(hex)} />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<GlobalOutlined />}
            title='site_url'
            description={data.siteUrl ? `已设置 (${data.siteUrl})` : '未设置'}
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
            title='修改站点地址'
            {...formLayout}
            layout='horizontal'
          >
            <ProFormText name='siteUrl' {...rule('站点地址')} />
          </ModalForm>
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<VerifiedOutlined />}
            title='opentoken_auth_url'
            description={
              data.openTokenUrl ? `已设置 (${data.openTokenUrl})` : '未设置'
            }
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
            title='修改授权地址'
            {...formLayout}
            layout='horizontal'
          >
            <ProFormSelect
              options={[
                {
                  label: 'https://api.nn.ci',
                  value: 'https://api.nn.ci/alist/ali_open/token',
                },
                {
                  label: 'https://api-cf.nn.ci',
                  value: 'https://api-cf.nn.ci/alist/ali_open/token',
                },
                {
                  label: 'https://api.xhofe.top',
                  value: 'https://api.xhofe.top/alist/ali_open/token',
                },
              ]}
              name='openTokenUrl'
              {...rule('授权地址')}
            />
          </ModalForm>
        </List.Item>
      </List>
    </Layout.Content>
  );
};
