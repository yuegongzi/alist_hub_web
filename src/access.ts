import { isEmpty } from '@/utils';

export default () => {
  return {
    authorized: () => !isEmpty(localStorage.getItem('token')),
  };
};
