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
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './home',
  },
  {
    name: '存储',
    path: '/storage',
    component: './storage',
  },
  {
    name: '站点',
    path: '/alist',
    component: './alist',
  },
  {
    name: '个人设置',
    path: '/account/setting',
    component: './account/setting',
  },
  //app
  {
    path: '*',
    layout: false,
    component: '404',
  },
];
