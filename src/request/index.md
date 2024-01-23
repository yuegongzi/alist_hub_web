---
title: Ask 请求
group:
  title: 工具
  order: 100
---

封装 `axios` 简化使用

## 何时使用

- 需要向服务端发起请求时使用

## 封装内容

- 基础路径设置`process.env.api`
- 请求签名处理
- 授权凭证注入
- 自动刷新授权
- 统一错误页面处理(`401 500 403`)
- 统一超时设定 30 秒
- 处理 url `restfull`风格参数替换

## 使用说明

- `path`为相对路径时,会自动补齐完整路径并完成签名、授权的封装,如果为**完整的路径**时则会跳过
- 支持 `/abc/:id` 形式的路径 当 urlParams 中携带`id`作为 key 时会进行替换成实际的值 <br/>
  如 `/abc/:id` urlParams = `{id:5,name:'foo'}` 实际请求时会处理成 `https://api.xxx.com/abc/5?name=foo`

## 如何自定义请求

可以通过`Ask.axios`进行 axios 相关的请求,包括自定义 header 等具体参见[文档](https://github.com/axios/axios)
封装的内容依然会执行

## 代码演示

```jsx
import React from "react";
import { Ask } from "core-web";
import { Button } from "antd";

export default () => (
  <div>
    <Button
      onClick={async () => {
        const data = await Ask.get("/resource/cgi/region.json");
        console.log(data);
      }}
    >
      测试
    </Button>
  </div>
);
```

### Returns

`Promise<any>`

## API

- get

| 参数      | 说明          | 类型   | 默认值 |
| --------- | ------------- | ------ | ------ |
| path      | 请求路径      | string | -      |
| urlParams | 携带 url 参数 | Object | -      |

- post

| 参数      | 说明              | 类型   | 默认值 |
| --------- | ----------------- | ------ | ------ |
| path      | 请求路径          | string | -      |
| rawBody   | 携带 rawBody 参数 | Object | -      |
| urlParams | 携带 url 参数     | Object | -      |

- put

| 参数      | 说明              | 类型   | 默认值 |
| --------- | ----------------- | ------ | ------ |
| path      | 请求路径          | string | -      |
| rawBody   | 携带 rawBody 参数 | Object | -      |
| urlParams | 携带 url 参数     | Object | -      |

- delete

| 参数      | 说明          | 类型   | 默认值 |
| --------- | ------------- | ------ | ------ |
| path      | 请求路径      | string | -      |
| urlParams | 携带 url 参数 | Object | -      |

- upload

| 参数             | 说明               | 类型     | 默认值 |
| ---------------- | ------------------ | -------- | ------ |
| path             | 请求路径           | string   | -      |
| formData         | 携带 formData 参数 | Object   | -      |
| urlParams        | 携带 url 参数      | Object   | -      |
| onUploadProgress | 上传进度           | Function | -      |
