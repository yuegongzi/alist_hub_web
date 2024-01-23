export const Storage = {
  get: (key: string) => {
    let value;
    try {
      value = localStorage.getItem(key);
      if (value == null) {
        return null;
      }
      return JSON.parse(value);
    } catch (ex) {
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
      localStorage.setItem(key, JSON.stringify(value));
    } catch (ex) {
      console.error(ex);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (ex) {
      console.error(ex);
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (ex) {
      console.error(ex);
    }
  },
};
