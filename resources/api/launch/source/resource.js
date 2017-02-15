'use strict';

const ApiGatewayTemplates = require('wysknd-aws-cf-generator').ApiGatewayTemplates;
const ResourceTemplate = ApiGatewayTemplates.ResourceTemplate;

module.exports = (dirInfo) => {
    const resourceKey = dirInfo.getToken('RES');

    return new ResourceTemplate(resourceKey, `{${dirInfo.name}}`)
        .setRestApiId(dirInfo)
        .setParentResource(dirInfo);
};
