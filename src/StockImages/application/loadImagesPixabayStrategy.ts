import { ResquestApi } from '@StockImages/domain/ResquestApi';
import { LoadImagesStrategy } from './LoadImagesStrategy';

const PIXABAY_LIMIT_PER_PAGE: number = parseInt(process.env.PIXABAY_LIMIT_PER_PAGE);
const PIXABAY_LIMIT_IMAGES: number = parseInt(process.env.PIXABAY_LIMIT_IMAGES);

class loadImagesPixabayStrategy implements LoadImagesStrategy {
    constructor(
        private readonly resquestApi: ResquestApi
    ) { }
    public async loadImages(keyword: string): Promise<any> {
        console.log('Start loadImagesUnsplashStrategy.loadImages');
        let collection: any;

        const totalPages = Math.ceil(PIXABAY_LIMIT_IMAGES / PIXABAY_LIMIT_PER_PAGE); 

        const objects = [];
        let counter = 1;

        for (let page = 1; page <= totalPages; page++) {
            try {
                const response = await this.resquestApi.searchImagesByPagination(page, keyword);
                const data = response.hits;
                collection = data.map((obj) => {
                    return {
                        url: obj.webformatURL,
                        orderNewImage: counter++,
                        source: 'pixabay'
                    };
                }
                );
                objects.push(...collection);
            } catch (error) {
                console.error('Error. ........:', error.message);
                break;
            }
        }
        


        console.log('End loadImagesUnsplashStrategy.loadImages');
        return objects;
    }
}
export default loadImagesPixabayStrategy;


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