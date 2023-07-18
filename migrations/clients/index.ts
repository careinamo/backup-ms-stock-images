import { DynamoDB } from 'aws-sdk';
import { CreateTableInput, DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as clients from './clients.json';

(async () => {
  console.time('migrate');
  console.log('Start...');

  // const table = process.env.CLIENTS_TABLE || 'clients-dev';

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
    TableName: 'clients',
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  await ddb.deleteTable({ TableName: 'clients' }).promise().catch(() => null);
  await ddb.createTable(createTableInput).promise();

  const batchWriteInput = {
    RequestItems: {
      clients: [],
    },
  } as DocumentClient.BatchWriteItemInput;

  for (const client of clients) {
    console.log('Put: ', client.clientName);

    batchWriteInput.RequestItems.clients.push({
      PutRequest: {
        Item: client,
      },
    });

    if (batchWriteInput.RequestItems.clients.length % 25 === 0) {
      // eslint-disable-next-line no-await-in-loop
      await ddbDoc.batchWrite(batchWriteInput).promise();
      batchWriteInput.RequestItems.clients = [];
    }
  }

  if (batchWriteInput.RequestItems.clients.length) {
    await ddbDoc.batchWrite(batchWriteInput).promise();
  }

  console.timeEnd('migrate');
  console.log('Done!');
})();
