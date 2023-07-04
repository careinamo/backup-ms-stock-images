import { ImagesService } from './imagesService';
import ClientsDynamoDB from '../infrastructure/clientsDynamoDB.datasource';
import ImagesDynamoDB from '../infrastructure/imagesDynamoDB.datasource';
import LoadImagesUnsplashStrategy from '../application/loadImagesUnsplashStrategy';

const clientsRepository = new ClientsDynamoDB();
const imagesRepository = new ImagesDynamoDB();
const loadImagesUnsplashStrategy = new LoadImagesUnsplashStrategy();

export const imagesService = new ImagesService(clientsRepository, imagesRepository, loadImagesUnsplashStrategy);