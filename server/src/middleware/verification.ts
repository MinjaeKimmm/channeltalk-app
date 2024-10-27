import { verifySignature } from '../utils/cryptoUtil';
import { Request, Response, NextFunction } from 'express';

export function verifyRequest(req: Request, res: Response, next: NextFunction) {
    const signature = req.headers['x-signature'] as string;
    if (!signature || !verifySignature(signature, JSON.stringify(req.body))) {
        return res.status(401).send('Unauthorized');
    }
    next();
}