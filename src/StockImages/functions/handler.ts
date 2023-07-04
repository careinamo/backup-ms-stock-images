import { imagesService } from '../application';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from '../functions/schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const images =  await imagesService.fetchImagesFromApis();

  return formatJSONResponse({
    images
  });
};

export const main = middyfy(hello);
