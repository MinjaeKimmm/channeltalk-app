import app from './src/server';
import config from './src/config/env';
import { initialize } from './src/utils/init'

async function startServer() {
    try {
        await initialize();

        app.listen(config.port, () => {
            console.log(`Server running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
}

startServer();