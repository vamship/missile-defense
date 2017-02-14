'use strict';

const IamTemplates = require('wysknd-aws-cf-generator').IamTemplates;
const RoleTemplate = IamTemplates.RoleTemplate;
const PolicyDocument = IamTemplates.PolicyDocument;
const PolicyStatement = IamTemplates.PolicyStatement;

module.exports = (dirInfo) => {
    const roleName = 'md-api_gateway_role';
    const roleKey = dirInfo.getNamespacedToken('iam_role', roleName);

    return new RoleTemplate(roleKey, roleName)
        .setAssumePolicy(
            (new PolicyDocument())
                .addStatement((new PolicyStatement())
                    .addAction('sts:AssumeRole')
                    .addServicePrincipal('apigateway.amazonaws.com')))
        .addAwsManagedPolicy('AmazonS3ReadOnlyAccess')
        .addAwsManagedPolicy('AmazonS3FullAccess')
        .addAwsManagedPolicy('service-role/AWSLambdaRole')
        .addAwsManagedPolicy('service-role/AWSLambdaBasicExecutionRole');
};
