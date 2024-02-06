import { createBem, kbToGB } from '@/utils';
import classNames from 'classnames';

const [ bem ] = createBem('monitor-space');
const DiskSpaceGauge = ({
  totalSpace,
  usedSpace,
}: {
  totalSpace: number;
  usedSpace: number;
}) => {
  const freeSpace = totalSpace - usedSpace;
  const usedSpacePercentage = (usedSpace / totalSpace) * 100;

  return (
    <div className={classNames(bem())}>
      <div className={classNames(bem('gauge'))}>
        <div
          className={classNames(bem('used-space'))}
          style={{ width: `${usedSpacePercentage}%` }}
        />
        <div className={classNames(bem('label'))}>
          <span className={classNames(bem('total-space'))}>
            {kbToGB(totalSpace)}GB
          </span>
          <span>{kbToGB(freeSpace)}GB</span>
        </div>
        <div className={classNames(bem('caption'))}>硬盘空间</div>
      </div>
    </div>
  );
};

export default DiskSpaceGauge;
