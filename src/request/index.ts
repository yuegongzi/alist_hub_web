import request from './api';

export default {
  get: (path: string, params = {}): Promise<any> => {
    return request.get(path, { params });
  },
  post: (path: string, rawBody = {}, params = {}): Promise<any> => {
    return request.post(path, rawBody, { params: params });
  },
  put: (path: string, rawBody = {}, params = {}): Promise<any> => {
    return request.put(path, rawBody, { params: params });
  },
  delete: (path: string, params = {}): Promise<any> => {
    return request.delete(path, { params: params });
  },
  upload: (path: string, formData: any, options = {}): Promise<any> => {
    return request.post(path, formData, {
      ...options,
      headers: { 'Content-Type': 'multipart/formdata' },
      timeout: 0,
    });
  },
  axios: request, //暴露底层axios 方便扩展
};
