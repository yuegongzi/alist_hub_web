import { Button, Result } from 'antd';

export default () => (
  <Result
    status='404'
    title='404'
    subTitle='你访问的页面不存在'
    extra={
      <Button
        type='primary'
        onClick={() => {
          window.location.href = '';
        }}
      >
        返回首页
      </Button>
    }
  />
);
