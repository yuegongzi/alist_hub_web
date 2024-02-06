export default [
  {
    layout: false,
    path: '/initial',
    component: './initial',
  },
  {
    layout: false,
    path: '/login',
    component: './login',
  },
  {
    layout: false,
    path: '/exception/500',
    component: './exception',
  },
  {
    path: '/',
    redirect: '/alist',
  },
  {
    name: '首页',
    path: '/alist',
    component: './alist',
  },
  {
    name: '签到',
    path: '/home',
    component: './home',
  },
  {
    name: '存储',
    path: '/storage',
    component: './storage',
  },
  {
    name: '转存',
    path: '/watcher',
    component: './watcher',
  },
  {
    name: '个人设置',
    path: '/account/setting',
    component: './account/setting',
  },
  {
    name: '监控',
    path: '/monitor',
    component: './monitor',
  },
  //app
  {
    path: '*',
    layout: false,
    component: '404',
  },
];
