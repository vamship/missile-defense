'use strict';

const ApiGatewayTemplates = require('wysknd-aws-cf-generator').ApiGatewayTemplates;
const MethodTemplate = ApiGatewayTemplates.MethodTemplate;
const _mappingHelper = ApiGatewayTemplates.mappingTemplateHelper;

module.exports = (dirInfo) => {
    const method = 'GET';
    const methodKey = dirInfo.getToken(method);

    //TODO: This request template must be filled out with an appropriate mapping
    //of the HTTP request to the parameters required by the back end.
    const requestTemplate = `{
}`;

    //TODO: This request template must be filled out with an appropriate mapping
    //of the HTTP response to the response  required by teh caller
    const responseTemplate = `$input.json('$')`;

    return (new MethodTemplate(methodKey))
        .setRestApiId(dirInfo)
        .setResource(dirInfo)
        .setHttpMethod(method)
        .setAuthorizer(false)
        .setBackendLambda('md-create_launch_record')
        // .setRequestPath('userId', true) //TODO: Add references to dynamic path elements (ex: /users/{userId})
        .setRequestTemplate(requestTemplate, 'application/json')
        .setRequestModel('Empty')
        .setDefaultIntegrationResponses()
        .setResponseHeader('Access-Control-Allow-Origin', '<% cors_origin %>')
        .setResponseTemplate(responseTemplate, 'application/json', '200')
        .setResponseModel('Empty', 'application/json', '200')
        ;
};
