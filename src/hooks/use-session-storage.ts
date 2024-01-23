import { useSessionStorageState as useSession } from 'ahooks';
import { Base64 } from 'js-base64';

/**
 * 增加加解密方法 采用简易的base64加密
 * @param key
 * @param defaultValue
 */
export function useSessionStorageState<T>(
  key: string,
  defaultValue: any
): [T, (value: T) => void] {
  const [ state, setState ] = useSession<T>(key, {
    defaultValue,
    serializer: (value: any) => {
      return Base64.encode(JSON.stringify(value));
    },
    deserializer: (value: string) => {
      return JSON.parse(Base64.decode(value));
    },
  });
  return [ state, setState ];
}
