import { LoadImagesStrategy } from "./LoadImagesStrategy";


export class FetchmagesService {
    constructor(
      private readonly collection: LoadImagesStrategy[]
    ) {}
    async loadImages(clientId:any, clientName: string, keywords:string) {
        let response: any[] = [];
        try {
          for (const strategy of this.collection) {
            try {
              console.log('Strategy......................................................');
              const result = await strategy.loadImages(clientId, clientName, keywords);
              response.push(...result);
            } catch (error) {
              console.error('Error al cargar imágenes:', error);
            }
          }

          // const promises = this.collection.map((strategy) =>
          //   strategy.loadImages()
          // );
    
          // const results = await Promise.all(promises);

          // const concatenatedData = results.reduce((concatenated, data) => {
          //   return concatenated.concat(data);
          // }, []);
      

        } catch (err) {
          console.log(err);
        }
        return response;
    }
  }