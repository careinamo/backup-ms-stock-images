import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const loadImages = {
  handler: `${handlerPath(__dirname)}/handler.loadImages`,
  timeout: 900,
  url: true,  
  events: [
    {
      http: {
        method: 'post',
        path: 'loadImages',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const getStockImage = {
  handler: `${handlerPath(__dirname)}/handler.getStockImage`,
  timeout: 900,
  events: [
    {
      http: {
        method: 'post',
        path: 'getStockImage',
      },
    },
  ],
};