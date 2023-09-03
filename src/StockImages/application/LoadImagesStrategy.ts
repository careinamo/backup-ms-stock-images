export interface LoadImagesStrategy {
  loadImages(clientId: string, client: any, keyword: string): Promise<any>;
}