const dynamoDbConfig = {
    Resources: {
        TodosDynamoDBTable: {
            Type: "AWS::DynamoDB::Table",
            Properties: {
                TableName: "stock-images-prod",
                AttributeDefinitions: [
                    { AttributeName: 'PK', AttributeType: 'S' },
                    { AttributeName: 'SK', AttributeType: 'S' },
                    { AttributeName: 'lastUse', AttributeType: 'N' },
                    { AttributeName: 'orderNewImage', AttributeType: 'N' }
                ],
                KeySchema: [
                    { AttributeName: 'PK', KeyType: 'HASH' },
                    { AttributeName: 'SK', KeyType: 'RANGE' }
                ],
                // DynamoDB On-Demand
                BillingMode: 'PAY_PER_REQUEST',
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
                ]
            },
        }
    }
};

export default dynamoDbConfig;



//   const dynamoDbConfig = {
//     Resources: {
//       TodosDynamoDBTable: {
//         Type: "AWS::DynamoDB::Table",
//         Properties: {
//           TableName: "${self:provider.environment.TODOS_TABLE}",
//           AttributeDefinitions: [
//             { AttributeName: 'id', AttributeType: 'S' }, // Primary key
//             { AttributeName: 'category', AttributeType: 'S' }, // Secondary index attribute
//           ],
//           KeySchema: [
//             { AttributeName: 'id', KeyType: 'HASH' }, // Primary key
//           ],
//           // DynamoDB On-Demand
//           BillingMode: 'PAY_PER_REQUEST',
//           LocalSecondaryIndexes: [
//             {
//               IndexName: 'CategoryIndex', // Index name
//               KeySchema: [
//                 { AttributeName: 'id', KeyType: 'HASH' }, // Must be the same as the table's primary key
//                 { AttributeName: 'category', KeyType: 'RANGE' }, // Secondary index key
//               ],
//               Projection: {
//                 ProjectionType: 'ALL', // Adjust this to 'KEYS_ONLY', 'INCLUDE', or 'ALL'
//               },
//             },
//           ],
//         },
//       },
//     },
//   };
