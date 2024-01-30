import { api } from '@/constants';
import { useGet, usePost } from './use-request';

export function useSetting(
  key: string
): [any, (...params: any) => Promise<any>, boolean] {
  const get = useGet(`${api.setting}/get?key=${key}`);
  const update = usePost(`${api.setting}/save`, { tip: 'all', manual: true });
  const run = async (value: any) => {
    await update.runAsync([
      {
        ...get.data,
        value,
      },
    ]);
    await get.runAsync();
  };
  return [ get.data.value, run, get.loading && update.loading ];
}
