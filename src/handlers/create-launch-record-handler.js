'use strict';

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
    const config = ext.config;

    //TODO: Implement function and invoke callback.
    callback(null, 'Lambda function [create_launch_record] executed successfully');
};
