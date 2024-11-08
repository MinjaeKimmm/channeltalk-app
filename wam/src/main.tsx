import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@channel.io/bezier-react/styles.css';
import './index.css';

// Only extend mock functionality if we're in development
if (window.location.hostname === 'localhost' && window.ChannelIOWam) {
    console.warn('Extending mock ChannelIOWam for local development');
    
    Object.assign(window.ChannelIOWam, {
        setSize: ({ width, height }: { width: number; height: number }) => {
            console.log(`Mock setSize called with: ${width}x${height}`);
            const updateRootSize = () => {
                const root = document.getElementById('root');
                if (root) {
                    root.style.width = `${width}px`;
                    root.style.height = `${height}px`;
                } else {
                    console.warn('Root element not found. Retrying in 100ms...');
                    setTimeout(updateRootSize, 100);
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
            console.log(`Mock callFunction of ${appId}: ${name} with params`, params);

            if (name === 'createUser') {
                return { result: { message: `Hello ${params.input.name}, your account has been created!` } };
            } else if (name === 'sendAsBot') {
                return { result: { message: `Bot message sent to group ${params.input.groupId}` } };
            }

            return { result: null };
        },

        callNativeFunction: async ({
            name,
            params,
        }: {
            name: string;
            params: Record<string, any>;
        }): Promise<any> => {
            console.log(`Mock callNativeFunction: ${name} with params`, params);

            if (name === 'writeGroupMessageAsManager') {
                return { result: { message: `Manager message sent to group ${params.groupId}` } };
            }

            return Promise.resolve({ result: null });
        },
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);