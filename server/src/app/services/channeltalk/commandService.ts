import axios from 'axios';
import config from '@server/config/env';
import { messages } from '@server/config/messages';

// Register multiple commands with ChannelTalk
export async function registerCommands(accessToken: string) {
  const body = {
    method: 'registerCommands',
    params: {
      appId: config.appId,
      commands: [
        {
          name: 'tutorial',
          scope: 'desk',
          description: 'This is a desk command of App-tutorial',
          actionFunctionName: 'tutorial',
          alfMode: 'disable',
          enabledByDefault: true,
        },
        {
          name: 'register',
          scope: 'desk',
          description: 'Complete your registration',
          actionFunctionName: 'register',
          alfMode: 'disable',
          enabledByDefault: true,
        },
      ],
    },
  };

  const headers = {
    'x-access-token': accessToken,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.put(config.appStoreUrl, body, { headers });

    if (response.data.error) {
      console.error('Error registering commands:', response.data.error);
      throw new Error('Command registration failed');
    }

    console.log('Commands registered successfully');
  } catch (error) {
    console.error('Failed to register commands:', error);
    throw new Error('Command registration failed');
  }
}
