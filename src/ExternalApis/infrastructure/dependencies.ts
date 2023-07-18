import { ExternalApisService } from '../application/ExternalApisService';
import { ExternalApisController } from "./rest-api/external-apis-controller";
import ClientsDynamoDB from '../infrastructure/clientsDynamoDB.datasource';
import ImagesDynamoDB from '../infrastructure/imagesDynamoDB.datasource';
import { SearchImageService } from '../application/SearchImageService';
import PexelsFindImageStrategy from '../application/PexelsFindImageStrategy';
import { ApiPexelsClient } from './httpsCalls/ApiPexelsClient';

const clientsRepository = new ClientsDynamoDB();
const imagesRepository = new ImagesDynamoDB();

const apiPexelsClient = new ApiPexelsClient();
const unsplashFindImageStrategy = new PexelsFindImageStrategy(apiPexelsClient);
const searchImageService = new SearchImageService([unsplashFindImageStrategy]);

export const externalApisService = new ExternalApisService(
    clientsRepository,
    imagesRepository,
    searchImageService);

export const externalApisController = new ExternalApisController(externalApisService);
