import { ResquestAppApi } from '@StockImages/domain/Clients/ResquestAppApi';
import { LoadImagesStrategy } from './LoadImagesStrategy';

const FREEPIK_LIMIT_PER_PAGE: number = parseInt(process.env.FREEPIK_LIMIT_PER_PAGE);
const FREEPIK_LIMIT_IMAGES: number = parseInt(process.env.FREEPIK_LIMIT_IMAGES);

class loadImagesYelpStrategy implements LoadImagesStrategy {
    constructor(
        private readonly resquestAppApi: ResquestAppApi,
    ) { }
    public async loadImages(clientId: any, client: any, keyword: string): Promise<any> {
        console.log(`Start loadImagesFreepikStrategy.loadImages  for clientId: ${clientId} with keyword: ${keyword}`);

        let collection: any;

        const totalPages = Math.ceil(FREEPIK_LIMIT_IMAGES / FREEPIK_LIMIT_PER_PAGE);

        const objects = [];
        let counter = 1;
        const objectsArray = [];

        for (let page = 1; page <= totalPages; page++) {
            try {
                const response = await this.resquestAppApi.getImages(clientId);
                const data = response.body;

                collection = data.map((obj) => {
                    return {
                        url: obj.url,
                        orderNewImage: counter++,
                        source: 'app'
                    };
                }
                );
            } catch (error) {
                console.error('Error. ........:', error.message);
                break;
            }
        }

        console.log('End loadImagesFreepikStrategy.loadImages');
        return collection;
    }
}
export default loadImagesYelpStrategy;


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