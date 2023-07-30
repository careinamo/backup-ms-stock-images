import { GoogleTokensRepository } from '../../domain/repositories/GoogleTokensRepository';
import { document } from "../../../libs/dynamoClient"
// import { v4 as uuidv4 } from 'uuid';

class GoogleTokensDynamoDB implements GoogleTokensRepository {
  public async getById(id: string): Promise<any> {
    console.log(`init save in database ${process.env.GOOGLE_TOKENS_TABLE} ${id}`);

    const params = {
      TableName: process.env.GOOGLE_TOKENS_TABLE,
      Key: {
        id_token: id
      }
    };

    const result = await document
    .get(params)
    .promise();
    console.log(`Results from ClientsRepository.getById in database ${JSON.stringify(result)}`);

    return result.Item;
  }
}
export default GoogleTokensDynamoDB;