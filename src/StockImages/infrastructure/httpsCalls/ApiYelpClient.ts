import { ResquestYelpApi } from '../../domain/Clients/ResquestYelpApi';
import axios from 'axios';

const FREEPIK_SEARCH_ENDPOINT: string = process.env.FREEPIK_SEARCH_ENDPOINT;
const FREEPIK_API_KEY: string = process.env.FREEPIK_API_KEY;
const FREEPIK_LIMIT_PER_PAGE: number = parseInt(process.env.FREEPIK_LIMIT_PER_PAGE);

export class ApiYelpClient implements ResquestYelpApi {
  async searchImages(clientName: string, clientPhone: string): Promise<any> {
    let response: any;
    try {

      let query =  `${clientName}`;
      // if (typeof clientPhone === 'string' && clientPhone !== null && clientPhone !== undefined && clientPhone.trim() !== '' && clientPhone !== 'undefined') {
      //   query = `${clientName} ${clientPhone}`;
      // }
      var data = JSON.stringify({
        "client_meta": query
      });

      var configRequest = {
        method: 'post',
        url: 'http://35.86.78.138/photos',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: data
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
