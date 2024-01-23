/**
 * 基础请求工具 完成如下功能
 * - 基础路径设置
 * - 授权凭证注入
 * - 统一错误页面处理
 * - 统一超时设定30秒
 * - 处理url restfull风格参数替换
 */
import { debounce, getValue, Session, Storage } from '@/utils';
import axios from 'axios';
import { parse, stringify } from 'qs';

const AUTH_TOKEN = 'token';

const redirectTo = debounce(function () {
  let path = '/login';
  const query = parse(window.location.href.split('?')[1]);
  const redirect = stringify({
    ...query,
    redirect: window.location.href,
  });
  if (path.indexOf('http') === 0) {
    // http开头
    window.location.href = `${path}?${redirect}`;
  } else {
    if (path.indexOf('?') > 0) {
      path = path.substring(0, path.indexOf('?'));
    }
    if (window.location.pathname === path) {
      return;
    }
    location.href = `${path}?${redirect}`;
  }
}, 500);

const api = axios.create({
  baseURL: `${location.origin}`,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  async (config) => {
    const { url = '', params = {} } = config;
    const { path, urlParams } = analysis(url, params);
    config.url = path;
    config.params = urlParams;
    if (path.indexOf('http') === 0) {
      // 使用其他http请求路径时 直接返回
      return config;
    }
    if (path.indexOf('/open/') <= 0 && path.indexOf('/login') < 0) {
      // 如果路径不以'/open/'开头且不包含'/login'
      const token = Storage.get(AUTH_TOKEN); // 获取token
      config.headers.set('Authorization', token); // 设置请求头的Authorization为获取到的token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = getValue(error, 'response.status');
    const message = error.message;
    if (status === 401) {
      Storage.clear();
      Session.clear();
      redirectTo();
      return Promise.reject('鉴权失败');
    }
    if (status === 403) {
      //未进行初始化 禁止访问
      location.pathname = '/initial';
      return Promise.reject('权限不足');
    }
    if (status <= 504 && status > 500) {
      location.pathname = '/exception/500';
      return Promise.reject('服务器异常');
    }
    if (status >= 404 && status < 422) {
      return Promise.reject(getValue(error, 'response.data.message', message));
    }
    return Promise.reject(message);
  }
);

/**
 * 参数解析
 * @param url 路径
 * @param params 参数
 */
function analysis(url: string, params: Record<any, any>) {
  const urlParams: Record<string, any> = {};
  for (const key of Object.keys(params)) {
    // 处理url中需要替换的资源部分
    const symbol = `:${key}`;
    if (url.includes(symbol)) {
      const replacement = params[key];
      url = url.replace(symbol, replacement);
      delete params[key]; // 更新传入的params而不是创建一个新对象
      urlParams[key] = replacement; // 保留被替换的键值对
    }
  }
  return { path: url, urlParams };
}

export default api;
