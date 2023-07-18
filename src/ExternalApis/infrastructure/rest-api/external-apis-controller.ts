import { ExternalApisService } from '../../application/ExternalApisService';

export class ExternalApisController {
  constructor(private readonly externalApisService: ExternalApisService) {}

  async getExternalImage(event) {
    const clientId: string = event.body.clientId;
    const keywords: string = event.body.keywords;
    const image =  await this.externalApisService.getExternalImageGroupName(clientId, keywords);
  
    return { results: [image] };
  }

  async useImage(event) {
    const clientId: string = event.body.clientId;
    const imageUrl: string = event.body.imageUrl;
    await this.externalApisService.useExternalImage(clientId, imageUrl);
  }
}