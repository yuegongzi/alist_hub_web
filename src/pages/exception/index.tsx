import { Button, Result } from 'antd';

export default () => (
  <Result
    status='500'
    title='500'
    subTitle='服务器走丢了.'
    extra={
      <Button
        type='primary'
        onClick={() => {
          window.location.href = '/';
        }}
      >
        返回首页
      </Button>
    }
  />
);
