import { ResquestApi } from '../../domain/ResquestApi';
import axios from 'axios';

const FREEPIK_SEARCH_ENDPOINT: string = process.env.FREEPIK_SEARCH_ENDPOINT;
const FREEPIK_API_KEY: string = process.env.FREEPIK_API_KEY;
const FREEPIK_LIMIT_PER_PAGE: number = parseInt(process.env.FREEPIK_LIMIT_PER_PAGE);

export class ApiFreepikClient implements ResquestApi {
  async searchImagesByPagination(page: number, keyword: string): Promise<any> {
    let response: any;
    try {

      var configRequest = {
        method: 'get',
        url: `${FREEPIK_SEARCH_ENDPOINT}?locale=en-GB&page=${page}&limit=${FREEPIK_LIMIT_PER_PAGE}&term=${keyword}&order=priority&filters[content_type][photo]=1`,
        headers: { 
          'Accept-Language': 'en-GB', 
          'Accept': 'application/json', 
          'Content-Type': 'application/json', 
          'X-Freepik-API-Key': FREEPIK_API_KEY
        }
      };

      const unsplashResponse = await axios(configRequest);
      console.log(configRequest);
      response = unsplashResponse.data;
      console.log()
    } catch (err) {
      console.log(err);
    }
    return response;
  }
}
