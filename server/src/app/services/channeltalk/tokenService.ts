import axios from 'axios';
import config from '@server/config/env';

let channelTokenMap = new Map<string, [string, string, number]>();

export async function getChannelToken(channelId: string): Promise<[string, string]> {
    const channelToken = channelTokenMap.get(channelId);

    if (channelToken === undefined || channelToken[2] < Date.now() / 1000) {
        try {
            const [accessToken, refreshToken, expiresAt] = await requestIssueToken(channelId);
            channelTokenMap.set(channelId, [accessToken, refreshToken, expiresAt]);
            return [accessToken, refreshToken];
        } catch (error) {
            handleError(error, `Failed to fetch token for channel ${channelId}`);
            throw new Error('Unable to get channel token.');
        }
    } else {
        return [channelToken[0], channelToken[1]];
    }
}

async function requestIssueToken(channelId?: string): Promise<[string, string, number]> {
    const body = {
        method: 'issueToken',
        params: {
            secret: config.appSecret,
            channelId: channelId || null,
        },
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const { data } = await axios.put(config.appStoreUrl, body, { headers });

        if (!data || !data.result) {
            console.error('Invalid response from API:', data);
            throw new Error('Invalid response structure from ChannelTalk API.');
        }

        const { accessToken, refreshToken, expiresIn } = data.result;
        const expiresAt = Date.now() / 1000 + expiresIn - 5;

        return [accessToken, refreshToken, expiresAt];
    } catch (error) {
        handleError(error, 'Error requesting token');
        throw new Error('Failed to issue token. Check API endpoint or credentials.');
    }
}

function handleError(error: unknown, message: string): void {
    if (axios.isAxiosError(error)) {
        console.error(`${message}:`, error.response?.data || error.message);
    } else if (error instanceof Error) {
        console.error(`${message}:`, error.message);
    } else {
        console.error(`${message}:`, error);
    }
}
