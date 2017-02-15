'use strict';

const Environment = require('wysknd-aws-lambda').Environment;
const LambdaTemplates = require('wysknd-aws-cf-generator').LambdaTemplates;
const EventSourceMappingTemplate = LambdaTemplates.EventSourceMappingTemplate;

/**
 * Returns a trigger definition that invokes lambda flag_alerts
 * in response to events from table md.launch_records
 * for environment: prod.
 */
module.exports = (dirInfo) => {
    const envStr = 'prod';
    const env = new Environment(envStr);

    const mappingName = env.getSuffixString('md-launch_records__flag_alerts');
    const mappingKey = dirInfo.getNamespacedToken('lambda_event', mappingName);

    const tableName = env.getSuffixString('md-launch_records');
    const tableKey = dirInfo.getNamespacedToken('dynamodb_table', tableName);

    const functionName = 'md-flag_alerts';

    const alias = envStr;

    return new EventSourceMappingTemplate(mappingKey)
        .setBatchSize(1)
        .setEnabled(true)
        .setStartingPosition('LATEST')
        .setDynamoDbSourceByResource(tableKey)
        .setFunction(functionName, alias)
        .addDependency(tableKey);
};
