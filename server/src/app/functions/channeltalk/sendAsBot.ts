import { sendMessage } from '@server/app/services/channeltalk/messageService';
import { messages } from '@server/config/messages';

export async function sendAsBot(channelId: string, groupId: string, broadcast: boolean, rootMessageId?: string) {
  await sendMessage(channelId, groupId, broadcast, rootMessageId, messages.sendAsBotMsg);
}

