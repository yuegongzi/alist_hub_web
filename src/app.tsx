import { Footer, Logout } from '@/components';
import { createNamespace, getValue } from '@/utils';
import type { RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<any> {
  const [ state, { cache } ] = createNamespace('@@initialState', {});
  return cache({ ...state, settings: defaultSettings });
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  const collapsed: boolean = getValue(initialState, 'collapsed', false);
  return {
    ...initialState.settings,
    menu: {
      locale: false,
    },
    onCollapse: (collapsed: boolean) => {
      setInitialState({ ...initialState, collapsed });
    },
    footerRender: () => <Footer />,
    menuFooterRender: () => <Logout collapsed={collapsed} />,
  };
};
