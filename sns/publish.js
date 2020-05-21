const AWS = require('../aws')
const requestContext = require('./_requestContext')

const sns = new AWS.SNS({
  endpoint: process.env.LOCALSTACK_HOSTNAME 
    ? `http://${process.env.LOCALSTACK_HOSTNAME}:4575` 
    : undefined,
})

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