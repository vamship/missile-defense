'use strict';

const ApiGatewayTemplates = require('wysknd-aws-cf-generator').ApiGatewayTemplates;
const MethodTemplate = ApiGatewayTemplates.MethodTemplate;

module.exports = (dirInfo) => {
    const method = 'GET';
    const methodKey = dirInfo.getToken(method);

    const requestTemplate = `{}`;

    const responseTemplate = `$input.json('$')`;

    return (new MethodTemplate(methodKey))
        .setRestApiId(dirInfo)
        .setResource(dirInfo)
        .setHttpMethod(method)
        .setAuthorizer(false)
        .setBackendLambda('md-list_alerts')
        // .setRequestPath('userId', true) //TODO: Add references to dynamic path elements (ex: /users/{userId})
        .setRequestTemplate(requestTemplate, 'application/json')
        .setRequestModel('Empty')
        .setDefaultIntegrationResponses()
        .setResponseHeader('Access-Control-Allow-Origin', '<% cors_origin %>')
        .setResponseTemplate(responseTemplate, 'application/json', '200')
        .setResponseModel('Empty', 'application/json', '200');
};
