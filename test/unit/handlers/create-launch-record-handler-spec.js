/* jshint node:true, expr:true */
'use strict';

const _sinon = require('sinon');
const _chai = require('chai');
_chai.use(require('sinon-chai'));
_chai.use(require('chai-as-promised'));
const expect = _chai.expect;

const _loggerProvider = require('wysknd-log').loggerProvider;
_loggerProvider.enableMock();

const _rewire = require('rewire');
const _testHelper = require('wysknd-test');
const LambdaWrapper = _testHelper.aws.LambdaWrapper;
const _testValueProvider = _testHelper.testValueProvider;
const _testUtils = _testHelper.utils;

let _handler = null;

describe('[index.createLaunchRecordHandler]', () => {
    function _createWrapper(event, alias, config) {
        event = event || {};

        const contextInfo = {
            alias
        };

        config = config || {};

        return new LambdaWrapper(_handler, event, contextInfo, config);
    }

    beforeEach(() => {
        _handler = _rewire('../../../src/handlers/create-launch-record-handler');
    });

    describe('[execution]', () => {
        it('should invoke the callback with a success message', () => {
            const wrapper = _createWrapper(undefined, 'dev');
            const expectedMessage = 'Lambda function [create_launch_record] executed successfully';

            expect(wrapper.callback).to.not.have.been.called;
            const result = wrapper.testSuccess();
            expect(result).to.equal(expectedMessage);
        });
    });
});
