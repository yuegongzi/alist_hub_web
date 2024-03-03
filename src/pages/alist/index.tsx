import { createBem } from '@/utils';
import { useModel } from '@umijs/max';
import clsx from 'classnames';
import './index.less';
import { useGet } from '@/hooks';
import { api } from '@/constants';

const [ bem ] = createBem('alist');

export default () => {
  const [ state ] = useModel('search');
  const { code } = useGet(api.authorized);
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost'
      : location.origin;
  if (code != 200) {
    return null;
  }
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
