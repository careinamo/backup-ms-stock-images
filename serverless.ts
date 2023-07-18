import type { AWS } from '@serverless/typescript';

// import hello from '@StockImages/functions';
import { getExternalImage, useExternalImage } from '@ExternalApis/functions';
import { loadImages, getStockImage } from '@StockImages/functions';

const serverlessConfiguration: AWS = {
  service: 'ms-images',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  useDotenv: true,
  provider: {
    name: 'aws',
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
          'dynamodb:*'
        ],
        Resource: [
          '*'
        ]
      }
    ]
  },
  // import the function via paths
  functions: { getExternalImage, useExternalImage, loadImages, getStockImage },
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
