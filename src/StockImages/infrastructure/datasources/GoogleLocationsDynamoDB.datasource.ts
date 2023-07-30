import { GoogleLocationsRespository } from '../../domain/repositories/GoogleLocationsRespository';
import { document } from "../../../libs/dynamoClient"
// import { v4 as uuidv4 } from 'uuid';

class GoogleLocationsDynamoDB implements GoogleLocationsRespository {
  public async getByClientId(clientId: string): Promise<any> {
    console.log(`init save in database clients}`);
    const params = {
      TableName: process.env.GOOGLE_LOCATIONS_TABLE,
      IndexName: 'assignedClient-index',
      KeyConditionExpression: 'assignedClient = :clientId',
      ExpressionAttributeValues: {
        ':clientId': clientId,
      }
    };
    const result = await document.query(params).promise();    

    if (result.Items.length > 0){
      return result.Items[0];
    }
    console.log(`End imagesRepository.searchImageByOrder`);
  }
}
export default GoogleLocationsDynamoDB;