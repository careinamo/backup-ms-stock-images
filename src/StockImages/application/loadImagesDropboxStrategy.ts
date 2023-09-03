import { ResquestApi } from '@StockImages/domain/ResquestApi';
import { LoadImagesStrategy } from './LoadImagesStrategy';
const { Dropbox } = require('dropbox');
import axios from 'axios';
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });


const S3_BUCKET_NAME = 'stock-images-prod';

const s3 = new AWS.S3();

class LoadImagesDropboxStrategy implements LoadImagesStrategy {
    constructor(
        private readonly resquestApi: ResquestApi,
    ) { }
    public async loadImages(clientId: any, client: any, keyword: string): Promise<any> {
        let counter = 1;
        console.log(`Start LoadImagesDropboxStrategy.loadImages  for clientId: ${clientId} with clientName: ${client.clientName}`);
        const ACCESS_TOKEN = 'sl.BlMxcBywsTeekXTJNAEtOuo6Q51OzaO-E3iz7XcaYhlrUfhg2RsTHrRF2X6c1LDiRUXPqlaOwtFGmXHmWUQM-L3WGpdcdRT2rDpqhRSZ2l6WeaiwA3Arpo5WT6f6l2iJKVlh9ursHX9h';


        const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

        const folderNameToSearch = client.clientName;

        const searchResult = await dbx.filesSearch({ path: '', query: folderNameToSearch });

        // Filtra los resultados para obtener solo las carpetas
        const folders = searchResult.result.matches.filter(item => item.metadata['.tag'] === 'folder');

        if (folders.length === 0) {
            console.log('No se encontraron carpetas con el nombre especificado');
            return [];
        } else {
            console.log('Si se encontraron carpetas con el nombre especificado');
        }

        // Obtén el ID de la primera carpeta encontrada
        const firstFolderId = folders[0].metadata.id;

        // Obtiene los archivos dentro de la primera carpeta
        const folderContents = await dbx.filesListFolder({ path: `${firstFolderId}` });


        // Filtra los archivos que tengan una extensión de imagen
        const imageFiles = folderContents.result.entries.filter(item => {
            const fileName = item.name.toLowerCase();
            return fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png') || fileName.endsWith('.gif');
        });

        const promises = []

        for (var i = 0; i < imageFiles.length; i++) {
            try {
                const response = await dbx.filesGetTemporaryLink({ path: imageFiles[i].path_lower });
                const url = response.result.link;
                const nombreArchivo = imageFiles[i].name;

                const imageResponse = await axios({
                    url: url,
                    method: 'GET',
                    responseType: 'arraybuffer',
                });

                const params = {
                    Bucket: S3_BUCKET_NAME,
                    Key: `${clientId}/${nombreArchivo}`,
                    Body: imageResponse.data,
                    ContentType: 'image/' + nombreArchivo.split('.').pop().toLowerCase()
                };

                await s3.putObject(params).promise();
                let objectUrl = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${clientId}/${nombreArchivo}`;
                promises.push({
                    url: objectUrl,
                    orderNewImage: counter++,
                    source: 'dropbox'
                })
            } catch (error) {
                console.error(`Error. ........: ${error}`);
            }

        };

        const tumadre = await Promise.all(promises);

        console.log('End LoadImagesDropboxStrategy.loadImages');
        return tumadre;
    }
}
export default LoadImagesDropboxStrategy;


// for (let page = 1; page <= totalPages; page++) {
//     let images = imagesMock.default;
//     objects.push(...images);           
// }


// for (let page = 1; page <= totalPages; page++) {

// objects.push(...imagesMock);
// try {
//     const response = await apiUnsplashClient.searchImagesByPagination(page, 'Home');
//     const data = response.results;
//     console.log('respuesta apiUnsplashClient.searchImagesByPagination()', data);

//     collection = data.map((obj) => {
//         return {
//           url: obj.urls.regular,
//         };
//       }
//     );

//     objects.push(...collection);
//     // Verificar si se ha alcanzado el límite máximo de objetos


//     // if (objects.length >= maxObjects) {
//     //     break;
//     // }
// } catch (error) {
//     console.error('Error. ........:', error.message);
//     break;
// }
// }
// Aquí puedes hacer uso de los objetos obtenidos