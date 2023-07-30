export interface ImagesRepository {
    getProfileByClientId(clientId: string): Promise<any>;    
    createStokProfile(clientId: string): Promise<any>;
    upadateStokProfile(clientId: string, id: number, lastApiUsed: string): Promise<any>;
    storeStockImage(clientId: string, url: string, source: string): Promise<any>;
    searchImageByOrder(clientId: string): Promise<any>;
    searchImageByLastUse(clientId: string, lastUse: number): Promise<any>;
    deleteImage(clientId: string, url: string);
    deleteNewStockImage(pk: string, url: string);
    updateStockImage(clientId: string, sourceUrl: string): Promise<any>;
    storeNewStockImage(clientId: string, sourceUrl: string, orderNewImage: number, source: string): Promise<any>;
  }