import { DynamoDB } from 'aws-sdk';

const options = {
  region: 'local',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'x',
  secretAccessKey: 'x',
};

const isOffline = () => {
  // return process.env.IS_OFFLINE;
  return true;
};

export const document = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();