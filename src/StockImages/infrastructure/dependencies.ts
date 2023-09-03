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
import LoadImagesFreepikStrategy from '../application/loadImagesFreepikStrategy';
import LoadImagesYelpStrategy from '../application/loadImagesYelpStrategy';
import LoadImagesAppStrategy from '../application/loadImagesAppStrategy';
import LoadImagesDropboxStrategy from '../application/loadImagesDropboxStrategy';


import { ApiUnsplashClient } from './httpsCalls/ApiUnsplashClient';
import { ApiPixabayClient } from './httpsCalls/ApiPixabayClient';
import { ApiGMBClient } from './httpsCalls/ApiGMBClient';
import { ApiFreepikClient } from './httpsCalls/ApiFreepikClient';
import { ApiYelpClient } from './httpsCalls/ApiYelpClient';
import { ApiAppClient } from './httpsCalls/ApiAppClient';
import { ApiDropboxClient } from './httpsCalls/ApiDropboxClient';



const clientsRepository = new ClientsDynamoDB();
const imagesRepository = new ImagesDynamoDB();
const googleLocationsDynamoDB = new GoogleLocationsDynamoDB;
const googleTokensDynamoDB = new GoogleTokensDynamoDB;

const apiUnsplashClient = new ApiUnsplashClient();
const apiPixabayClient = new ApiPixabayClient();
const apiFreepikClient = new ApiFreepikClient();
const apiGMBClient = new ApiGMBClient();
const apiYelpClient = new ApiYelpClient();
const apiAppClient = new ApiAppClient();
const apiDropboxClient = new ApiDropboxClient();

const loadImagesUnsplashStrategy = new LoadImagesUnsplashStrategy(apiUnsplashClient);
const loadImagesPixabayStrategy = new LoadImagesPixabayStrategy(apiPixabayClient);
const loadImagesFreepikStrategy = new LoadImagesFreepikStrategy(apiFreepikClient);
const loadImagesYelpStrategy = new LoadImagesYelpStrategy(apiYelpClient);
const loadImagesAppStrategy = new LoadImagesAppStrategy(apiAppClient);
const loadImagesGMBStrategy = new LoadImagesGMBStrategy(apiGMBClient, googleLocationsDynamoDB, googleTokensDynamoDB);
const loadImagesDropboxStrategy = new LoadImagesDropboxStrategy(apiDropboxClient);

const fetchmagesService = new FetchmagesService([
    loadImagesFreepikStrategy,
    loadImagesAppStrategy,
    loadImagesYelpStrategy,
    loadImagesGMBStrategy,
    loadImagesDropboxStrategy]);


// const fetchmagesService = new FetchmagesService([
//     loadImagesFreepikStrategy,
//     loadImagesAppStrategy,
//     loadImagesYelpStrategy,
//     loadImagesGMBStrategy,
//     loadImagesDropboxStrategy]);    

const imagesService = new ImagesService(
    clientsRepository,
    imagesRepository,
    fetchmagesService);

export const stockImageController = new StockImageController(imagesService);