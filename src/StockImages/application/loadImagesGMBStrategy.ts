import { ResquestApi } from '@StockImages/domain/ResquestApi';
import { GoogleLocationsRespository } from "../domain/repositories/GoogleLocationsRespository";
import { GoogleTokensRepository } from "../domain/repositories/GoogleTokensRepository";
import { LoadImagesStrategy } from './LoadImagesStrategy';

const PIXABAY_LIMIT_PER_PAGE: number = parseInt(process.env.PIXABAY_LIMIT_PER_PAGE);
const PIXABAY_LIMIT_IMAGES: number = parseInt(process.env.PIXABAY_LIMIT_IMAGES);

class loadImagesGMBStrategy implements LoadImagesStrategy {
    constructor(
        private readonly resquestApi: ResquestApi,
        private readonly googleLocationsRespository: GoogleLocationsRespository,
        private readonly googleTokensRepository: GoogleTokensRepository
    ) { }
    public async loadImages(clientId: string, keyword: string): Promise<any> {
        console.log('Start loadImagesUnsplashStrategy.loadImages');
        let collection: any;

        const objects = [];
        try {

            const googleLocation = await this.googleLocationsRespository.getByClientId(clientId);
            const googleToken = await this.googleTokensRepository.getById(googleLocation.tokenData);
            const response = await this.resquestApi.searchImagesByPagination(googleLocation.id, googleToken.access_token.replace(/\r?\n$/, ''));

            const data = response.mediaItems;
            let counter = 1
            collection = data.map((obj) => {
                return {
                    url: obj.googleUrl,
                    orderNewImage: counter++,
                    source: 'gmb'
                };
            }
            );
            return collection;
        } catch (error) {
            console.error('Error. ........:', error.message);
        }


        console.log('End loadImagesUnsplashStrategy.loadImages');
        return objects;
    }
}
export default loadImagesGMBStrategy;


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