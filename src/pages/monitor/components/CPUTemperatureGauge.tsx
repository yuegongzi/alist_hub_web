import { createBem } from '@/utils';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const [ bem ] = createBem('monitor-temperature');
const CPUTemperatureGauge = ({
  cpuTemperature,
}: {
  cpuTemperature: number;
}) => {
  const [ waveAmplitude, setWaveAmplitude ] = useState(10);

  useEffect(() => {
    // 根据 CPU 温度调整波浪线振幅
    const newWaveAmplitude = Math.min(10, cpuTemperature / 10);
    setWaveAmplitude(newWaveAmplitude);
  }, [ cpuTemperature ]);

  return (
    <div className={classNames(bem())}>
      <div className={classNames(bem('gauge'))}>
        <div
          className={classNames(bem('wave'))}
          style={{ backgroundSize: `100% ${waveAmplitude}%` }}
        />
        <div className={classNames(bem('label'))}>{cpuTemperature}°C</div>
        <div className={classNames(bem('caption'))}>CPU温度</div>
      </div>
    </div>
  );
};

export default CPUTemperatureGauge;
