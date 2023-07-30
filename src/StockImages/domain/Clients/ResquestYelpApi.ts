export interface ResquestApi {
  searchImages(page: number, keyword: string): Promise<any>;    
  }