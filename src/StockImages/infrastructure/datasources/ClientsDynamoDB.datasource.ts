import { ClientsRepository } from '../../domain/repositories/ClientsRespository';
import { document } from "../../../libs/dynamoClient"
// import { v4 as uuidv4 } from 'uuid';

class clientsDynamoDB implements ClientsRepository {
  public async getById(clientId: string): Promise<any> {
    console.log(`init save in database clients}`);

    const params = {
      TableName: process.env.CLIENTS_TABLE,
      Key: {
        id: clientId
      }
    };

    const result = await document
    .get(params)
    .promise();
    console.log(`Results from ClientsRepository.getById in database ${JSON.stringify(result)}`);

    return result.Item;
  }
}
export default clientsDynamoDB;