export default [
  {
    layout: false,
    path: '/initial',
    component: './initial',
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
  //app
  {
    path: '*',
    layout: false,
    component: '404',
  },
];
