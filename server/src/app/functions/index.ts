import { register, tutorial } from './commands';
import { sendAsBot } from './channeltalk';

export async function functionHandler(body: any) {
    const { method, context, params } = body;
    const callerId = context.caller.id;
    const channelId = context.channel.id;

    switch (method) {
        // Command functions
        case 'register':
            return register('register', callerId);
        case 'tutorial':
            return tutorial('tutorial', callerId);


        // Channeltalk functions
        case 'sendAsBot':
            const { groupId, broadcast, rootMessageId }  = params.input;
            await sendAsBot(channelId, groupId, broadcast, rootMessageId);
            return { result: {} };
            
        default:
            throw new Error('Unknown command');
    }
}
