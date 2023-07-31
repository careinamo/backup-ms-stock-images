import { ResquestApi } from '@StockImages/domain/ResquestApi';
import { LoadImagesStrategy } from './LoadImagesStrategy';

const FREEPIK_LIMIT_PER_PAGE: number = parseInt(process.env.FREEPIK_LIMIT_PER_PAGE);
const FREEPIK_LIMIT_IMAGES: number = parseInt(process.env.FREEPIK_LIMIT_IMAGES);

class loadImagesFreepikStrategy implements LoadImagesStrategy {
    constructor(
        private readonly resquestApi: ResquestApi,
    ) { }
    public async loadImages(clientId: string, keyword: string): Promise<any> {
        console.log(`Start loadImagesFreepikStrategy.loadImages  for clientId: ${clientId} with keyword: ${keyword}`);

        let collection: any;

        const totalPages = Math.ceil(FREEPIK_LIMIT_IMAGES / FREEPIK_LIMIT_PER_PAGE);

        const objects = [];
        let counter = 1;

        for (let page = 1; page <= totalPages; page++) {
            try {
                const response = await this.resquestApi.searchImagesByPagination(page, keyword);
                const data = response.data;
                collection = data.map((obj) => {
                    return {
                        url: obj.image.source.url,
                        orderNewImage: counter++,
                        source: 'freepik'
                    };
                }
                );
                objects.push(...collection);
            } catch (error) {
                console.error('Error. ........:', error.message);
                break;
            }
        }
        
        console.log('End loadImagesFreepikStrategy.loadImages');
        return objects;
    }
}
export default loadImagesFreepikStrategy;


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