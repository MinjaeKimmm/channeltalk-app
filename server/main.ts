import app from '@server/server';
import config from '@server/config/env';
import { initialize } from '@server/utils/init'

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