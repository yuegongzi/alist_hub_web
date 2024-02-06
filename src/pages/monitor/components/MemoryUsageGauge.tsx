import { bytesToGB, createBem } from '@/utils';
import classNames from 'classnames';

const [ bem ] = createBem('monitor-memory');
const MemoryUsageGauge = ({
  totalMemory,
  freeMemory,
}: {
  totalMemory: number;
  freeMemory: number;
}) => {
  const usedMemoryPercentage = ((totalMemory - freeMemory) / totalMemory) * 100;

  return (
    <div className={classNames(bem())}>
      <div className={classNames(bem('gauge'))}>
        <div
          className={classNames(bem('used-memory'))}
          style={{ height: `${usedMemoryPercentage}%` }}
        />
        <div className={classNames(bem('label'))}>
          <div className={classNames(bem('usage-percentage'))}>
            {usedMemoryPercentage.toFixed(2)}%
          </div>
          <div className={classNames(bem('total-memory'))}>
            {bytesToGB(totalMemory)}GB
          </div>
        </div>
        <div className={classNames(bem('caption'))}>内存使用</div>
      </div>
    </div>
  );
};

export default MemoryUsageGauge;
