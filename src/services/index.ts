import Ask from '@/request';
import { sortParam } from '@/utils';
import qs from 'qs';

export const request = async (
  path: string,
  params: any,
  sort: any,
  filter: any
) => {
  qs.stringify(filter, { arrayFormat: 'repeat' });
  return await Ask.get(path, { ...params, ...sortParam(sort) });
};
