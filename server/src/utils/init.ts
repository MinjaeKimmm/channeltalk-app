import { getChannelToken } from '@server/app/services/channeltalk/tokenService';
import { registerCommands } from '@server/app/services/channeltalk/commandService';

export async function initialize(): Promise<void> {
    try {
        const [accessToken] = await getChannelToken('');
        await registerCommands(accessToken);
        console.log('Commands registered successfully.');
    } catch (error) {
        console.error('Initialization failed:', error);
        process.exit(1); // Exit if initialization fails
    }
}
