export interface GoogleLocationsRespository {
  getByClientId(clientId: string): Promise<any>;
  }