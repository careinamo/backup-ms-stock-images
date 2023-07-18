export interface ClientsRepository {
    getById(clientId: string): Promise<any>;
  }