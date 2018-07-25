const { test } = require('tap')
const proxyquire = require('proxyquire')

const AWS = require('aws-sdk-mock')
const AWS_SDK = require('aws-sdk')
AWS.setSDKInstance(AWS_SDK)

AWS.mock('SNS', 'createTopic', (params, callback) => {
  callback(null, { 
    TopicArn: 'arn:' + params.Name,
  })
})

AWS.mock('SNS', 'publish', (params, callback) => {
  callback(null, params)
})

const publish = proxyquire('../publish', {
  './_requestContext': {
    get: () => ({ foo: 'bar' })
  }
})

test('publish', async assert => {
  const expected = {
    TopicArn: 'arn:foobar',
    Subject: 'foobar',
    Message: '{"bar":"foo"}',
    MessageAttributes: {
      foo: {
        DataType: 'String',
        StringValue: 'bar',
      },
    }
  }

  const res = await publish('foobar', { bar: 'foo' })
  assert.deepEquals(res, expected, 'loads context and publishes to Sns')
  assert.end()
})