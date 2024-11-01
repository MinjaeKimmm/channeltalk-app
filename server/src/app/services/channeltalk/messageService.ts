import axios from 'axios';
import { getChannelToken } from './tokenService';
import config from '@server/config/env';

export async function sendMessage(channelId: string, groupId: string, broadcast: boolean, rootMessageId?: string, message?: string) {
  const [accessToken] = await getChannelToken(channelId);

  const body = {
    method: 'writeGroupMessage',
    params: {
      channelId,
      groupId,
      rootMessageId,
      broadcast,
      dto: { plainText: message || 'Default message', botName: 'Bot' },
    },
  };

  const headers = { 'x-access-token': accessToken, 'Content-Type': 'application/json' };
  await axios.put(config.appStoreUrl, body, { headers });
}
