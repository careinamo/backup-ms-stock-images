import { externalApisController } from "../infrastructure/dependencies";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, status200Response } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from '../functions/schema';

const getExternalImageByGroupName: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const response =  await externalApisController.getExternalImage(event);

  return formatJSONResponse(response);
};

export const getExternalImage = middyfy(getExternalImageByGroupName);

const useImage: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {

  await externalApisController.useImage(event);

  return status200Response();
};

export const useExternalImage = middyfy(useImage);
