import { ClientsRepository } from '../domain/clientsRespository';
import { document } from "../../libs/dynamoClient"
// import { v4 as uuidv4 } from 'uuid';

class clientsDynamoDB implements ClientsRepository {
  public async getById(): Promise<any> {
    console.log(`init save in database clients}`);

    const params = {
      TableName: 'clients-prod',
      Key: {
        id: '15e70d027aba9cd719df89afbf03e7c306a3e62608d97d856ead2ac35162d07c'
      }
    };

    console.log(`resulte save in database ${JSON.stringify(params)}`);

    // const result = await document
    // .update(params)
    // .promise();
    // console.log(`result save in database ${result}`);

    const result = await document
    .get(params)
    .promise();
    console.log(`result save in database ${JSON.stringify(result)}`);

    return result.Item;
  }
}
export default clientsDynamoDB;