/*globals Promise:true*/
'use strict';

const _awsSdk = require('aws-sdk');
const _awsDynamoDb = require('aws-dynamodb');
const _shortId = require('shortid');

/**
 * Review launch records and flag alerts
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

    function _writeAlert(lat, long, source, timestamp) {
        const alertData = {
            id: _shortId.generate(),
            latitude: lat,
            longitude: long,
            source: source,
            timestamp: timestamp,
        };

        return new Promise((resolve, reject) => {
            const table = 'md-alerts-dev';
            logger.info(`Accessing table: [${table}]`);
            const startTime = Date.now();

            const dynamoDbClient = _awsDynamoDb(new _awsSdk.DynamoDB());
            dynamoDbClient
                .table(table)
                .insert(alertData, (err, data) => {
                    const endTime = Date.now();
                    logger.debug(`Query duration: [${endTime - startTime} ms]`);
                    if (err) {
                        logger.error(err, 'Error creating alert record');
                        reject('Error creating alert record');
                        return;
                    }
                    logger.info(`Launch record created successfully`);
                    resolve();
                });
        });
    }


    const promises = [];
    if (event.Records instanceof Array) {
        logger.debug('Looping through launch records');
        event.Records.forEach((record) => {
            logger.info('Evaluating record', record);
            const dbRecord = record.dynamodb;
            if (dbRecord) {
                const source = dbRecord.Keys.source.S;
                const timestamp = dbRecord.Keys.timestamp.N;
                const lat = dbRecord.NewImage.latitude.N;
                const long = dbRecord.NewImage.longitude.N;
                logger.info('Processing record', source, timestamp, lat, long);
                if (lat > 37.731201 && lat < 42.462954 &&
                    long > 126.159660 && long < 130.507928) {
                    logger.info('Launch could be a potential threat');
                    const promise = _writeAlert(lat, long, source, timestamp);
                    promises.push(promise);
                } else {
                    logger.info('Launch is not a threat');
                }
            }
        });
    }

    Promise.all(promises).then(() => {
        callback(null, 'ok');
    }, () => {
        callback('Error writing alerts to data store');
    });
};
