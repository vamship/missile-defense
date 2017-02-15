'use strict';

const Environment = require('wysknd-aws-lambda').Environment;
const DynamoDbTemplates = require('wysknd-aws-cf-generator').DynamoDbTemplates;
const TableTemplate = DynamoDbTemplates.TableTemplate;

/**
 * Returns the table definition for the launch_records table for
 * environment: dev.
 */
module.exports = (dirInfo) => {
    const envStr = 'dev';
    const env = new Environment(envStr);

    const tableName = env.getSuffixString('md-launch_records');
    const tableKey = dirInfo.getNamespacedToken('dynamodb_table', tableName);

    return (new TableTemplate(tableKey, tableName))
        .addKey('source', 'S', 'HASH')
        .addKey('timestamp', 'N', 'RANGE')
        .setStreamSpecification('NEW_IMAGE')
        .setReadCapacity(5)
        .setWriteCapacity(5);
};
