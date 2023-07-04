import axios from 'axios';
import * as data from './images.json';
import { ClientsRepository } from "../domain/clientsRespository";
import { ImagesRepository } from "../domain/imagesRepository";
import { LoadImagesStrategy } from "../application/loadImagesStrategy";

export class ImagesService {
    constructor(
      private readonly clientsRepository: ClientsRepository,
      private readonly imagesRepository: ImagesRepository,
      private readonly loadImagesStrategy: LoadImagesStrategy
    ) {}
    async fetchImagesFromApis() {
    let response: any;
    try {
        const client = await this.clientsRepository.getById();
        console.log(`response from clientsRepository.getById() ${client}`);
        const sockProfile = await this.imagesRepository.getByClientId('15e70d027aba9cd719df89afbf03e7c306a3e62608d97d856ead2ac35162d07c');

        let nextPage = 1;
        if (!sockProfile) {
          console.log(`Not config item found in images-api-by-clients table`);

          this.imagesRepository.createStokProfile('15e70d027aba9cd719df89afbf03e7c306a3e62608d97d856ead2ac35162d07c');
        } else {
          nextPage = sockProfile.unsplashPage + 1;
        }
        const images = await this.loadImagesStrategy.loadImages();
        this.imagesRepository.upadateStokProfile('15e70d027aba9cd719df89afbf03e7c306a3e62608d97d856ead2ac35162d07c', nextPage, 'unsplash');
        response = {images: images};
    } catch (err) {
      console.log(err);
    }
    return response;
    }
  }