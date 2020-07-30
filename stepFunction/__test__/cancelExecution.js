const { test } = require('tap')
const proxyquire = require('proxyquire')

const AWS = require('aws-sdk-mock')
const AWS_SDK = require('aws-sdk')
AWS.setSDKInstance(AWS_SDK)

AWS.mock('StepFunctions', 'stopExecution', (params, callback) => {
  callback(null, params)
})

AWS.mock('StepFunctions', 'listExecutions', ({ stateMachineArn }, callback) => {
  callback(null, {
    executions: [{
      name: '123-foo',
      executionArn: '123-foo-' + stateMachineArn,
    }, {
      name: '123-bar',
      executionArn: '123-bar-' + stateMachineArn,
    }, {
      name: '456-baz',
      executionArn: '456-baz-' + stateMachineArn,
    }],
  })
})


const cancelExecution = require('../cancelExecution')

test('invoke', async assert => {

  const expected = [{
    executionArn: '123-foo-some-arn',
    cause: 'canceled',
  }, {
    executionArn: '123-bar-some-arn',
    cause: 'canceled',
  }]

  const res = await cancelExecution('some-arn', '123')

  assert.deepEquals(res, expected, 'canceles executions with matching external id')
})