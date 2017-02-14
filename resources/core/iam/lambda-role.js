'use strict';

const IamTemplates = require('wysknd-aws-cf-generator').IamTemplates;
const RoleTemplate = IamTemplates.RoleTemplate;
const PolicyDocument = IamTemplates.PolicyDocument;
const PolicyStatement = IamTemplates.PolicyStatement;

module.exports = (dirInfo) => {
    const roleName = 'md-lambda_role';
    const roleKey = dirInfo.getNamespacedToken('iam_role', roleName);

    return new RoleTemplate(roleKey, roleName)
        .setAssumePolicy(
            (new PolicyDocument())
                .addStatement((new PolicyStatement())
                    .addAction('sts:AssumeRole')
                    .addServicePrincipal('lambda.amazonaws.com')))
        .addAwsManagedPolicy('AWSLambdaFullAccess')
        .addAwsManagedPolicy('service-role/AWSLambdaBasicExecutionRole');
};
