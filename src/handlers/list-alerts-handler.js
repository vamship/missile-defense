'use strict';

const _awsSdk = require('aws-sdk');
const _awsDynamoDb = require('aws-dynamodb');

/**
 * Return a list of alerts
 *
 * @param {Object} event The lambda event object
 * @param {Object} context The lambda context object
 * @param {Function} callback A callback method to signal the completion
 *          lambda function
 * @param {Object} ext Extended properties containing references to injected
 *        properties such as config, logger, etc.
 */
module.exports = function(event, context, callback, ext) {
    const logger = ext.logger;

    const table = 'md-alerts-dev';
    logger.info(`Accessing table: [${table}]`);
    const startTime = Date.now();

    const dynamoDbClient = _awsDynamoDb(new _awsSdk.DynamoDB());
    dynamoDbClient
        .table(table)
        .scan((err, data) => {
            const endTime = Date.now();
            logger.debug(`Query duration: [${endTime - startTime} ms]`);
            if (err) {
                logger.error(err, 'Error querying alert records');
                callback('[Error] Error querying alert records');
                return;
            }
            logger.info(`Alert list fetched successfully`);
            callback(null, data);
        });
};
