const { test } = require('tap')
const proxyquire = require('proxyquire')

const AWS = require('aws-sdk-mock')
const AWS_SDK = require('aws-sdk')
AWS.setSDKInstance(AWS_SDK)

AWS.mock('StepFunctions', 'startExecution', (params, callback) => {
  callback(null, params)
})


const startExecution = proxyquire('../startExecution', {
  './_requestContext': {
    get: () => ({
      foo: 'bar',
    })
  }
})

test('invoke', async assert => {
  const expected = {
    stateMachineArn: 'some-arn',
    name: /123-foo-\d+/,
    input: JSON.stringify({
      __context: {
        foo: 'bar',
      },
      bar: 'baz',
    })
  }

  const res = await startExecution('some-arn', '123-foo', { bar: 'baz' })

  assert.match(res, expected, 'starts execution with requestContext injected')
})