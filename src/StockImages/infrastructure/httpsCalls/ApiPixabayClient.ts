import { ResquestApi } from '../../domain/ResquestApi';
import axios from 'axios';

const PIXABAY_SEARCH_ENDPOINT: string = process.env.PIXABAY_SEARCH_ENDPOINT;
const PIXABAY_API_KEY: string = process.env.PIXABAY_API_KEY;
const PIXABAY_LIMIT_PER_PAGE: number = parseInt(process.env.PIXABAY_LIMIT_PER_PAGE);

export class ApiPixabayClient implements ResquestApi {
  async searchImagesByPagination(page: number, keyword: string): Promise<any> {
    let response: any;
    try {
      var configRequest = {
        method: 'get',
        url: `${PIXABAY_SEARCH_ENDPOINT}?key=${PIXABAY_API_KEY}&q=${keyword}&image_type=photo&per_page=${PIXABAY_LIMIT_PER_PAGE}&page=${page}`
      };

      console.log(`tumadre 007 ${JSON.stringify(configRequest)}`)

      const apiResponse = await axios(configRequest);
      response = apiResponse.data;
    } catch (err) {
      console.log(err);
    }
    return response;
  }
}
