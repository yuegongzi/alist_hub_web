import zhCN from 'antd/locale/zh_CN';
import layout from './defaultSettings';
import routes from './routes';

export default {
  hash: true,
  antd: {
    configProvider: {
      locale: zhCN, //中文语言
      input: { autoComplete: 'off' }, //关闭浏览器记忆功能
      componentSize: 'middle', //组件大小
    },
  },
  request: {},
  initialState: {},
  model: {},
  layout: {
    locale: false,
    ...layout,
  },

  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: false,
  },
  targets: {
    // ie: 11,
  },
  lessLoader: {
    modifyVars: {
      'root-entry-name': 'default',
    },
  },
  routes,
  access: {},
  // ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  base: '/@hub/',
  publicPath: '/@hub/',
  define: {
    'process.env.api': 'http://localhost/api/v1',
  },
  // Fast Refresh 热更新
  fastRefresh: true,
  favicons: [ layout.logo ],
  npmClient: 'yarn',
  proxy: {
    '/api/v1': {
      target: 'http://localhost:5245',
      changeOrigin: true,
    },
    '/api/': {
      target: 'http://localhost:5244',
      changeOrigin: true,
    },
  },
};
