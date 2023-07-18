import { FindImageStrategy } from './FindImageStrategy';
import { ResquestApi } from '../domain/ResquestApi';

class PexelsFindImageStrategy implements FindImageStrategy {

    constructor(
        private readonly resquestApi: ResquestApi,
      ) {}
    public async search(keywords: string): Promise<any> {
        const response = await this.resquestApi.searchOneImage(keywords);
        const imageUrl = response.photos[0].src.large
        console.log(`Result of UnsplashFindImageStrategy.search for keyword ${keywords} imageUrl ${imageUrl}`)

        return imageUrl;
    }
}
export default PexelsFindImageStrategy;