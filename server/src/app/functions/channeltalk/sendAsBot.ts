import { sendMessage } from '../../services/channeltalk/messageService';

export async function sendAsBot(channelId: string, groupId: string, broadcast: boolean, rootMessageId?: string) {
  await sendMessage(channelId, groupId, broadcast, rootMessageId, 'This is a test message sent by the bot.');
}

