import { ImagesService } from '../../application/imagesService';

export class StockImageController {
  constructor(private readonly imagesService: ImagesService) {}

  async requestImage(event) {
    const clientId: string = event.body.clientId;
    const images =  await this.imagesService.fetchImagesFromApis(clientId);
  
    return images;
  }

  async requestImage2(event) {
    const clientId: string = event.body.clientId;
    const images =  await this.imagesService.getStockImage(clientId);
  
    return images;
  }
}