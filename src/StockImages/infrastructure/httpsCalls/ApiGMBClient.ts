import { ResquestApi } from '../../domain/ResquestApi';
import axios from 'axios';

// const PIXABAY_SEARCH_ENDPOINT: string = process.env.PIXABAY_SEARCH_ENDPOINT;
// const PIXABAY_API_KEY: string = process.env.PIXABAY_API_KEY;
// const PIXABAY_LIMIT_PER_PAGE: number = parseInt(process.env.PIXABAY_LIMIT_PER_PAGE);

export class ApiGMBClient implements ResquestApi {
  async searchImagesByPagination(locationId: number, accessToken: string): Promise<any> {
    let response: any;
    try {
      const configRequest = {
        method: 'get',
        url: `https://mybusiness.googleapis.com/v4/accounts/106012573974671584928/locations/${locationId}/media`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };      
      const unsplashResponse = await axios(configRequest);
      response = unsplashResponse.data;

    } catch (err) {
      console.log(err);
    }
    return response;
  }
}
