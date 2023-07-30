import { DynamoDB } from 'aws-sdk';
import { CreateTableInput, DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as clients from './googleToken.json';

(async () => {
  console.time('migrate');
  console.log('Start...');

  const ddb = new DynamoDB({
    endpoint: 'http://localhost:8000',
    region: 'localhost',
    apiVersion: '2012-08-10',
    httpOptions: {
      connectTimeout: 5000,
    },
  });

  const ddbDoc = new DocumentClient({
    service: ddb,
  });

  const createTableInput: CreateTableInput = {
    TableName: 'googleTokens',
    KeySchema: [
      { AttributeName: 'id_token', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'id_token', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  await ddb.deleteTable({ TableName: 'googleTokens' }).promise().catch(() => null);
  await ddb.createTable(createTableInput).promise();

  const batchWriteInput = {
    RequestItems: {
      googleTokens: [],
    },
  } as DocumentClient.BatchWriteItemInput;

  for (const client of clients) {
    console.log('Put: ', client.id_token);

    batchWriteInput.RequestItems.googleTokens.push({
      PutRequest: {
        Item: client,
      },
    });

    if (batchWriteInput.RequestItems.googleTokens.length % 25 === 0) {
      // eslint-disable-next-line no-await-in-loop
      await ddbDoc.batchWrite(batchWriteInput).promise();
      batchWriteInput.RequestItems.googleTokens = [];
    }
  }

  if (batchWriteInput.RequestItems.googleTokens.length) {
    await ddbDoc.batchWrite(batchWriteInput).promise();
  }

})();
