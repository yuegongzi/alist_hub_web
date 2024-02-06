import { createBem } from '@/utils';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const [ bem ] = createBem('monitor-gauge');
const CPUGauge = ({ cpuUsage }: { cpuUsage: number }) => {
  const [ rotation, setRotation ] = useState(0);

  useEffect(() => {
    // 根据CPU使用率计算旋转角度
    const newRotation = (cpuUsage / 100) * 180 - 90;
    setRotation(newRotation);
  }, [ cpuUsage ]);

  return (
    <div className={classNames(bem())}>
      <div className={classNames(bem('container'))}>
        <div
          className={classNames(bem('pointer'))}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <div className={classNames(bem('label'))}>{cpuUsage.toFixed(2)}%</div>
        <div className={classNames(bem('caption'))}>CPU使用率</div>
      </div>
    </div>
  );
};

export default CPUGauge;
