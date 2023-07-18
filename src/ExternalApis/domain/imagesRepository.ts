export interface ImagesRepository {
    getProfileByClientId(clientId: string): Promise<any>;    
    createStokProfile(clientId: string): Promise<any>;
    upadateStokProfile(clientId: string, id: number, lastApiUsed: string): Promise<any>;
    storeImagesURL(clientId: string, url: string): Promise<any>;
    searchImageByLastUseUsage(clientId: string, sourceUrl: string): Promise<any>;
    searchImageByURLUsage(clientId: string, sourceUrl: string): Promise<any>;
    deleteImage(clientId: string, sourceUrl: string): Promise<any>;
  }