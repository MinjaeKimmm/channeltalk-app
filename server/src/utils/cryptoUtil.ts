import crypto from 'crypto';
import config from '../config/env';

export function verifySignature(xSignature: string, body: string): boolean {
    const key = crypto.createSecretKey(Buffer.from(config.signingKey, 'hex'));
    const mac = crypto.createHmac('sha256', key);
    mac.update(body, 'utf8');
    return mac.digest('base64') === xSignature;
}