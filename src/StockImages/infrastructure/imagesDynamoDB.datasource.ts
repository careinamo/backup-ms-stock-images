import { ImagesRepository } from '../domain/imagesRepository';
import { document } from "../../libs/dynamoClient"
import { performance } from 'perf_hooks';

// import { v4 as uuidv4 } from 'uuid';

class ImagesDynamoDB implements ImagesRepository {
  public async getProfileByClientId(clientId: string): Promise<any> {
    console.log(`init get in database clients}`);

    const getimagesApiByClientsParams = {
      TableName: process.env.STOCK_IMAGES_TABLE,
      Key: {
        'PK': `p#${clientId}`,
        'SK': `p#${clientId}`,
      } // Reemplaza 'id' con el nombre de tu clave primaria
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
        'PK': `p#${clientId}`,
        'SK': `p#${clientId}`
    };
    
    const imagesApiByClientsParams = {
      TableName: process.env.STOCK_IMAGES_TABLE, // Reemplaza por el nombre real de tu tabla
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
      TableName: process.env.STOCK_IMAGES_TABLE,
      Key: {
        'PK': `p#${clientId}`,
        'SK': `p#${clientId}`
      },
      UpdateExpression: 'set #attrName1 = :attrValue1, #attrName2 = :attrValue2',
      ExpressionAttributeNames: {
        '#attrName1': 'unsplashPage',
        '#attrName2': 'lastApiUsed',
      },
      ExpressionAttributeValues: {
        ':attrValue1': 1,
        ':attrValue2': lastApiUsed,
      }
    };

    const result = await document
    .update(params)
    .promise();
    console.log(`result update by client id database table images-api-by-clients  ${result}`);    
  }

  public async storeImagesURL(clientId: string, sourceUrl: string): Promise<any> {
    console.log(`Start imagesRepository.storeImagesURL get in table: ${process.env.STOCK_IMAGES_TABLE}`);

    const item = {
      'PK': `s#${clientId}`,
      'SK': sourceUrl,
      'lastUse': Math.floor(Date.now() / 1000),
      // Agrega aquí los demás atributos del elemento
    };
    
    // Parámetros de la solicitud de guardado (Put)
    const params = {
      TableName: process.env.STOCK_IMAGES_TABLE,
      Item: item
    };
    
    // Realiza la solicitud de guardado del elemento
    await document
    .put(params)
    .promise();
    console.log(`End imagesRepository.storeImagesURL`);    
  }

  public async storeNewStockImage(clientId: string, sourceUrl: string, orderNewImage: number): Promise<any> {
    console.log(`Start imagesRepository.storeImagesURL get in table: ${process.env.STOCK_IMAGES_TABLE}`);

    const item = {
      'PK': `ns#${clientId}`,
      'SK': sourceUrl,
      'orderNewImage': orderNewImage
      // Agrega aquí los demás atributos del elemento
    };
    
    // Parámetros de la solicitud de guardado (Put)
    const params = {
      TableName: process.env.STOCK_IMAGES_TABLE,
      Item: item
    };
    
    // Realiza la solicitud de guardado del elemento
    await document
    .put(params)
    .promise();
    console.log(`End imagesRepository.storeImagesURL`);    
  }

  public async updateStockImage(clientId: string, sourceUrl: string): Promise<any> {
    console.log(`Start imagesRepository.updateStockImage in table: ${process.env.STOCK_IMAGES_TABLE}`);
  
    const params = {
      TableName: process.env.STOCK_IMAGES_TABLE,
      Key: {
        'PK': `s#${clientId}`,
        'SK': sourceUrl
      },
      UpdateExpression: 'set #attrName1 = :attrValue1',
      ExpressionAttributeNames: {
        '#attrName1': 'lastUse',
      },
      ExpressionAttributeValues: {
        ':attrValue1': Math.floor(Date.now() / 1000),
      }
    };

    await document
    .update(params)
    .promise();
    console.log(`End imagesRepository.updateStockImage`);
  }

  public async searchImageByURLUsage(clientId: string, sourceUrl: string): Promise<any> {
    console.log(`init get in table ${process.env.STOCK_IMAGES_TABLE}`);
    const params = {
      TableName: process.env.STOCK_IMAGES_TABLE,
      KeyConditionExpression: 'PK = :pk and SK = :sk',
      ExpressionAttributeValues: {
        ':pk': `s#${clientId}`,
        ':sk': sourceUrl
      }
    };
    console.log(`result save in database ${JSON.stringify(params)}`);
    const result = await document.query(params).promise();
    console.log('Registro obtenido exitosamente:', result.Items);

    if (result.Items.length > 0){
      return result.Items[0];
    }
  }
  
  public async searchImageByLastUseUsage(clientId: string, sourceUrl: string): Promise<any> {
    console.log(`init get in table ${process.env.STOCK_IMAGES_TABLE}`);
    const params = {
      TableName: process.env.STOCK_IMAGES_TABLE,
      IndexName: 'lastUseIndex',
      KeyConditionExpression: 'PK = :pk and lastUse = :lastUse',
      ExpressionAttributeValues: {
        ':pk': `s#${clientId}`,
        ':lastUse': sourceUrl
      }
    };
    console.log(`resulte save in database ${JSON.stringify(params)}`);
    const result = await document.query(params).promise();
    console.log('Registro obtenido exitosamente:', result.Items);

    if (result.Items.length > 0){
      return result.Items[0];
    }
  }

  public async searchImageByOrder(clientId: string): Promise<any> {
    console.log(`Start imagesRepository.searchImageByOrder in table: ${process.env.STOCK_IMAGES_TABLE}`);
    const params = {
      TableName: process.env.STOCK_IMAGES_TABLE,
      IndexName: 'orderNewImageIndex',
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `ns#${clientId}`,
      },
      ScanIndexForward: true
    };
    const result = await document.query(params).promise();

    if (result.Items.length > 0){
      return result.Items[0];
    }
    console.log(`End imagesRepository.searchImageByOrder`);
  }

  public async searchImageByLastUse(clientId: string, lastUse: number): Promise<any> {
    console.log(`Start imagesRepository.searchImageByLastUse in table: ${process.env.STOCK_IMAGES_TABLE}`);
    const params = {
      TableName: process.env.STOCK_IMAGES_TABLE,
      IndexName: 'lastUseIndex',
      KeyConditionExpression: 'PK = :pk and lastUse < :lastUse',
      ExpressionAttributeValues: {
        ':pk': `s#${clientId}`,
        ':lastUse': lastUse,
      },
      ScanIndexForward: true
    };
    const result = await document.query(params).promise();

    if (result.Items.length > 0){
      return result.Items[0];
    }
    console.log(`End imagesRepository.searchImageByLastUse`);
  }
  

  public async deleteImage(clientId: string, sourceUrl: string): Promise<any> {
    console.log(`Start imagesRepository.deleteImage get in table: ${process.env.STOCK_IMAGES_TABLE}`);
    const params = {
      TableName: process.env.STOCK_IMAGES_TABLE, // IndexName: 'sourceUrlIndex'      
      Key: {
        PK: `s#${clientId}`,
        SK: sourceUrl
      }
    };

    await document.delete(params).promise();
    console.log(`End imagesRepository.deleteImage`);    
  }

  public async deleteNewStockImage(pk: string, sourceUrl: string): Promise<any> {
    console.log(`Start imagesRepository.deleteImage get in table: ${process.env.STOCK_IMAGES_TABLE}`);
    const params = {
      TableName: process.env.STOCK_IMAGES_TABLE, // IndexName: 'sourceUrlIndex'      
      Key: {
        PK: pk,
        SK: sourceUrl
      }
    };

    await document.delete(params).promise();
    console.log(`End imagesRepository.deleteImage`);    
  }
}
export default ImagesDynamoDB;