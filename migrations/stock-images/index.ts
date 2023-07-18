import { DynamoDB } from 'aws-sdk';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
// import * as seeds from './seeds.json';

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

  // const ddbDoc = new DocumentClient({
  //   service: ddb,
  // });

  // const createTableInput: CreateTableInput = {
  //   TableName: 'stocks',
  //   KeySchema: [
  //     { AttributeName: 'PK', KeyType: 'HASH' }, // Clave de partición
  //     { AttributeName: 'SK', KeyType: 'RANGE' } // Clave de ordenación
  //   ],
  //   AttributeDefinitions: [
  //     { AttributeName: 'PK', AttributeType: 'S' }, // Tipo de dato para la clave de partición (String)
  //     { AttributeName: 'SK', AttributeType: 'N' } // Tipo de dato para la clave de ordenación (String)
  //   ],
  //   ProvisionedThroughput: {
  //     ReadCapacityUnits: 10,
  //     WriteCapacityUnits: 10,
  //   },
  // };


  const createTableInput: CreateTableInput = {
    TableName: 'stocks',
    KeySchema: [
      { AttributeName: 'PK', KeyType: 'HASH' },
      { AttributeName: 'SK', KeyType: 'RANGE' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'PK', AttributeType: 'S' },
      { AttributeName: 'SK', AttributeType: 'S' },
      { AttributeName: 'lastUse', AttributeType: 'N' },
      { AttributeName: 'orderNewImage', AttributeType: 'N' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    LocalSecondaryIndexes: [
      {
        IndexName: 'lastUseIndex',
        KeySchema: [
          { AttributeName: 'PK', KeyType: 'HASH' },
          { AttributeName: 'lastUse', KeyType: 'RANGE' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        }
      },
      {
        IndexName: 'orderNewImageIndex',
        KeySchema: [
          { AttributeName: 'PK', KeyType: 'HASH' },
          { AttributeName: 'orderNewImage', KeyType: 'RANGE' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        }
      }
    ],
  }

  await ddb.deleteTable({ TableName: 'stocks' }).promise().catch(() => null);
  await ddb.createTable(createTableInput).promise();

  // const batchWriteInput = {
  //   RequestItems: {
  //     stocks: [],
  //   },
  // } as DocumentClient.BatchWriteItemInput;

  // for (const item of seeds) {
  //   console.log('Put: ', item.clientName);

  //   batchWriteInput.RequestItems.stocks.push({
  //     PutRequest: {
  //       Item: item,
  //     },
  //   });

  //   if (batchWriteInput.RequestItems.stocks.length % 25 === 0) {
  //     // eslint-disable-next-line no-await-in-loop
  //     await ddbDoc.batchWrite(batchWriteInput).promise();
  //     batchWriteInput.RequestItems.stocks = [];
  //   }
  // }

  // if (batchWriteInput.RequestItems.stocks.length) {
  //   await ddbDoc.batchWrite(batchWriteInput).promise();
  // }

  console.timeEnd('migrate');
  console.log('Done!');
})();
