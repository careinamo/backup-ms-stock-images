export interface FindImageStrategy {
    search(keywords: string): Promise<any>;
  }