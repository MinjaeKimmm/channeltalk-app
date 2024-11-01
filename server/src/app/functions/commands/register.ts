import { messages } from '@server/config/messages';
import config from '@server/config/env';

export function register(wamName:string, callerId: string) {
    return {
        result: {
            type: 'wam',
            attributes: {
                appId: config.appId,
                name: wamName,
                wamArgs: {message: messages.registerMsg, managerId: callerId },
            }
        }
    }
}