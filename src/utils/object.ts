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
