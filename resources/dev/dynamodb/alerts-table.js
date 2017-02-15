'use strict';

const Environment = require('wysknd-aws-lambda').Environment;
const DynamoDbTemplates = require('wysknd-aws-cf-generator').DynamoDbTemplates;
const TableTemplate = DynamoDbTemplates.TableTemplate;

/**
 * Returns the table definition for the alerts table for
 * environment: dev.
 */
module.exports = (dirInfo) => {
    const envStr = 'dev';
    const env = new Environment(envStr);

    const tableName = env.getSuffixString('md-alerts');
    const tableKey = dirInfo.getNamespacedToken('dynamodb_table', tableName);

    return (new TableTemplate(tableKey, tableName))
        .addKey('id', 'S', 'HASH')
        .setReadCapacity(5)
        .setWriteCapacity(5);
};
