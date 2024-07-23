import { Button, List } from 'antd';
import { ellipsis } from '@/utils/format';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { getValue, rule } from '@/utils';
import { useGet, usePut } from '@/hooks';
import { api } from '@/constants';
import { Access } from '@umijs/max';
import { Fragment } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4625604_mhjsiytc9mn.js',
});

export type FormType = {
  type: 'text' | 'textArea';
  label: string;
  name: string;
  required?: boolean;
};
export interface ListItemProps {
  title?: string;
  description?: string;
  icon: string;
  keyName?: string;
  items?: FormType[];
  type?: string;
}

export default (props: ListItemProps) => {
  const { title, type, items = [] } = props;
  const { data, refresh } = useGet(`${api.drive}/${type}`);
  const update = usePut(`${api.drive}/${type}`, { manual: true, tip: 'all' });
  const value = getValue(data, props.keyName);
  const onFinish = async (values: any) => {
    const { code } = await update.runAsync(values);
    refresh();
    return code == 200;
  };
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<IconFont style={{ fontSize: '24px' }} type={props.icon} />}
        title={title}
        description={value ? ellipsis(value, 4) : props.description}
      />
      <ModalForm
        onFinish={onFinish}
        modalProps={{
          closable: false,
          styles: {
            body: { padding: '30px 40px' },
          },
        }}
        width='520px'
        layout='horizontal'
        autoFocusFirstInput
        title={title}
        trigger={
          <Button type='link' color='primary'>
            修改
          </Button>
        }
      >
        {items.map((item) => {
          return (
            <Fragment key={item.name}>
              <Access accessible={item.type === 'text'}>
                <ProFormText
                  width='md'
                  {...rule(item.label, item.required)}
                  name={item.name}
                />
              </Access>
              <Access accessible={item.type === 'textArea'}>
                <ProFormTextArea
                  name={item.name}
                  {...rule(item.label, item.required)}
                  width='md'
                />
              </Access>
            </Fragment>
          );
        })}
      </ModalForm>
    </List.Item>
  );
};
