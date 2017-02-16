'use strict';

const _awsSdk = require('aws-sdk');
const _awsDynamoDb = require('aws-dynamodb');

/**
 * Create a launch record in dynamo db
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

    const table = 'md-launch_records-dev';
    logger.info(`Accessing table: [${table}]`);
    const startTime = Date.now();

    const dynamoDbClient = _awsDynamoDb(new _awsSdk.DynamoDB());
    const launchData = {
        source: event.source,
        timestamp: event.timestamp,
        latitude: event.latitude,
        longitude: event.longitude
    };
    dynamoDbClient
        .table(table)
        .insert(launchData, (err, data) => {
            const endTime = Date.now();
            logger.debug(`Query duration: [${endTime - startTime} ms]`);
            if (err) {
                logger.error(err, 'Error creating launch record');
                callback('[Error] Error creating launch record');
                return;
            }
            logger.info(`Launch record created successfully`);
            callback(null, `Launch record created successfully: [${event.source}, ${event.timestamp}]`);
        });
};
