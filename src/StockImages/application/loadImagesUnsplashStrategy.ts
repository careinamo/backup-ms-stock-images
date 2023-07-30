import { ResquestApi } from '@StockImages/domain/ResquestApi';
import { LoadImagesStrategy } from '../application/LoadImagesStrategy';

const UNSPLASH_LIMIT_PER_PAGE: number = parseInt(process.env.UNSPLASH_LIMIT_PER_PAGE);
const UNSPLASH_LIMIT_IMAGES: number = parseInt(process.env.UNSPLASH_LIMIT_IMAGES);

class loadImagesUnsplashStrategy implements LoadImagesStrategy {
    constructor(
        private readonly resquestApi: ResquestApi,
    ) { }
    public async loadImages(clientId: string, keyword: string): Promise<any> {
        console.log('Start loadImagesUnsplashStrategy.loadImages');
        let collection: any;

        const totalPages = Math.ceil(UNSPLASH_LIMIT_IMAGES / UNSPLASH_LIMIT_PER_PAGE); 

        const objects = [];
        let counter = 1;

        for (let page = 1; page <= totalPages; page++) {
            try {
                const response = await this.resquestApi.searchImagesByPagination(page, keyword);
                const data = response.results;
                collection = data.map((obj) => {
                    return {
                        url: obj.urls.regular,
                        orderNewImage: counter++,
                        source: 'unsplash'
                    };
                }
                );
                objects.push(...collection);
            } catch (error) {
                console.error('Error. ........:', error.message);
                break;
            }
            setTimeout(() => {
                console.log(`Elemento:`);
              }, Math.random() * 2000 + 1000);
        }
        
        console.log('End loadImagesUnsplashStrategy.loadImages');
        return objects;
    }
}
export default loadImagesUnsplashStrategy;


// for (let page = 1; page <= totalPages; page++) {
//     let images = imagesMock.default;
//     objects.push(...images);           
// }


// for (let page = 1; page <= totalPages; page++) {

// objects.push(...imagesMock);
// try {
//     const response = await apiUnsplashClient.searchImagesByPagination(page, 'Home');
//     const data = response.results;
//     console.log('respuesta apiUnsplashClient.searchImagesByPagination()', data);

//     collection = data.map((obj) => {
//         return {
//           url: obj.urls.regular,
//         };
//       }
//     );

//     objects.push(...collection);
//     // Verificar si se ha alcanzado el límite máximo de objetos


//     // if (objects.length >= maxObjects) {
//     //     break;
//     // }
// } catch (error) {
//     console.error('Error. ........:', error.message);
//     break;
// }
// }
// Aquí puedes hacer uso de los objetos obtenidos