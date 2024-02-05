import { createBem } from '@/utils';
import { useModel } from '@umijs/max';
import clsx from 'classnames';
import './index.less';

const [ bem ] = createBem('alist');

export default () => {
  const [ state ] = useModel('search');
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost'
      : location.origin;
  return (
    <div className={clsx(bem())}>
      <iframe
        allowFullScreen
        src={`${url}${state.path}`}
        className={clsx(bem('iframe'))}
      />
    </div>
  );
};
