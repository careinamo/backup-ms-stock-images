import axios from 'axios';

export class ApiUnsplashClient {
    //https://api.unsplash.com/search/photos?per_page=30&page=${page}&query=${keyword}
    async searchImagesByPagination(page: number, keyword: string) {
    let response: any;
    try {
        var unsplashRequest = {
          method: 'get',
          url: `https://4gtvbkmzb64einnpvxxn3q5pz40uoelh.lambda-url.us-east-1.on.aws?per_page=30&page=${page}&query=${keyword}`,
          headers: { 
            'Authorization': 'Client-ID N3ILC0Nr6T13ET-gZ3eQch6LR4Y_v5p3q_weweDTSIE'
          }
        };        
        const unsplashResponse = await axios(unsplashRequest);
        const responseAPI = unsplashResponse.data;

        response = responseAPI;
        console.log(`response tumadre: ${response}`)
    } catch (err) {
      console.log(err);
    }
    return response;
    }
  }