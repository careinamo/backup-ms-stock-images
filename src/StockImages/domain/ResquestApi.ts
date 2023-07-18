export interface ResquestApi {
  searchImagesByPagination(page: number, keyword: string): Promise<any>;    
  }