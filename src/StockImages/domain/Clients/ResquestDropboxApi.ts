export interface ResquestDropboxApi {
  searchImagesByPagination(page: number, keyword: string): Promise<any>;    
  }