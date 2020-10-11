
// Load environment variables from .env file
import { config as loadEnvConfig } from 'dotenv';
loadEnvConfig();
const env: string = process.env.NODE_ENV || 'local';
const configs:any = {
  base: {
    env,
    name: process.env.APP_NAME || 'signallingserver',
    host: process.env.APP_HOST || '0.0.0.0',
    httpPort: process.env.APP_HTTP_PORT || 3000,
    httpsPort: process.env.APP_HTTPS_PORT || 3443,
    MAX_REQUEST_DELAY: process.env.MAX_REQUEST_DELAY || 5,
  },
  production: {
    MAX_REQUEST_DELAY: process.env.MAX_REQUEST_DELAY || 1,
  },
  staging: {
  },
  development: {},
  test: {
    port: 3001,
  },
  local:{},
};

export const appConfig = Object.assign(configs.base, configs[env]);
