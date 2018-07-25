const AWS = require('aws-sdk')
const requestContext = require('./_requestContext')
const sns = new AWS.SNS()

module.exports = async (topic, message) => {
  const { TopicArn } = await sns.createTopic({ Name: topic }).promise()
  const params = {
    TopicArn,
    Subject: topic,
    Message: JSON.stringify(message),
    MessageAttributes: {}
  }

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