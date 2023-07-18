import { ResquestApi } from '../../domain/ResquestApi';
import axios from 'axios';

const PEXELS_API_KEY: string = process.env.PEXELS_API_KEY;
const PEXELS_LIMIT_RESULTS: number = parseInt(process.env.PEXELS_LIMIT_RESULTS);

export class ApiPexelsClient implements ResquestApi{
    async searchOneImage(keyword: string): Promise<any> {
      let response: any;

      var min = 1;
      var max = PEXELS_LIMIT_RESULTS;
      var randomPage = Math.floor(Math.random() * (max - min + 1)) + min;
      try {
          var configRequest = {
            method: 'get',
            url: `https://api.pexels.com/v1/search?query=${keyword}&per_page=1&page=${randomPage}`,
            headers: { 
              'Authorization': PEXELS_API_KEY              
            }
          };       
    
          const unsplashResponse = await axios(configRequest);
          response = unsplashResponse.data;
          console.log(`Results from ApiClient ApiPexelsClient.searchOneImage: ${JSON.stringify(response.data)}`)
      } catch (err) {
        console.log(err);
      }
      return response;
    }
  }