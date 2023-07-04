import { LoadImagesStrategy } from '../application/loadImagesStrategy';
import { ApiUnsplashClient } from '../infrastructure/apiUnsplashClient';

class loadImagesUnsplashStrategy implements LoadImagesStrategy {
    public async loadImages(): Promise<any> {
        let collection: any;
        const apiUnsplashClient = new ApiUnsplashClient();

        const resultsPerPage = 30;
        const totalPages = 4;
        // const maxObjects = resultsPerPage * totalPages;

        const objects = [];
        for (let page = 1; page <= totalPages; page++) {
            try {
                const response = await apiUnsplashClient.searchImagesByPagination(page, 'Home');
                const data = response.results;
                console.log('respuesta apiUnsplashClient.searchImagesByPagination()', data);

                collection = data.map((obj) => {
                    return {
                      url: obj.urls.regular,
                    };
                  }
                );

                objects.push(...collection);
                // Verificar si se ha alcanzado el límite máximo de objetos


                // if (objects.length >= maxObjects) {
                //     break;
                // }
            } catch (error) {
                console.error('Error. ........:', error.message);
                break;
            }
        }
        // Aquí puedes hacer uso de los objetos obtenidos
        console.log('log inside strategy load images from unsplash');
        return objects;
    }
}
export default loadImagesUnsplashStrategy;