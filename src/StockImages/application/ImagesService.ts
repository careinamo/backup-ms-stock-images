import { ClientsRepository } from "../domain/repositories/ClientsRespository";
import { ImagesRepository } from "../domain/repositories/ImagesRepository";
import { FetchmagesService } from "./FetchmagesService";
//import * as freepik from './freepik.json';


export class ImagesService {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly imagesRepository: ImagesRepository,
    private readonly fetchImagesService: FetchmagesService,
  ) { }
  async fetchImagesFromApis(clientId: string) {
    let response: any;
    try {
      const client = await this.clientsRepository.getById(clientId);
      // const keywords = client.clientGroups[0].groupName;
      const keywords = 'plumbing';
      const sockProfile = await this.imagesRepository.getProfileByClientId(clientId);
      let nextPage = 1;
      if (!sockProfile) {
        console.log(`Not profile found in stock table`);
        this.imagesRepository.createStokProfile(clientId);
      } else {
        nextPage = sockProfile.unsplashPage + 1;
      }

      console.log('fetchImagesService......................................................');
      const images = await this.fetchImagesService.loadImages(clientId, keywords);

      images.forEach((item) => {
        this.imagesRepository.storeNewStockImage(clientId, item.url, item.orderNewImage, item.source);
      }); 
      response = images;
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  async getStockImage(clientId: string) {
    let response: any;
    try {
      const newsStockImage = await this.imagesRepository.searchImageByOrder(clientId)
      let imageSelected = newsStockImage;
      if (!newsStockImage) {
        const now = Math.floor(Date.now() / 1000);
        const timeAgo = now - (86400 * 60);
        const stockImage = await this.imagesRepository.searchImageByLastUse(clientId, timeAgo);
        if (stockImage) {
          await this.imagesRepository.updateStockImage(clientId, stockImage.SK);
          imageSelected = stockImage;
        }        
      } else {
        await this.imagesRepository.deleteNewStockImage(imageSelected.PK, imageSelected.SK);
        await this.imagesRepository.storeStockImage(clientId, imageSelected.SK, imageSelected.source);
      }
      if (!imageSelected) {
        const stockImageWarning = await this.imagesRepository.searchImageByLastUse(clientId, 0)
        if (stockImageWarning) {
          await this.imagesRepository.updateStockImage(clientId, stockImageWarning.SK);
          imageSelected = stockImageWarning;
        }     
      }
      response = { "url": imageSelected.SK, "clientID": clientId };
    } catch (err) {
      console.log(err);
    }
    return response;
  }
}