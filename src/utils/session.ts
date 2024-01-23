import { Base64 } from 'js-base64';

export function isEmpty(value: string | null | undefined): boolean {
  // 判断是否为null、undefined或者空字符串
  if (value == null || value === '') {
    return true;
  }
  // 使用正则表达式匹配任何空白字符（包括空格、制表符、换行符等）
  const blankRegex = /^\s*$/;
  return blankRegex.test(value);
}
export const Session = {
  get: (key: string, defaultValue = {}) => {
    let value;
    try {
      value = sessionStorage.getItem(key);
      if (value == null || isEmpty(value)) {
        return defaultValue;
      }

      return JSON.parse(Base64.decode(value));
    } catch (ex) {
      return defaultValue;
    }
  },
  set: (key: string, value: any) => {
    try {
      sessionStorage.setItem(key, Base64.encode(JSON.stringify(value)));
      // eslint-disable-next-line no-empty
    } catch (ex) {}
  },
  clear: () => {
    try {
      sessionStorage.clear();
      // eslint-disable-next-line no-empty
    } catch (ex) {}
  },
  remove: (key: string) => {
    try {
      sessionStorage.removeItem(key);
      // eslint-disable-next-line no-empty
    } catch (ex) {}
  },
};

function createSession(namespace: string) {
  return (state: any) => {
    Session.set(namespace, state);
    return state;
  };
}

function removeSession(namespace: string) {
  return (state: any) => {
    Session.remove(namespace);
    return state;
  };
}

export function createNamespace(namespace: string, defaultState = {}) {
  const state = Session.get(namespace, defaultState);
  return [
    state,
    {
      cache: createSession(namespace),
      remove: removeSession(namespace),
    },
  ];
}
