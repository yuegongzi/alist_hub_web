import { parse } from 'qs';

export function isPositiveInteger(number: number | string): boolean {
  if (number != null && number.toString().length > 15) {
    return false;
  }
  const re = /^\+?[1-9]+[0-9]{0,15}$/; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
  return re.test(number.toString());
}

function _convertIntArray(value: any): number[] | any {
  if (Array.isArray(value)) {
    return value.map((v) => (isPositiveInteger(v) ? parseInt(v, 10) : v));
  }
  return isPositiveInteger(value) ? parseInt(value, 10) : value;
}

function _jsonParse(params: Record<string, any>): Record<string, any> {
  const filterList: Record<string, any> = {};
  for (const key in params) {
    if (params[key] != null && params[key] !== '') {
      const value = params[key];
      const _value = _convertIntArray(value);
      filterList[key] = _value == null ? value : _value;
    }
  }
  return filterList;
}

export function getQuery(): Record<string, any> {
  const queryString = window.location.href.split('?')[1];
  const obj = parse(queryString, { allowSparse: true });
  return _jsonParse(obj);
}

export function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch (_) {
    return false;
  }
}
