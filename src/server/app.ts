import { appConfig } from '@config';
import { logger } from '@utils';

import 'reflect-metadata';

import {
  TestController,
  ProfileController,
  MetarController
} from '@app/controllers';

import {
  useContainer as useRoutingContainer,
  useExpressServer as setApplicationConfig,
} from 'routing-controllers';

import { Container } from 'typedi';

import {
  useContainer as useOrmContainer,
} from 'typeorm';

// import {
//   JWTMiddleware
// } from '@app/middlewares';

// import { SignallingServer } from './signallingServer';

import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as WebSocket from 'ws';
import express from 'express';

const controllers = [
  TestController,
  ProfileController,
  MetarController
];

// const middlewares = [
//   JWTMiddleware
// ];

export class Application {

  private static instance: Application = new Application();
  private server: http.Server;


  // private signaler: SignallingServer;
  
  constructor() {

    if (Application.instance) {
      return Application.instance
    }
    Application.instance = this
  }

  async start() {

    useRoutingContainer(Container);

    useOrmContainer(Container);
    
    // try {
    //   await createDatabaseConnection();
    // } catch (e) {
    //   console.log(e);
    //   throw e;
    // }

    const cors = {
      origin: '*',
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      exposeHeaders: ['X-Request-Id'],
    };

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    setApplicationConfig(app, {
      cors,
      controllers,
    //   middlewares,
      routePrefix: '/api',
      defaultErrorHandler: false,
    });

    try {
      this.server = http.createServer(app);
      this.server.listen(appConfig.httpPort, appConfig.host, serverStartListener);
    } catch (e) {
      console.log(e);
    }

    const tempServer = this.server;

    const wss = new WebSocket.Server({ 
      server: this.server,
    });

    return { app, server: this.server };
  }; 
};

const serverStartListener = async () => {
  logger.info(`Server running on ${appConfig.host}:${appConfig.httpPort}`);
};

export const application = new Application();
application.start();