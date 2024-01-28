export function getValue(
  object?: Record<any, any>,
  key?: string,
  defaultValue: any = ''
): any {
  if (object == null || key == null) {
    return defaultValue;
  }
  if (Object.prototype.toString.call(object) !== '[object Object]') {
    return defaultValue;
  }
  if (key.indexOf('.') > 0) {
    const childKey = key.substring(0, key.indexOf('.'));
    const otherKey = key.substring(key.indexOf('.') + 1);
    const childObject = object[childKey];
    return getValue(childObject, otherKey, defaultValue);
  }
  const value = object[key];
  if (value == null || value === '') {
    return defaultValue;
  }
  return value;
}

function _isInArray(value: any, array: any) {
  return array.indexOf(value) > -1;
}

export function removeItem(obj: any, removeItems: any) {
  return {
    ...Object.keys(obj)
      .filter((item) => !_isInArray(item, removeItems))
      .reduce((newObj, item) => {
        return {
          ...newObj,
          [item]: obj[item],
        };
      }, {}),
  };
}

interface Item {
  label: string;
  value: boolean;
}

// 转换函数
export const toObject = (items: Item[]): Record<string, boolean> => {
  return items.reduce((obj, item) => {
    obj[item.label] = item.value;
    return obj;
  }, {});
};

export type NullableString = string | null | undefined;

function removeEmptyEntries<T extends Record<string, NullableString>>(
  obj: T
): Partial<Record<keyof T, Exclude<T[keyof T], ''>>> {
  return Object.entries(obj).reduce((acc, [ key, value ]) => {
    if (value !== '') {
      // @ts-ignore
      acc[key] = value;
    }
    return acc;
  }, {} as Partial<Record<keyof T, Exclude<T[keyof T], ''>>>);
}
export function sortParam(sort: Record<string, string>) {
  const descend = [];
  const ascend = [];
  for (const sortKey in sort) {
    if (sort[sortKey] === 'ascend') {
      ascend.push(sortKey);
    } else {
      descend.push(sortKey);
    }
  }
  return removeEmptyEntries({ ascs: ascend.join(), descs: descend.join() });
}
