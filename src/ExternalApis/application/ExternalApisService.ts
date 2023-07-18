import { ClientsRepository } from "../domain/clientsRespository";
import { ImagesRepository } from "../domain/imagesRepository";
import { SearchImageService } from "./SearchImageService";

const DAYS_REPETITION_IMAGES: number = parseInt(process.env.DAYS_REPETITION_IMAGES);
const WARNING_REPETITION_OF_IMAGES: string = process.env.WARNING_REPETITION_OF_IMAGES;

export class ExternalApisService {
    constructor(
      private readonly clientsRepository: ClientsRepository,
      private readonly imagesRepository: ImagesRepository,
      private readonly searchImageService: SearchImageService
    ) {}    
    async getExternalImageGroupName(clientId: string, keywords: string) {
      let response: any;      
      try {
          let query = keywords;
          if(!keywords){
            query = await this.clientsRepository.getById(clientId);
          }
          const imageUrl = await this.searchImageService.search(query);
          const imageUsed = await this.imagesRepository.searchImageByURLUsage(clientId, imageUrl);
          let image;
          
          image = { 'imageUrl': imageUrl, 'used': false };
          if (imageUsed) {
            image = { 'imageUrl': imageUrl, 'used': true, 'lastUse': imageUsed.lastUse };
            
            // Obtener la fecha actual en formato Unix Epoch timestamp
            const now = Math.floor(Date.now() / 1000);
              // Calcular el límite inferior
            const timeAgo = now - (86400 * DAYS_REPETITION_IMAGES);
            // Comparar el timestamp con el límite inferior y la fecha actual
            if (imageUsed.lastUse >= timeAgo && imageUsed.lastUse <= now){
              image = { 'imageUrl': imageUrl, 'used': true, 'lastUse': imageUsed.lastUse, 'warning': WARNING_REPETITION_OF_IMAGES };
            }
          }
          response = image;
      } catch (err) {
        console.log(err);
      }
      return response;
    }

    async useExternalImage(clientId: string, imageUrl: string) {
      let response: any;
      try {       
        const imageUsed = await this.imagesRepository.searchImageByURLUsage(clientId, imageUrl);
        if (!imageUsed) {
        } else {
          await this.imagesRepository.deleteImage(clientId, imageUrl);
        }
        await this.imagesRepository.storeImagesURL(clientId, imageUrl);
      } catch (err) {
        console.log(err);
      }
      return response;
    }
  }