import { ResquestApi } from '../../domain/ResquestApi';
import axios from 'axios';

const UNSPLASH_SEARCH_ENDPOINT: string = process.env.UNSPLASH_SEARCH_ENDPOINT;
const UNSPLASH_API_KEY: string = process.env.UNSPLASH_API_KEY;
const UNSPLASH_LIMIT_PER_PAGE: number = parseInt(process.env.UNSPLASH_LIMIT_PER_PAGE);

export class ApiUnsplashClient implements ResquestApi {
  async searchImagesByPagination(page: number, keyword: string) {
    let response: any;
    try {
      var unsplashRequest = {
        method: 'get',
        url: `${UNSPLASH_SEARCH_ENDPOINT}?per_page=${UNSPLASH_LIMIT_PER_PAGE}&page=${page}&query=${keyword}`,
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_API_KEY}`
        }
      };
      const unsplashResponse = await axios(unsplashRequest);
      const responseAPI = unsplashResponse.data;

      response = responseAPI;
    } catch (err) {
      console.log(err);
    }
    return response;
  }
}