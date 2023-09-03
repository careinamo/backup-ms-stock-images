import { ResquestApi } from '@StockImages/domain/ResquestApi';
import { GoogleLocationsRespository } from "../domain/repositories/GoogleLocationsRespository";
import { GoogleTokensRepository } from "../domain/repositories/GoogleTokensRepository";
import { LoadImagesStrategy } from './LoadImagesStrategy';

class loadImagesGMBStrategy implements LoadImagesStrategy {
    constructor(
        private readonly resquestApi: ResquestApi,
        private readonly googleLocationsRespository: GoogleLocationsRespository,
        private readonly googleTokensRepository: GoogleTokensRepository
    ) { }
    public async loadImages(clientId: string, client: any, keyword: string): Promise<any> {
        console.log(`Start loadImagesUnsplashStrategy.loadImages for clientId: ${clientId} with keyword: ${keyword}`);
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