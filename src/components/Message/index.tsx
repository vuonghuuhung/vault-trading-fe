// @ts-nocheck
import { getI18n } from 'react-i18next';

import { message } from 'antd';
import GreatIcon from 'resources/svg/GreatIcon';
import { TYPE_CONSTANTS } from 'constant';

const messageIcon = {
  [TYPE_CONSTANTS.MESSAGE.SUCCESS]: (
    <span className='custom-icon'>
      <GreatIcon />
    </span>
  ),
  [TYPE_CONSTANTS.MESSAGE.ERROR]: undefined,
};

export default function showMessage(msgType, msgContent, objValue?: any) {
  if (typeof document === 'undefined') {
    return;
  }
  message.config({
    maxCount: 1,
  });

  let fieldMsg;
  if (objValue) {
    const key = (Object.keys(objValue) || [])[0];
    const val = objValue[key];
    fieldMsg = {
      [key]: getI18n()?.t(val),
    };
  }

  if (msgContent) {
    message[msgType]({
      // content: getI18n()?.t(msgContent, fieldMsg) || msgContent,
      content: msgContent,
      className: `event-message ${msgType}`,
      duration: 3,
      maxCount: 1,
      icon: messageIcon[msgType],
    });
  }
}
