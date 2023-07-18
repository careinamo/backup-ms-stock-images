import { LoadImagesStrategy } from "./LoadImagesStrategy";


export class FetchmagesService {
    constructor(
      private readonly collection: LoadImagesStrategy[]
    ) {}
    async loadImages(keywords:string) {
        let response: any[] = [];
        try {
          for (const strategy of this.collection) {
            try {
              const result = await strategy.loadImages(keywords);
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