export interface GoogleTokensRepository {
    getById(clientId: string): Promise<any>;
  }