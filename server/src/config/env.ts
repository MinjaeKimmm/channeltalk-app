import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    appSecret: process.env.APP_SECRET ?? '',
    appId: process.env.APP_ID ?? '',
    signingKey: process.env.SIGNING_KEY ?? '',
    appStoreUrl: process.env.APPSTORE_URL ?? '',
    
};

export default config