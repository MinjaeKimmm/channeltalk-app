import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { requestIssueToken, registerCommand, sendAsBot, tutorial, register, verification } from './util';


require("dotenv").config();

const app = express();

async function startServer() {
    const [accessToken, refreshToken, expiresAt]: [string, string, number] = await requestIssueToken();
    await registerCommand(accessToken);
}

async function functionHandler(body: any) {
    const method = body.method;
    const callerId = body.context.caller.id;
    const channelId = body.context.channel.id;

    switch (method) {
        case 'tutorial':
            return tutorial('tutorial', callerId);
        case 'register':
            return register('register', callerId);
        case 'sendAsBot':
            await sendAsBot(
                channelId,
                body.params.input.groupId,
                body.params.input.broadcast,
                body.params.input.rootMessageId
            );
            return ({result: {}});
        default:
            throw new Error('Unknown method');
    }
}

async function server() {
    try {
        await startServer();

        app.use(express.json());
        app.use(
            `/wam/:wamName`,
            (req: Request, res: Response, next: NextFunction) => {
              const { wamName } = req.params;
              console.log(`Serving WAM: ${wamName}`);
              next();
            },
            express.static(path.join(__dirname, '../../wam/dist')) // Serve the bundled WAM assets
          );

        app.put('/functions', (req: Request, res: Response) => {
            if (typeof req.headers['x-signature'] !== 'string' || verification(req.headers['x-signature'], JSON.stringify(req.body)) === false) {
                res.status(401).send('Unauthorized');
            }
            functionHandler(req.body).then(result => {
                res.send(result);
            });
        });
        
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at http://localhost:${process.env.PORT}`);
        });
    } catch (error: any) {
        console.error('Error caught:', error);
    }
}

export { server };
