import { useCallback } from 'react';
import { useSessionStorageState } from './use-session-storage';

/**
 * 将全局状态与Session进行同步保存,页面刷新后状态立即恢复
 * @param name
 * @param defaultState
 */
export function useModelSpace(
  name: string,
  defaultState = {}
): [any, (value: any) => void, () => void] {
  const [ state, setState ] = useSessionStorageState(name, defaultState);
  const save = useCallback((value: any) => {
    setState(value);
  }, []);
  const clear = useCallback(() => {
    setState(defaultState);
  }, []);
  return [ state, save, clear ];
}
