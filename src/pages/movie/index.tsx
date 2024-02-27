import { api } from '@/constants';
import { useGet } from '@/hooks';
import { createBem, wait } from '@/utils';
import { useInfiniteScroll } from 'ahooks';
import { Card, Col, Divider, Flex, Input, Rate, Row, Spin } from 'antd';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import './index.less';

const [ bem ] = createBem('movie');

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const [ name, setName ] = useState<string | null>(null);
  const { runAsync } = useGet(`${api.movie}?pageSize=36&descs=id`, {
    initialData: [],
    manual: true,
  });
  const {
    data = { list: [], noMore: false, current: 0 },
    loading,
    loadingMore,
    noMore,
    reload,
  } = useInfiniteScroll(
    async (d: any): Promise<any> => {
      const cur = d ? d.current + 1 : 1;
      if (loadingMore) {
        return { list: [], noMore: false, current: d.current };
      }
      await wait(1000);
      const { data }: any = await runAsync({ current: cur, name });
      return { list: data, noMore: data.length < 36, current: cur };
    },
    {
      target: document,
      isNoMore: (d: any) => d?.noMore || false,
    }
  );
  // console.log(data)
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5245/api/v1'
      : process.env.api;
  const onSearch = (value: string) => {
    setName(value);
    reload();
  };
  return (
    <div className={classNames(bem())}>
      <div className={classNames(bem('search'))}>
        <Input.Search
          loading={loading || loadingMore}
          size='large'
          onSearch={onSearch}
          placeholder='请输入电影名称'
          className={classNames(bem('bar'))}
          enterButton
        />
      </div>
      <div className={classNames(bem('content'))} ref={ref}>
        <Row gutter={8}>
          {data.list?.map((poster: any, index: number) => (
            <Col xs={24} sm={12} md={8} lg={4} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    className={classNames(bem('image'))}
                    alt='example'
                    src={`${url}/open/movie/${poster.id}/image`}
                  />
                }
                onClick={() => {
                  window.open(
                    `${location.origin}${poster.path.replace(/\./, '')}`,
                    '_blank'
                  );
                }}
              >
                <Card.Meta
                  title={poster.name}
                  description={
                    <Flex>
                      <Rate
                        className={classNames(bem('rate'))}
                        allowHalf
                        defaultValue={poster.score / 2}
                        disabled
                      />
                      <div className={classNames(bem('score'))}>
                        {poster.score}
                      </div>
                    </Flex>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
        {loadingMore && (
          <Divider dashed>
            <Spin size='large' />
          </Divider>
        )}
        {noMore && <Divider dashed>我是有底线的^_^</Divider>}
      </div>
    </div>
  );
};
