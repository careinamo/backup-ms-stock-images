import { ImagesService } from '../application/imagesService';
import { FetchmagesService } from '../application/FetchmagesService';
import { StockImageController } from "./rest-api/stock-image-controller";

import ClientsDynamoDB from '../infrastructure/clientsDynamoDB.datasource';
import ImagesDynamoDB from '../infrastructure/imagesDynamoDB.datasource';

import LoadImagesUnsplashStrategy from '../application/loadImagesUnsplashStrategy';
import LoadImagesPixabayStrategy from '../application/loadImagesPixabayStrategy';
import LoadImagesGMBStrategy from '../application/loadImagesGMBStrategy';

import { ApiUnsplashClient } from './httpsCalls/ApiUnsplashClient';
import { ApiPixabayClient } from './httpsCalls/ApiPixabayClient';

const clientsRepository = new ClientsDynamoDB();
const imagesRepository = new ImagesDynamoDB();

const apiUnsplashClient = new ApiUnsplashClient();
const apiPixabayClient = new ApiPixabayClient();

const loadImagesUnsplashStrategy = new LoadImagesUnsplashStrategy(apiUnsplashClient);
const loadImagesPixabayStrategy = new LoadImagesPixabayStrategy(apiPixabayClient);
const loadImagesGMBStrategy = new LoadImagesGMBStrategy(apiPixabayClient);

const fetchmagesService = new FetchmagesService([loadImagesUnsplashStrategy, loadImagesPixabayStrategy]);
//const fetchmagesService = new FetchmagesService([loadImagesGMBStrategy]);

const imagesService = new ImagesService(
    clientsRepository,
    imagesRepository,
    fetchmagesService);

export const stockImageController = new StockImageController(imagesService);