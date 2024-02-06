import { api } from '@/constants';
import { useGet } from '@/hooks';
import { createBem } from '@/utils';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';
import classNames from 'classnames';
import React from 'react';
import CPUGauge from './components/CPUGauge';
import CPUTemperatureGauge from './components/CPUTemperatureGauge';
import DiskSpaceGauge from './components/DiskSpaceGauge';
import MemoryUsageGauge from './components/MemoryUsageGauge';
import NetworkThroughput from './components/NetworkThroughput';
import SystemStatus from './components/SystemStatus';
import './index.less';

const [ bem ] = createBem('monitor');

const MonitorPage: React.FC = () => {
  const { data } = useGet(api.system_info, { pollingInterval: 5000 });
  return (
    <PageContainer className={classNames(bem())}>
      <Card title='系统状态' style={{ marginBottom: 20 }}>
        <Row>
          <Col offset={2} span={4}>
            <CPUGauge cpuUsage={data.cpuLoaded || 0} />
          </Col>
          <Col span={4}>
            <CPUTemperatureGauge
              cpuTemperature={data.sensors?.cpuTemperature || 20}
            />
          </Col>
          <Col span={4}>
            {' '}
            <DiskSpaceGauge
              totalSpace={data.diskTotal}
              usedSpace={data.diskUsed}
            />
          </Col>
          <Col span={4}>
            {' '}
            <MemoryUsageGauge
              freeMemory={data.memoryAvailable}
              totalMemory={data.memoryTotal}
            />
          </Col>
          <Col span={4}>
            {' '}
            <NetworkThroughput
              sent={data.bytesSend}
              received={data.bytesRecv}
            />
          </Col>
        </Row>
      </Card>
      <SystemStatus
        appVersion={data.version}
        systemName={data.osName}
        startupTime={data.uptime}
      />
    </PageContainer>
  );
};

export default MonitorPage;
