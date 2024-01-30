import { createBem } from '@/utils';
import clsx from 'classnames';
import './index.less';

const [ bem ] = createBem('alist');

export default () => {
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost'
      : location.origin;
  return (
    <div className={clsx(bem())}>
      <iframe src={url} className={clsx(bem('iframe'))} />
    </div>
  );
};
