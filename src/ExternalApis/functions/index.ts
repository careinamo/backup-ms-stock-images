import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const getExternalImage = {
  handler: `${handlerPath(__dirname)}/handler.getExternalImage`,
  timeout: 900,
  events: [
    {
      http: {
        method: 'post',
        path: 'searchImage',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

export const useExternalImage = {
  handler: `${handlerPath(__dirname)}/handler.useExternalImage`,
  timeout: 900,
  events: [
    {
      http: {
        method: 'post',
        path: 'useExternalImage',
      },
    },
  ],
};