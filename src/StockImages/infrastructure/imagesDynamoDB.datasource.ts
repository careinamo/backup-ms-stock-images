import { ImagesRepository } from '../domain/imagesRepository';
import { document } from "../../libs/dynamoClient"
import { performance } from 'perf_hooks';

// import { v4 as uuidv4 } from 'uuid';

class ImagesDynamoDB implements ImagesRepository {
  public async getByClientId(clientId: string): Promise<any> {
    console.log(`init get in database clients}`);

    const getimagesApiByClientsParams = {
      TableName: 'images-api-by-clients',
      Key: { clientId: clientId } // Reemplaza 'id' con el nombre de tu clave primaria
    };
    
    // Obtener el objeto de DynamoDB
    const result = await document
    .get(getimagesApiByClientsParams)
    .promise();
    console.log(`result get by client id database table images-api-by-clients ${result}`);  
    return result.Item;
  }

  public async createStokProfile(clientId: string): Promise<any> {
    console.log(`init get in database clients}`);
    const imagesApiByClientsObjecto = {
      clientId: clientId,
    };
    
    const imagesApiByClientsParams = {
      TableName: 'images-api-by-clients', // Reemplaza por el nombre real de tu tabla
      Item: imagesApiByClientsObjecto
    };    
    
    const result = await document
    .put(imagesApiByClientsParams)
    .promise();
    console.log(`result update by client id database table images-api-by-clients  ${result}`);    
  }
  public async upadateStokProfile(clientId: string, id: number, lastApiUsed: string): Promise<any> {
    console.log(`init get in database clients}`);
  
    const params = {
      TableName: 'images-api-by-clients',
      Key: {
        clientId: clientId
      },
      UpdateExpression: 'set #attrName1 = :attrValue1, #attrName2 = :attrValue2',
      ExpressionAttributeNames: {
        '#attrName1': 'unsplashPage',
        '#attrName2': 'lastApiUsed',
      },
      ExpressionAttributeValues: {
        ':attrValue1': id,
        ':attrValue2': lastApiUsed,
      }
    };

    const result = await document
    .update(params)
    .promise();
    console.log(`result update by client id database table images-api-by-clients  ${result}`);    
  }

  public async storeImagesURL(clientId: string, sourceUrl: string): Promise<any> {
    console.log(`init get in database clients ${Math.floor(Date.now() / 1000)}`);

    const item = {
      PK: `cl#${clientId}`,
      SK: Math.floor(Date.now() / 1000),
      'sourceUrl': sourceUrl,
      // Agrega aquí los demás atributos del elemento
    };
    
    // Parámetros de la solicitud de guardado (Put)
    const params = {
      TableName: 'stock-images',
      Item: item
    };
    
    // Realiza la solicitud de guardado del elemento
    const result = await document
    .put(params)
    .promise();
    console.log(`result update by client id database table images-api-by-clients  ${result}`);    
  }  
}
export default ImagesDynamoDB;