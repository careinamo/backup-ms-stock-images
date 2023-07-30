import { ImagesService } from '../application/ImagesService';
import { FetchmagesService } from '../application/FetchmagesService';
import { StockImageController } from "./rest-api/stock-image-controller";

import ClientsDynamoDB from './datasources/ClientsDynamoDB.datasource';
import ImagesDynamoDB from './datasources/ImagesDynamoDB.datasource';
import GoogleLocationsDynamoDB from '../infrastructure/datasources/GoogleLocationsDynamoDB.datasource';
import GoogleTokensDynamoDB from '../infrastructure/datasources/GoogleTokensDynamoDB.datasource';

import LoadImagesUnsplashStrategy from '../application/loadImagesUnsplashStrategy';
import LoadImagesPixabayStrategy from '../application/loadImagesPixabayStrategy';
import LoadImagesGMBStrategy from '../application/loadImagesGMBStrategy';

import { ApiUnsplashClient } from './httpsCalls/ApiUnsplashClient';
import { ApiPixabayClient } from './httpsCalls/ApiPixabayClient';
import { ApiGMBClient } from './httpsCalls/ApiGMBClient';

const clientsRepository = new ClientsDynamoDB();
const imagesRepository = new ImagesDynamoDB();
const googleLocationsDynamoDB = new GoogleLocationsDynamoDB;
const googleTokensDynamoDB = new GoogleTokensDynamoDB;

const apiUnsplashClient = new ApiUnsplashClient();
const apiPixabayClient = new ApiPixabayClient();
const apiGMBClient = new ApiGMBClient();

const loadImagesUnsplashStrategy = new LoadImagesUnsplashStrategy(apiUnsplashClient);
const loadImagesPixabayStrategy = new LoadImagesPixabayStrategy(apiPixabayClient);
const loadImagesGMBStrategy = new LoadImagesGMBStrategy(apiGMBClient, googleLocationsDynamoDB, googleTokensDynamoDB);

const fetchmagesService = new FetchmagesService([loadImagesGMBStrategy, loadImagesUnsplashStrategy, loadImagesPixabayStrategy]);

const imagesService = new ImagesService(
    clientsRepository,
    imagesRepository,
    fetchmagesService);

export const stockImageController = new StockImageController(imagesService);