export function initializeMock() {
    if (!window.ChannelIOWam) {
        console.warn('Mocking ChannelIOWam for local development.');

        window.ChannelIOWam = {
            getWamData: (key: string): string | null => {
                const mockData: Record<string, string> = {
                    appearance: 'light',
                    chatTitle: 'Mocked Chat Title',
                    appId: 'mock-app-id',
                    channelId: 'mock-channel-id',
                    managerId: 'mock-manager-id',
                    message: 'Hello from the mock!',
                    chatId: 'mock-chat-id',
                    chatType: 'group',
                    broadcast: 'false',
                    rootMessageId: 'mock-root-message-id',
                };
                return mockData[key] ?? null;
            },
            close: ({
                appId = 'mock-app-id',
                name = 'mock-name',
                params = {},
            }: { appId?: string; name?: string; params?: Record<string, any> } = {}) => {
                console.log(`Mock close called with appId: ${appId}, name: ${name}, params: ${JSON.stringify(params)}`);
            },
            setSize: ({ width, height }) => {
                console.log(`Mock setSize called with: ${width}x${height}`);
                const updateRootSize = () => {
                    const root = document.getElementById('root');
                    if (root) {
                        root.style.width = `${width}px`;
                        root.style.height = `${height}px`;
                    } else {
                        setTimeout(updateRootSize, 100);
                    }
                };
                updateRootSize();
            },
            callFunction: async ({ appId, name, params }) => {
                console.log(`Mock callFunction of ${appId}: ${name} with params`, params);
                if (name === 'createUser') {
                    return { result: { message: `Hello ${params.input.name}, your account has been created!` } };
                }
                return { result: null };
            },
            callNativeFunction: async ({ name, params }) => {
                console.log(`Mock callNativeFunction: ${name} with params`, params);
                return Promise.resolve({ result: null });
            },
            callCommand: ({ appId, name, params }) => {
                console.log(`Mock callCommand called for appId: ${appId}, name: ${name}, with params:`, params);
            },
        };
    }
}