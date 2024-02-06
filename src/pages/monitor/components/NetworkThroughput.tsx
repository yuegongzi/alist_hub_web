import { bytesToGB, createBem } from '@/utils';
import { GlobalOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';

const [ bem ] = createBem('monitor-network');

interface NetworkThroughputProps {
  received: number;
  sent: number;
}

const NetworkThroughput: React.FC<NetworkThroughputProps> = ({
  received,
  sent,
}) => {
  const totalData = received + sent;
  const gaugeValue = (received / totalData) % 100; // 将累计数据限制在 0 到 100 之间
  return (
    <div className={classNames(bem())}>
      <div className={classNames(bem('container'))}>
        <div className={classNames(bem('circle-gauge'))}>
          <div
            className={classNames(bem('circle-gauge-fill'))}
            style={{ transform: `rotate(${gaugeValue * 3.6}deg)` }}
          />
          <div className={classNames(bem('circle-gauge-text'))}>
            {bytesToGB(totalData)} GB
            <GlobalOutlined className='anticon-global' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkThroughput;
