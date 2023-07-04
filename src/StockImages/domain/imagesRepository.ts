export interface ImagesRepository {
    getByClientId(clientId: string): Promise<any>;    
    createStokProfile(clientId: string): Promise<any>;
    upadateStokProfile(clientId: string, id: number, lastApiUsed: string): Promise<any>;
    storeImagesURL(clientId: string, url: string): Promise<any>;
  }