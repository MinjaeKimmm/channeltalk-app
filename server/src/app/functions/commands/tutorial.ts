import { messages } from '../../../config/messages';
import config from '../../../config/env';

export function tutorial(wamName: string, callerId: string) {
  return {
    result: {
      type: 'wam',
      attributes: {
        appId: config.appId,
        name: wamName,
        wamArgs: { message: messages.tutorialMsg, managerId: callerId },
      },
    },
  };
}