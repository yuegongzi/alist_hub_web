import { api } from '@/constants';
import { useGet } from '@/hooks';
import { createBem } from '@/utils';
import { PageContainer } from '@ant-design/pro-components';
import { Calendar, Card } from 'antd';
import clsx from 'classnames';
import './index.less';

const [ bem ] = createBem('home');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
export default () => {
  const { data } = useGet(api.sign);
  return (
    <PageContainer className={clsx(bem())}>
      <Card>
        <div className={clsx(bem('header'))}>
          <div className={clsx(bem('title'))}>
            {data.subject} {data.blessing}{' '}
          </div>
          <div>本月累计签到: {data.signInCount}天</div>
        </div>
        <Calendar
          cellRender={(current: any) => {
            if (current.$y === year && current.$M === month) {
              if (!data.signInLogs) {
                return null;
              }
              const item = data.signInLogs.filter(
                (item: any) => item.day === current.$D
              )[0];
              if (item.status === 'normal') {
                return (
                  <div className={clsx(bem('item'))}>
                    <img src={item.icon} alt='暂无图片' />
                    <div className={clsx(bem('name'))}>{item.reward.name}</div>
                  </div>
                );
              }
              return <div className={clsx(bem('name'))}>未签到</div>;
            }

            return null;
          }}
        />
      </Card>
    </PageContainer>
  );
};
