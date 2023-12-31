import type { AWS } from '@serverless/typescript';

// import hello from '@StockImages/functions';
import { getExternalImage, useExternalImage } from '@ExternalApis/functions';
import { loadImages, getStockImage } from '@StockImages/functions';
import dynamoDbConfig from 'resources/dynamodb';

const serverlessConfiguration: AWS = {
  service: 'ms-stock-images',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  useDotenv: true,
  provider: {
    name: 'aws',
    stage: 'dev',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:*',
          's3:*'
        ],
        Resource: [
          '*'
        ]
      }
    ]
  },
  // import the function via paths
  functions: { getExternalImage, useExternalImage, loadImages, getStockImage },
  resources: dynamoDbConfig,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    },
    'serverless-offline': {
      httpPort: 4000,
      noAuth: true,
      noPrependStageInUrl: true,
    }
  },
};

module.exports = serverlessConfiguration;
