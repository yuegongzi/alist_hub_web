import { App } from 'antd';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { MessageInstance } from 'antd/lib/message/interface';
import type { NotificationInstance } from 'antd/lib/notification/interface';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

export default () => {
  const fn = App.useApp();
  message = fn.message;
  notification = fn.notification;
  modal = fn.modal;
  return null;
};

export { message, modal, notification };
