import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@channel.io/bezier-react/styles.css';
import './index.css';

// Mock ChannelIOWam for local development
if (!window.ChannelIOWam) {
    console.warn('Mocking ChannelIOWam for local development.');

    window.ChannelIOWam = {
        getWamData: (key: string): string | null => {
            console.log(`Mock getWamData called with key: ${key}`);
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
        }: {
            appId?: string;
            name?: string;
            params?: Record<string, any>;
        } = {}) => {
            console.log(`Mock close called with appId: ${appId}, name: ${name}, params: ${JSON.stringify(params)}`);
        },

        setSize: ({ width, height }: { width: number; height: number }) => {
            console.log(`Mock setSize called with: ${width}x${height}`);
            
            const updateRootSize = () => {
                const root = document.getElementById('root');
                if (root) {
                    root.style.width = `${width}px`;
                    root.style.height = `${height}px`;
                } else {
                    console.warn('Root element not found. Retrying in 100ms...');
                    setTimeout(updateRootSize, 100); // Retry in case root isn't available yet
                }
            };
          
            updateRootSize();
        },

        callFunction: async ({
            appId,
            name,
            params,
        }: {
            appId: string;
            name: string;
            params: Record<string, any>;
        }): Promise<any> => {
            console.log(`Mock callFunction: ${name} with params`, params);
            return Promise.resolve();
        },

        callNativeFunction: async ({
            name,
            params,
        }: {
            name: string;
            params: Record<string, any>;
        }): Promise<any> => {
            console.log(`Mock callNativeFunction: ${name} with params`, params);
            return Promise.resolve();
        },

        callCommand: ({
            appId,
            name,
            params,
        }: {
            appId: string;
            name: string;
            params: Record<string, any>;
        }) => {
            console.log(`Mock callCommand called for appId: ${appId}, name: ${name}, with params:`, params);
        },
    };
}

// Render the React app
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
