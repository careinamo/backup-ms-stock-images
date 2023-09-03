import { ResquestAppApi } from '../../domain/Clients/ResquestAppApi';
import axios from 'axios';

export class ApiAppClient implements ResquestAppApi {
  async getImages(clientId: string): Promise<any> {
    let response: any;
    try {
      var configRequest = {
        method: 'get',
        url: `https://chr6memjga.execute-api.us-east-1.amazonaws.com/prod/app-prod-getimages?userId=${clientId}`,
        headers: { }
      };      

      const unsplashResponse = await axios(configRequest);
      response = unsplashResponse.data;
    } catch (err) {
      console.log(err);
    }
    return response;
  }
}
