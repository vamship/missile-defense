'use strict';

const ApiGatewayTemplates = require('wysknd-aws-cf-generator').ApiGatewayTemplates;
const MethodTemplate = ApiGatewayTemplates.MethodTemplate;
const _mappingHelper = ApiGatewayTemplates.mappingTemplateHelper;

module.exports = (dirInfo) => {
    const method = 'PUT';
    const methodKey = dirInfo.getToken(method);

    const requestTemplate = `{
${_mappingHelper.mapProperty('source', 'source', {
        source: 'url',
        noComma: true
    })}
${_mappingHelper.mapProperty('$.latitude', 'latitude', {
        noQuotes: true
    })}
${_mappingHelper.mapProperty('$.longitude', 'longitude', {
        noQuotes: true
    })}
${_mappingHelper.mapProperty('$.timestamp', 'timestamp', {
        noQuotes: true
    })}
}`;

    const responseTemplate = `$input.json('$')`;

    return (new MethodTemplate(methodKey))
        .setRestApiId(dirInfo)
        .setResource(dirInfo)
        .setHttpMethod(method)
        .setAuthorizer(false)
        .setBackendLambda('md-create_launch_record')
        .setRequestPath('source', true)
        .setRequestTemplate(requestTemplate, 'application/json')
        .setRequestModel('Empty')
        .setDefaultIntegrationResponses()
        .setResponseHeader('Access-Control-Allow-Origin', '<% cors_origin %>')
        .setResponseTemplate(responseTemplate, 'application/json', '200')
        .setResponseModel('Empty', 'application/json', '200')
        ;
};
