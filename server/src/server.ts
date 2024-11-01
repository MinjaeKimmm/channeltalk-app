import express from 'express';
import { verifyRequest } from './middleware/verification';
import { functionHandler } from './app/functions';
import apiRouter from './app/api';
import path from 'path';

import config from './config/env'

const app = express();

app.use(express.json());

app.use(
    '/wam/:wamName',
    (req, res, next) => {
        console.log(`Servicing WAM: ${req.params.wamName}`);
        next();
    },
    express.static(path.join(__dirname, '../../wam/dist'))
);

app.use('/api', apiRouter);

app.put('/functions', verifyRequest, async (req, res) => {
    try {
        const result = await functionHandler(req.body);
        res.json(result);
    } catch (error) {
        console.error('Error executing function:', error);
        res.status(500).json({ error: 'Failed to execute function' });
    }
});

export default app;