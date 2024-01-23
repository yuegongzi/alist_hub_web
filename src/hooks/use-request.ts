import { getValue } from '@/utils';
import { useRequest } from 'ahooks';
import type { Options } from 'ahooks/lib/useRequest/src/types';
import { message } from 'antd';
import Ask from '../request';

export type Response = {
  code: number;
  message: string;
  data?: any;
  pagination?: Record<string, any>;
};

export interface Option<TData, TParams extends any[]>
  extends Options<TData, TParams> {
  tip?: string;
  initialData?: any;
}
/**
 *
 * @param service
 * @param options
 */
const useAsk = (service: any, options: Option<any, any> = { tip: 'none' }) => {
  /**
   * 对响应数据进行处理消息提示
   * @param response
   * @param params
   */
  const onFilter = (response: Response, params: any) => {
    const { code } = response;
    const { tip = 'none', onSuccess } = options;
    const success = code === 200;
    switch (tip) {
      case 'success':
        if (success) {
          message.success('成功');
        }
        break;
      case 'error':
        if (!success) {
          message.error(response.message);
        }
        break;
      case 'all':
        if (success) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
        break;
      default:
        break;
    }
    if (success) {
      onSuccess?.(response, params);
    }
  };

  const { data, ...other } = useRequest<Response, any>(service, {
    ...options,
    onSuccess: onFilter,
  });
  const initData = options.initialData ? options.initialData : {};
  const success = getValue(data, 'code') === 200;
  return {
    code: data?.code,
    message: data?.message,
    data: success ? data?.data : initData,
    pagination: data?.pagination || {},
    ...other,
  };
};

export const usePost = (path: string, options?: Option<any, any>) =>
  useAsk(
    (rawBody: any, urlParams: any) => Ask.post(path, rawBody, urlParams),
    options
  );

export const usePut = (
  path: string,
  options: Option<any, any> = { manual: true, tip: 'all' }
) =>
  useAsk(
    (rawBody: any, urlParams: any) => Ask.put(path, rawBody, urlParams),
    options
  );

export const useGet = (path: string, options?: Option<any, any>) =>
  useAsk((payload: any) => Ask.get(path, payload), options);

export const useDelete = (
  path: string,
  options: Option<any, any> = { manual: true, tip: 'all' }
) => useAsk((payload: any) => Ask.delete(path, payload), options);
