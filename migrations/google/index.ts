import { DynamoDB } from 'aws-sdk';
import { CreateTableInput, DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as clients from './googleLocations.json';

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
    TableName: 'googleLocations',
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'assignedClient', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    GlobalSecondaryIndexes: [ // Cambiamos de "LocalSecondaryIndexes" a "GlobalSecondaryIndexes"
      {
        IndexName: 'assignedClient-index',
        KeySchema: [
          { AttributeName: 'assignedClient', KeyType: 'HASH' } // Atributo de partición para el GSI
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: { // Configuración de capacidad para el GSI
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
  };

  await ddb.deleteTable({ TableName: 'googleLocations' }).promise().catch(() => null);
  await ddb.createTable(createTableInput).promise();

  const batchWriteInput = {
    RequestItems: {
      googleLocations: [],
    },
  } as DocumentClient.BatchWriteItemInput;

  for (const client of clients) {
    console.log('Put: ', client.locationName);

    batchWriteInput.RequestItems.googleLocations.push({
      PutRequest: {
        Item: client,
      },
    });

    if (batchWriteInput.RequestItems.googleLocations.length % 25 === 0) {
      // eslint-disable-next-line no-await-in-loop
      await ddbDoc.batchWrite(batchWriteInput).promise();
      batchWriteInput.RequestItems.googleLocations = [];
    }
  }

  if (batchWriteInput.RequestItems.googleLocations.length) {
    await ddbDoc.batchWrite(batchWriteInput).promise();
  }

})();
