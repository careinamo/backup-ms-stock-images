import { stockImageController } from "../infrastructure/dependencies";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from '../functions/schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const images =  await stockImageController.requestImage(event);

  return formatJSONResponse(images);
};

export const loadImages = middyfy(hello);


const useImage: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {

  const images =  await  stockImageController.requestImage2(event);

  return formatJSONResponse(images);
};

export const getStockImage = middyfy(useImage);