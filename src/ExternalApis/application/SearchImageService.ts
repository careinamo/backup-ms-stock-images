// import { ClientsRepository } from "../domain/clientsRespository";
// import { ImagesRepository } from "../domain/imagesRepository";
import { FindImageStrategy } from "./FindImageStrategy";


export class SearchImageService {
    constructor(
      private readonly collection: FindImageStrategy[]
    ) {}
    async search(keywords: string) {
        let response: any;
        // for (let index = 0; index < this.coleccion.length; index++) {
        //     await this.coleccion[index].search('home construction');
        // }
        const random = Math.floor(Math.random() * this.collection.length);
        const image = await this.collection[random].search(keywords);
        try {
            response = image;
        } catch (err) {
        console.log(err);
        }
        return response;
    }
  }