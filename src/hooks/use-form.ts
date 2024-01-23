import { isEmpty } from '@/utils';
import type { ProFormInstance } from '@ant-design/pro-form';
import { useBoolean, useMemoizedFn } from 'ahooks';
import type { NamePath } from 'rc-field-form/es/interface';
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

export type FormOption = {
  /**
   * 初始化值
   */
  value?: any;
  /**
   * 同步变化
   */
  sync?: boolean;
};

export type FormState = [
  RefObject<ProFormInstance>,
  {
    set: (values: any) => void;
    get: (name: NamePath) => void;
    submit: () => void;
    clear: () => void;
    getAll: () => any;
  }
];

export function useForm(option: FormOption = {}): FormState {
  const { value, sync } = option;
  const ref = useRef<ProFormInstance>(null);
  const [ once, { setTrue } ] = useBoolean(false);
  const set = useMemoizedFn((values: any) => {
    ref?.current?.setFieldsValue(values);
  });
  const get = useMemoizedFn((name: NamePath) => {
    return ref?.current?.getFieldValue(name);
  });

  const submit = useMemoizedFn(() => {
    ref?.current?.submit();
  });

  const clear = useMemoizedFn(() => {
    ref?.current?.resetFields();
  });

  const getAll = useMemoizedFn(() => {
    return ref?.current?.getFieldsValue();
  });
  useEffect(() => {
    if (!isEmpty(value)) {
      if (sync) {
        //同步监听
        set(value);
      } else {
        //只进行一次初始化,即数据不为空的情况
        if (!once) {
          set(value);
          setTrue();
        }
      }
    }
  }, [ value ]);

  return [
    ref,
    {
      set,
      get,
      submit,
      clear,
      getAll,
    },
  ];
}
