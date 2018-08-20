const AWSXRay = require('aws-xray-sdk-core')
const AWS = process.env.LAMBDA_RUNTIME_DIR
  ? AWSXRay.captureAWS(require('aws-sdk'))
  : require('aws-sdk')
const requestContext = require('./_requestContext')
const sns = new AWS.SNS()

module.exports = async (topic, message) => {
  // this is a cheat to lookup the topic ARN. 
  // https://stackoverflow.com/questions/36721014/aws-sns-how-to-get-topic-arn-by-topic-name
  const { TopicArn } = await sns.createTopic({ Name: topic }).promise()

  const params = {
    TopicArn,
    Subject: topic,
    Message: JSON.stringify(message),
    MessageAttributes: {}
  }

  // if requestContext is loaded, get the context and include it in the Sns
  if (requestContext) {
    const context = requestContext.get()
    for (let key in context) {
      params.MessageAttributes[key] = {
        DataType: 'String',
        StringValue: context[key]
      }
    }
  }

  return await sns.publish(params).promise()
}