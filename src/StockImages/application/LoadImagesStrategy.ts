export interface LoadImagesStrategy {
  loadImages(clientId: string, keyword: string): Promise<any>;
}