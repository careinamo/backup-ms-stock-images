export interface LoadImagesStrategy {
    loadImages(keyword: string): Promise<any>;
  }